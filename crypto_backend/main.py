from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
import time

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


CACHE = {}

TTL_MARKETS = 60        # 1 min for top 100 coins
TTL_COIN_DATA = 300     # 5 min for individual coin details
TTL_PRICES = 30         # 30 sec for price charts


def get_from_cache(key: str, url: str, params: dict = None, ttl: int = 60):
    now = time.time()
    if key in CACHE and now - CACHE[key]["time"] < ttl:
        return CACHE[key]["data"]

    try:
        response = requests.get(url, params=params, timeout=10)
        if response.status_code == 429:
            raise HTTPException(status_code=429, detail="Rate limit exceeded on CoinGecko")
        elif response.status_code == 404:
            raise HTTPException(status_code=404, detail="Resource not found on CoinGecko")
        elif response.status_code >= 500:
            raise HTTPException(status_code=502, detail="CoinGecko server error")

        response.raise_for_status()
        data = response.json()

    except requests.exceptions.Timeout:
        raise HTTPException(status_code=504, detail="CoinGecko request timed out")
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Upstream request error: {str(e)}")
    except ValueError:
        raise HTTPException(status_code=502, detail="Invalid JSON response from CoinGecko")

    CACHE[key] = {"data": data, "time": now}
    return data

@app.get("/")
def root():
    return {"message": "Crypto Dashboard API is running"}


@app.get("/api/coins/markets")
def get_100_coins(
    vs_currency: str = "usd",
    order: str = "market_cap_desc",
    per_page: int = 100,
    page: int = 1,
    sparkline: bool = False
):
    url = "https://api.coingecko.com/api/v3/coins/markets"
    key = f"markets_{vs_currency}_{order}_{per_page}_{page}_{sparkline}"
    return get_from_cache(
        key, url,
        {
            "vs_currency": vs_currency,
            "order": order,
            "per_page": per_page,
            "page": page,
            "sparkline": sparkline
        },
        TTL_MARKETS
    )


@app.get("/api/coins/{coin_id}")
def get_coin_data(coin_id: str):
    url = f"https://api.coingecko.com/api/v3/coins/{coin_id}"
    key = f"coin_{coin_id}"
    return get_from_cache(key, url, ttl=TTL_COIN_DATA)


@app.get("/api/coins/{coin_id}/market_chart")
def get_coin_prices(
    coin_id: str,
    days: str = "7",
    price_param: str = "prices"  
):
    vs_currency = "usd"
    days_int = int(days)
    interval = "daily"

    url = f"https://api.coingecko.com/api/v3/coins/{coin_id}/market_chart"
    cache_key = f"{price_param}_{coin_id}_{vs_currency}_{days}_{interval}"

    try:
        data = get_from_cache(
            key=cache_key,
            url=url,
            params={"vs_currency": vs_currency, "days": days, "interval": interval},
            ttl=TTL_PRICES if days_int <= 90 else 0 
        )
    except Exception as e:
        print(f"CoinGecko API error: {e}")
        raise HTTPException(
            status_code=502,
            detail="CoinGecko API failed or returned too much data"
        )

    if not data or price_param not in data:
        raise HTTPException(
            status_code=404,
            detail=f"Price data '{price_param}' not found for {coin_id}"
        )

    return data[price_param]



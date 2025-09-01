import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Fallback from "../../../assets/fallback2.jpg";
import "./styles.css";
export default function ImgMediaCard({ title, description, image, url }) {
  return (
    <Card className="custom-card">
      <CardMedia
        component="img"
        alt={title}
        height="140"
        image={image}
        onError={(e) => {
          e.target.src = Fallback;
        }}
      />
      <CardContent>
        <Typography
          className="custom-typography title"
          gutterBottom
          variant="h6"
          component="div"
        >
          {title}
        </Typography>
        <Typography
          className="custom-typography"
          variant="body2"
          sx={{ color: "text.secondary" }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions className="custom-actions">
        <Button
          className="custom-button"
          size="small"
          href={url}
          target="_blank"
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

import sunrise from "../assets/sunrise.jpeg";
import afternoon from "../assets/afternoon.jpg";
import night from "../assets/night.jpg";
const Summary = () => {
  const now = new Date();
  const hours = now.getHours();

  let image, title;

  if (hours >= 6 && hours < 12) {
    image = sunrise;
    title = "Mañana";
  } else if (hours >= 12 && hours < 18) {
    image = afternoon;
    title = "Tarde";
  } else {
    image = night;
    title = "Noche";
  }

  const timeText = now.toLocaleTimeString();  

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={image} alt={title} />
        <CardContent>
          <Typography gutterBottom component="h2" variant="h6" color="primary">
            {title}
          </Typography>
          <Typography component="p" variant="h4">
            {timeText}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            {now.toLocaleDateString()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Summary;
import { Card, CardContent, Typography } from "@mui/material";

const WeatherCard = ({ city, temp, weather }) => {
  console.log(weather);
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {city}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {temp}° C
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {weather && weather[0]}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {weather[1] === "clear" ? (
            <i class="fa-solid fa-sun"></i>
          ) : weather[1] === "rain" ? (
            <i class="fa-solid fa-cloud-showers-heavy"></i>
          ) : weather[1] === "snow" ? (
            <i class="fa-solid fa-cloud-snow"></i>
          ) : weather[1] === "drizzle" ? (
            <i class="fa-solid fa-cloud-rain"></i>
          ) : weather[1] === "fog" ? (
            <i class="fa-solid fa-cloud-fog"></i>
          ) : null}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default WeatherCard;

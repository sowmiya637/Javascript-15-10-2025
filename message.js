export function getWeatherMessage(temp) {
  if (temp > 30) return "It's a hot sunny day ";
  if (temp >= 20) return "Nice and pleasant ";
  return "Cold weather, grab a jacket ";
}

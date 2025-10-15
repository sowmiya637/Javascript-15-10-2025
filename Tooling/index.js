import { getWeatherMessage } from "./message.js";

const temp = 28; // Example temperature
const message = getWeatherMessage(temp);

console.log(`Today's temperature: ${temp}°C`);
console.log(message);

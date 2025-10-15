# Weather Tooling App

A simple weather message demo using **JavaScript**, **Webpack**, **ESLint**, **Prettier**, and **npm**.  
This project demonstrates a basic toolchain setup and displays weather messages in the browser console.

---

## Project Overview

The **Weather Tooling App** is a minimal JavaScript project that:

- Takes a hardcoded temperature value (`temp`) in JavaScript.
- Uses a helper function `getWeatherMessage(temp)` to generate a weather message.
- Logs the temperature and message to the browser console.
- Uses modern tooling (Webpack, ESLint, Prettier) for bundling, linting, and formatting.

---

## Features

- Modular JavaScript with ES Modules (`import` / `export`)
- Bundled using Webpack
- Linting with ESLint
- Formatting with Prettier
- Simple, console-based weather message output
- Example for learning npm toolchains and Webpack setup

---

---

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd weather-tooling-app
Install dependencies:

bash
Copy code
npm install
Usage
Build the project using Webpack:

bash
Copy code
npm run build
Open index.html in your browser.

Open the browser console (F12 / DevTools) to see the weather message output:

mathematica
Copy code
Today's temperature: 28°C
Nice and pleasant 🌤️
Scripts
Script	Description
npm run build	Bundles JavaScript using Webpack
npm run lint	Lints the src/ folder using ESLint
npm run format	Formats the src/ folder using Prettier

Code Explanation
src/index.js
javascript
Copy code
import { getWeatherMessage } from "./message.js";

const temp = 28; // Example temperature
const message = getWeatherMessage(temp);

console.log(`Today's temperature: ${temp}°C`);
console.log(message);
Imports getWeatherMessage from message.js.

Defines a sample temperature (28°C).

Calls the helper function to generate a message.

Logs the results to the console.

src/message.js
javascript
Copy code
export function getWeatherMessage(temp) {
  if (temp > 30) return "It's a hot sunny day ☀️";
  if (temp >= 20) return "Nice and pleasant 🌤️";
  return "Cold weather, grab a jacket ❄️";
}
Accepts a temperature value.

Returns a string message based on temperature ranges.

Webpack Configuration (webpack.config.js)
javascript
Copy code
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development", // Use 'production' for optimized builds
};
entry: The main JS file to start bundling (index.js).

output: Bundled file (bundle.js) stored in dist/.

mode: Development mode (unminified, includes useful warnings).

Note: In development mode, Webpack uses eval for easier debugging. For production, set mode: "production".

ESLint Configuration (.eslintrc.json)
json
Copy code
{
  "env": { "browser": true, "es2021": true },
  "extends": "eslint:recommended",
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
  }
}
Lints code for browser environment using ES2021 standards.

Requires semicolons and double quotes.

Prettier Configuration
Prettier formatting is applied via the format script:

bash
Copy code
npm run format
Automatically fixes indentation, quotes, and spacing.


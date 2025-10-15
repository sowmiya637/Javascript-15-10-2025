# Calculator Testing Project

## Overview

This project demonstrates **unit testing in JavaScript** using **Mocha** and **Chai**.  
Unit testing ensures that individual parts of your code (functions, modules) work as expected.

We also include a small **Media API snippet** to demonstrate accessing the webcam, but the main focus is on testing the calculator module.

---



## Project Concepts

### 1️⃣ Unit Testing

- **Unit testing** checks individual functions or modules.  
- Helps catch bugs early.  
- In this project, we test a **calculator module** (add, subtract, multiply, divide).

### 2️⃣ Mocha

- Mocha is a **JavaScript testing framework**.  
- Provides structure for writing tests using `describe()` and `it()` blocks.  
- Handles running tests, reporting results, and supporting async tests.

### 3️⃣ Chai

- Chai is an **assertion library** that works with Mocha.  
- Allows you to write readable assertions using styles like `expect`, `should`, or `assert`.  
- Example:
  ```js
  expect(calculator.add(5, 3)).to.equal(8);
  4️⃣ Media API (Bonus)

navigator.mediaDevices.getUserMedia() allows access to camera or microphone.

Example snippet:

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    const video = document.createElement("video");
    video.srcObject = stream;
    video.autoplay = true;
    document.body.appendChild(video);
  })
  .catch(err => console.error(err));


Opens webcam and shows live video feed on the page.

Setup Instructions

Make sure Node.js is installed on your system.

Clone or download the project.

Navigate to the project folder in terminal/command prompt.

Install dependencies:

npm install


The dependencies installed are:

mocha → testing framework

chai → assertion library

Calculator Module

File: calculator.js

Functions included:

add(a, b) → returns sum

subtract(a, b) → returns difference

multiply(a, b) → returns product

divide(a, b) → returns quotient (throws error if dividing by zero)

Writing Tests

Test file: test/calculator.test.js

Structure:

describe('Calculator Tests', function() {
  it('should add two numbers correctly', function() {
    expect(calculator.add(5, 3)).to.equal(8);
  });
  ...
});


describe() → groups related tests

it() → individual test case

expect() → assertion style provided by Chai

Running Tests

Run the tests using the script in package.json:

npm test


Output will show each test and whether it passed or failed.

Example:

  Calculator Tests
    ✓ should add two numbers correctly
    ✓ should subtract two numbers correctly
    ✓ should multiply two numbers correctly
    ✓ should divide two numbers correctly
    ✓ should throw error when dividing by zero

Media API Example

Open index.html in a browser (or your own HTML file)

Include this snippet:

<div id="camera"></div>
<script>
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      const video = document.createElement("video");
      video.srcObject = stream;
      video.autoplay = true;
      document.getElementById("camera").appendChild(video);
    })
    .catch(err => console.error(err));
</script>


Effect: Webcam feed appears in the <div id="camera">.

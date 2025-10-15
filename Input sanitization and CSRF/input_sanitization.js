// input_sanitization.js
const express = require('express');
const bodyParser = require('body-parser');
const validator = require('validator');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Home page with input form
app.get('/', (req, res) => {
  res.send(`
    <h2>Input Sanitization Demo</h2>
    <form method="POST" action="/submit">
      Enter your name: <input name="name" placeholder="Type here"><br><br>
      <button>Submit</button>
    </form>
  `);
});

// Form submit handler
app.post('/submit', (req, res) => {
  const rawInput = req.body.name || "";

  //  Validate input: cannot be empty
  if (validator.isEmpty(rawInput.trim())) {
    return res.status(400).send('Name is required!');
  }

  //  Sanitize input: escape HTML special chars
  const safeInput = validator.escape(rawInput);

  //  Optional: allow only letters, numbers, space
  const finalInput = safeInput.replace(/[^a-zA-Z0-9 ]/g, "");

  //  Display sanitized input
  res.send(`Hello, ${finalInput}! Your input is safe to display.`);
});

// Start server
app.listen(3000, () => console.log('Server running: http://localhost:3000/'));

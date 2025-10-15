const express = require('express');
const path = require('path');
const app = express();

//  Serve static files (like allowed.js)
app.use(express.static(__dirname));

//  Add CSP header to all responses
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' https://trusted.cdn.com"
  );
  next();
});

//  Home page route
app.get('/', (req, res) => {
  res.send(`
    <h2>CSP Demo Page</h2>

    <!--  External allowed script -->
    <script src="/allowed.js"></script>

    <!--  Blocked inline script -->
    <script>
      alert('Inline script blocked by CSP');
    </script>

    <!--  Blocked external untrusted script -->
    <script src="https://evil.com/hack.js"></script>
  `);
});

//  Start server
app.listen(3001, () => console.log('CSP Server running: http://localhost:3001'));

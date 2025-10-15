// server.js (minimal)
const express = require('express');  //require('express') loads the Express module
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieSession({
  name: 'sess', //in browser cookie name is sess
  keys: ['change_this_to_a_real_secret'], //cookie encrypt key
  maxAge: 24 * 60 * 60 * 1000 //cookie expire time 24 hrs
}));

function newToken() { //create custom function
  return crypto.randomBytes(16).toString('hex');//(128 bits) random data generate,convert hexadecimal string format.
}

// Simulated "login" that sets a session and CSRF token
app.get('/login', (req, res) => {
  req.session.user = { id: 1, name: 'Alice' };
  req.session.csrf = newToken(); //call newToken func,random CSRF token generate
  res.send('Logged in. Go to <a href="/transfer-form">transfer form</a>'); //send mag and link to browser
});

// Form page with hidden token
app.get('/transfer-form', (req, res) => {
  if (!req.session.user) return res.status(401).send('Please login first');
  // ensure token exists
  if (!req.session.csrf) req.session.csrf = newToken();
  const token = req.session.csrf;
  res.send(`
    <h3>Transfer money (user: ${req.session.user.name})</h3>
    <form method="POST" action="/transfer"> //if we submit the form POST req to server
      To: <input name="to" value="bob@example.com"><br>
      Amount: <input name="amount" value="100"><br>
      <input type="hidden" name="csrfToken" value="${token}">
      <button type="submit">Send</button>
    </form>
  `);
});

// Endpoint that checks token
app.post('/transfer', (req, res) => {
  if (!req.session.user) return res.status(401).send('Not logged in');
  const submitted = req.body.csrfToken;
  const stored = req.session.csrf;
  if (!submitted || !stored || submitted !== stored) {
    return res.status(403).send('CSRF check failed');
  }
  // success (demo only)
  res.send(`Transferred ${req.body.amount} to ${req.body.to}`);
});

app.get('/logout', (req, res) => {
  req.session = null;
  res.send('Logged out');
});

app.listen(3000, () => console.log('Running: http://localhost:3000')); //server run in port 3000

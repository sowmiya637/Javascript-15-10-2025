# CSP Demo

A small Express.js demo showing how to add a **Content Security Policy (CSP)** header and how it affects scripts on a page.  
The demo serves a simple HTML response that includes:

- an allowed external script (`/allowed.js`) — served from the same origin  
- an inline script (blocked by CSP)  
- an untrusted external script (`https://evil.com/hack.js`) (blocked by CSP)

This repository is a minimal playground to explore CSP behavior in the browser.

---

## What this demo shows

- How to set a `Content-Security-Policy` HTTP response header in Express.  
- How CSP blocks inline scripts and disallows untrusted external script sources by default.  
- How to allow scripts only from the same origin (`'self'`) and a trusted CDN (`https://trusted.cdn.com`) while blocking other sources.

---

**Key snippets**

- `server.js` — sets CSP header and serves HTML:

```js
res.setHeader(
  'Content-Security-Policy',
  "default-src 'self'; script-src 'self' https://trusted.cdn.com"
);
allowed.js — a simple script served from the same origin:

js
Copy code
console.log("This script is allowed!");
alert("External allowed script ran!");
How CSP is configured here
The server adds this CSP header to every response:

pgsql
Copy code
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.cdn.com
Meaning:

default-src 'self' — by default allow resources (like images, styles, frames) only from the same origin.

script-src 'self' https://trusted.cdn.com — allow scripts to be loaded only from the same origin and https://trusted.cdn.com. Inline scripts and other external script hosts are blocked.

In the demo page we include 3 scripts:

<script src="/allowed.js"></script> — allowed ('self').

Inline <script> alert('Inline script blocked by CSP'); </script> — blocked by CSP (inline scripts are not allowed).

<script src="https://evil.com/hack.js"></script> — blocked because evil.com is not in the allowed script-src list.

When blocked, the browser will refuse to execute the blocked script and typically log CSP violation messages in the DevTools console.

How to run
Install dependencies

bash
Copy code
npm install
Start the server

bash
Copy code
node server.js
Open your browser and visit:

arduino
Copy code
http://localhost:3001
Open the browser DevTools Console to observe logs and CSP violation messages.

Expected behavior / Testing
On page load:

allowed.js will run: you should see a console log and an alert from allowed.js.

The inline script will not run (no alert), and the browser console will report a CSP violation for inline script blocked.

The external https://evil.com/hack.js will not load — the browser console will report a CSP violation for blocked external script.

Example DevTools console messages you may see (wording varies across browsers):

Refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'self' https://trusted.cdn.com".

Refused to load the script 'https://evil.com/hack.js' because it violates the following Content Security Policy directive: "script-src 'self' https://trusted.cdn.com".

Security notes & recommendations
CSP is a defense-in-depth control: It reduces the impact of XSS vulnerabilities but does not replace secure coding practices (input validation, output encoding, etc.).

Avoid 'unsafe-inline' unless absolutely necessary — allowing inline scripts weakens CSP. Use nonces or hashes if you must allow specific inline scripts.

Use strict source lists (only trusted domains) and prefer 'self' where possible.

Consider reporting by adding a report-uri / report-to directive to collect CSP violation reports for monitoring.

Test across browsers — CSP behavior and reporting may differ slightly by browser and version.

Troubleshooting
If allowed.js does not run:

Ensure server.js is serving static files from the directory that contains allowed.js. The demo uses app.use(express.static(__dirname)); so allowed.js must be in the same folder as server.js.

Check browser DevTools Console for CSP violation messages or 404 errors.

If you see the inline alert fire:

Confirm the Content-Security-Policy header is present in the response (check Network tab → response headers). If missing, ensure the header-setting middleware runs before res.send().

package.json
Example package.json included in the repo:

json
Copy code
{
  "name": "csp-demo",
  "version": "1.0.0",
  "main": "allowed.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "license": "ISC",
  "dependencies": {
    "express": "^5.1.0"
  }
}
Install dependencies via:

bash
Copy code
npm install


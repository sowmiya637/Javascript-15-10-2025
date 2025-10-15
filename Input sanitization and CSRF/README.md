# Input Sanitization & CSRF Demo

This project demonstrates **input sanitization** and **CSRF protection** in a Node.js + Express web application.  
It includes two small demos:

1. **Input sanitization**: Ensures user input is safe before rendering in HTML.
2. **CSRF protection**: Shows how to use session-based CSRF tokens to prevent cross-site request forgery.

---


## Features

- **Input Validation & Sanitization**  
  - Checks for empty input  
  - Escapes HTML special characters  
  - Allows only letters, numbers, and spaces  

- **CSRF Protection**  
  - Uses session-based hidden tokens  
  - Validates token on form submission  
  - Prevents unauthorized requests from external sites

- **Session Management**  
  - Simple session implementation using `cookie-session`  
  - Session lifetime configurable (24 hours in this demo)

---

---

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>
Install dependencies:

bash
Copy code
npm install express body-parser validator cookie-session
Usage
Input Sanitization Demo
Run the demo:

bash
Copy code
node input_sanitization.js
Open a browser and navigate to: http://localhost:3000

Enter your name in the form and click Submit.

Invalid input (empty or invalid characters) will be rejected.

The sanitized input will be displayed safely on the page.

CSRF Protection Demo
Run the server:

bash
Copy code
node server.js
Open a browser and navigate to: http://localhost:3000/login

Steps:

Log in as a demo user (Alice)

Go to the transfer form link

Enter transfer details (recipient and amount)

Submit the form

The server checks the CSRF token:

If the token is missing or invalid, the request is rejected.

If the token matches the session token, the transfer is allowed (demo only).

Log out via http://localhost:3000/logout

Input Sanitization Demo
File: input_sanitization.js

Uses validator to sanitize and escape input:

javascript
Copy code
const safeInput = validator.escape(rawInput); // escape HTML chars
const finalInput = safeInput.replace(/[^a-zA-Z0-9 ]/g, ""); // allow only letters, numbers, space
Prevents XSS and unsafe characters from being rendered in HTML.

Ensures non-empty input with:

javascript
Copy code
if (validator.isEmpty(rawInput.trim())) {
  return res.status(400).send('Name is required!');
}
CSRF Protection Demo
File: server.js

Uses cookie-session to store session and CSRF token.

Generates random CSRF token:

javascript
Copy code
function newToken() {
  return crypto.randomBytes(16).toString('hex');
}
Injects hidden CSRF token in form:

html
Copy code
<input type="hidden" name="csrfToken" value="${token}">
Validates token on submission:

javascript
Copy code
if (!submitted || !stored || submitted !== stored) {
  return res.status(403).send('CSRF check failed');
}
Ensures only authorized requests from the logged-in user succeed.

Security Concepts
Input Validation: Ensures user input is in the expected format.

Sanitization / Escaping: Converts special characters to safe HTML entities to prevent XSS.

CSRF (Cross-Site Request Forgery): Attack where a malicious site sends unauthorized requests to a logged-in user’s account.

Session Management: Keeps track of user sessions with secure cookies.

Hidden CSRF Token: A unique token stored in the session and verified on form submission to protect against CSRF.

Dependencies
express – Web framework

body-parser – Parse form input

validator – Input validation and sanitization

cookie-session – Session handling

crypto – Node.js built-in module for generating secure tokens


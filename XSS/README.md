# XSS — Safe Demo

> This README explains the concepts behind the supplied **Safe XSS demo** HTML file, why it is safe, how the escaping works, alternative/complimentary defenses, testing tips, and practical recommendations for real applications.

---


## What is XSS?

**Cross-Site Scripting (XSS)** is a class of web application vulnerability where an attacker is able to inject and execute malicious scripts (usually JavaScript) in the context of another user's browser. When successful, XSS can be used to:

- Steal cookies or tokens
- Perform actions on behalf of the user (CSRF-like behavior)
- Keylog user input or capture form data
- Display phishing prompts inside the site
- Implant persistent backdoors (stored XSS)

XSS is one of the most common web vulnerabilities and is listed in OWASP Top 10.

---

## Types of XSS

- **Stored (persistent) XSS**: Malicious script is stored on the server (database, comment, profile) and served to users.  
- **Reflected (non-persistent) XSS**: Payload is reflected in the response (e.g., search parameter) and executed immediately.  
- **DOM-based XSS**: Vulnerability exists in client-side JavaScript that interprets unsanitized input and writes it to the DOM in an unsafe way.

The demo file is focused on preventing **DOM-based XSS** from user-provided input.

---

## The demo: purpose & behavior

This demo shows a small commenting UI where a user types a comment, clicks **Add Comment**, and the comment appears in the page. The demo intentionally **escapes** user input before inserting it into the DOM so that input is displayed as plain text and **never executed** as HTML/JS.

**Key idea:** transform user-provided strings into safe HTML entities (escape special characters) and then place the escaped string into HTML. This prevents an attacker from injecting `<script>`, `onerror` handlers, or other executable constructs.

---

## How the demo prevents XSS — line-by-line explanation

```html
<input id="commentInput" placeholder="Type comment" style="width:80%">
<button id="addBtn">Add Comment</button>

<div id="comments" style="margin-top:16px; border-top:1px solid #ccc; padding-top:8px"></div>

<script>
  function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  const input = document.getElementById('commentInput');
  const addBtn = document.getElementById('addBtn');
  const comments = document.getElementById('comments');

  addBtn.addEventListener('click', () => {
    const safe = escapeHtml(input.value);            // sanitize user input
    const html = '<div class="comment">User: ' + safe + '</div>';
    comments.insertAdjacentHTML('afterbegin', html);
    input.value = '';
  });
</script>

# Keeplink

Keeplink is a lightweight client-side web application for saving and managing personal bookmarks directly in the browser. It emphasizes clarity, accessibility, and durable state management using vanilla JavaScript and localStorage, without any external frameworks or dependencies.

---

## Features

- Add bookmarks with a custom name and URL
- Inline validation to ensure proper URLs and prevent duplicates
- Persistent storage using browser localStorage
- Dynamically rendered bookmark list with individual remove buttons
- Keyboard-friendly navigation and visible focus states
- Non-blocking inline feedback for success and error messages
- Empty-state handling for first-time users

---

## Accessibility

Accessibility was considered from the start. Key measures include:

- Semantic HTML structure for screen reader compatibility
- Properly associated `<label>` elements for all inputs
- Full keyboard navigability for form controls, links, and buttons
- Visible focus outlines for buttons and links using `:focus-visible`
- Inline feedback messages announced via `aria-live`
- Contextual `aria-label` attributes for dynamically generated remove buttons

The goal was to implement accessibility fundamentals correctly without overengineering, appropriate for a small client-side application.

---

## Tech Stack

- HTML5 (semantic markup)
- CSS3 (modern layout and styling)
- JavaScript (ES6+, no frameworks)
- Browser localStorage API

---

## Project Goals

Keeplink demonstrates:

- Clean, maintainable front-end architecture
- Proper handling of user input and dynamic DOM updates
- Accessibility-aware UI/UX decisions
- A professional, production-ready approach to small-scale client-side apps

It intentionally avoids frameworks to showcase fundamental skills and strong judgment in tool selection.

---

## How It Works

1. Enter a bookmark name and URL in the form
2. Input is validated (non-empty, valid URL, no duplicates)
3. Bookmark is saved to localStorage and displayed in the list
4. Remove bookmarks individually, updating the list and storage
5. Empty state message appears if no bookmarks exist

---

## Setup

Keeplink requires no build tools or dependencies.  

To use locally:

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/keeplink.git

## Author

Gene Howell
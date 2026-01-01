/*
  Project: Keeplink
  File: script.js
  Description: Manages application logic including form handling,
               input validation, DOM rendering, and localStorage persistence.
  Responsibilities:
  - Validate user input
  - Persist bookmark data across sessions
  - Render and remove bookmarks dynamically
  - Provide inline user feedback
  Author: Gene Howell
  Created: December, 2025
*/

// Cache DOM elements for reuse and clarity
const form = document.getElementById('bookmark-form');
const nameInput = document.getElementById('bookmark-name');
const urlInput = document.getElementById('bookmark-url');
const list = document.getElementById('bookmark-list');
const feedback = document.getElementById('feedback');
const emptyState = document.getElementById('empty-state');

// Initialize application state on page load
document.addEventListener('DOMContentLoaded', renderBookmarks);

// Handle form submission for adding new bookmarks
form.addEventListener('submit', handleSubmit);

/* ---------- Submit ---------- */

/**
 * Handles bookmark submission, validation, and persistence
 */
function handleSubmit(e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  let url = urlInput.value.trim();

  clearFeedback();

  if (!name || !url) {
    return showError('Both fields are required.');
  }

  if (!url.startsWith('http')) {
    url = `https://${url}`;
  }

  if (!isValidUrl(url)) {
    return showError('Please enter a valid URL.');
  }

  if (isDuplicate(name, url)) {
    return showError('This bookmark already exists.');
  }

  const bookmark = { name, url };

  saveBookmark(bookmark);
  addBookmarkToDOM(bookmark);

  nameInput.value = '';
  urlInput.value = '';

  showSuccess('Bookmark added.');
  toggleEmptyState();
}

/* ---------- Validation ---------- */

/**
 * Validates URL structure using the URL constructor
 */
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks localStorage for existing bookmark duplicates
 */
function isDuplicate(name, url) {
  return getBookmarks().some(
    (b) => b.name === name && b.url === url
  );
}

/* ---------- Storage ---------- */

/**
 * Retrieves bookmarks from localStorage
 */
function getBookmarks() {
  return JSON.parse(localStorage.getItem('bookmarks')) || [];
}

/**
 * Persists a new bookmark to localStorage
 */
function saveBookmark(bookmark) {
  const bookmarks = getBookmarks();
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

/**
 * Removes a bookmark from localStorage
 */
function removeBookmark(name, url) {
  const updated = getBookmarks().filter(
    (b) => b.name !== name || b.url !== url
  );
  localStorage.setItem('bookmarks', JSON.stringify(updated));
}

/* ---------- Rendering ---------- */

/**
 * Renders all stored bookmarks to the DOM
 */
function renderBookmarks() {
  getBookmarks().forEach(addBookmarkToDOM);
  toggleEmptyState();
}

/**
 * Creates and inserts a single bookmark row into the DOM
 */
function addBookmarkToDOM({ name, url }) {
  const li = document.createElement('li');
  li.className = 'bookmark-item';

  const link = document.createElement('a');
  link.href = url;
  link.textContent = name;
  link.className = 'bookmark-name';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.className = 'remove-btn';

  removeBtn.setAttribute(
    'aria-label',
    `Remove bookmark ${name}`
  );

  removeBtn.addEventListener('click', () => {
    li.remove();
    removeBookmark(name, url);
    toggleEmptyState();
  });

  li.append(link, removeBtn);
  list.appendChild(li);
}

/**
 * Toggles empty-state visibility based on bookmark count
 */
function toggleEmptyState() {
  emptyState.style.display = list.children.length ? 'none' : 'block';
}

/* ---------- Feedback ---------- */

/**
 * Displays inline error feedback to the user
 */
function showError(message) {
  feedback.textContent = message;
  feedback.className = 'error';
}

/**
 * Displays inline success feedback to the user
 */
function showSuccess(message) {
  feedback.textContent = message;
  feedback.className = 'success';
}

/**
 * Clears any existing feedback messages
 */
function clearFeedback() {
  feedback.textContent = '';
  feedback.className = '';
}
# BracketBase Tournament Website

A browser-based tournament organizer that works without a backend.

## What it does

- create and update a tournament
- add players with contact details
- import players from Excel CSV
- keep a simple knockout ranking view
- post organizer announcements
- keep data in browser storage so it survives refreshes

## Files

- `index.html` - app layout
- `styles.css` - responsive styling
- `script.js` - app logic and local storage persistence

## Open locally

Open `index.html` directly in your browser.

## Publish on GitHub Pages

This app can be hosted directly on GitHub Pages because it uses plain `HTML`, `CSS`, and `JavaScript`.

Files needed:

- `index.html`
- `styles.css`
- `script.js`
- `.nojekyll`

Steps:

1. Create a new GitHub repository.
2. Upload these files to the root of the repository.
3. On GitHub, open `Settings` -> `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Select your branch, usually `main`.
6. Select the folder `/ (root)`.
7. Save.
8. Wait for GitHub Pages to publish the site.

Your site URL will usually be:

- `https://<your-github-username>.github.io/<repository-name>/`

Important:

- The app stores tournament data in browser `localStorage`.
- That means the website code is online, but the data is still separate on each device/browser.
- If you need the same tournaments on tablet and PC, the next step is adding an online database such as `Supabase`.

## Storage

This version stores all data in your browser using `localStorage`.

## Import format

The spreadsheet import expects a header row with:

- `player` or `name`
- optional `contact`

It also supports your current Google Form CSV headers directly, including:

- `Name of the Player (IN CAPITALS) :`
- `Phone Number :`
- `Player Registration Number :`
- `AADHAR Number :`
- `Name of the Organization / Institution :`
- `Category :`

## Identity logic

- `Name` is for display only
- a player is uniquely identified by `Registration Number` or `AADHAR Number`
- `Organization / Institution` is kept for ballot preparation
- `Category` is kept to separate event entries
- duplicate detection uses `Registration Number or AADHAR + Organization + Category`

## Good next upgrades

- add real user login
- sync data to a database
- generate knockout brackets automatically
- add printable fixtures and score sheets

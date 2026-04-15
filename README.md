# BracketBase Tournament Website

A browser-based tournament organizer with Supabase as the primary app database.

## What it does

- create and update a tournament
- add players with contact details
- import players from Excel CSV
- keep a simple knockout ranking view
- post organizer announcements
- store all app state in Supabase
- export and import manual JSON backups

## Files

- `index.html` - app layout
- `styles.css` - responsive styling
- `script.js` - app logic, Supabase persistence, and backup import/export
- `supabase-schema.sql` - table and RLS setup for Supabase

## Open locally

Open `index.html` directly in your browser, or serve the folder with a small local web server.

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

## Storage

This version stores tournaments, menus, brackets, ballot data, bracket progress, and related app state in Supabase.

The browser no longer acts as the database. `Export Backup` and `Import Backup` are manual JSON tools for portability and recovery.

If older tournament data still exists in the browser from a previous localStorage version, the app can migrate it once into Supabase and then clears the old browser copy.

## Supabase setup

1. Open your Supabase project SQL editor.
2. Run `supabase-schema.sql`.
3. Keep the app served from this folder so the bundled Supabase URL and publishable key in `script.js` can connect.

The app now uses split Supabase tables:

- `public.app_runtime_state` for the current working draft and menu selections
- `public.tournaments` for saved tournaments
- `public.tournament_players` for players mapped to each tournament
- `public.tournament_matches` for saved match rows
- `public.tournament_announcements` for saved announcements

`public.app_state` remains only as a legacy migration source for older single-row installs.

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
- split the single JSON payload into tournament, player, and bracket tables
- generate knockout brackets automatically
- add printable fixtures and score sheets

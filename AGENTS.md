# Harford Web Guidance

This is a static GitHub Pages site. Keep all paths relative and do not add a build step.

## Content sources

- Organizations: `js/organizations.js`
- Contacts: `js/contacts.js`
- Places: `js/places.js`
- Company characters: `js/characters.js`

## Verification

- Run `node --check` on changed JavaScript files.
- Verify Intelligence dossiers for organization, contact, and place routes when changing `js/intelligence.js` or `css/styles.css`.
- Keep `harford-v13.zip` in sync when publishing a new static-site version.

## Deployment

The `main` branch deploys through GitHub Pages. Do not add absolute paths or server-only dependencies.

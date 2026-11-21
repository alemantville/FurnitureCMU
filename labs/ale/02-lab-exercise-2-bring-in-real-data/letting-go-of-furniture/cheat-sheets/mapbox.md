# Mapbox · map, addresses and drive time · for Letting go of furniture

An optional upgrade over the free OpenStreetMap services. Needs a free Mapbox account and a **public** access token (starts with `pk.`).

## Add your key

1. Get a token at https://account.mapbox.com/access-tokens/ (the default public token is fine).
2. In `letting-go/`, open `config.js` (if it's missing, copy `config.example.js` to `config.js`).
3. Paste the token: `MAPBOX_TOKEN: "pk.…"`, save, and reload the page.

`config.js` is git-ignored, so the token stays on your machine. Never paste a secret token (`sk.…`): the page refuses to use one.

## What Mapbox does on this page

| Box | Without a token | With a token |
|---|---|---|
| The map | OpenStreetMap tiles (Leaflet) | The team's Mapbox Studio style (`MAPBOX_STYLE` in `index.html`) |
| Address → area | Nominatim | Mapbox Geocoding v6 (falls back to Nominatim if Mapbox fails) |
| "How far is it?" | Straight-line guess | Real driving distance and time (Mapbox Directions) |
| Shops & pickup points | Photon | Photon (unchanged) |

**Good to know:**
- The free tier is generous (100,000 geocoding and directions requests a month, 50,000 map loads).
- Before sharing the page publicly, add a URL restriction to the token in your Mapbox account.
- Show "© Mapbox © OpenStreetMap contributors" near the map; the page already does.
- The map uses the custom style `mapbox://styles/alexandra-morodo/cmwqdit1i00ef01s60vqig4c6`. A token from another Mapbox account only sees it if the style is made public in Mapbox Studio; otherwise the map stays blank (the area lookup still works).

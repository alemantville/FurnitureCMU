# Ale's labs

Work from the class build labs. Each folder is one lab.

| Lab | Folder | The rule | Notes |
| --- | --- | --- | --- |
| 01 · Ideate on a rule | `01-lab-exercise-1-ideate-on-a-rule/letting-go-of-furniture/` | A fair asking price (`letting_go_price.py`) | Unchanged class file, 6/6 expectations hold |
| 02 · Bring in real data | `02-lab-exercise-2-bring-in-real-data/letting-go-of-furniture/` | A listing shows the area, never the street (`letting-go/index.html`) | Map, address → area and drive time from Mapbox when a key is in `letting-go/config.js`; falls back to free OpenStreetMap services without one. Setup: `cheat-sheets/mapbox.md` |

## Idea log

One line per idea: idea → what changed → keep or drop.

- Lab 02: use Mapbox with our own map style for the map, the area and real drive times → Mapbox Studio style, Geocoding v6 and Directions, with OpenStreetMap as the fallback → keep or drop?
- Lab 02: fix "Shops & pickup points" after Photon changed its API → asks with `include=osm.…` and reads `osm_key`/`osm_value` → keep or drop?

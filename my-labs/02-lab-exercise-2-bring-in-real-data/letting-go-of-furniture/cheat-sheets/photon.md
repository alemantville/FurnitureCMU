# Photon · places near a point · for Letting go of furniture

Finds places near a point on the map. Free, run by Komoot, built on OpenStreetMap, no account or key. We use it for shops, pickup points, cafés and parking.

**Try it:** this link looks for cafés and parking near Arroios in Lisbon.

```
https://photon.komoot.io/api/?limit=20&lat=38.73&lon=-9.14&include=osm.amenity.cafe,osm.amenity.parking
```

## What you get, and why a buyer might care

| Data | Example | For Letting go of furniture |
|---|---|---|
| Place name | Anjos | "Anjos · Café" |
| Kind of place | Café, parking, post office, hardware shop | Buyers know where to get tape, send a parcel, or park a van |
| Its point on the map | 38.73, -9.13 | Used to work out the walk time |

**Good to know:**
- Ask for the kinds you want (`include=osm.amenity.cafe,osm.shop.hardware`, comma = any of them; Photon now refuses a search with neither `q` nor `include`) so you get cafés or parking, not everything.
- It returns places in a wide area, so keep only the ones within about 1600 m (a 20 minute walk) and show the nearest few.
- Walk time here is a straight-line guess at about 80 m a minute, not a real route.
- Show "© OpenStreetMap contributors" near the result.

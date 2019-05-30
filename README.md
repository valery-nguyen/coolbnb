# [CoolBnb]

CoolBnb, an Airbnb.com clone, is an application giving users the possibility to search and book lodging, filtered by location, dates, type, and price.

![screenshot](https://user-images.githubusercontent.com/13773733/58668588-5c6a7080-8307-11e9-92ca-e40c50a52c93.jpg)

## Getting Started

Check out the [wiki] for development details!

## Installation

```
git clone https://github.com/valery-nguyen/coolbnb.git
cd coolbnb
npm install
cd frontend
npm install
```

## Run

* Set up the mongoURI and secretOrKey

```
// config/keys_dev.js

module.exports = {
  mongoURI: 'mongodb+srv://...',
  secretOrKey: '...',
};
```

* Start the server and client concurrently

```
npm run dev
```

## Deployment

* Hosted on [Heroku](https://www.heroku.com/)

## Built With

* [MongoDB](https://www.mongodb.com/)
* [Express.js](https://expressjs.com/)
* [React.js](https://reactjs.org)
* [Redux.js](https://redux.js.org)
* [Node.js](https://nodejs.org/)

## Technical Implementation Details

* Implementation of the travel site back-end, allowing users to filter available lodging options based on map location, dates, occupancy, and price, by utilizing mongoose models and executing queries.

```js
// routes/api/spots.js

// Find all available rental spots filtered by longitude & latitude coordinates, 
// maximum occupancy, and price
Spot.find({ 
  lng: { $gte: sw_lng, $lte: ne_lng},
  lat: { $gte: sw_lat, $lte: ne_lat},
  occupancy: { $gte: guestCount }, 
  price: { $lte: priceRange.maxValue, $gt: priceRange.minValue} })
.populate('images')
.then(spots => {
  spotHash = {};
  const allSpotsIds = spots.map(el => String(el._id));

  // Find potential bookings conflicting with the requested check-in / checkout-out dates 
  Booking.find({ spot_id: { $in: allSpotsIds },
    start_date: { $lt: endDate },
    end_date: { $gt: startDate }})
  .then(conflictingBookings => {
    const conflictingSpotsIds = conflictingBookings.map(el => el.spot_id);
    const availableSpotsIds = allSpotsIds.filter(el => !conflictingSpotsIds.includes(el));

    spots.forEach(spot => {
      if (availableSpotsIds.includes(String(spot._id))) {
        spotHash[spot._id] = spot;
      }
    });
    return res.json(spotHash);
  })
    .catch((err) => { console.log(err); });
  }
)
.catch(err => res.status(404).json({ nospotfound: 'No Spot found' }));
```

* Redesign of the marker manager to store and display markers located within map boundaries provided by Google Maps JavaScript API, as well as seamlessly update the markers as the map is moved.

**Creating markers**:

```js
// frontend/src/util/marker_manager.js

export default class MarkerManager {
  constructor(map) {
    this.markers = {};
    ...
  }

  ...
}
```

```js
// frontend/src/util/marker_manager.js

const marker = new google.maps.Marker({
  position,
  map: this.map,
  label: {
    text: `$${spot.price}`,
    fontSize: "9px",
    fontWeight: "bold",
    color: 'white'
  },
  spotId: spot._id
});

// store in the MarkerManager instance
this.markers[marker.spotId] = marker;
```

**Updating markers**:
```js
// frontend/src/util/marker_manager.js

updateMarkers(spots) {
  const spotsObj = {};
  spots.forEach(spot => spotsObj[spot._id] = spot);

  Object.keys(this.markers)
    .filter(spotId => !spotsObj[spotId])
    .forEach((spotId) => this.removeMarker(this.markers[spotId]));

  spots
    .filter(spot => !this.markers[spot._id])
    .forEach(newSpot => this.createMarkerFromSpot(newSpot));
}
```


**Removing markers**:
```js
 // frontend/src/util/marker_manager.js

removeMarker(marker) {
  this.markers[marker.spotId].setMap(null);
  delete this.markers[marker.spotId];
}
```


## Authors

* **Valery Nguyen**

## Acknowledgments

* The starter group project can be found [here](https://aetherbnb.herokuapp.com) ([repository](https://github.com/valery-nguyen/AetherBnb)), which was developed in collaboration with 
Shannon Piesinger, Colin Reitman, and Trevor Steer.

[//]: # (reference links are listed below)
[CoolBnb]: <https://coolbnb.herokuapp.com/>
[wiki]: <https://github.com/valery-nguyen/coolbnb/wiki/>

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

## Authors

* **Valery Nguyen**

## Acknowledgments

* The starter group project can be found [here](https://aetherbnb.herokuapp.com) ([repository](https://github.com/valery-nguyen/AetherBnb)), which was developed in collaboration with 
Shannon Piesinger, Colin Reitman, and Trevor Steer.

[//]: # (reference links are listed below)
[CoolBnb]: <https://coolbnb.herokuapp.com/>
[wiki]: <https://github.com/valery-nguyen/coolbnb/wiki/>

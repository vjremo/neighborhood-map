# My Neighborhood Map Project by Vijay for Udacity's Frontend-Nanodegree

## Table of contents

* [Overview](#overview)
* [Features added](#features-added)
* [Instructions](#instructions)
* [Available Scripts](#available-scripts)
* [Contents](#contents)
* [References](#references)

## Overview

This **My Neighborhood Map** project is developed with [Create React App](https://github.com/facebook/create-react-app), [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial) and [Google Maps React](https://www.npmjs.com/package/google-map-react).

## Features added

Per project [rubric](https://review.udacity.com/#!/rubrics/1351/view), added below features

1. Make the application easy to install and start
2. Application components render on-screen in a responsive manner and usable across devices.
3. Map displays all location markers by default and filtered subset when a filter is applied.
4. Include search/filter functionality to find and filter locations in list
5. When a map marked is clicked, it displays unique information about that location.

## Instructions

1. Download the application from this [link](https://github.com/vjremo/neighborhood-map/releases), extract it to local folder.
2. In the extracted folder, install app and start Node.js server to launch the app

**NOTE** npm makes it easy for JavaScript developers to share and reuse code, and makes it easy to update the code that you’re sharing, so you can build amazing things.
npm is distributed with Node.js- which means that when you download Node.js, you automatically get npm installed on your computer.
f you don't have npm installed, navigate to Node.js's [website](https://www.npmjs.com/get-npm) to download and install the software.

Follow steps below after installing npm:

* From Node.js command prompt, navigate to extracted folder 
* install all project dependencies with `npm install`
* start the server and launch app with `npm start`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

## Contents

```bash
├── README.md - This file.
├── package.json # npm package manager file.
├── public
│   ├── favicon.ico # React Icon
│   └── index.html #  Main HTML page rendered from React
└── src
    ├── App.css # Styles for app. 
    ├── App.js # This is the root of app.
    ├── App.test.js # Used for testing. Provided with Create React App. 
    ├── components
    │   ├── DisplayMap.js # Main component which displays map
    │   ├── DisplayListDrawer.js # Component for listing locations and providing ability to filter
    │   └── NoMapDisplay.js # Component for handling map render errors
    ├── data 
    │   ├── locations.json # Fixed set of locations for the app
    ├── index.css # Global styles. 
    └── index.js # Used for DOM rendering using 'react-router-dom'.
```

## References

* [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
* To learn React, check out the [React documentation](https://reactjs.org/).
* Node package manger [npm](https://www.npmjs.com/get-npm)
* [google-maps-react](https://www.npmjs.com/package/google-map-react)
* [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial)
* [Material-Core-UI](https://www.npmjs.com/package/@material-ui/core)
* [Material-Core-UI-Icons](https://www.npmjs.com/package/@material-ui/icons)
* Doug Brown's project tutorial [Link](https://www.youtube.com/watch?v=NVAVLCJwAAo&feature=youtu.be)
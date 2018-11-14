import React, { Component } from 'react';
import './App.css';
import locations from './data/locations.json'
import DisplayMap from './components/DisplayMap'
class App extends Component {

  state = {
  
      lat: 40.044774, 
      lon: -82.914436,
      zoom: 13,
      all : locations

  }

  render() {
    return (
      <div className="App">
        <div>
          <h1>Columbus, OH Restaurants</h1>
        </div>
        <DisplayMap
          lat={this.state.lat}
          lon={this.state.lon}
          zoom={this.state.zoom}
          locations={this.state.all}/>
      </div>
    );
  }

 
}

export default App;

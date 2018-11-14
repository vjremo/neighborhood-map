import React, { Component } from 'react';
import './App.css';
import locations from './data/locations.json'
import DisplayMap from './components/DisplayMap'
import DisplayListDrawer from './components/DisplayListDrawer'

class App extends Component {

  state = {
  
      lat: 40.031162, 
      lon: -82.912036,
      zoom: 17,
      all : locations,
      open: false

  }
  styles = {
    menuButton: {
      marginLeft: 10,
      marginRight: 20,
      position: "absolute",
      left: 10,
      top: 20,
      background: "black",
      padding: 10
    },
    hide: {
      display: 'none'
    },
    header: {
      marginTop: "0px"
    }
  };

  toggleDrawer = () => {
    // Toggle the value controlling whether the drawer is displayed
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    return (
      <div className="App">
        <div>
        <button onClick={this.toggleDrawer} style={this.styles.menuButton}>
            <i className="fas fa-bars"></i>
          </button>
          <h1>Columbus, OH Restaurants</h1>
        </div>
        <DisplayMap
          lat={this.state.lat}
          lon={this.state.lon}
          zoom={this.state.zoom}
          locations={this.state.all}/>
          <DisplayListDrawer
            locations={this.state.all}
            open={this.state.open}
            toggleDrawer={this.toggleDrawer}/>
      </div>
    );
  }

 
}

export default App;

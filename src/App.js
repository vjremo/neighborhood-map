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

  componentDidMount(){
    this.setState({
      ...this.state,
      filtered: this.filterLocations(this.state.all, "")
    });
  }
  toggleDrawer = () => {
    // Toggle the value controlling whether the drawer is displayed
    this.setState({
      open: !this.state.open
    });
  }

  updateQuery = (query) => {
    // Update the query value and filter the list of locations accordingly
    this.setState({
      ...this.state,
      selectedIndex: null,
      filtered: this.filterLocations(this.state.all, query)
    });
  }

  filterLocations = (locations, query) => {
    // Filter locations to match query string
    return locations.filter(location => location.name.toLowerCase().includes(query.toLowerCase()));
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
          locations={this.state.filtered}/>
          <DisplayListDrawer
            locations={this.state.filtered}
            open={this.state.open}
            toggleDrawer={this.toggleDrawer}
            filterLocations={this.updateQuery}/>
      </div>
    );
  }

 
}

export default App;

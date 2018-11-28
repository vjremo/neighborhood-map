import React, { Component } from 'react';
import './App.css';
import locations from './data/locations.json'
import DisplayMap from './components/DisplayMap'
import DisplayListDrawer from './components/DisplayListDrawer'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

class App extends Component {

  state = {
      lat: 40.031162, 
      lon: -82.912036,
      zoom: 17,
      all : locations,
      filtered: null,
      open: false
  }
  styles = {
    menuButton: {
      marginLeft: 10,
      marginRight: 20,
      position: "absolute",
      left: 10,
      top: 20,
      background: "white",
      padding: 10,
      color: 'black'
    },
    hide: {
      display: 'none'
    },
    header: {
      marginTop: "0px"
    }
  };

 

  componentDidMount= ()=>{
    this.setState({
      ...this.state,
      filtered: this.filterLocations(this.state.all, "")
    });
  }
  toggleListDrawer = () => {
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

  clickListItem = (index) => {
    // Set the state to reflect the selected location array index
    this.setState({ selectedIndex: index, open: !this.state.open })
  }

  render() {
    return (
      <div className="App">
        <div>
          <IconButton onClick={this.toggleListDrawer} style={this.styles.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <h1>Columbus, OH Restaurants on Stelzer Road</h1>
        </div>
        <DisplayMap
          lat={this.state.lat}
          lon={this.state.lon}
          zoom={this.state.zoom}
          locations={this.state.filtered}
          selectedIndex={this.state.selectedIndex}
          clickListItem={this.clickListItem}/>
          <DisplayListDrawer
            locations={this.state.filtered}
            open={this.state.open}
            toggleDrawer={this.toggleListDrawer}
            filterLocations={this.updateQuery}
            clickListItem={this.clickListItem}/>
      </div>
    );
  }

 
}

export default App;

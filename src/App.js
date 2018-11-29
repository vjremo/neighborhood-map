import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import './App.css'
import locations from './data/locations.json'
import DisplayMap from './components/DisplayMap'
import DisplayListDrawer from './components/DisplayListDrawer'

class App extends Component {

  state = {
      lat: 40.031162, 
      lng: -82.912036,
      zoomLevel: 17,
      all : locations,
      filteredList: null,
      open: false
  }
  styles = {
    menuButton: {
      marginLeft: 10,
      marginRight: 20,
      position: "absolute",
      left: 10,
      top: 10,
      padding: 10,
      color: 'white'
    },
    hide: {
      display: 'none'
    },
    header: {
      marginTop: "0px"
    }
  };

   /*Referred tutorial of Doug Brown for below sections 
    Link: https://www.youtube.com/watch?v=NVAVLCJwAAo& */ 
  componentDidMount= ()=>{
    this.setState({ ...this.state,
      filteredList: this.filterLocations(this.state.all, "")
    });
  }
  toggleListDrawer = () => {
    // Toggle the value controlling whether the drawer is displayed
    this.setState({ open: !this.state.open
    });
  }

  updateQuery = (query) => {
    // Update the query value and filter the list of locations accordingly
    this.setState({ ...this.state,
      selectedIndex: null,
      filteredList: this.filterLocations(this.state.all, query)
    });
  }

  filterLocations = (locations, query) => {
    // Filter locations as per query input
    return locations.filter(location => location.name.toLowerCase().includes(query.toLowerCase()));
  }

  clickListItem = (index) => {
    // Set the state to reflect the selected location array index
    this.setState({ selectedIndex: index, open: !this.state.open })
  }

  render() {
    return (
      <div className="App">
        <div className="page-title">
          <IconButton onClick={this.toggleListDrawer} style={this.styles.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <h1>Columbus, OH Restaurants <em>on Stelzer Road</em></h1>
        </div>
        <DisplayMap
          lat={this.state.lat}
          lng={this.state.lng}
          zoom={this.state.zoomLevel}
          locations={this.state.filteredList}
          selectedIndex={this.state.selectedIndex}
          clickListItem={this.clickListItem}/>
          <DisplayListDrawer
            locations={this.state.filteredList}
            open={this.state.open}
            toggleDrawer={this.toggleListDrawer}
            filterLocations={this.updateQuery}
            clickListItem={this.clickListItem}/>
      </div>
    );
  }

 
}

export default App;

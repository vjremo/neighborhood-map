import React, { Component } from 'react';
import '../App.css'
import Drawer from '@material-ui/core/Drawer';

class DisplayListDrawer extends Component {
    state = {
        open: false,
        query: ""
    }

     /*Referred tutorial of Doug Brown for below sections 
    Link: https://www.youtube.com/watch?v=NVAVLCJwAAo& */ 
    updateQuery = (event) => {
        // Save the new query string in state and pass the query string to filter location list
        this.setState({ query: event.target.value});
        this.props.filterLocations(event.target.value);
    }

    render = () => {
        return (
            <div>
                <Drawer open={this.props.open} onClose={this.props.toggleDrawer}>
                    <div className="list-drawer">
                        <input type="text"
                            className="filterInput"
                            value={this.state.query}
                            placeholder="Filter by Restaurant name"
                            name="filter"
                            onChange={this.updateQuery}
                            />
                        <ul className="filterList">
                            {this.props.locations && this.props.locations
                                .map((location, index) => {
                                    return (
                                        <li className="listItem" key={index}>
                                            <button className="listItemLink" key={index} onClick={e => this.props.clickListItem(index)}>{location.name}</button>
                                        </li>
                                    )
                                })}
                        </ul>
                    </div>
                </Drawer>
            </div>
        )
    }
}
/* For Migration to typography v2 
Reference - https://material-ui.com/style/typography/#migration-to-typography-v2 */
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

export default DisplayListDrawer;
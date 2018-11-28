import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';

class DisplayListDrawer extends Component {
    state = {
        open: false,
        query: ""
    }

    styles = {
        list: {
            width: "250px",
            padding: "0px 15px 0px"
        },
        noBullets: {
            listStyleType: "none",
            padding: 0
        },
        fullList: {
            width: 'auto'
        },
        listItem: {
            marginBottom: "15px"
        },
        listLink: {
            background: "transparent",
            border: "none",
            color: "black"
        },
        filterEntry: {
            border: "1px solid gray",
            padding: "3px",
            margin: "30px 0px 10px",
            width: "100%"
        }
    };

    updateQuery = (event) => {
        // Save the new query string in state and pass the query string to filter location list
        this.setState({ query: event.target.value});
        this.props.filterLocations(event.target.value);
    }

    render = () => {
        return (
            <div>
                <Drawer open={this.props.open} onClose={this.props.toggleDrawer}>
                    <div style={this.styles.list}>
                        <input type="text"
                            style={this.styles.filterEntry}
                            value={this.state.query}
                            placeholder="Filter by Restaurant name"
                            name="filter"
                            onChange={this.updateQuery}
                            />
                        <ul style={this.styles.noBullets}>
                            {this.props.locations && this
                                .props
                                .locations
                                .map((location, index) => {
                                    return (
                                        <li style={this.styles.listItem} key={index}>
                                            <button style={this.styles.listLink} key={index} onClick={e => this.props.clickListItem(index)}>{location.name}</button>
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

export default DisplayListDrawer;
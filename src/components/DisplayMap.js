import React, { Component } from 'react'
import { Map, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import NoMapDisplay from './NoMapDisplay';

const G_MAP_KEY = "AIzaSyAZUdiGhHDhXMKF5ZfKuF5vbFQI_sKpWVo"
const FS_CLIENT = "FTL0H0C5H4AYWYOD5XXZYCGUPTR5RJF0RUORJ1TEXCFR51DQ"
const FS_SECRET = "CCXOBE4TEGOIJC1L25MYRVVHI1AVG3ZMVDAW5JGKNOSOIH5A"
const FS_VERSION = "20181114"
const FS_API = "https://api.foursquare.com/v2/venues"
const FS_API_CLIENT_STR = `client_id=${FS_CLIENT}&client_secret=${FS_SECRET}&v=${FS_VERSION}`

class DisplayMap extends Component {
    state = {
        map: null,
        markers: [],
        markerProps: [],
        activeMarker: null,
        activeMarkerProps: null,
        showingInfoWindow: false
    }

    componentDidMount = () => {
    }

     /*Referred tutorial of Doug Brown for below sections 
    Link: https://www.youtube.com/watch?v=NVAVLCJwAAo& */ 

    componentWillReceiveProps = (props) => {

        const { markers, activeMarker, markerProps } = this.state

        //Update the markers as number of locations change
        if (markers.length !== props.locations.length) {
            this.closeInfoWindow();
            this.updateMapMarkers(props.locations);
            this.setState({ activeMarker: null });
            return;
        }

        // If selected item is not same as the active marker, then close quick info window
        if (!props.selectedIndex || (activeMarker &&
            (markers[props.selectedIndex] !== activeMarker))) {
            this.closeInfoWindow();
        }

        // Verify presence of selected index
        if (props.selectedIndex === null || typeof (props.selectedIndex) === "undefined") {
            return;
        };

        // Once an marker is clicked, fetch additional information and save in its props
        this.onMarkerClick(markerProps[props.selectedIndex], markers[props.selectedIndex]);
    }

    //Save map reference in state and prepare location markers on map
    renderMap = (props, map) => {    
        this.setState({ map });
        this.updateMapMarkers(this.props.locations)
    }

    closeInfoWindow = () => {
        //Display any active marker animation
        this.state.activeMarker && this.state.activeMarker.setAnimation(null);
        this.setState({ showingInfoWindow: false, activeMarker: null, activeMarkerProps: null })
    }

    //Upon clicking the marker, request additional information from FourSquare
    onMarkerClick = (props, marker) => {

        //As an marker is clicked, close other quick info window/s if open
        this.closeInfoWindow();

        /* Invoke FourSqaureAPI request to fetch location
        Note: To find exact location, limited search result count to 1*/
        let url = `${FS_API}/search?${FS_API_CLIENT_STR}&ll=${props.position.lat}, ${props.position.lng}&radius=2&limit=1`
        let headers = new Headers()
        let request = new Request(url, {
            method: 'GET',
            headers
        })

        //Create props for active marker, from FourSquareAPI response
        let activeMarkerProps;
        fetch(request)
            .then(response => response.json())
            .then(result => {
                //Get the restaurant reference we want from FourSquare
                let restaruant = this.getRestaruantInfo(props, result)
                activeMarkerProps = {
                    ...props,
                    fourSquare: restaruant[0]
                };
                //Get additional information of restaruant, if available on FourSquare
                if (activeMarkerProps.fourSquare) {
                     // Invoke FourSqaureAPI fetch to pictures of restaruant.
                    let url = `${FS_API}/${restaruant[0].id}/photos?${FS_API_CLIENT_STR}`
                    fetch(url)
                        .then(response => response.json())
                        .then(result => {
                            activeMarkerProps = {
                                ...activeMarkerProps,
                                //Store references of photos
                                images: (result.response && (result.response.photos || '')),
                                //Save category of restaruant
                                categories : (result.response && (restaruant[0].categories[0] || ''))
                            };
                            if (this.state.activeMarker)
                                this.state.activeMarker.setAnimation(null)
                            marker.setAnimation(this.props.google.maps.Animation.DROP)
                            this.setState({ showingInfoWindow: true, activeMarker: marker, activeMarkerProps })
                        })
                } 
            })
    }

    //Look for matching restaruant data in FourSquare
    getRestaruantInfo = (props, data) => {
        return data.response.venues.filter(item => item.name.includes(props.name) || props.name.includes(props.name))
    }

    //Update markers on map with information from location json
    updateMapMarkers = (locations) => {
        //If location do not match filter input, then exit
        if (!locations) {
            return;
        }

        //Remove any existing markers from map
        this.state.markers.forEach(marker => marker.setMap(null));

        //Iterate over locations to create parallel references to marker and its properties
        let markerProps = []
        let markers = locations.map((location, index) => {
            let mProps = {
                key: index,
                index,
                name: location.name,
                position: location.pos,
                url: location.url
            }
            //Save marker props
            markerProps.push(mProps)

            //Assign poistion and animation effect for map marker
            let animation = this.props.google.maps.Animation.DROP;
            let marker = new this.props.google.maps.Marker({
                position: location.pos,
                map: this.state.map,
                animation
            })
            //Assign listener function for map marker
            marker.addListener('click', () => {
                this.onMarkerClick(mProps, marker, null)
            })
            return marker;
        })
        //Add markers and corresponding props to map
        this.setState({ markers, markerProps })
    }

    render = () => {
        const mapStyle = {
            width: '100%',
            height: '100%'
        }
        const defaultMapPosition = {
            lat: this.props.lat,
            lng: this.props.lng
        }

        //Assign current/clicked marker props
        let currentMarkerProps = this.state.activeMarkerProps

        return (
            <Map
                role="application"
                aria-label="map"
                onReady={this.renderMap}
                google={this.props.google}
                zoom={this.props.zoom}
                style={mapStyle}
                initialCenter={defaultMapPosition}
                onClick={this.closeInfoWindow}>
                {/*Component to display quick info of restaurant*/}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.closeInfoWindow}>
                    <div>
                        <h3>{currentMarkerProps && currentMarkerProps.name}</h3>
                        {/*Show restaurant category*/}
                        {currentMarkerProps && currentMarkerProps.categories
                            ? (
                                <p><strong>{currentMarkerProps.categories.name || ''}</strong></p>
                            ) : ""}
                        {/*Display restaurant website URL*/}
                        {currentMarkerProps && currentMarkerProps.url
                            ? (
                                <a href={currentMarkerProps.url} rel='noopener noreferrer' target='_blank'>Go to Website</a>
                            ) : ""}
                        {/*Show restaurant photos fetched from FourSquare */}
                        {currentMarkerProps && currentMarkerProps.images
                            ? (
                                <div>
                                    <img alt={currentMarkerProps.name + " food picture"}
                                        src={currentMarkerProps.images.items[0].prefix + "100x100" + currentMarkerProps.images.items[0].suffix} />

                                    <p>Picture from FourSquare</p>
                                    
                                </div>
                            ) : ""
                        }
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({apiKey: G_MAP_KEY, LoadingContainer: NoMapDisplay})(DisplayMap)
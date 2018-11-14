import React, { Component } from 'react'
import {Map, GoogleApiWrapper, InfoWindow} from 'google-maps-react';

const MAP_KEY = "AIzaSyAZUdiGhHDhXMKF5ZfKuF5vbFQI_sKpWVo"
const FS_CLIENT = "FTL0H0C5H4AYWYOD5XXZYCGUPTR5RJF0RUORJ1TEXCFR51DQ"
const FS_SECRET = "CCXOBE4TEGOIJC1L25MYRVVHI1AVG3ZMVDAW5JGKNOSOIH5A"
const FS_VERSION = "20181114"

class DisplayMap extends Component{
    state ={
        map : null,
        markers : [],
        markerProps : [],
        activeMarker : null,
        activeMarkerProps : null,
        showingInfoWindow : false
    }

    componentDidMount = () =>{

    }

    componentWillReceiveProps = (props) => {
        this.setState({firstDrop: false});

        // Change in the number of locations, so update the markers
        if (this.state.markers.length !== props.locations.length) {
            this.closeInfoWindow();
            this.updateMarkers(props.locations);
            this.setState({activeMarker: null});

            return;
        }

        // The selected item is not the same as the active marker, so close the info window
        if (!props.selectedIndex || (this.state.activeMarker && 
            (this.state.markers[props.selectedIndex] !== this.state.activeMarker))) {
            this.closeInfoWindow();
        }

        // Make sure there's a selected index
        if (props.selectedIndex === null || typeof(props.selectedIndex) === "undefined") {
            return;
        };

        // Treat the marker as clicked
        this.onMarkerClick(this.state.markerProps[props.selectedIndex], this.state.markers[props.selectedIndex]);
    }

    mapReady = (props, map) => {
        //Save the map reference in state and prepare the location markers
        this.setState({map});
        this.updateMarkers(this.props.locations)
    }

    closeInfoWindow = () => {
        //Display any active marker animation
        this.state.activeMarker && this
        .state
        .activeMarker
        .setAnimation(null);
        this.setState({showingInfoWindow: false,
        activeMarker: null,
        activeMarkerProps: null })
    }

    onMarkerClick = (props, marker, event) => {
        //Close any info window already open
        this.closeInfoWindow();
    
        let url = `https://api.foursquare.com/v2/venues/search?client_id=${FS_CLIENT}&client_secret=${FS_SECRET}&v=${FS_VERSION}&ll=${props.position.lat}, ${props.position.lng}&radius=2&limit=1`
        let headers = new Headers()
        let request = new Request(url, {
            method: 'GET',
            headers
        })

        //Create props for active marker
        let activeMarkerProps;
        fetch(request)
            .then(response=>response.json())
            .then(result => {
                //Get the restaurant reference we want from FourSquare
                let restaruant = this.getRestaurantInfo(props,result)
                activeMarkerProps  = {
                    ...props,
                    fourSquare : restaruant[0]
                };
                //Get list of images for restaurant
                if(activeMarkerProps.fourSquare){
                    let url = `https://api.foursquare.com/v2/venues/${restaruant[0].id}/photos?client_id=${FS_CLIENT}&client_secret=${FS_SECRET}&v=${FS_VERSION}`
                    fetch(url)
                        .then(response=>response.json())
                        .then(result => {
                            activeMarkerProps = {
                                ...activeMarkerProps,
                                
                                images : (result.response && (result.response.photos || ''))
                            };
                            if(this.state.activeMarker)
                                this.state.activeMarker.setAnimation(null)
                            marker.setAnimation(this.props.google.maps.Animation.BOUNCE)
                            this.setState({showingInfoWindow:true, activeMarker:marker,activeMarkerProps})
                        })
                }else{
                    marker.setAnimation(this.props.google.maps.Animation.BOUNCE)
                    this.setState({showingInfoWindow:true, activeMarker:marker,activeMarkerProps})
                }
            })

        
    }

    getRestaurantInfo = (props, data) => {
        //Look for matching restaruant data in FourSquare compared for what we already know 
        return data
                .response
                .venues
                .filter(item => item.name.includes(props.name)|| props.name.includes(props.name)) 
    }

    updateMarkers = (locations) =>{
        //If all locations are filtered, then we're done
        if(!locations){
            return;
        }

        //Remove any existing markers from map
        this
            .state
            .markers
            .forEach(marker=>marker.setMap(null));
        
        /*Iterate over locations to create parallel references to marker properties
        and mark themselves that can be used for reference in interactions.
        And add the markers to map along the way*/
        let markerProps= []
        let markers = locations.map((location,index)=>{
            let mProps = {
                key: index,
                index,
                name : location.name,
                position : location.pos,
                url : location.url
            }
            markerProps.push(mProps)
           
            let animation = this.state.fisrtDrop ? this.props.google.maps.Animation.DROP : null;
            let marker = new this.props.google.maps.Marker({
                
                position: location.pos,
                map : this.state.map,
                animation
            })
            marker.addListener('click', ()=>{
                this.onMarkerClick(mProps, marker, null)
            })
            return marker;
        })
        this.setState({markers, markerProps})
    }

    render = () => {
        const style = {
            width : '100%',
            height : '100%'
        }
        const center = {
            lat : this.props.lat,
            lng : this.props.lon
        }

        let amProps = this.state.activeMarkerProps

        
        return (
            <Map 
                role="application"
                aria-label="map"
                onReady={this.mapReady}
                google={this.props.google}
                zoom={this.props.zoom}
                style={style}
                initialCenter={center}
                onClick={this.closeInfoWindow}>
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.closeInfoWindow}>
                    <div>
                        <h3>{amProps && amProps.name}</h3>
                        {amProps && amProps.url 
                        ? (
                            <a href={amProps.url} rel='noopener noreferrer' target='_blank'>See website</a>
                        ) : ""}
                        {amProps && amProps.images
                            ? (
                                <div>
                                    <img alt={amProps.name + " food picture"}
                                    src={amProps.images.items[0].prefix + "100x100" + amProps.images.items[0].suffix}/>
                                    
                                    <p>Image from FourSquare</p> 
                                </div>
                            ) : ""
                        }
                    </div>
                    </InfoWindow>
                </Map>
        )
    }
}

export default GoogleApiWrapper({apiKey:MAP_KEY})(DisplayMap)
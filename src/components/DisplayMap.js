import React, { Component } from 'react'
import {Map, GoogleApiWrapper, InfoWindow} from 'google-maps-react';

const MAP_KEY = "AIzaSyAZUdiGhHDhXMKF5ZfKuF5vbFQI_sKpWVo"

class DisplayMap extends Component{
    state ={
        map : null,
        markers : [],
        mapMarkers : [],
        activeMarker : null,
        activeMarkerProps : null,
        showingInfoWindow : false
    }

    componentDidMount = () =>{

    }

    mapReady = (props, map) => {
        //Save the map reference in state and prepare the location markers
        this.setState(map);
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

    onMarkerClick = () => {
        //Close any info window already open
        this.closeInfoWindow();
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
                position : locations.pos,
                url : location.url
            }
            markerProps.push(mProps)
            
            let animation = this.props.google.maps.Animation.DROP;
            let marker = new this.props.google.maps.Marker({
                position: location.pos,
                map : this.state.map,
                animation
            })
            marker.addListener('click', ()=>{
                this.onMarkerClick(mProps, marker, null)
            })
            return marker
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
                    onClose={this.state.closeInfoWindow}>
                    <div>
                        <h3>{amProps && amProps.name}</h3>
                        {amProps && amProps.url 
                        ? (
                            <a href={amProps.url}>See website</a>
                        ) : ""}
                    </div>
                    </InfoWindow>
                </Map>
                

        )
    }
}

export default GoogleApiWrapper({apiKey:MAP_KEY})(DisplayMap)
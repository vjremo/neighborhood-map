import React, {Component} from 'react';

class NoMapDisplay extends Component {
    state = {
        show: false,
        timer: null
    }

    /*Referred tutorial of Doug Brown for below sections 
    Link: https://www.youtube.com/watch?v=NVAVLCJwAAo& */ 

    componentDidMount = () => {
        let timer = window.setTimeout(this.displayMessage, 1000);
        this.setState({timer});
    }

    componentWillUnmount = () => {
        window.clearTimeout(this.state.timer);
    }

    //If map could not be loaded, display error message
    displayMessage = () => {
        this.setState({show: true});
    }

    render = () => {
        return (
           <div>
                {this.state.show
                    ? (
                        <div>
                            <h1>!! Error loading map !!</h1>
                            < p >
                                Could not load map due to a network error. Please try again when you're back online.</p>
                        </div>
                    )
                    : (<div><h1>Loading...</h1></div>)
            } </div>
        )
    }
}
export default NoMapDisplay;
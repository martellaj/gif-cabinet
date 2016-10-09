import './App.css';
import AddGif from '../AddGif/AddGif';
import base from '../../base';
import Login from '../Login/Login';
import React, { Component } from 'react';
import Results from '../Results/Results';

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            uid: null, // User ID of signed in user
            selectedGif: null, // ID of selected GIF
            gifs: {} // All of the GIFs
        };

        this.addGif = this.addGif.bind(this);
        this.authHandler = this.authHandler.bind(this);
    }

    /**
     * Life-cycle methods
     */

    componentDidMount() {
        base.onAuth((user) => {
            if (user) {
                this.authHandler(null, { user });
            }
        });
    }

    /**
     * Custom methods
     */

    addGif(gif) {
        let gifs = {...this.state.gifs};

        // Generate timestamp key.
        let timestamp = Date.now();
        gifs[`gif-${timestamp}`] = gif;

        this.setState({ gifs: gifs });
    }

    authHandler(err, authData) {
        if (err) {
            console.error(err);
            return;
        }

        this.setState({
            uid: authData.user.uid
        });

        this.ref = base.syncState(`${authData.user.uid}/gifs`, {
            context: this,
            state: 'gifs'
        });
    }

    /**
     * Render function
     */

    render() {
        let authenticatedUser = !!this.state.uid;

        let managementComponent;
        if (this.state.selectedGif) {
            managementComponent = <p>EditGif component</p>;
            // managementComponent = <EditGif id={this.state.selectedGif} />
        } else {
            managementComponent = <AddGif addGif={this.addGif} />
        }

        if (!authenticatedUser) {
            return (
                <Login
                    authHandler={this.authHandler}
                />
            );
        } else {
            return (
                <div className="app">
                    <div className="search-component"></div>
                    <Results
                        className="results-component"
                        results={this.state.gifs}
                    />
                    <div className="gif-management">
                        {managementComponent}
                    </div>
                </div>
            );
        }
    }
}
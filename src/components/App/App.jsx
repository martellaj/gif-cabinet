import './App.css';
import AddGif from '../AddGif/AddGif';
import base from '../../base';
import EditGif from '../EditGif/EditGif';
import Login from '../Login/Login';
import React, { Component } from 'react';
import Results from '../Results/Results';
import sampleData from '../SampleData/sample-gifs';
import SampleData from '../SampleData/SampleData';

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            uid: null, // User ID of signed in user
            selectedGif: '', // ID of selected GIF
            gifs: {} // All of the GIFs
        };

        this.addGif = this.addGif.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.clearSampleData = this.clearSampleData.bind(this);
        this.deleteGif = this.deleteGif.bind(this);
        this.loadSampleData = this.loadSampleData.bind(this);
        this.selectGif = this.selectGif.bind(this);
        this.unselectGif = this.unselectGif.bind(this);
        this.updateGif = this.updateGif.bind(this);
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

    clearSampleData() {
        let gifs = {...this.state.gifs};

        Object.keys(gifs).map((key) => {
            gifs[key] = null;

            // Just need to return anything.
            return null;
        });

        this.setState({ selectedGif: '' });
        this.setState({ gifs });
    }

    deleteGif() {
        let gifs = {...this.state.gifs};
        gifs[this.state.selectedGif] = null;

        this.setState({
            selectedGif: ''
        });

        this.setState({
            gifs
        });
    }

    loadSampleData() {
        Object.keys(sampleData).map((key) => {
            let sample = sampleData[key];
            this.addGif(sample);

            // Just need to return anything.
            return null;
        });
    }

    selectGif(gifId) {
        this.setState({
            selectedGif: gifId
        });
    }

    unselectGif() {
        this.setState({
            selectedGif: ''
        });
    }

    updateGif(updatedGif) {
        let gifs = {...this.state.gifs};
        gifs[this.state.selectedGif] = updatedGif;

        this.setState({
            gifs: gifs,
            selectedGif: ''
        });
    }

    /**
     * Render function
     */

    render() {
        let authenticatedUser = !!this.state.uid;

        let managementComponent;
        if (this.state.selectedGif) {
            managementComponent = (
                <EditGif
                    gif={this.state.gifs[this.state.selectedGif]}
                    updateGif={this.updateGif}
                    deleteGif={this.deleteGif}
                />
            );
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
                    <div className="app-section search-section">
                        <div className="foo">
                        </div>
                    </div>
                    <div className="app-section results-section">
                        <Results
                            results={this.state.gifs}
                            selectGif={this.selectGif}
                            selectedGif={this.state.selectedGif}
                            unselectGif={this.unselectGif}
                        />
                    </div>
                    <div className="app-section gif-management-section">
                        {managementComponent}
                        <SampleData
                            clearSampleData={this.clearSampleData}
                            loadSampleData={this.loadSampleData}
                        />
                    </div>
                </div>
            );
        }
    }
}
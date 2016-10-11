import './App.css';
import AddGif from '../AddGif/AddGif';
import base from '../../base';
import EditGif from '../EditGif/EditGif';
import Login from '../Login/Login';
import React, { Component } from 'react';
import Results from '../Results/Results';
import sampleData from '../SampleData/sample-gifs';
import SampleData from '../SampleData/SampleData';
import Search from '../Search/Search';

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            uid: '', // User ID of signed in user
            selectedGif: '', // ID of selected GIF
            gifs: [], // All of the GIFs
            query: [], // Tags being searched
            results: []
        };

        this.addToQuery = this.addToQuery.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.createGif = this.createGif.bind(this);
        this.createSampleData = this.createSampleData.bind(this);
        this.deleteGif = this.deleteGif.bind(this);
        this.deleteSampleData = this.deleteSampleData.bind(this);
        this.removeTagFromQuery = this.removeTagFromQuery.bind(this);
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
     * Functions that act on state.gifs
     */

    createGif(gif) {
        // Generate timestamp key.
        let timestamp = Date.now();

        this.setState({
            gifs: this.state.gifs.concat({
                ...gif,
                timestamp: `gif-${timestamp}`
            })
        });
    }

    updateGif(updatedGif) {
        let gifs = this.state.gifs.slice();
        gifs[this.state.selectedGif] = updatedGif;

        this.setState({
            selectedGif: '',
            gifs: gifs
        });
    }

    deleteGif() {
        let gifs = this.state.gifs.slice();
        delete gifs[this.state.selectedGif];

        this.setState({
            selectedGif: '',
            gifs
        });
    }

    createSampleData() {
        let gifs = this.state.gifs.slice();
        let count = 0;

        Object.keys(sampleData).map((key) => {
            let sample = sampleData[key];

            gifs.push({
                ...sample,
                timestamp: `gif-${Date.now()}${count++}`
            });

            // Just need to return anything.
            return null;
        });

        this.setState({ gifs });
    }

    deleteSampleData() {
        let gifs = this.state.gifs.slice();

        gifs.map((gif, key) => {
            delete gifs[key];
            return gif;
        });

        this.setState({
            selectedGif: '',
            gifs
        });
    }

    /**
     * End of functions that act on state.gifs
     */

    addToQuery(tags) {
        let query = this.state.query.slice();

        tags.map(tag => {
            // Add to query if it isn't already present.
            if (query.indexOf(tag) === -1 ){
                query.push(tag);
            }

            return null;
        });

        this.setState({
            query: query
        });
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
            state: 'gifs',
            asArray: true,
            then: this.doneSyncingWithFirebase
        });
    }

    doneSyncingWithFirebase() {
        this.setState({
            results: this.state.gifs
        });
    }

    removeTagFromQuery(key) {
        let query = this.state.query.slice();
        delete query[key];
        this.setState({ query });
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
            managementComponent = <AddGif createGif={this.createGif} />
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
                        <Search
                            addToQuery={this.addToQuery}
                            query={this.state.query}
                            removeTagFromQuery={this.removeTagFromQuery}
                        />
                    </div>
                    <div className="app-section results-section">
                        <Results
                            results={this.state.results}
                            selectGif={this.selectGif}
                            selectedGif={this.state.selectedGif}
                            unselectGif={this.unselectGif}
                            query={this.state.query}
                        />
                    </div>
                    <div className="app-section gif-management-section">
                        {managementComponent}
                        <SampleData
                            createSampleData={this.createSampleData}
                            deleteSampleData={this.deleteSampleData}
                        />
                    </div>
                </div>
            );
        }
    }
}
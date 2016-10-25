import './App.css';
import AddGif from '../AddGif/AddGif';
import base from '../../base';
import EditGif from '../EditGif/EditGif';
import GifHelper from './GifHelper';
import Login from '../Login/Login';
import React, { Component } from 'react';
import Results from '../Results/Results';
import SampleData from '../SampleData/SampleData';
import Search from '../Search/Search';

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            uid: '', // User ID of signed in user
            selectedGif: -1, // ID of selected GIF
            gifs: [], // All of the GIFs
            query: [], // Tags being searched
            results: [] // Collection of current results being shown to user
        };

        this.addToQuery = this.addToQuery.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.onLogOutClick = this.onLogOutClick.bind(this);
        this.removeTagFromQuery = this.removeTagFromQuery.bind(this);
        this.updateResults = this.updateResults.bind(this);

        this._gifHelper = new GifHelper(this);
        this.createGif = this._gifHelper.createGif;
        this.createSampleData = this._gifHelper.createSampleData;
        this.deleteGif = this._gifHelper.deleteGif;
        this.deleteSampleData = this._gifHelper.deleteSampleData;
        this.getGif = this._gifHelper.getGif;
        this.selectGif = this._gifHelper.selectGif;
        this.unselectGif = this._gifHelper.unselectGif;
        this.updateGif = this._gifHelper.updateGif;
    }

    componentDidMount() {
        base.onAuth((user) => {
            if (user) {
                this.authHandler(null, { user });
            }
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

        // Log Facebook authentication.
        base.push(`logins/facebook`, {
            data: true
        });
    }

    doneSyncingWithFirebase() {
        this.setState({
            results: this.state.gifs
        });
    }

    onLogOutClick(e) {
        base.unauth();

        this.setState({
            uid: ''
        });
    }

    addToQuery(tags) {
        let query = this.state.query.slice();

        tags.map(tag => {
            // Add to query if it isn't already present.
            if (query.indexOf(tag) === -1 ){
                query.push(tag);

                // Log tag.
                base.push(`tags/${this.state.uid}`, {
                    data: tag
                });
            }

            return null;
        });

        this.setState({
            query: query
        });
    }

    removeTagFromQuery(key) {
        let query = this.state.query.slice();
        delete query[key];
        this.setState({ query });
    }

    updateResults(updatedResults) {
        this.setState({
            results: [].concat(updatedResults)
        });
    }

    render() {
        let authenticatedUser = !!this.state.uid;

        // Gets the correct management component.
        //   If no GIF is selected, render AddGif component.
        //   If a GIF is selected, render EditGif component.
        let managementComponent;
        if (this.state.selectedGif > -1) {
            managementComponent = (
                <EditGif
                    gif={this.getGif(this.state.selectedGif)}
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
                    <button className="btn btn-danger log-out-button" onClick={this.onLogOutClick}>log out</button>
                    <div className="app-content">
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
                                updateResults={this.updateResults}
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
                </div>
            );
        }
    }
}
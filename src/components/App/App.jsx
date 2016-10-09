import './App.css';
import Login from '../Login/Login';
import logo from '../../logo.svg';
import React, { Component } from 'react';

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            uid: null // User ID of signed in user.
        };

        this.authHandler = this.authHandler.bind(this);
    }

    authHandler(err, authData) {
        if (err) {
            console.error(err);
            return;
        }

        this.setState({
            uid: authData.user.uid
        });
    }

    render() {
        let authenticatedUser = !!this.state.uid;

        if (!authenticatedUser) {
            return (
                <Login
                    authHandler={this.authHandler}
                />
            );
        } else {
            return (
                <div className="App">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h2>Welcome to React</h2>
                    </div>
                    <p className="App-intro">
                        To get started, edit <code>src/App.js</code> and save to reload.
                    </p>
                </div>
            );
        }
    }
}
import './Login.css';
import base from '../../base';
import React, { Component } from 'react';

export default class Login extends Component {
    constructor() {
        super();

        this.authenticate = this.authenticate.bind(this);
    }

    authenticate() {
        base.authWithOAuthPopup('facebook', this.props.authHandler);
    }

    render() {
        return (
            <div className="login-container">
                <h2>open your <em>gif cabinet</em></h2>
                <button
                    className="facebook-login"
                    onClick={this.authenticate}
                >log in with facebook</button>
            </div>
        );
    }
}
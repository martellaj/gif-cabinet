import './Login.css';
import base from '../../base';
import React, { Component } from 'react';

export default class Login extends Component {
    constructor() {
        super();

        this.authenticate = this.authenticate.bind(this);
    }

    /**
     * Custom methods
     */

    authenticate() {
        base.authWithOAuthPopup('facebook', this.props.authHandler);
    }

    /**
     * Render function
     */

    render() {
        return (
            <div className="login-container">
                <h2>log in</h2>
                <button
                    className="facebook-login"
                    onClick={this.authenticate}
                >facebook</button>
            </div>
        );
    }
}
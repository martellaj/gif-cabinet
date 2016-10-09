import React, { Component } from 'react';
import base from '../../base';

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
                <button
                    className="facebook-login"
                    onClick={this.authenticate}
                >Log in with Facebook</button>
            </div>
        );
    }
}
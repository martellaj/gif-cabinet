import React, { Component } from 'react';
import './Result.css';

export default class Result extends Component {

    /**
     * Render function
     */

    render() {
        let gif = this.props.result;

        return (
            <div className="result">
                <img className="preview" src={gif.url} alt="gif preview" />
                <input className="url" type="text" readOnly value={gif.url} />
            </div>
        );
    }
}

Result.propTypes = {
    result: React.PropTypes.object.isRequired
};
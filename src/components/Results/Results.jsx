import './Results.css';
import React, { Component } from 'react';
import Result from '../Result/Result';

export default class Results extends Component {
    constructor() {
        super();

        this.renderResult = this.renderResult.bind(this);
    }

    /**
     * Custom methods
     */

    renderResult(key) {
        let gif = this.props.results[key];

        return (
            <Result key={key} result={gif} />
        );
    }

    /**
     * Render function
     */

    render() {
        return (
            <div className="results-container">
                {Object.keys(this.props.results).map(this.renderResult)}
            </div>
        );
    }
}

Results.propTypes = {
    results: React.PropTypes.object.isRequired
};
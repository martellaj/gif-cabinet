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
            <Result
                key={key}
                result={gif}
                gifId={key}
                selectGif={this.props.selectGif}
                selectedGif={this.props.selectedGif}
            />
        );
    }

    renderResults() {
        let hasResults = Object.keys(this.props.results).length > 0;
        let results;

        if (hasResults) {
            results = (
                <div className="results-container">
                    {Object.keys(this.props.results).map(this.renderResult)}
                </div>
            );
        } else {
            results = <p>no results</p>;
        }

        return results;
    }

    /**
     * Render function
     */

    render() {
        return (
            <div className="results-component">
                <h2>results</h2>
                {this.renderResults()}
            </div>
        );
    }
}

Results.propTypes = {
    results: React.PropTypes.object.isRequired
};
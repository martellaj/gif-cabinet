import './Results.css';
import React, { Component } from 'react';
import Result from '../Result/Result';

export default class Results extends Component {
    constructor() {
        super();

        this.state = {
            sortOrder: "newest"
        };

        this.renderResult = this.renderResult.bind(this);
        this.transformResultsObjectToArray = this.transformResultsObjectToArray.bind(this);
        this.onSortOrderChange = this.onSortOrderChange.bind(this);
    }

    /**
     * Custom methods
     */

    onSortOrderChange(e) {
        this.setState({ sortOrder: e.target.value });
    }

    renderResult(result) {
        let key = result.timestamp;

        return (
            <Result
                key={key}
                result={result}
                gifId={key}
                selectGif={this.props.selectGif}
                isSelected={key === this.props.selectedGif}
                unselectGif={this.props.unselectGif}
            />
        );
    }

    sort(results, order) {
        switch (this.state.sortOrder) {
            case "newest": // Newest to oldest
                return results.sort(this._newestToOldestSort);
            case "oldest": // Oldest to newest
                return results.sort(this._oldestToNewestSort);
            case "most relevant": // Most relevant
                break;
            default: // Newest to oldest
                return results.sort(this._newestToOldestSort);
        }
    }

    transformResultsObjectToArray() {
        let results = [];

        Object.keys(this.props.results).map((key) => {
            let result = this.props.results[key];
            result.timestamp = key;
            results.push(result);

            return null;
        });

        return results;
    }

    renderResults() {
        let hasResults = Object.keys(this.props.results).length > 0;
        let results;

        if (hasResults) {
            let resultsArray = this.transformResultsObjectToArray();
            resultsArray = this.sort(resultsArray, this.state.sortOrder);

            results = (
                <div className="results-container">
                    {resultsArray.map(this.renderResult)}
                </div>
            );
        } else {
            results = <p>no results</p>;
        }

        return results;
    }

    _newestToOldestSort(a, b) {
        return b.timestamp.slice(4) - a.timestamp.slice(4);
    }

    _oldestToNewestSort(a, b) {
        return a.timestamp.slice(4) - b.timestamp.slice(4);
    }

    /**
     * Render function
     */

    render() {
        return (
            <div className="results-component">
                <h2>results</h2>
                <select value={this.state.sortOrder} onChange={(e) => this.onSortOrderChange(e)}>
                    <option value="newest">Newest to oldest</option>
                    <option value="oldest">Oldest to newest</option>
                </select>
                {this.renderResults()}
            </div>
        );
    }
}

Results.propTypes = {
    results: React.PropTypes.object.isRequired,
    selectGif: React.PropTypes.func.isRequired,
    selectedGif: React.PropTypes.string.isRequired
};
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
        this.onSortOrderChange = this.onSortOrderChange.bind(this);
    }

    onSortOrderChange(e) {
        this.setState({ sortOrder: e.target.value });
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

    renderResults() {
        let hasResults = this.props.results.length > 0;
        let resultsMarkup;

        if (hasResults) {
            let results = this.sort(this.props.results, this.state.sortOrder);

            resultsMarkup = (
                <div className="results-container">
                    {results.map(this.renderResult)}
                </div>
            );
        } else {
            resultsMarkup = <p>no results</p>;
        }

        return resultsMarkup;
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
                <select className="sort-order" value={this.state.sortOrder} onChange={(e) => this.onSortOrderChange(e)}>
                    <option value="newest">Newest to oldest</option>
                    <option value="oldest">Oldest to newest</option>
                </select>
                {this.renderResults()}
            </div>
        );
    }
}

Results.propTypes = {
    results: React.PropTypes.array.isRequired,
    selectGif: React.PropTypes.func.isRequired,
    selectedGif: React.PropTypes.string.isRequired
};
import './Results.css';
import React, { Component } from 'react';
import Result from '../Result/Result';

export default class Results extends Component {
    constructor() {
        super();

        this.state = {
            sortOrder: "newest",
            isQueryActive: false
        };

        this.renderResult = this.renderResult.bind(this);
        this.onSortOrderChange = this.onSortOrderChange.bind(this);
        this.processRelevance = this.processRelevance.bind(this);
    }

    onSortOrderChange(e) {
        this.setState({ sortOrder: e.target.value });
    }

    processRelevance(results) {
        return results.map(result => {
            result.relevance = result.tags.filter(tag => {
                return this.props.query.includes(tag);
            }).length;

            return result;
        });
    }

    sort(results, order) {
        // Filter out GIFs that don't match query.
        if (this.state.isQueryActive) {
            results = this.processRelevance(results);
            results = results.filter(result => {
                return result.relevance > 0;
            });
        }

        switch (this.state.sortOrder) {
            case "newest": // Newest to oldest
                return results.sort(this._newestToOldestSort);
            case "oldest": // Oldest to newest
                return results.sort(this._oldestToNewestSort);
            case "most relevant": // Most relevant
                return results.sort(this._mostRelevantSort);
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
        let results;
        let resultsMarkup;

        if (hasResults) {
            results = this.sort(this.props.results, this.state.sortOrder);
        }

        if (hasResults && results && results.length > 0) {
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

    _mostRelevantSort(a, b) {
        return b.relevance - a.relevance;
    }

    _newestToOldestSort(a, b) {
        return b.timestamp.slice(4) - a.timestamp.slice(4);
    }

    _oldestToNewestSort(a, b) {
        return a.timestamp.slice(4) - b.timestamp.slice(4);
    }

    isQueryActive(query) {
        for (let i = 0; i < query.length; i++) {
            if (query[i]) {
                return true;
            }
        }

        return false;
    }

    componentWillReceiveProps(nextProps) {
        let isQueryActive = this.isQueryActive(nextProps.query);

        this.setState({
            isQueryActive: isQueryActive
        });

        if (isQueryActive) {
            this.setState({
                sortOrder: "most relevant"
            });
        } else {
            this.setState({
                sortOrder: "newest"
            });
        }
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
                    <option value="most relevant">Most relevant</option>
                </select>
                {this.renderResults()}
            </div>
        );
    }
}

Results.propTypes = {
    results: React.PropTypes.array.isRequired,
    selectGif: React.PropTypes.func.isRequired,
    selectedGif: React.PropTypes.string.isRequired,
    unselectGif: React.PropTypes.func.isRequired,
    query: React.PropTypes.array.isRequired
};
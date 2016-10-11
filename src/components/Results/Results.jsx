import './Results.css';
import React, { Component } from 'react';
import Result from '../Result/Result';

export default class Results extends Component {
    constructor() {
        super();

        this.state = {
            sortOrder: "newest",
            isQueryActive: false,
            isInitialLoad: true
        };

        this.renderResult = this.renderResult.bind(this);
        this.onSortOrderChange = this.onSortOrderChange.bind(this);
        this.processRelevance = this.processRelevance.bind(this);
    }

    onSortOrderChange(e) {
        let newSortOrder = e.target.value;

        // Sort results and update results.
        let results = this.props.results;
        results = this.sort(results, newSortOrder);
        this.props.updateResults(results);

        // Update sortOrder state.
        this.setState({
            sortOrder: newSortOrder
        });
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

        switch (order) {
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
        return (
            <Result
                key={result.key}
                result={result}
                gifId={result.key}
                selectGif={this.props.selectGif}
                isSelected={result.key === this.props.selectedGif}
                unselectGif={this.props.unselectGif}
            />
        );
    }

    renderResults() {
        let results = this.props.results;
        let resultsMarkup = <p>no results</p>;

        if (results.length > 0) {
            resultsMarkup = (
                <div className="results-container">
                    {results.map(this.renderResult)}
                </div>
            );
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
        if (this.state.isInitialLoad && nextProps.isDoneLoadingGifs && nextProps.results.length > 0) {
            // Sort results and update results.
            let results = nextProps.results;
            results = this.sort(results, this.state.sortOrder);
            this.props.updateResults(results);

            // Update state.
            this.setState({ isInitialLoad: false });
        }

        let isQueryActive = this.isQueryActive(nextProps.query);
        this.setState({
            isQueryActive
        });

        if (isQueryActive) {
            this.setState({
                sortOrder: "most relevant"
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
    selectedGif: React.PropTypes.number.isRequired,
    unselectGif: React.PropTypes.func.isRequired,
    query: React.PropTypes.array.isRequired
};
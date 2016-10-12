import './Results.css';
import React, { Component } from 'react';
import Result from '../Result/Result';

export default class Results extends Component {
    constructor() {
        super();

        this.state = {
            sortOrder: 'most relevant'
        };

        this.renderResult = this.renderResult.bind(this);
        this.onSortOrderChange = this.onSortOrderChange.bind(this);
    }

    onSortOrderChange(e) {
        // Update sortOrder state.
        this.setState({
            sortOrder: e.target.value
        });
    }

    /**
     * Helper function that adds a relevancy score to each result
     * based on the current query. Right now, it's not very sophisticated.
     * One point per matched tag.
     */
    scoreRelevance(results, query) {
        return results.map(result => {
            result.relevance = result.tags.filter(tag => {
                return query.includes(tag);
            }).length;

            return result;
        })
    }

    /**
     * Helper function to ensure that there are valid tags in the
     * query. If we remove tags from queries, they may be "undefined"
     * while state is changing.
     */
    queryIsValid(query) {
        for (let tag of query) {
            if (!!tag) {
                return true;
            }
        }

        return false;
    }

    /**
     * Helper function that does the heavy lifting of pruning and
     * sorting results based on query and sort order.
     */
    pruneAndSort(results, sortOrder, query) {
        // Prune GIFs that don't match query (if we have one).
        if (this.queryIsValid(query)) {
            results = this.scoreRelevance(results, query);
            results = results.filter(result => {
                return result.relevance > 0;
            });
        }

        // Sort results based on sort order.
        switch (sortOrder) {
            case 'newest': // Newest to oldest
                return results.sort(function(a, b) {
                    return b.timestamp - a.timestamp;
                });
            case 'oldest': // Oldest to newest
                return results.sort(function(a, b) {
                    return a.timestamp - b.timestamp;
                });
            case 'most relevant': // Most relevant
                return results.sort(function(a, b) {
                    return b.relevance - a.relevance;
                });
            default: // Newest to oldest
                return results.sort(function(a, b) {
                    return b.timestamp - a.timestamp;
                });
        }
    }

    /**
     * Takes the subset of GIFs (results), and prunes out GIFs
     * that have no relevance based on query (if there is one),
     * then sorts them based on the current sort order.
     */
    processResults() {
        let results = this.props.results;
        let sortOrder = this.state.sortOrder;
        let query = this.props.query;

        return this.pruneAndSort(results, sortOrder, query);
    }

    renderResult(result) {
        return (
            <Result
                key={result.key}
                isSelected={result.timestamp === this.props.selectedGif}
                result={result}
                selectGif={this.props.selectGif}
                timestamp={result.timestamp}
                unselectGif={this.props.unselectGif}
            />
        );
    }

    renderResults() {
        let resultsMarkup;

        // Process results based on query and sort order.
        let results = this.processResults();

        // Returns results markup if we have results, or "no results"
        // markup if we don't.
        if (results.length > 0) {
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
    query: React.PropTypes.array.isRequired,
    results: React.PropTypes.array.isRequired,
    selectedGif: React.PropTypes.number.isRequired,
    selectGif: React.PropTypes.func.isRequired,
    unselectGif: React.PropTypes.func.isRequired
};
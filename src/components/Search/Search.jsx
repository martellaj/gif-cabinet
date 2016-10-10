import './Search.css';
import React, { Component } from 'react';
import { processTags } from '../../helpers';

export default class Search extends Component {
    constructor() {
        super();

        this.addToQuery = this.addToQuery.bind(this);
        this.removeTagFromQuery = this.removeTagFromQuery.bind(this);
        this.renderTag = this.renderTag.bind(this);
    }

    /**
     * Custom methods
     */

    addToQuery(e) {
        e.preventDefault();

        let newTags = processTags(this.tags.value);
        this.props.addToQuery(newTags);

        this.form.reset();
    }

    removeTagFromQuery(e, key) {
        e.preventDefault();
        this.props.removeTagFromQuery(key);
    }

    renderTag(tag, key) {
        return (
            <div key={key} className="tag-list-item">
                <button onClick={(e) => this.removeTagFromQuery(e, key)}>&times;</button>
                {` ${tag}`}
            </div>
        );
    }

    /**
     * Render function
     */

    render() {
        return (
            <div className="search-component">
                <h2>search</h2>
                <form className="search-form" onSubmit={this.addToQuery} ref={(form) => this.form = form}>
                    <input required type="text" placeholder="tags (comma delimited)" ref={(tags) => { this.tags = tags; }} />
                    <button type="submit">add to query</button>
                </form>
                <div className="tag-list">
                    {this.props.query.map(this.renderTag)}
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    addToQuery: React.PropTypes.func.isRequired,
    removeTagFromQuery: React.PropTypes.func.isRequired,
    query: React.PropTypes.array.isRequired
};
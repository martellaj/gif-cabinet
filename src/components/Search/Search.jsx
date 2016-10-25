import './Search.css';
import React, { Component } from 'react';
import { processTags } from '../../helpers';

export default class Search extends Component {
    constructor() {
        super();

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onRemoveTagFromQueryClick = this.onRemoveTagFromQueryClick.bind(this);
        this.renderTag = this.renderTag.bind(this);
    }

    onFormSubmit(e) {
        e.preventDefault();

        let newTags = processTags(this.tags.value);
        this.props.addToQuery(newTags);

        this.form.reset();
    }

    onRemoveTagFromQueryClick(e, key) {
        e.preventDefault();
        this.props.removeTagFromQuery(key);
    }

    renderTag(tag, key) {
        return (
            <div key={key} className="tag-list-item">
                <button className="close pull-left" onClick={(e) => this.onRemoveTagFromQueryClick(e, key)}>&times;</button>
                <span>{` ${tag}`}</span>
            </div>
        );
    }

    render() {
        return (
            <div className="search-component">
                <h2>search</h2>
                <form className="search-form" onSubmit={this.onFormSubmit} ref={(form) => this.form = form}>
                    <input className="form-control" required type="text" placeholder="tags (comma delimited)" ref={(tags) => { this.tags = tags; }} />
                    <button className="btn btn-primary" type="submit">add to query</button>
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
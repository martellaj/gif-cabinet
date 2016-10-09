import './Search.css';
import React, { Component } from 'react';
import { processTags } from '../../helpers';

export default class Search extends Component {
    constructor() {
        super();

        this.addToQuery = this.addToQuery.bind(this);
    }

    /**
     * Custom methods
     */

    addToQuery(e) {
        e.preventDefault();

        let newTags = processTags(this.tags.value);

        // let newTagsObject = {};
        // newTags.forEach(tag => {
        //     newTagsObject[tag] = tag;
        // });

        this.props.addToQuery(newTags);

        this.form.reset();
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
            </div>
        );
    }
}

Search.propTypes = {
    addToQuery: React.PropTypes.func.isRequired
};
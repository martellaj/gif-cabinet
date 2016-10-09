import './EditGif.css';
import { processTags } from '../../helpers';
import React, { Component } from 'react';

export default class EditGif extends Component {
    constructor() {
        super();

        this.deleteGif = this.deleteGif.bind(this);
        this.updateGif = this.updateGif.bind(this);
    }

    /**
     * Custom methods
     */

    deleteGif(e) {
        e.preventDefault();

        this.props.deleteGif();
    }

    updateGif(e) {
        e.preventDefault();

        let updatedGif = {
            ...this.props.gif,
            tags: processTags(this.tags.value)
        };

        this.props.updateGif(updatedGif);
    }

    /**
     * Render function
     */

    render() {
        let gif = this.props.gif;

        return (
            <div className="edit-gif-component">
                <h2>edit gif</h2>
                <img className="preview" src={gif.url} alt="gif preview" />
                <form ref={(input) => { this.form = input; }} className="edit-gif-form" onSubmit={this.updateGif}>
                    <input type="text" readOnly defaultValue={gif.url} />
                    <textarea
                        required
                        type="text"
                        name="tags"
                        placeholder="tags (comma delimited)"
                        defaultValue={gif.tags}
                        ref={(tags) => { this.tags = tags; }}
                    />
                    <button className="left-button" type="submit">update tags</button>
                    <button onClick={(e) => this.deleteGif(e)}>delete gif</button>
                </form>
            </div>
        );
    }
}

EditGif.propTypes = {
    gif: React.PropTypes.object.isRequired,
    updateGif: React.PropTypes.func.isRequired
};
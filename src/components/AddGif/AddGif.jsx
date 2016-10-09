import './AddGif.css';
import React, { Component } from 'react';

export default class AddGif extends Component {
    constructor() {
        super();

        this.state = {
            url: null
        };

        this.createGif = this.createGif.bind(this);
        this.setPreviewImage = this.setPreviewImage.bind(this);
    }

    /**
     * Custom methods
     */

    createGif(event) {
        event.preventDefault();

        let gif = {
            url: this.url.value,
            tags: this._processTags(this.tags.value)
        }

        this.props.addGif(gif);

        // Clear form.
        this.setState({ url: null });
        this.form.reset();
    }

    setPreviewImage(event) {
        event.preventDefault();

        this.setState({
            url: event.target.value
        });
    }

    _processTags(tags) {
        // Split input on commas.
        tags = tags.trim().split(',');

        // Remove white-space from tags.
        tags = tags.map(tag => {
            return tag.trim();
        });

        // Remove any empty tags.
        return tags.filter(tag => tag !== '');
    }

    /**
     * Render function
     */

    render() {
        return (
            <div className="add-gif-component">
                <h2>add a gif</h2>
                <img className="preview" src={this.state.url || 'https://media.giphy.com/media/12NESIhPaAgVKU/giphy.gif'} alt="gif preview" />
                <form ref={(input) => { this.form = input; }} className="add-gif-form" onSubmit={this.createGif}>
                    <input type="text" required placeholder="gif url" onBlur={this.setPreviewImage} ref={(url) => { this.url = url; }} />
                    <textarea type="text" required placeholder="tags (comma delimited)" ref={(tags) => { this.tags = tags; }} />
                    <button type="submit">add gif</button>
                </form>
            </div>
        );
    }
}

AddGif.propTypes = {
    addGif: React.PropTypes.func.isRequired
};
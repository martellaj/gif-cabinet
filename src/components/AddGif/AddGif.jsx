import './AddGif.css';
import { processTags } from '../../helpers';
import React, { Component } from 'react';

export default class AddGif extends Component {
    constructor() {
        super();

        this.state = {
            url: null // Url of the GIF being added
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.setPreviewImage = this.setPreviewImage.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();

        let gif = {
            url: this.url.value,
            tags: processTags(this.tags.value)
        };

        this.props.createGif(gif);

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

    render() {
        return (
            <div className="add-gif-component">
                <h2>add a gif</h2>
                <img className="preview" src={this.state.url || 'https://media.giphy.com/media/12NESIhPaAgVKU/giphy.gif'} alt="gif preview" />
                <form ref={(input) => { this.form = input; }} className="add-gif-form" onSubmit={this.onFormSubmit}>
                    <input type="text" className="form-control" required placeholder="gif url" onBlur={this.setPreviewImage} ref={(url) => { this.url = url; }} />
                    <textarea className="form-control" type="text" required placeholder="tags (comma delimited)" ref={(tags) => { this.tags = tags; }} />
                    <button className="btn btn-default" type="submit">add gif</button>
                </form>
            </div>
        );
    }
}

AddGif.propTypes = {
    createGif: React.PropTypes.func.isRequired
};
import './EditGif.css';
import { processTags } from '../../helpers';
import React, { Component } from 'react';

export default class EditGif extends Component {
    constructor() {
        super();

        this.state = {
            tags: '' // Current search query tags
        };

        this.onDeleteGifClick = this.onDeleteGifClick.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            tags: nextProps.gif.tags
        });
    }

    onDeleteGifClick(e) {
        e.preventDefault();

        this.props.deleteGif();
    }

    onTagsChange(e) {
        this.setState({ tags: e.target.value });
    }

    onFormSubmit(e) {
        e.preventDefault();

        let updatedGif = {
            ...this.props.gif,
            tags: processTags(this.tags.value)
        };

        this.props.updateGif(updatedGif);
    }

    render() {
        let gif = this.props.gif;

        return (
            <div className="edit-gif-component">
                <h2>edit gif</h2>
                <img className="preview" src={gif.url} alt="gif preview" />
                <form ref={(input) => { this.form = input; }} className="edit-gif-form" onSubmit={this.onFormSubmit}>
                    <input className="form-control" type="text" readOnly value={gif.url} />
                    <textarea
                        className="form-control"
                        required
                        onChange={(e) => this.onTagsChange(e)}
                        type="text"
                        name="tags"
                        placeholder="tags (comma delimited)"
                        value={this.state.tags || this.props.gif.tags}
                        ref={(tags) => { this.tags = tags; }}
                    />
                    <button className="left-button btn btn-default" type="submit">update tags</button>
                    <button className="btn btn-danger" onClick={(e) => this.onDeleteGifClick(e)}>delete gif</button>
                </form>
            </div>
        );
    }
}

EditGif.propTypes = {
    deleteGif: React.PropTypes.func.isRequired,
    gif: React.PropTypes.object.isRequired,
    updateGif: React.PropTypes.func.isRequired
};
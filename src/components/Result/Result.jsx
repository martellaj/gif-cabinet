import styles from './Result.css';
import classNames from 'classnames/bind';
import React, { Component } from 'react';

export default class Result extends Component {
    constructor() {
        super();

        this.onResultClick = this.onResultClick.bind(this);
    }

    /**
     * Custom methods
     */

    onResultClick(event) {
        this.props.selectGif(this.props.gifId);
    }

    /**
     * Render function
     */

    render() {
        let gif = this.props.result;
        let cx = classNames.bind(styles);

        let className = cx({
            result: true,
            'result-focused': this.props.selectedGif === this.props.gifId
        });

        return (
            <div className={className} onClick={this.onResultClick}>
                <img className="preview" src={gif.url} alt="gif preview" />
                <input className="url" type="text" readOnly value={gif.url} />
            </div>
        );
    }
}

Result.propTypes = {
    result: React.PropTypes.object.isRequired,
    gifId: React.PropTypes.string.isRequired
};
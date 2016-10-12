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
        if (!this.props.isSelected) {
            this.props.selectGif(this.props.timestamp);
        } else {
            this.props.unselectGif();
        }
    }

    /**
     * Render function
     */

    render() {
        let gif = this.props.result;
        let cx = classNames.bind(styles);

        let className = cx({
            result: true,
            'result-focused': this.props.isSelected
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
    timestamp: React.PropTypes.number.isRequired,
    selectGif: React.PropTypes.func.isRequired,
    isSelected: React.PropTypes.bool.isRequired,
    unselectGif: React.PropTypes.func.isRequired
};
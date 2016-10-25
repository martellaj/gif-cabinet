import styles from './Result.css';
import classNames from 'classnames/bind';
import React, { Component } from 'react';

export default class Result extends Component {
    constructor() {
        super();

        this.onResultClick = this.onResultClick.bind(this);
    }

    onResultClick(event) {
        if (!this.props.isSelected) {
            this.props.selectGif(this.props.timestamp);

            // Copy URL to clipboard.
            let textbox = document.getElementById(this.props.result.timestamp);
            textbox.select();
            document.execCommand('copy');
        } else {
            this.props.unselectGif();
        }
    }

    render() {
        let gif = this.props.result;
        let cx = classNames.bind(styles);

        let className = cx({
            result: true,
            'bg-primary': this.props.isSelected,
            'result-focused': this.props.isSelected
        });

        return (
            <div className={className} onClick={this.onResultClick}>
                <img className="preview" src={gif.url} alt="gif preview" />
                <input id={this.props.result.timestamp} className="form-control url" type="text" readOnly value={gif.url} />
            </div>
        );
    }
}

Result.propTypes = {
    isSelected: React.PropTypes.bool.isRequired,
    result: React.PropTypes.object.isRequired,
    selectGif: React.PropTypes.func.isRequired,
    timestamp: React.PropTypes.number.isRequired,
    unselectGif: React.PropTypes.func.isRequired
};
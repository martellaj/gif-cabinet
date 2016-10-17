import React, { Component } from 'react';
import './SampleData.css';

export default class SampleData extends Component {
    render() {
        if (window.location.search.indexOf('debug=true') > -1) {
            return (
                <div className="sample-data-component">
                    <h2>sample data</h2>
                    <button className="sample-button" onClick={this.props.createSampleData}>load sample data</button>
                    <button className="sample-button" onClick={this.props.deleteSampleData}>clear sample data</button>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
}

SampleData.propTypes = {
    createSampleData: React.PropTypes.func.isRequired,
    deleteSampleData: React.PropTypes.func.isRequired
};
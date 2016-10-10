import React, { Component } from 'react';
import './SampleData.css';

export default class SampleData extends Component {

    /**
     * Render function
     */

    render() {
        return (
            <div className="sample-data-component">
                <h2>sample data</h2>
                <button className="sample-button" onClick={this.props.createSampleData}>load sample data</button>
                <button className="sample-button" onClick={this.props.deleteSampleData}>clear sample data</button>
            </div>
        );
    }
}

SampleData.propTypes = {
    createSampleData: React.PropTypes.func.isRequired,
    deleteSampleData: React.PropTypes.func.isRequired
};
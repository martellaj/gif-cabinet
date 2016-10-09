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
                <button className="sample-button" onClick={this.props.loadSampleData}>load sample data</button>
                <button className="sample-button" onClick={this.props.clearSampleData}>clear sample data</button>
            </div>
        );
    }
}

SampleData.propTypes = {
    clearSampleData: React.PropTypes.func.isRequired,
    loadSampleData: React.PropTypes.func.isRequired
};
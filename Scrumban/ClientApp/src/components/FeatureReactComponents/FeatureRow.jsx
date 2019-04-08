import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { EditFeature } from './EditFeature';
import '../../GridStyles/StyleForGrid.css';
import { FeaturePrint } from './FeaturePrint.jsx';

export class FeatureRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        }
        this.onStateChanged = this.onStateChanged.bind(this);
    }
    onStateChanged(editState) {
        this.setState({ edit: editState });
    }
    render() {
        return (this.state.edit ? <EditFeature featuretoEdit={this.props.feature} onStateUpdating={this.onStateChanged} /> :
            <FeaturePrint onStateUpdating={this.onStateChanged} feature={this.props.feature} />

        );
    }
}
import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';
import '../../GridStyles/StyleForGrid.css';

export class StoryPrint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listFeatureOpen: false,
            listSprintOpen: false,
            story : this.props.item
        }
        this.getFirstDescriptionWord = this.getFirstDescriptionWord.bind(this);
        //this.getSprintName = this.getSprintName.bind(this);
    }

    getFirstDescriptionWord() {
        var descriptionString = this.state.story.description;
        var index = descriptionString.indexOf(" ");
        return descriptionString.slice(0, index);
    }
    //getSprintName() {
    //    var currentSprint = this.state.allSprints;
    //    return currentSprint;
    //}

    render() {
        var v = this.getFirstDescriptionWord();
        //var sprint = this.getSprintName();
        return (
            <tr>
                <td class="col"><label style={{ 'margin': '15px' }}>{this.state.story.name}</label></td>
                <td class="col"><label style={{ 'margin': '15px' }}>{this.state.story.storyState}</label></td>
                <td class="col">
                    <div className="dropdown" style={{ 'margin': '15px' }}>
                    <span style={{ 'margin': '15px' }}>{v + "..."} </span>
                      <div className="dropdown-content">
                            <label>{this.state.story.description}</label>
                      </div>
                  </div>
                </td>
                <td class="col"><label style={{ 'margin': '15px' }}>{this.state.story.storyPoints}</label></td>
                <td class="col"><label style={{ 'margin': '15px' }}>{this.state.story.rank}</label></td>
                <td class="col">
                    <button className="btn btn-sm btn-outline-dark w-100 m-1" type="button" onClick={this.props.edit}>Edit</button>
                    <button className="btn btn-sm btn-outline-dark w-100 m-1" type="submit" onClick={this.props.delete}>Delete</button>
                </td>
            </tr>
        );
    }
}
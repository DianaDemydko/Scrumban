import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';
import '../../GridStyles/StyleForGrid.css';

const emptyAvatar = require('../PanelReactComponents/user.png');

export class StoryPrint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listFeatureOpen: false,
            listSprintOpen: false,
            story: this.props.item,
            featureName: '',
            sprintName: ''
        }
        this.getFirstDescriptionWord = this.getFirstDescriptionWord.bind(this);
        this.getFeatureName = this.getFeatureName.bind(this);
        this.getSprintName = this.getSprintName.bind(this);
    }

    componentDidMount() {
        this.getFeatureName();
        this.getSprintName();
    }

    getFeatureName() {
        fetch('api/FeatureData/' + this.state.story.featureId)
            .then(function (response) {
                if (response.status == 200) {
                    return response.json();
                }
            })
            .then(data => {
                if (data != null) {
                    this.setState({ featureName: data.name });
                } else {
                    this.setState({ featureName: 'None' });
                }
             }
            );
    }

    getSprintName() {
        fetch('api/Sprint/Index')
            .then(res => res.json())
            .then(json => {
                var allSprints = json;
                if (this.state.story.sprint_id != 0) {
                    var sprintName = allSprints.filter(item => item.sprint_id === this.state.story.sprint_id)[0].name;
                    this.setState({ sprintName: sprintName });
                }
            });
    }

    getFirstDescriptionWord() {
        var descriptionString = this.state.story.description;
        var index = descriptionString.indexOf(" ");
        return descriptionString.slice(0, index);
    }

    render() {
        var v = this.getFirstDescriptionWord();
        //var sprint = this.getSprintName();
        return (
            <tr>
                <td className="col"><label style={{ 'margin': '15px' }}>{this.state.story.name}</label></td>
                <td className="col"><label style={{ 'margin': '15px' }}>{this.state.story.storyState}</label></td>
                <td className="col">
                    <div className="dropdown" style={{ 'margin': '15px' }}>
                    <span style={{ 'margin': '15px' }}>{v + "..."} </span>
                      <div className="dropdown-content">
                            <label>{this.state.story.description}</label>
                      </div>
                  </div>
                </td>
                <td class="col">{this.state.story.userId != null ? <img src={this.state.story.user.picture != null && this.state.story.user.picture.image != null ? this.state.story.user.picture.image : emptyAvatar} style={{ 'width': '40px', 'height': '40px', 'border-radius': '50%' }} className="picture" title={this.state.story.user != null ? `${this.state.story.user.firstName}  ${this.state.story.user.surname}` : null} /> : "None"}</td>
                <td className="col"><label style={{ 'margin': '15px' }}>{this.state.story.storyPoints}</label></td>
                <td className="col"><label style={{ 'margin': '15px' }}>{this.state.story.rank}</label></td>
                <td className="col"><label style={{ 'margin': '15px' }}>{this.state.featureName}</label></td>
                <td className="col"><label style={{ 'margin': '15px' }}>{this.state.sprintName}</label></td>
                <td className="col">
                    <button className="btn btn-sm btn-outline-dark w-100 m-1" type="button" onClick={this.props.edit}>Edit</button>
                    <button className="btn btn-sm btn-outline-dark w-100 m-1" type="submit" onClick={this.props.delete}>Delete</button>
                </td>
            </tr>
        );
    }
}
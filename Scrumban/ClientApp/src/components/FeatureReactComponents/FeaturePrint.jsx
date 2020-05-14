import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';
import '../../GridStyles/StyleForGrid.css';
import { toast } from 'react-toastify';

const icon_up = require("./sort-arrow-up.svg")
const icon_down = require("./sort-arrow-down.svg")
const emptyAvatar = require('../PanelReactComponents/user.png');

export class FeaturePrint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feature: this.props.feature,
            editState: false,
            firstDescriptionWord: '', 
            listOpen: false
        }
        this.toggleList = this.toggleList.bind(this);

        this.onEditButtonClick = this.onEditButtonClick.bind(this);
        this.getFirstDescriptionWord = this.getFirstDescriptionWord.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }
    onDeleteClick() {
        fetch('api/FeatureData/', {
            method: 'delete',
            headers: { "Content-Type": "application/json" },
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: this.state.feature.id, stories: this.state.feature.stories })
        }).then(function (response) {
            let responseStatus = response.status
            switch (responseStatus) {
                case 200:
                    toast.success("Feature was deleted !");
                    this.props.DeleteStatusChanged(true);
                    break
            }
        }.bind(this))
       
    }
    getFirstDescriptionWord() {
        var descriptionString = this.state.feature.description;
        var index = descriptionString.indexOf(" ");
        return descriptionString.slice(0, index);
    }
    onEditButtonClick(e) {

        this.setState({ editState: !this.state.editState });
        this.props.onStateUpdating(this.state.editState);

    }

    toggleList() {
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }))
    }
    componentWillReceiveProps(newProps) {
        this.setState({ feature: newProps.feature });
    }
    render() {

        var v = this.getFirstDescriptionWord();
        return (
            <tr id='featureOutputForm'>
                <td class="col"><label style={{ 'margin': '15px' }}>{this.state.feature.name}</label>
                </td>
                <td class="col" >
                    <div className="dropdown" style={{ 'margin': '15px' }}>
                        <span style={{ 'margin': '15px' }}>{v + "..."} </span>
                        <div className="dropdown-content">
                            <label>{this.state.feature.description}</label>
                        </div>
                    </div>
                </td>
                <td class="col" > <label style={{ 'margin': '15px' }}>{this.state.feature.state.name}</label> </td>
                <td class="col">{this.state.feature.userId != null ? <img src={this.state.feature.user.picture != null && this.state.feature.user.picture.image != null ? this.state.feature.user.picture.image : emptyAvatar} style={{ 'width': '40px', 'height': '40px' }} className="picture" title={this.state.feature.user != null ? `${this.state.feature.user.firstName}  ${this.state.feature.user.surname}` : null} /> : "None"}</td>
                {/*<td class="col" > {this.state.feature.owner.name } </td>*/}
                <td class="col"> <label style={{ 'margin': '15px' }}>{this.state.feature.priority.name}</label> </td>

                <td class="col"> 
                    <div>
                        <div className="dd-header" style={{ 'margin': '15px' }} onClick={() => this.toggleList()}>
                            <div className="dd-header-title">Stories
                            {this.state.listOpen
                                    ? <span class="fa fa-caret-up" id="active-caret"/>
                                : <span class="fa fa-caret-down" id="active-caret"/>
                                }
                            </div>
                        </div>
                        {this.state.listOpen && <ul className="dd-list">
                            {this.state.feature.stories.map((item) => (
                                <li className="dd-list-item" key={item.id} >{item.name}</li>
                            ))}
                        </ul>}
                    </div>
                    </td>
                <td class="col" style={{ 'margin': '15px','vertical-align': 'middle' }}>
                    <Moment class="col" style={{ 'margin': '15px' }} parse="YYYY/MM/DD" format="YYYY/MM/DD" > {this.state.feature.time} </Moment>
                </td>
               
                {this.props.currentUser.roleId != 1 ?
                    (<td class="col">
                        <button className="btn btn-sm btn-outline-dark w-100 m-1" id='editButton' onClick={e => this.onEditButtonClick(e)} >
                            Edit
                         </button>
                        <button className="btn btn-sm btn-outline-dark w-100 m-1" onClick={e => this.onDeleteClick(e)}>Delete</button> </td> ) : null}
                
            </tr>);
    }
}
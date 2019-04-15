import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';
import '../../GridStyles/StyleForGrid.css';

const icon_up = require("./sort-arrow-up.svg")
const icon_down = require("./sort-arrow-down.svg")

class DeleteButton extends Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }
    onClick(e) {
        fetch('api/FeatureData/', {
            method: 'delete',
            headers: { "Content-Type": "application/json" },
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: this.props.featureIDtoDelete })
        });

        window.location.reload();
    }
    render() {
        return (
            <button onClick={e => this.onClick(e)} class="btn btn-sm btn-outline-dark w-100">
                Delete
            </button>
        );
    }
}


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
    render() {

        var v = this.getFirstDescriptionWord();
        return (
            <tr id='featureOutputForm'>
                <td class="col">{this.state.feature.name}
                </td>
                <td class="col" >
                    <div className="dropdown">
                        <span>{v + "..."} </span>
                        <div className="dropdown-content">
                            <label>{this.state.feature.description}</label>
                        </div>
                    </div>
                </td>
                <td class="col" > {this.state.feature.state.name} </td>
                {/*<td class="col" > {this.state.feature.owner.name } </td>*/}
                <td class="col"> Owner </td>
                <td class="col"> {this.state.feature.priority.name} </td>

                <td class="col"> 
                    <div>
                        <div className="dd-header" onClick={() => this.toggleList()}>
                            <div className="dd-header-title">Stories
                            {this.state.listOpen
                                ? <ion-icon src={icon_up}  />
                                : <ion-icon src={icon_down}  />
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
                <td class="col">
                    <Moment class="col" parse="YYYY/MM/DD" format="YYYY/MM/DD" > {this.state.feature.time} </Moment>
                </td>
                
                <td class="col">
                    <button className="btn btn-sm btn-outline-dark w-100" id='editButton' onClick={e => this.onEditButtonClick(e)} >
                        Edit
                                </button>
                    <DeleteButton featureIDtoDelete={this.state.feature.id} />
                </td>
            </tr>);
    }
}
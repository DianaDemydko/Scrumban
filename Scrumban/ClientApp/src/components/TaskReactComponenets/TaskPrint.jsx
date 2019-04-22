import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
//import Collapse from "../../../node_modules/react-bootstrap/lib/Collapse"
//import Button from "../../../node_modules/react-bootstrap/lib/Button"
//import Overlay from "../../../node_modules/react-bootstrap/lib/Overlay"
//import Tooltip from "../../../node_modules/react-bootstrap/lib/Tooltip"
//const $ = window.$;


export class TaskPrint extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.item.name}
                </td>
                <td>{this.props.item.description}    </td>
                <td>
                    <DatePicker
                        selected={this.props.item.startDate}
                        dateFormat="MMMM d"
                        className="datePickerStyle btn btn-sm btn-outline-secondary"
                    />
                </td>
                <td>
                    <DatePicker
                        selected={this.props.item.finishDate}
                        dateFormat="MMMM d"
                        className="datePickerStyle btn btn-sm btn-outline-secondary"
                    />
                </td>
                <td>{this.props.item.priority.name}  </td>
                <td>{this.props.item.taskState.name} </td>
                <td>{(this.props.item.user == null) ? ("") : (this.props.item.user.firstName)}</td>
                <td>{(this.props.item.story == null) ? ("") : (this.props.item.story.name)}</td>
                <td>
                    <button type="button" onClick={this.props.edit} className="btn btn-sm btn-outline-info button-fixed">Edit</button>
                </td>
                <td>
                    <button type="submit" onClick={this.props.delete} className="btn btn-sm btn-outline-info button-fixed">Delete</button>
                </td>
            </tr>
        );
    }
}
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./TooltipStyle.css"
//import Collapse from "../../../node_modules/react-bootstrap/lib/Collapse"
//import Button from "../../../node_modules/react-bootstrap/lib/Button"
//import Overlay from "../../../node_modules/react-bootstrap/lib/Overlay"
//import Tooltip from "../../../node_modules/react-bootstrap/lib/Tooltip"
//const $ = window.$;


export class TaskPrint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: { ...this.props.item }
        }

        this.taskHistory = this.taskHistory.bind(this)
    }

    taskHistory() {
        var message = ""
        if (this.props.item.taskChangeHistories != null) {
            this.props.item.taskChangeHistories.map(function (hist) {
                var dateTime = new Date(hist.dateTime)

                message += hist.operation + " by " + hist.user.firstName + " at " + dateTime.getDate() + "." + dateTime.getMonth() + " " + dateTime.getHours() + ":" + dateTime.getMinutes() + "\n"
            })
            alert(message)
        }

    }

    render() {
        return (
            <tr>
                <td>
                    <span onClick={this.taskHistory}><span class="badge badge-info">i </span></span>
                    {" " + this.props.item.name}
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
                    <button type="button" onClick={this.props.edit} className="btn btn-sm btn-outline-dark w-100 m-1">Edit</button>
                </td>
                <td>
                    <button type="submit" onClick={this.props.delete} className="btn btn-sm btn-outline-dark w-100 m-1">Delete</button>
                </td>
            </tr>
        );
    }
}




class ModalWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { ...this.props.user },
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({ user: newProps.user })
    }

    render() {
        var name
        if (this.props.user == null) {
            name = "11"
        }
        else {
            name = this.props.user.firstName
        }

        return <span>
            <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModalCenter">
                i
            </button>

            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">History</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">{name}</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            {name}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </span>
    }
}

class ModalWrapper extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (<ModalWindow user={this.props.user} />)
    }
}
import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";


const emptyAvatar = require('../PanelReactComponents/user.png');




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
                    {this.props.item.name}

                </td>

                <td>{this.props.item.description}    </td>

                <td>
                    {moment(this.props.item.startDate).format("MM-DD-YYYY")}
                </td>

                <td>
                    {moment(this.props.item.finishDate).format("MM-DD-YYYY")}
                </td>

                <td>{this.props.item.priority.name}  </td>

                <td>{this.props.item.taskState.name} </td>

                <td class="col">{this.props.item.userId != null ? <img src={this.props.item.user.picture != null && this.props.item.user.picture.image != null ? this.props.item.user.picture.image : emptyAvatar} style={{ 'width': '40px', 'height': '40px', 'border-radius': '50%' }} className="picture" title={this.props.item.user != null ? `${this.props.item.user.firstName}  ${this.props.item.user.surname}` : null} /> : "None"}</td>

                <td>{(this.props.item.story == null) ? ("None") : (this.props.item.story.name)}</td>

                <td colSpan="2">

                    <button type="button" onClick={this.props.edit} className="btn btn-sm btn-outline-dark w-100 m-1">Edit</button>

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
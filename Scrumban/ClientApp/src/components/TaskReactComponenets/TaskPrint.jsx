import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
//const $ = window.$;

export class TaskPrint extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td className="w-25">{this.props.item.name}           </td>
                <td>{this.props.item.description}    </td>
                <td>
                    <DatePicker
                        selected={this.props.item.startDate}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d"
                        timeCaption="time"
                        className="datePickerStyle btn btn-sm btn-outline-secondary"
                    />
                </td>
                <td>
                    <DatePicker
                        selected={this.props.item.finishDate}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d"
                        timeCaption="time"
                        className="datePickerStyle btn btn-sm btn-outline-secondary"
                    />
                </td>
                <td>{this.props.item.priority.name}  </td>
                <td>{this.props.item.taskState.name} </td>
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
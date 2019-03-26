import React, { Component } from 'react';

export class TaskPrint extends React.Component {
    constructor(props) {
        super(props);
        //edit
        //delete
        //isEdit
    }

    render() {
        return (
            <tr>
                <td>{this.props.item.name}           </td>
                <td>{this.props.item.description}    </td>
                <td>{this.props.item.priority.name}  </td>
                <td>{this.props.item.taskState.name} </td>
                <td>
                    <button type="button" onClick={this.props.edit} className="btn btn-outline-danger button-fixed">Edit</button>
                    <button type="submit" onClick={this.props.delete} className="btn btn-danger button-fixed">Delete</button>
                </td>
            </tr>
       );
    }
}
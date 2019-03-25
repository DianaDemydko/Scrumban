import React, { Component } from 'react';

export class DefectTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.description}</td>
                <td>{this.props.item.state}</td>
                <td>{this.props.item.priority}</td>
                <td>{this.props.item.severity}</td>
                <td>{this.props.item.storyId}</td>
                <td>{this.props.item.status}</td>
                <td>
                    <button onClick={this.props.editDefect} className="btn btn-primary">Edit</button>
                    <button onClick={this.props.deleteDefect} className="btn btn-primary">Delete</button>
                </td>
            </tr>
        );
    }
}
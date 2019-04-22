import React, { Component } from 'react';

export class DefectPrint extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr key={this.props.key}>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.description}</td>
                <td>{this.props.item.state}</td>
                <td>{this.props.item.priority}</td>
                <td>{this.props.item.severity}</td>
                <td>{this.props.item.storyId}</td>
                <td>{this.props.item.status}</td>
                <td>
                    <button type="button" onClick={this.props.editDefect} className="btn btn-sm btn-outline-dark w-100 m-1">Edit</button>
                </td>
                <td>
                    <button type="submit" onClick={this.props.deleteDefect} className="btn btn-sm btn-outline-dark w-100 m-1">Delete</button>
                </td>
            </tr>
        );
    }
}
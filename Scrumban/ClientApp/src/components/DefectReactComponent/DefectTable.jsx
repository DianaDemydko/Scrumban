import React, { Component } from 'react';

export class DefectTable extends React.Component {
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
                    <button style={{ width: '50%' }} type="button" onClick={this.props.editDefect} className="btn btn-primary">Edit</button>
                    <button style={{ width: '50%' }} type="submit" onClick={this.props.deleteDefect} className="btn btn-primary">Delete</button>
                </td>
            </tr>
        );
    }
}
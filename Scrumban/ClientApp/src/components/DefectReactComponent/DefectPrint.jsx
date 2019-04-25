import React, { Component } from 'react';

export class DefectPrint extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr key={this.props.key}>
                <td class="col">{this.props.item.name}</td>
                <td class="col">{this.props.item.description}</td>
                <td class="col">{this.props.item.state}</td>
                <td class="col">{this.props.item.priority}</td>
                <td class="col">{this.props.item.severity}</td>
                <td class="col">{this.props.item.storyId}</td>
                <td class="col" style={{ 'margin': '15px' }}>{this.props.item.status}</td>
                <td class="col">
                    <button type="button" onClick={this.props.editDefect} className="btn btn-sm btn-outline-dark w-100 m-1">Edit</button>
                    <button type="submit" onClick={this.props.deleteDefect} className="btn btn-sm btn-outline-dark w-100 m-1">Delete</button>
                </td>
            </tr>
        );
    }
}
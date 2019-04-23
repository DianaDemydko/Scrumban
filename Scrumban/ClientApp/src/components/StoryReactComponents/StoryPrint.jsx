import React, { Component } from 'react';

export class StoryPrint extends React.Component {
    constructor(props) {
        super(props);
        //edit
        //delete
        //isEdit
    }

    render() {
        return (
            <tr>
                <td class="col">{this.props.item.name}           </td>
                <td class="col">{this.props.item.description}    </td>
                <td class="col">{this.props.item.priority.name}  </td>
                <td class="col">{this.props.item.storyState.name} </td>
                <td class="col">
                    <button className="btn btn-sm btn-outline-dark w-100 m-1" type="button" onClick={this.props.edit}>Edit</button>
                    <button className="btn btn-sm btn-outline-dark w-100 m-1" type="submit" onClick={this.props.delete}>Delete</button>
                </td>
            </tr>
        );
    }
}
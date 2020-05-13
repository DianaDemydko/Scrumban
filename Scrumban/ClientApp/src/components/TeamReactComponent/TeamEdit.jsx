import React, { Component } from 'react';
import { toast } from 'react-toastify';

export class TeamEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.teamEdit.name,
            project: this.props.teamEdit.project,
            clicked: 'false'
        };
        this.onNameChanged = this.onNameChanged.bind(this);
        this.onProjectChanged = this.onProjectChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }
    onNameChanged(e) {
        this.setState({ name: e.target.value });
    }
    onProjectChanged(e) {
        this.setState({ project: e.target.value });
    }
    async onSubmit() {
        await fetch('api/team/edit/', {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "teamID": this.props.teamEdit.teamID,
                "name": this.state.name,
                "project": this.state.project
            })
        }).then(response => {
            if (response.status == 200) {
                toast.success("Updated successfuly");
            }

            });
        this.props.onStateUpdating(false);
        this.props.loadData();
    }

    onCancel() {

        this.props.onStateUpdating(false);
    }


    render() {

        return <tr>
            <td>
                    <div>
                        <label for="name">Name</label>
                        <input type="text" class="form-control" onChange={e => this.onNameChanged(e)} defaultValue={this.props.teamEdit.name} />
                </div>
            </td>
            <td>

                    <div>
                        <label for="project">Project</label>
                        <input type="text" class="form-control" onChange={e => this.onProjectChanged(e)} defaultValue={this.props.teamEdit.project} />
                    </div>
            </td>
            <td style={{ verticalAlign: 'middle'}}>
                <button type="submit" onClick={this.onSubmit} className="btn btn-sm btn-outline-dark w-100 m-1">Save</button>
            </td>
            <td style={{ verticalAlign: 'middle' }}>
                <button type="submit" onClick={this.onCancel} className="btn btn-sm btn-outline-dark w-100 m-1">Cancel</button>
            </td>
        </tr>;

    }
}
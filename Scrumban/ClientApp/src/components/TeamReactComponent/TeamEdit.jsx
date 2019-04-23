import React, { Component } from 'react';

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
    onSubmit() {
        fetch('api/team/', {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: this.props.teamEdit.id, name: this.state.name,
                project: this.state.project
            })
        });
        window.location.reload();

    }
    onCancel() {

        this.props.onStateUpdating(false);
    }


    render() {

        return <tr>
            <td>
                <form>
                    <div>
                        <label for="name">Name</label>
                        <input type="text" class="form-control" onChange={e => this.onNameChanged(e)} defaultValue={this.props.teamEdit.name} />
                    </div>

                    <div>
                        <label for="project">Project</label>
                        <input type="text" class="form-control" onChange={e => this.onProjectChanged(e)} defaultValue={this.props.teamEdit.project} />
                    </div>
                </form>
            </td>
            <td>
                <button type="submit" onClick={this.onSubmit} class="btn btn-dark">Save</button>
                <button type="submit" onClick={this.onCancel} class="btn btn-dark">Cancel</button>
            </td>
        </tr>;

    }
}
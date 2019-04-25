import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class TeamAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamName: "",
            teamProject : "",
        };
        this.onTeamNameChanged = this.onTeamNameChanged.bind(this);
        this.onTeamProjectChanged = this.onTeamProjectChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);

    }

    onTeamNameChanged(e) {
        this.setState({ teamName: e.target.value });
    }

    onTeamProjectChanged(e) {
        this.setState({ teamProject: e.target.value });
    }

    onAdd(team) {
        fetch('api/team/addTeam', {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                
                "name": team.teamName,
                "project": team.teamProject,
            })
        });
      

    }

    onSubmit(e) {
        e.preventDefault();

        let team = {
            teamName: this.state.teamName,
            teamProject: this.state.teamProject,
        };
        this.onAdd(team);
        this.setState({ teamName: "", teamProject: "" });
        this.props.moveToComponent("teams");
    }
    onCancel(e) {
        e.preventDefault();
        this.props.moveToComponent("teams");
    }
    render() {
        return (
            <div>
                <h3>Add team</h3>
                <form>
                    
                    <div className="form-group">
                        <div className="">
                            <label for="teamName">Name</label>
                            <input type="text" class="form-control" onChange={this.onTeamNameChanged} id="teamName" placeholder="team name" autoComplete="true" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="">
                            <label for="projectName">Project</label>
                            <textarea rows="3" class="form-control" onChange={this.onTeamProjectChanged} id="teamProject" placeholder="project" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-sm btn-outline-dark m-1" onClick={this.onSubmit}>Submit</button>
                    <button type="submit" className="btn btn-sm btn-outline-dark m-1" onClick={this.onCancel}>Cancel</button>
                </form>
            </div>
        );
    }
}
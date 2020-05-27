import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const addTeamUrl = "/api/team/teamAdd";
const cancelUrl = "/teams";

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
        }).then(function (response) {
            let responseStatus = response.status
            switch (responseStatus) {
                case 400:
                    toast.error("Something wrong  !");
                    break
                case 200:
                    toast.success("Team was creaated!");
                    break
            }
        });
      

    }

    onSubmit(e) {
        e.preventDefault();

        let team = {
            teamName: this.state.teamName,
            teamProject: this.state.teamProject,
        };
        if (team.teamName != '' && team.teamProject != '') {
            this.onAdd(team);
            this.setState({ teamName: "", teamProject: "" });
            this.props.moveToComponent("teams");
        } else {
            toast.warn("Name and Project cannot be empty!");
        }
    }
    render() {
        return (
            <div>
                <div className="addComponentBackground" >
                 <label style={{ 'fontSize': '40px' }} className="create-title" >New Team</label>
                    <div />
                    <div className="addContent" style={{ 'display': 'flex' }}>
                        <label className="col-2 mr-10" for="teamName">Name: </label>
                        <input type="text" style={{ 'width': '80%' }} className="form-control" onChange={this.onTeamNameChanged} id="teamName" placeholder="Team name..." autoComplete="true" />
                    </div>
                    <div className="addContent" style={{ 'display': 'flex' }}>
                            <label className="col-2 mr-10" for="projectName">Project: </label>
                        <textarea rows="3" class="form-control" style={{ 'width': '80%' }} onChange={this.onTeamProjectChanged} id="teamProject" placeholder="Project..." />
                        </div>
                        <div className="addContent">
                            <button type="submit" className="btn btn-sm btn-outline-dark" style={{ 'margin-right': '20px', 'width': '50%' }} onClick={(e) => this.onSubmit(e)}>Save</button>

                           
                            <button type="submit" className="btn btn-sm btn-outline-dark" style={{ 'margin-right': '20px', 'width': '40%' }} onClick={() => this.props.moveToComponent("teams")}>Cancel</button>
                           
                        </div>
                </div>
            </div>
        );
    }
}
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const data = require('../../GlobalData.json'); // json file with stable tables (priority, state)
// consts of stable tables
const stateTable = data.storyState;
var check = false;

export class StoryAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            allSprints: [],
            storyState: stateTable[0].name,
            sprint: "",
            storyPoints: 1,
            rank: 1
        };

        this.onNameChanged = this.onNameChanged.bind(this);
        this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
        this.onSprintChanged = this.onSprintChanged.bind(this);
        this.onStateChanged = this.onStateChanged.bind(this);
        this.onStoryPointsChanged = this.onStoryPointsChanged.bind(this);
        this.onRankChanged = this.onRankChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onNameChanged(e) {
        this.setState({ name: e.target.value });
    }
    onStoryPointsChanged(e) {
        this.setState({ storyPoints: e.target.value });
    }
    onRankChanged(e) {
        this.setState({ rank: e.target.value });
    }
    onDescriptionChanged(e) {
        this.setState({ description: e.target.value });
    }

    onSprintChanged(e) {
        check = true;
        this.setState({ sprint: e.target.value });
    }

    onStateChanged(e) {
        this.setState({ storyState: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        var storySprintId = 1;
        if (check === false) {
            storySprintId = this.state.allSprints[0].sprint_id;
        }
        else {
            check = false;
            storySprintId = this.state.allSprints.find(x => x.name === this.state.sprint).sprint_id;
        }
        var storyName = this.state.name;
        var storyDescription = this.state.description;
        var storyPoints = this.state.storyPoints;
        var storyRank = this.state.rank;
        var storyState = this.state.storyState;

        fetch('api/Story/CreateStory',
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'POST',
                body: JSON.stringify({
                    name: storyName,
                    description: storyDescription,
                    sprint_id: storySprintId,
                    storyState: storyState,
                    storyPoints: storyPoints,
                    rank: storyRank
                })

            })
            .then(function (response) {
                let responseStatus = response.status
                switch (responseStatus) {
                    case 400:
                        alert("Creating element went wrong!")
                        break
                    case 200:
                        this.props.moveToComponent("sprints");
                        break
                }
            }.bind(this))
        this.props.moveToComponent("stories");
    }
    componentDidMount() {
        fetch('api/Sprint/Index')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    allSprints: json
                })
            });
    }
   

    render() {
        return (
            <div className="addComponentBackground" >
                <label style={{ 'fontSize': '40px' }} >Add story</label>
                <div />
                    <div className="addContent">
                    <label class="col-2">Name</label>
                    <input type="text" className="inputAdd" onChange={e => this.onNameChanged(e)} id="name" placeholder="story name" autoComplete="false" />
                        </div>
                <div className="addContent">
                    <label class="col-2" for="description">Description</label>
                    <textarea rows="3" className="inputAdd" onChange={e=>this.onDescriptionChanged(e)} id="description" placeholder="story description" />
                        </div>
                    <div className="addContent">
                        <label class="col-2">Story Points</label>
                        <input type="text" className="inputAdd" onChange={e=>this.onStoryPointsChanged(e)} id="storyPoints" placeholder="story points" autoComplete="false" />
                    </div>
                    <div className="addContent">
                        <label class="col-2">Rank</label>
                        <input type="text" className="inputAdd" onChange={e=>this.onRankChanged(e)} id="rank" placeholder="story rank" autoComplete="false" />
                </div>
                <div className="addContent">
                    <label class="col-2" for="sprints">Sprint</label>
                    <select class="btn btn-light dropdown-toggle m-0 w-25" name="sprints" onChange={e => this.onSprintChanged(e)}>
                        {this.state.allSprints.map(sprint => (
                            <option> {sprint.name}</option>))}
                    </select>
                </div>
                    <div className="addContent">
                    <label class="col-2" for="storyState">State</label>
                    <select class="btn btn-light dropdown-toggle m-0 w-25" onChange={e=>this.onStateChanged(e)} id="storyState" placeholder="story state">
                                {stateTable.map((item) => <option>{item.name}</option>)}
                            </select>
                </div>
                <div className="addContent">
                    <button type="submit" class="btn btn-sm btn-outline-dark" style={{ 'margin-right': '20px', 'width': '15%' }} onClick={this.onSubmit}> Submit</button>
                    <button type="submit" class="btn btn-sm btn-outline-dark" style={{ 'margin-right': '20px', 'width':'15%' }} onClick={() => this.props.moveToComponent("stories")}>Cancel</button>
                </div>
                </div>
        );
}
}

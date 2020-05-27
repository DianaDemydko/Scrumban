import React, { Component } from 'react';
const data = require('../../GlobalData.json'); // json file with stable tables (state)

// consts of stable tables
const stateTable = data.storyState;
var check = false;

export class StoryEdit extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            name: this.props.item.name,
            description: this.props.item.description,
            storyPoints: this.props.item.storyPoints,
            storyState: this.props.item.storyState,
            rank: this.props.item.rank,
            allSprints: [],
            sprintId: this.props.item.sprint_id,
            sprint: " ",
            featureId: this.props.item.featureId,
            featureName: '',
            allFeatures: [],
            user: [],
            userId: ""
        };

		this.onNameChanged = this.onNameChanged.bind(this);
		this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
        this.onStoryPointsChanged = this.onStoryPointsChanged.bind(this);
        this.onRankChanged = this.onRankChanged.bind(this);
		this.onStateChanged = this.onStateChanged.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getFeatureName = this.getFeatureName.bind(this);
        this.getAllFeatures = this.getAllFeatures.bind(this);
        this.onFeatureChanged = this.onFeatureChanged.bind(this);
        this.onOwnerChange = this.onOwnerChange.bind(this);
    }

    onOwnerChange(e) {
        if (e.target.value === 'None') {
            this.setState({ userId: null, user: [] });
        } else {
            var user = this.props.users.filter(item => item.id === parseInt(e.target.value))[0];
            this.setState({ userId: e.target.value, user: user });
        }
    }

    onFeatureChanged(e) {
        this.setState({ featureId: e.target.value });
    }

    getFeatureName() {
        fetch('api/FeatureData/' + this.props.item.featureId)
            .then(function (response) {
                if (response.status == 200) {
                    return response.json();
                }
            })
            .then(data => {
                if (data != null) {
                    this.setState({ featureName: data.name });
                } else {
                    this.setState({ featureName: 'None' });
                }
            }
            );

    }
    getAllFeatures() {
        fetch('api/FeatureData/Get')
            .then(function (response) {
                if (response.status == 200) {
                    return response.json();
                }
            })
            .then(data => {
                if (data != null) {
                    this.setState({ allFeatures: data })
                    }
                }
            );

    }
    getCurrentSprint() {
        var currentSprint = this.state.allSprints.find(x => x.sprint_id === this.state.sprintId);
        return currentSprint;
    }
    onNameChanged(e) {
        debugger
		this.setState({ name: e.target.value });
	}

	onDescriptionChanged(e) {
		this.setState({ description: e.target.value });
	}

	onStoryPointsChanged(e) {
		this.setState({ storyPoints: e.target.value });
	}
    onRankChanged(e) {
        this.setState({ rank: e.target.value });
    }
	onStateChanged(e) {
		this.setState({ storyState: e.target.value });
    }
    onSprintChanged(e) {
        check = true;
        this.setState({ sprint: e.target.value })
    }
	onUpdate(story) {
        if (story) {
            fetch('api/Story/UpdateStory', {
                method: 'put',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    story_id: story.id, name: story.name,
                    description: story.description,
                    storyPoints: story.storyPoints,
                    storyState: story.storyState,
                    rank: story.rank,
                    sprint_id: story.sprint_id,
                    featureId: story.featureId,
                    userId: story.userId
                })
            }).then(function (response) {
                let responseStatus = response.status
                switch (responseStatus) {
                    case 200:
                        break
                }
            }.bind(this))
		}
    }
    componentDidMount() {
        fetch('api/Sprint/Index')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    allSprints: json
                })
            });

        this.getAllFeatures();
        this.getFeatureName();
    }

	onSubmit(e) {
		e.preventDefault();
		var storyName = this.state.name;
        var storyDescription = this.state.description;
        var storyPoints = this.state.storyPoints;
        var storyState = this.state.storyState;
        var rank = this.state.rank;
        var sprintId = 1;
        var featureId = this.state.featureId;
        var userId = this.state.userId;
        if (check === false) {
            sprintId = this.state.allSprints[0].sprint_id;
        }
        else {
            check = false;
            sprintId = this.state.allSprints.find(x => x.name === this.state.sprint).sprint_id;
        }
        let story = { id: this.props.item.story_id, name: storyName, description: storyDescription, storyPoints: storyPoints, storyState: storyState, rank: rank, sprint_id: sprintId, featureId: featureId, userId: userId };
        this.onUpdate(story);
        this.setState({ name: "", description: "", storyPoints: "", storyState: "", rank: " ", sprintId: " ", sprint: " ", featureId: " ", userId: "" });
        this.props.edit();
        var callBackstory = { id: this.props.item.story_id, name: this.state.name, description: this.state.description, storyPoints: this.state.storyPoints, storyState: this.state.storyState, rank: this.state.rank, sprint_id: this.state.sprintId, featureId: this.state.featureId, userId: userId, user: this.state.user };
		this.props.changed(callBackstory);

	}

    render() {
		return ( <tr >
            <td>
                <div >
				  <label for="name">Name</label>
				  <input type="text" class="form-control" onChange={this.onNameChanged} id="name" placeholder="story name" autoComplete="false" defaultValue={this.props.item.name} />

                </div>
            </td>
            <td>
                <div >
                    <label for="storyState">State</label>
                    <select class="btn btn-light dropdown-toggle w-100 m-0" name="storyState" onChange={this.onStateChanged} defaultValue={this.props.item.storyState}>
                            {stateTable.map((item) => <option>{item.name}</option>)}
                        </select>
                </div>
            </td>
            <td>
					<div >
							<label for="description">Description</label>
                            <textarea rows="3" type="text" class="form-control" onChange={this.onDescriptionChanged} id="description" placeholder="story description" defaultValue={this.props.item.description} />
                </div>
            </td>
            <td>
                <div>
                    <label for="state">Owner</label>
                    <select onChange={this.onOwnerChange} class="btn btn-light m-0" id="state">
                        <option>None</option>
                        {this.props.users.map((item) => {
                            if (item.id === this.props.item.userId) {
                                return (<option value={item.id} selected>{`${item.firstName}  ${item.surname}`}</option>)
                            } else {
                                return (<option value={item.id}>{`${item.firstName}  ${item.surname}`}</option>)
                            }
                        }
                        )}
                    </select>
                </div>
            </td>
            <td>
                <div>
                        <label for="description">StoryPoints</label>
                    <input type="number" class="form-control" onChange={this.onStoryPointsChanged} id="storyPoints" placeholder="story points" defaultValue={this.props.item.storyPoints} />
                </div>
            </td>
            <td>
                <div>
                        <label for="description">Rank</label>
                    <input type="number" class="form-control" onChange={this.onRankChanged} id="rank" placeholder="story rank" defaultValue={this.props.item.rank} />
                </div>
            </td>
            <td>
                <div>
                    <label for="sprints">Feature</label>
                    <select class="btn btn-light dropdown-toggle w-100 m-0" name="fetures" onChange={(e) => this.onFeatureChanged(e)} defaultValue={this.state.featureName} >
                        <option>None</option>
                        {this.state.allFeatures.map(feature => (
                            <option value={feature.id}> {feature.name}</option>))}
                    </select>
                </div>

            </td>
            <td>
					<div>
                    <label for="sprints">Sprint</label>
                    <select class="btn btn-light dropdown-toggle w-100 m-0" name="sprints" onChange={e => this.onSprintChanged(e)} defaultValue={this.getCurrentSprint()} >
                        <option>None</option>
                            {this.state.allSprints.map(sprint => (
                                <option> {sprint.name}</option>))}
                        </select>
					</div>
				
			</td>
			<td>
                <button type="submit" onClick={this.onSubmit} className="btn btn-sm btn-outline-dark w-100 m-1" >Save</button>
                <button type="submit" onClick={this.props.edit} className="btn btn-sm btn-outline-dark w-100 m-1">Cancel</button>
			</td>
		</tr>);
	}
}
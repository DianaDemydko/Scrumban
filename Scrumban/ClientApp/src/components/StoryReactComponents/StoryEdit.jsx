import React, { Component } from 'react';
const data = require('../../GlobalData.json'); // json file with stable tables (priority, state)
const updateStoryUri = "/api/storyGrid/editStory";

// consts of stable tables
const priorityTable = data.priority;
const stateTable = data.storyState;

export class StoryEdit extends React.Component {

	constructor(props) {
		super(props);
		this.state = { name: this.props.item.name, description: this.props.item.description, priority: this.props.item.priority.name, storyState: this.props.item.storyState.name };

		this.onNameChanged = this.onNameChanged.bind(this);
		this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
		this.onPriorityChanged = this.onPriorityChanged.bind(this);
		this.onStateChanged = this.onStateChanged.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onNameChanged(e) {
		this.setState({ name: e.target.value });
	}

	onDescriptionChanged(e) {
		this.setState({ description: e.target.value });
	}

	onPriorityChanged(e) {
		this.setState({ priority: e.target.value });
	}

	onStateChanged(e) {
		this.setState({ storyState: e.target.value });
	}

	onUpdate(story) {
		if (story) {
			var data = JSON.stringify({ "id": story.id, "name": story.name, "description": story.description, "priorityId": story.priorityId, "storyStateId": story.storyStateId });
			var xhr = new XMLHttpRequest();

			xhr.open("post", updateStoryUri, true);
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.onload = function () {
				if (xhr.status == 200) {

				}
			}.bind(this);
			xhr.send(data);
		}
	}

	onSubmit(e) {
		e.preventDefault();
		var storyName = this.state.name;
		var storyDescription = this.state.description;
		var storyPriorityId = priorityTable.find(x => x.name === this.state.priority).id;
		var storystoryStateId = stateTable.find(x => x.name === this.state.storyState).id;
		let story = { id: this.props.item.id, name: storyName, description: storyDescription, priorityId: storyPriorityId, storyStateId: storystoryStateId };
		this.onUpdate(story);
		this.setState({ name: "", description: "", priority: "", storyState: "" });
		this.props.edit();

		var priority = { id: storyPriorityId, name: this.state.priority };
		var state = { id: storystoryStateId, name: this.state.storyState };
		var callBackstory = { id: this.props.item.id, name: this.state.name, description: this.state.description, priority: priority, storyState: state };
		this.props.changed(callBackstory);

	}

	render() {
		return <tr className="current-row">
			<td colSpan="4">
				
					<div className="form-group">
						<div className="col-md-7">
							<label for="name">Name</label>
							<input type="text" class="form-control" onChange={this.onNameChanged} id="name" placeholder="story name" autoComplete="false" defaultValue={this.props.item.name} />
						</div>
					</div>
					<div className="form-group">
						<div className="col-md-7">
							<label for="description">Description</label>
							<textarea rows="3" class="form-control" onChange={this.onDescriptionChanged} id="description" placeholder="story description" defaultValue={this.props.item.description} />
						</div>
					</div>
					<div className="form-group">
						<div className="col-md-7">
							<label for="priority">Priority</label>
                        <select class="btn btn-light dropdown-toggle w-100 m-0" id="priority" onChange={this.onPriorityChanged} placeholder="story priority" defaultValue={this.props.item.priority.name}>
								{priorityTable.map((item) => <option>{item.name}</option>)}
							</select>
						</div>
					</div>
					<div className="form-group">
						<div className="col-md-7">
							<label for="storyState">State</label>
                        <select class="btn btn-light dropdown-toggle w-100 m-0" id="storyState" onChange={this.onStateChanged} placeholder="story state" defaultValue={this.props.item.storyState.name}>
								{stateTable.map((item) => <option>{item.name}</option>)}
							</select>
						</div>
					</div>
				
			</td>
			<td>
                <button type="submit" onClick={this.onSubmit} className="btn btn-sm btn-outline-dark w-100 m-1">Save</button>
                <button type="submit" onClick={this.props.edit} className="btn btn-sm btn-outline-dark w-100 m-1">Cancel</button>
			</td>
		</tr>;
	}
}
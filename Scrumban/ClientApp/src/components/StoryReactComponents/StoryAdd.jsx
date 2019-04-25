import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const data = require('../../GlobalData.json'); // json file with stable tables (priority, state)
// consts of urls
const addStoryUri = "/api/storyGrid/CreateStory";
const cancelUrl = "/stories";
// consts of stable tables
const priorityTable = data.priority;
const stateTable = data.storyState;


export class StoryAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "", description: "", priority: priorityTable[0].name, storyState: stateTable[0].name
        };

        this.onNameChanged = this.onNameChanged.bind(this);
        this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
        this.onPriorityChanged = this.onPriorityChanged.bind(this);
        this.onStateChanged = this.onStateChanged.bind(this);
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

    onAdd(story) {
        if (story) {
            var data = JSON.stringify({ "name": story.name, "description": story.description });
            var xhr = new XMLHttpRequest();

            xhr.open("post", addStoryUri, true);
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
        var storyStateId = stateTable.find(x => x.name === this.state.storyState).id;

        let story = { name: storyName, description: storyDescription, priority: storyPriorityId, storyState: storyStateId };
        this.onAdd(story);
        this.setState({ name: "", description: "", priorityId: 2, storyStateId: 1 });
        //window.location.replace("/stories");
        this.props.moveToComponent("stories");
    }
   

    render() {
        return (
            <div className="addComponentBackground" >
                <label style={{ 'fontSize': '40px' }} >Add story</label>
                <div />
                    <div className="addContent">
                    <label class="col-2">Name</label>
                    <input type="text" className="inputAdd" onChange={this.onNameChanged} id="name" placeholder="story name" autoComplete="false" />
                        </div>
                <div className="addContent">
                    <label class="col-2" for="description">Description</label>
                    <textarea rows="3" className="inputAdd" onChange={this.onDescriptionChanged} id="description" placeholder="story description" />
                        </div>
                    <div className="addContent">
                    <label class="col-2" for="priority">Priority</label>
                    <select class="btn btn-light dropdown-toggle m-0 w-25" onChange={this.onPriorityChanged} id="priority" placeholder="story priority" defaultValue={priorityTable[0].name}>
                                {priorityTable.map((item) => <option>{item.name}</option>)}
                            </select>
                        </div>
                    <div className="addContent">
                    <label class="col-2" for="storyState">State</label>
                    <select class="btn btn-light dropdown-toggle m-0 w-25" onChange={this.onStateChanged} id="storyState" placeholder="story state" defaultValue={stateTable[0].name}>
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

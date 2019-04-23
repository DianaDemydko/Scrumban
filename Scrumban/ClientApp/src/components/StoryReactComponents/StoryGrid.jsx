import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { StoryComponent } from './StoryComponent';

//import '../../index.css';

// const
const apiUrlGet = "/api/storyGrid/GetStories";
const apiUrlDelete = "/api/storyGrid";




export class StoryGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = { stories: [] };

        this.onRemoveStory = this.onRemoveStory.bind(this);
        this.onAdded = this.onAdded.bind(this);
        this.onChanged = this.onChanged.bind(this);
    }

    // Load data
    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", apiUrlGet, true);
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ stories: data });
        }.bind(this);
        xhr.send();
    }

    componentDidMount() {
        this.loadData();
    }

    onAdded(item) {
        this.setState({ stories: this.state.stories.push(item) });
    }

    onChanged(item) {
        var arr = this.state.stories;
        var index = arr.indexOf(x => x.id = item.id);
        arr[index] = item;
        this.setState({ stories: arr });
    }

    onRemoveStory(id) {
        var url = apiUrlDelete + "/" + id;

        var xhr = new XMLHttpRequest();
        xhr.open("delete", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status == 200) {
                this.loadData();
            }
        }.bind(this);
        xhr.send();
    }

    render() {
        var remove = this.onRemoveStory;
        var changed = this.onChanged;
        return (<div>
            <label style={{ 'fontSize': '40px' }}>Stories</label>
            <div className="tablePosition">
                <table class="table table-striped" style={{ 'table-layout': 'fixed' }}>
                    <thead>
                        <th className="col">Name</th>
                        <th className="col">Description</th>
                        <th className="col">Priority</th>
                        <th className="col">State</th>
                    </thead>
                    {this.state.stories.map(function (story) { return <StoryComponent key={story.id} story={story} onRemove={remove} onChanged={changed} /> })}
                </table>
                <button class="btn btn-sm btn-outline-dark" onClick={() => this.props.moveToComponent("storyAdd")}>Create New</button>
            </div>
        </div>
        );
    }
}
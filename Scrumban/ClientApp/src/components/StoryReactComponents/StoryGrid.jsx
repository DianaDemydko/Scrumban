import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { StoryComponent } from './StoryComponent';
import '../../GridStyles/StyleForGrid.css';

//import '../../index.css';

// const

const apiUrlDelete = "/api/Story/DeleteStory";

//const icon_up = require("./sort-arrow-up.svg")
//const icon_down = require("./sort-arrow-down.svg")




export class StoryGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stories: []
        };

        this.onRemoveStory = this.onRemoveStory.bind(this);
        this.onChanged = this.onChanged.bind(this);
        this.loadData = this.loadData.bind(this);
        this.fetchSprints = this.fetchSprints.bind(this);
    }
    onDeleteItem(id) {
        var newStory = this.state.stories.filter(function (x) {
            return x.story_id != id;
        });
        this.setState({ stories: newStory });
        this.loadData();
    }
    // Load data
    loadData() {
        fetch('api/Story/GetStories', {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) {
                if (response.status == 200) {
                    return response.json()
                }
                else if (response.status == 401) {
                    var answer = window.confirm("You are not authorized. Move to Login page ?");
                    if (answer == true) {
                        window.location.replace("/login");
                    }
                }
                else if (response.status == 403) {
                    alert("ERROR! You have not permission !")
                }
                else {
                    alert("ERROR! Status code: " + response.status)
                }
            })
            .then(data =>
                this.setState({ stories: data })
        );
    }
    fetchSprints() {

        fetch("/api/sprint/index")

            .then(response => response.json())

            .then(data => {

                this.setState({ sprints: data })

            });

    }
    componentDidMount(){
        this.loadData();
        this.fetchSprints();
    }
    componentWillUpdate() {
        this.loadData();
    }

    onChanged(item) {
        var arr = this.state.stories;
        var index = arr.indexOf(x => x.id = item.id);
        arr[index] = item;
        this.setState({ stories: arr });
    }

    onRemoveStory(id) {

        fetch('/api/Story/' + id, {
            method: "delete",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            if (response.status == 200) {
                this.onDeleteItem(id);
                }
                else if (response.status == 401) {
                    var answer = window.confirm("You are not authorized. Move to Login page ?")
                    if (answer == true) {
                        window.location.replace("/login");
                    }
                }
                else if (response.status == 403) {
                    alert("ERROR! You have not permission !")
                }
                else {
                    alert("ERROR! Status code: " + response.status)
                }
            }.bind(this));
    }

    render() {
        var remove = this.onRemoveStory;
        var changed = this.onChanged;
        return (<div>
            <label style={{ 'fontSize': '40px' }}>Stories</label>
            <div className="tablePosition">
                <table class="table table-striped" style={{ 'table-layout': 'fixed' }}>
                    <thead>
                        <th className="col" style={{ cursor: 'pointer' }}>Name</th>
                        <th className="col" style={{ cursor: 'pointer' }}>State</th>
                        <th className="col" style={{ cursor: 'pointer' }}>Description</th>
                        <th className="col" style={{ cursor: 'pointer' }}>Story points</th>
                        <th className="col" style={{ cursor: 'pointer' }}>Rank</th>
                        <th class="col"  />
                        <th class="col" />
                    </thead>
                    {this.state.stories.map(function (story) { return <StoryComponent key={story.id} story={story}  onRemove={remove} onChanged={changed} /> })}
                </table>
                <button class="btn btn-sm btn-outline-dark" style={{ 'margin': '20px' }} onClick={() => this.props.moveToComponent("storyAdd")}>Create New</button>
            </div>
        </div>
        );
    }
}
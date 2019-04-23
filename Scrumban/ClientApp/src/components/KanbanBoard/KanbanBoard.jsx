import React from 'react';
import KanbanColumn from './KanbanColumn';
import buildQuery from 'odata-query';

import "./css/KanbanBoard.css";

const apiUrlGetStories = "api/Story/GetStories";
const apiUrlUpdateStory = "api/Story/UpdateStory";


export default class KanbanBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            stories: [],
            columns: [],
        }

        this.state.columns = [
            { name: 'Tasks', column_id: 'Tasks' },
            { name: 'To Do', column_id: 'To_Do' },
            { name: 'In Progress', column_id: 'In_Progress' },
            { name: 'Testing', column_id: 'Testing' },
            { name: 'Done', column_id: 'Done' }
        ]

        this.onDragStart = this.onDragStart.bind(this)
        this.onDrop = this.onDrop.bind(this)
        this.onDragOver = this.onDragOver.bind(this)

        this.getStoriesData = this.getStoriesData.bind(this)
        this.setAdditionalData = this.setAdditionalData.bind(this)
        this.ChangeColumnAllowed = this.ChangeColumnAllowed.bind(this)
    }

    componentDidMount() {
        var orderBy = ['rank desc']
        var query = buildQuery({ orderBy })

        this.getStoriesData(query)
    }

    getStoriesData(query) {
        fetch(apiUrlGetStories + query)
            .then(response => response.json())
            .then(data => {
                this.setState({ stories: data, isLoading: false }, this.setAdditionalData)
            })
    }

    setAdditionalData() {
        //Set columns
        if (this.state.stories.length > 0) {
            this.setState({
                stories: this.state.stories.map((story) => {
                    switch (story.storyState) {
                        case "Not Selected":
                            story.column_id = this.state.columns[0].column_id
                            return story
                        case "Selected":
                            story.column_id = this.state.columns[1].column_id
                            return story
                        case "In Progress":
                            story.column_id = this.state.columns[2].column_id
                            return story
                        case "Testing":
                            story.column_id = this.state.columns[3].column_id
                            return story
                        case "Done":
                            story.column_id = this.state.columns[4].column_id
                            return story
                        case "Rejected":
                            story.column_id = this.state.columns[1].column_id
                            return story
                    }
                }, this)
            })
        }
    }

    onDragStart(e, item_id) {
        e.dataTransfer.setData("item", item_id)
    }

    onDrop(e, column_id) {
        let item_id = e.dataTransfer.getData("item")
        e.preventDefault();

        if (item_id !== undefined && item_id != "" && item_id != null) {

            let story = this.state.stories.find(story => story.story_id == item_id)

            if (story.column_id == column_id) return

            let updatedStoryState = this.ChangeColumnAllowed(story.column_id, column_id)

            if (updatedStoryState != null) {
                let storyToUpdate = { ...story }
                storyToUpdate.storyState = updatedStoryState

                if (column_id == 'In_Progress' && story.startDate == null) {
                    storyToUpdate.StartDate = new Date();
                }

                if (column_id == 'Done') {
                    storyToUpdate.EndDate = new Date();
                }

                fetch(apiUrlUpdateStory,
                    {
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(storyToUpdate),
                        method: 'put'
                    })
                    .then(function (response) {
                        let responseStatus = response.status
                        switch (responseStatus) {
                            case 404:
                                alert("Updaiting element went wrong!")
                                break
                            case 200:
                                let updatedStories = this.state.stories.slice();
                                storyToUpdate.column_id = column_id
                                let index = updatedStories.findIndex(story => story.story_id == storyToUpdate.story_id)
                                updatedStories[index] = storyToUpdate
                                this.setState({ stories: updatedStories });
                                break
                        }
                    }.bind(this))
                    .catch((e) => alert(e + "Unexpected error occured."))
            }
            else {
                alert("Drop not allowed")
            }
        }
    }

    ChangeColumnAllowed(prevColumnID, nextColumnID) {

        if (nextColumnID == 'Tasks') {
            return null
        }

        if (nextColumnID == 'To_Do') {
            switch (prevColumnID) {
                case 'Tasks': return 'Selected'
                case 'Testing': return 'Rejected'
                default: return null
            }
        }

        if (nextColumnID == 'In_Progress') {
            if (prevColumnID == 'To_Do') { return 'In Progress' }
            else { return null }
        }

        if (nextColumnID == 'Testing') {
            if (prevColumnID == 'In_Progress') { return 'Testing' }
            else { return null }
        }

        if (nextColumnID == 'Done') {
            if (prevColumnID == 'Testing') { return 'Done' }
            else { return null }
        }

        return null;
    }

    onDragOver(e) {
        e.preventDefault()
    }


    render() {
        if (this.state.isLoading) {
            return (<h3>Loading...</h3>);
        }

        return (
            <div id="kanban-board">
                {this.state.columns.map((column) => {
                    return (

                        <KanbanColumn
                            name={column.name}
                            column_id={column.column_id}
                            key={column.column_id}
                            stories={this.state.stories.filter((story) => { return story.column_id === column.column_id })}
                            onDragStart={this.onDragStart}
                            onDrop={this.onDrop}
                            onDragOver={this.onDragOver}
                        />

                    );
                })}
            </div>
        );
    }
}
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
            columns: [],

            TasksStories: [],
            ToDoStories: [],
            InProgressStories: [],
            TestingStories: [],
            DoneStories: [],
        }

        this.state.columns = [
            { name: 'Tasks', column_id: 'Tasks' },
            { name: 'To Do', column_id: 'To_Do' },
            { name: 'In Progress', column_id: 'In_Progress' },
            { name: 'Testing', column_id: 'Testing' },
            { name: 'Done', column_id: 'Done' }
        ]


        this.onDrop = this.onDrop.bind(this)

        this.getStoriesData = this.getStoriesData.bind(this)
        this.setData = this.setData.bind(this)
        this.GetStoriesArray = this.GetStoriesArray.bind(this)
        this.UpdateStoriesArray = this.UpdateStoriesArray.bind(this)
        this.renderColumns = this.renderColumns.bind(this)
        this.renderSingleColumn = this.renderSingleColumn.bind(this)
        this.ChangeColumnAllowed = this.ChangeColumnAllowed.bind(this)
    }

    componentDidMount() {
        var orderBy = ['rank asc']
        var query = buildQuery({ orderBy })

        this.getStoriesData(query)
    }

    getStoriesData(query) {
        fetch(apiUrlGetStories + query)
            .then(response => response.json())
            .then(data => {
                this.setData(data)
            })
    }

    setData(stories) {
        var temp_TasksStories = []
        var temp_ToDoStories = []
        var temp_InProgressStories = []
        var temp_TestingStories = []
        var temp_DoneStories = []

        stories.map(function(story) {
            switch (story.storyState) {
                case "Not Selected":
                    story.column_id = this.state.columns[0].column_id
                    temp_TasksStories.push(story)
                    return
                case "Selected":
                    story.column_id = this.state.columns[1].column_id
                    temp_ToDoStories.push(story)
                    return
                case "In Progress":
                    story.column_id = this.state.columns[2].column_id
                    temp_InProgressStories.push(story)
                    return
                case "Testing":
                    story.column_id = this.state.columns[3].column_id
                    temp_TestingStories.push(story)
                    return
                case "Done":
                    story.column_id = this.state.columns[4].column_id
                    temp_DoneStories.push(story)
                    return
                case "Rejected":
                    story.column_id = this.state.columns[1].column_id
                    temp_ToDoStories.push(story)
                    return
            }
        }.bind(this))

        this.setState({
            TasksStories: temp_TasksStories,
            ToDoStories: temp_ToDoStories,
            InProgressStories: temp_InProgressStories,
            TestingStories: temp_TestingStories,
            DoneStories: temp_DoneStories,
            isLoading: false,
        })
    }

    GetStoriesArray(column_id) {
        switch (column_id) {
            case "Tasks":
                return this.state.TasksStories
            case "To_Do":
                return this.state.ToDoStories
            case "In_Progress":
                return this.state.InProgressStories
            case "Testing":
                return this.state.TestingStories
            case "Done":
                return this.state.DoneStories
        }
    }

    UpdateStoriesArray(column_id, updatedArray) {
        switch (column_id) {
            case "Tasks":
                return this.setState({ TasksStories: updatedArray })
            case "To_Do":
                return this.setState({ ToDoStories: updatedArray })
            case "In_Progress":
                return this.setState({ InProgressStories: updatedArray })
            case "Testing":
                return this.setState({ TestingStories: updatedArray })
            case "Done":
                return this.setState({ DoneStories: updatedArray })
        }
    }

    onDrop(e, dropping_column_id, prev_story_id) {
        let story_id = e.dataTransfer.getData("story_id")
        let start_column_id = e.dataTransfer.getData('column_id')

        if (story_id !== undefined && story_id != "" && story_id != null) {

            let droppingStory = this.GetStoriesArray(start_column_id).find(story => story.story_id == story_id)

            if (start_column_id == dropping_column_id) {

                let updatedStories = this.GetStoriesArray(start_column_id)
                let dropping_story_index = updatedStories.findIndex(story => story.story_id == droppingStory.story_id)

                let start_index = 0
                let end_inxex = 0

                //remove dropping story
                updatedStories = updatedStories.filter(story => story.story_id != droppingStory.story_id)

                if (prev_story_id == null) {

                    start_index = 0
                    end_inxex = dropping_story_index

                    //add droppingStory to the beginning
                    updatedStories.unshift(droppingStory) 
                }
                else {

                    let prev_story_index = updatedStories.findIndex(story => story.story_id == prev_story_id)

                    start_index = Math.min(prev_story_index, dropping_story_index)
                    end_inxex = Math.max(prev_story_index, dropping_story_index)

                    //insert droppingStory
                    updatedStories.splice(prev_story_index + 1, 0, droppingStory)
                }

                for (let i = start_index; i <= end_inxex; i++) {
                    updatedStories[i].rank = i + 1;
                } 

                //update stories updatedStories[0] - updatedStories[index]

                this.UpdateStoriesArray(dropping_column_id, updatedStories)
            }
            else {
                let updatedStoryState = this.ChangeColumnAllowed(start_column_id, dropping_column_id)

                if (updatedStoryState != null) {

                    droppingStory.storyState = updatedStoryState

                    if (dropping_column_id == 'In_Progress' && droppingStory.startDate == null) {
                        droppingStory.StartDate = new Date();
                    }

                    if (dropping_column_id == 'Done') {
                        droppingStory.EndDate = new Date();
                    }
                }
                else {
                    alert("Drop not allowed")
                }
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

    

    renderColumns() {
        return (
            this.state.columns.map((column) => {
                switch (column.name) {
                    case "Tasks":
                        return this.renderSingleColumn(column, this.state.TasksStories)
                    case "To Do":
                        return this.renderSingleColumn(column, this.state.ToDoStories)
                    case "In Progress":
                        return this.renderSingleColumn(column, this.state.InProgressStories)
                    case "Testing":
                        return this.renderSingleColumn(column, this.state.TestingStories)
                    case "Done":
                        return this.renderSingleColumn(column, this.state.DoneStories)
                }
            })
        )
    }

    renderSingleColumn(column, column_stories) {
        return(
            <KanbanColumn
                name = {column.name}
                column_id = {column.column_id}
                key = {column.column_id}
                stories = {column_stories}
                onDrop = {this.onDrop}
            />
        )
    }

    render() {
        if (this.state.isLoading) {
            return (<h3>Loading...</h3>);
        }

        return (
            <div id="kanban-board">
                {this.renderColumns()}
                </div>
        );
    }
}
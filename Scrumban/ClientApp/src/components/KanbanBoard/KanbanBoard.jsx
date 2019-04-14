import React from 'react';
import KanbanColumn from './KanbanColumn';
import buildQuery from 'odata-query';

import "./css/KanbanBoard.css";

const apiUrlGet = "api/Story/GetStories";


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

    }

    componentDidMount() {
        var orderBy = ['rank desc']
        var query = buildQuery({ orderBy })

        this.getStoriesData(query)
    }

    getStoriesData(query) {
        fetch(apiUrlGet + query)
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
                            story.column_id = this.state.columns[0].column_id
                            return story
                        default:
                            story.column_id = this.state.columns[0].column_id
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
            let updatedStories = this.state.stories.slice();
            updatedStories.find((story) => { return story.story_id == item_id }).column_id = column_id

            this.setState({ stories: updatedStories });
        }
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
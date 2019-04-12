import React, { Component } from 'react';
import "./KanbanBoard.css";
import buildQuery from 'odata-query';

const apiUrlGet = "api/storyGrid/GetStories";


export class Kanban extends React.Component {
    render() {

        return (
            <div>
                <h1>Kanban Board</h1>
                <KanbanBoard />
            </div>
        );
    }
}

class KanbanBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            stories: [],
            columns: [],
            maxRank: 0,
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
        this.getMaxRank = this.getMaxRank.bind(this)

        //for testing
        this.createStory = this.createStory.bind(this)
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

    createStory() {
        fetch("api/storyGrid/CreateStory", {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify({

            })
        })
    }

    setAdditionalData() {
        //Set columns
        if (this.state.stories.length > 0) {
            this.setState({
                stories: this.state.stories.map((story) => {
                    switch (story.storyState.name) {
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

        //Set Max for all stories rank value
        this.setState({ maxRank: this.getMaxRank() })
    }

    getMaxRank() {
        var maxRank = 0
        this.state.stories.map(story => {
            if (story.rank > maxRank) maxRank = story.rank
        })
        return maxRank
    }

    onDragStart(e, item_id) {
        e.dataTransfer.setData("item", item_id)
    }

    onDrop(e, column_id) {
        let item_id = e.dataTransfer.getData("item")
        e.preventDefault();

        if (item_id !== undefined && item_id != "") {
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
                            maxRank={this.state.maxRank}
                         />
                        
                    );
                })}
            </div>
        );
    }
}

class KanbanColumn extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            stories: props.stories,
            name: props.name,
            column_id: props.column_id,
        })
        this.renderStories = this.renderStories.bind(this)
    }

    componentWillReceiveProps(newProps) {
        this.state = ({
            stories: newProps.stories,
            name: newProps.name,
            column_id: newProps.column_id
        });
    }

    renderStories() {
        if (this.state.stories.length > 0) {
            return (
                this.state.stories.map((story) => {
                    return (
                        <KanbanCard
                            story={story}
                            key={story.story_id}
                            onDragStart={this.props.onDragStart}
                            maxRank={this.props.maxRank}
                        />
                    )
                })
            )
        }
    }

    render() {
        return (
            <div
                className="kanban-column"
                onDrop={(e) => this.props.onDrop(e, this.state.column_id)}
                onDragOver={(e) => { this.props.onDragOver(e) }}
                draggable={false}
            >
                <div className="column-header" id={this.state.column_id}>
                    <div className="column-header-text">{this.state.name}</div>
                    
                    
                </div>
                <div>
                    {this.renderStories()}
                </div>
            </div>
            
        )
    }
}

class KanbanCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            story: props.story,
            moreInformation: false,
        });

        this.moreInformationHandler = this.moreInformationHandler.bind(this)
        this.renderMoreInformationButton = this.renderMoreInformationButton.bind(this)
        this.renderPriority = this.renderPriority.bind(this)
    }

    moreInformationHandler() {
        this.setState({ moreInformation: !this.state.moreInformation })
    }

    renderMoreInformationButton() {
        return this.state.moreInformation ?
            <div className="card-toggle card-toggle-collapse">
                <button className="card-button-collapse" data-toggle="collapse" data-target={"#card_data" + this.state.story.story_id} onClick={this.moreInformationHandler} >-</button>
            </div>
            :
            <div className="card-toggle">
                <button className="card-button-expand" data-toggle="collapse" data-target={"#card_data" + this.state.story.story_id} onClick={this.moreInformationHandler} >+</button>
            </div>
    }   

    renderPriority() {
        if (this.state.story.rank <= this.props.maxRank / 3)
            return <div className="card-header-priority-text card-priority-color-low">Low Priority</div>
        if (this.state.story.rank <= this.props.maxRank * 2 / 3)
            return <div className="card-header-priority-text card-priority-color-medium">Med Priority</div>
        return <div className="card-header-priority-text card-priority-color-high">High Priority</div>
    }
    
    render() {
        return (
            <div
                className="kanban-card"
                draggable='true'
                onDragStart={(e) => this.props.onDragStart(e, this.state.story.story_id)}
            >
                <div className="kanban-card-header">
                    <div className="card-header-priority">
                        {this.renderPriority()}
                    </div>
                    <div className="card-header-rank">
                        {this.state.story.rank}
                    </div>
                </div>
                <div className="card-name-text">{this.state.story.name}</div>

                {this.renderMoreInformationButton()}

                <div class="collapse" id={"card_data" + this.state.story.story_id}>
                    <div class="card-description-header">Description</div>
                    <div className="card-description-text">
                        {this.state.story.description}
                    </div>
                </div>
            </div>
        )
    }
}
import React, { Component } from 'react';
import "./KanbanBoard.css";

const apiUrlGet = "/api/storyGrid/getStories";


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
        this.setColumns = this.setColumns.bind(this)
    }

    componentDidMount() {
        this.getStoriesData("")
    }

    getStoriesData(query) {
        fetch(apiUrlGet + query)
            .then(response => response.json())
            .then(data => {
                this.setState({ stories: data, isLoading: false }, this.setColumns)
            })
    }

    setColumns() {
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
    }

    onDragStart(e, item_id) {
        e.dataTransfer.setData("item", item_id)
    }

    onDrop(e, column_id) {
        let item_id = e.dataTransfer.getData("item")
        e.preventDefault();

        if (item_id !== undefined && item_id != "") {
            let updatedStories = this.state.stories.slice();
            updatedStories.find((story) => { return story.id == item_id }).column_id = column_id

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

class KanbanColumn extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            stories: props.stories,
            name: props.name,
            column_id: props.column_id,
            isOpen: false,
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
                            key={story.id}
                            onDragStart={this.props.onDragStart}
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
                    <div>
                        
                    </div>
                    
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
    }

    moreInformationHandler() {
        this.setState({ moreInformation: !this.state.moreInformation })
    }

    renderMoreInformationButton() {
        return this.state.moreInformation ?
            <div className="card-toggle card-toggle-collapse">
                <button className="card-button-collapse" data-toggle="collapse" data-target={"#card_data" + this.state.story.id} onClick={this.moreInformationHandler} >-</button>
            </div>
            :
            <div className="card-toggle">
                <button className="card-button-expand" data-toggle="collapse" data-target={"#card_data" + this.state.story.id} onClick={this.moreInformationHandler} >+</button>
            </div>
    }   
        
    
    render() {
        return (
            <div
                className="kanban-card"
                draggable='true'
                onDragStart={(e) => this.props.onDragStart(e, this.state.story.id)}
            >
                <div className="card-name-text">{this.state.story.name}</div>

                {this.renderMoreInformationButton()}

                <div class="collapse" id={"card_data" + this.state.story.id}>
                    <div class="card-description-header">Description</div>
                    <div className="card-description-text">
                        {this.state.story.description}
                    </div>
                </div>
            </div>
        )
    }
}
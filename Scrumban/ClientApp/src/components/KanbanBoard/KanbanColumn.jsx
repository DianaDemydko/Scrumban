import React from 'react';
import KanbanCard from './KanbanCard';
import "./css/KanbanColumn.css";

export default class KanbanColumn extends React.Component {
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
            >
                <div className="column-header" id={this.state.column_id}>
                    <div className="column-header-text">{this.state.name}</div>
                </div>
                <div className="column-container">
                    {this.renderStories()}
                </div>
            </div>

        )
    }
}
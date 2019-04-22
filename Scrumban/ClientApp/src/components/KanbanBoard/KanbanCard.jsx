import React from 'react';
import "./css/KanbanCard.css";

export default class KanbanCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            story: props.story,
            moreInformation: false,
        });

        this.moreInformationHandler = this.moreInformationHandler.bind(this)
        this.renderMoreInformationButton = this.renderMoreInformationButton.bind(this)
        this.renderRank = this.renderRank.bind(this)
        this.onDragStart = this.onDragStart.bind(this)
    }

    onDragStart(e) {
        e.dataTransfer.setData("story_id", this.state.story.story_id)
        e.dataTransfer.setData("column_id", this.state.story.column_id)
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

    renderRank() {

        return <div className="card-header-rank-text">{"Rank: " + this.state.story.rank}</div>
    }

    render() {
        return (
            <div
                className="kanban-card"
                id={'card-'+this.state.story.story_id}
                draggable='true'
                onDragStart={this.onDragStart}
            >
                <div className="kanban-card-header">
                    <div className="card-header-rank">
                        {this.renderRank()}
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
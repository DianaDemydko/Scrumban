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
            renderCardPlace: false,
            card_id_before_place: null

        })
        this.renderCards = this.renderCards.bind(this)
        this.get_ids_of_cards = this.get_ids_of_cards.bind(this)

        this.onDragLeave = this.onDragLeave.bind(this)
        this.onDragOver = this.onDragOver.bind(this)
        this.onDrop = this.onDrop.bind(this)

        this.renderAllCards = this.renderAllCards.bind(this)
        this.renderPlace = this.renderPlace.bind(this)
        this.renderBefore = this.renderBefore.bind(this)
        this.renderAfter = this.renderAfter.bind(this)
    }

    static getDerivedStateFromProps(newProps, state) {
        return {
            stories: newProps.stories,
            name: newProps.name,
            column_id: newProps.column_id
        }
    }


    onDragLeave(e) {
        this.setState({
            renderCardPlace: false,
            card_id_before_place: null
            })
        console.log('class = ' + e.target.className + 'id = '+e.target.id)
    }

    onDragOver(e, card_id_array) {
        e.preventDefault()
        // if no cards in column then render only place
        if (card_id_array == null) {
            this.setState({
                renderCardPlace: true,
                card_id_before_place: null
            })
            return
        }
        else {
        //find previous card before cursor
            let prevCard_id = null
            let i = 0
            let card = null
            let card_rect = null

            while (i < card_id_array.length) {

                card = document.getElementById("card-" + card_id_array[i])

                card_rect = card.getBoundingClientRect();

                if (e.clientY > (card_rect.top + card_rect.bottom) / 2) {
                    prevCard_id = card_id_array[i]
                    i++
                }
                else {
                    break
                }
            }

            this.setState({ renderCardPlace: true, card_id_before_place: prevCard_id })
        }
    }

    onDrop(e) {
        this.props.onDrop(e, this.state.column_id, this.state.card_id_before_place)
        this.setState({
            renderCardPlace: false,
            card_id_before_place: null
        })
    }

    renderCards() {

        //if must render place
        if (this.state.renderCardPlace) {

            if (this.state.stories.length == 0) {
                //if no cards in column just render only place
                return this.renderPlace()
            }
            else {
                //cards exist

                // if no previous card => first render place then cards
                if (this.state.card_id_before_place == null) {
                    return (
                        <React.Fragment>
                            {this.renderPlace()}
                            {this.renderAllCards()}
                        </React.Fragment>
                        )
                }
                else {
                    //previous card exist
                    let index = this.state.stories.findIndex(story => { return story.story_id == this.state.card_id_before_place })
                    return (
                        <React.Fragment>
                            {this.renderBefore(index)}
                            {this.renderPlace()}
                            {this.renderAfter(index)}
                        </React.Fragment>
                    )
                }
            }

        }
        else {
            //render only cards
            return this.renderAllCards()
        }
    }

    renderAllCards() {
        if (this.state.stories.length > 0) {
            return (
                this.state.stories.map((story) => {
                    return (
                        <KanbanCard
                            story={story}
                            key={story.story_id}
                        />
                    )
                })
            )
        }
    }

    renderPlace() {
        return (
            <div className="card-place">place</div>
        )
    }

    renderBefore(index) {
        let beforeArray = this.state.stories.slice(0, index + 1)

        return beforeArray.map((story) => {
            return (
                <KanbanCard
                    story={story}
                    key={story.story_id}
                />
            )
        })
    }
    renderAfter(index) {
        if (this.state.stories.length - 1 != index) {
            let afterArray = this.state.stories.slice(index + 1, this.state.stories.length)

            return afterArray.map((story) => {
                return (
                    <KanbanCard
                        story={story}
                        key={story.story_id}
                    />
                )
            })
        }
    }


    get_ids_of_cards() {
        if (this.state.stories.length > 0) {
            var card_id_array = this.state.stories.map((story) => {
                return story.story_id
            })
            return card_id_array
        }
        else return null
    }



    render() {
        return (
            <div
                className="kanban-column"
                id={this.state.column_id}
                onDrop={this.onDrop}
                onDragOver={(e) => this.onDragOver(e, this.get_ids_of_cards())}
                onDragLeave={this.onDragLeave}
            >
                <div className="column-header" id={this.state.column_id}>
                    <div className="column-header-text">{this.state.name}</div>
                </div>
                <div className="column-container">
                    {this.renderCards()}
                </div>
            </div>

        )
    }
}
import React, { Component } from 'react';
import { StoryPrint } from './StoryPrint';
import { StoryEdit } from './StoryEdit';

export class StoryComponent extends React.Component {

    constructor(props) {
        super(props);
        // state : true - print
        // state : false - edit 
        this.state = { data: props.story, states: true };

        this.onRemoveStory = this.onRemoveStory.bind(this);
        this.onEditStory = this.onEditStory.bind(this);
        this.onChangedStory = this.onChangedStory.bind(this);
        this.onChangedEditStory = this.onChangedEditStory.bind(this);
    }

    onRemoveStory() {
        this.props.onRemove(this.state.data.id);
    }

    onChangedStory() {
        var elem = this.state.data;
        this.props.onChanged(elem);
    }

    onChangedEditStory(item) {
        this.setState({ data: item });
        this.onChangedStory();
    }

    onEditStory() {
        this.setState({ states: this.state.states === true ? false : true });
    }

    render() {
        const isEdit = this.state.states;
        return (


            <tbody>
                {isEdit ?
                    (<StoryPrint item={this.state.data} edit={this.onEditStory} delete={this.onRemoveStory} />)
                    : (<StoryEdit item={this.state.data} edit={this.onEditStory} delete={this.onRemoveStory} changed={this.onChangedEditStory} />)
                }
            </tbody>
        )
    }
}
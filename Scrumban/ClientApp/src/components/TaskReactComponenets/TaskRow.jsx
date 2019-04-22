import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TaskPrint } from './TaskPrint';
import { TaskEdit } from './TaskEdit';
import { Task } from './TaskRow';


export class TaskRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: props.task,
            printOrEdit: true // printOrEdit : true - print, false - edit
        };

        this.onRemoveTask = this.onRemoveTask.bind(this);
        this.onPrintOrEdit = this.onPrintOrEdit.bind(this);
        this.onChangedTask = this.onChangedTask.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (this.props.task != newProps.task) {
            this.setState({task: newProps.task})
        }
    }

    onRemoveTask() {
        this.props.onRemove(this.state.task.id);
    }

    onChangedTask(item) {
        this.props.onChanged(item);
    }

    onPrintOrEdit() {
        this.setState({ printOrEdit: !this.state.printOrEdit });
    }
    // render row
    render() {
        return <tbody>
            {this.state.printOrEdit ?
                (<TaskPrint
                    item={this.state.task}
                    edit={this.onPrintOrEdit}
                    delete={this.onRemoveTask}
                    moveToComponent={this.props.moveToComponent}
                />)

                : (<TaskEdit
                    item={this.state.task}
                    edit={this.onPrintOrEdit}
                    delete={this.onRemoveTask}
                    changed={this.onChangedTask}
                    states={this.props.states}
                    priorities={this.props.priorities}
                    users={this.props.users}
                    stories={this.props.stories}
                    moveToComponent={this.props.moveToComponent}
                />)
            }
        </tbody>;
    }
}
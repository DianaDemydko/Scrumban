import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';

export class EditFeature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.featuretoEdit.name,
            description: this.props.featuretoEdit.description,
            priority: this.props.featuretoEdit.priority,
            date: this.props.featuretoEdit.time,
            clicked: 'false'
        };
        this.onNameChanged = this.onNameChanged.bind(this);
        this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
        this.onPriorityChanged = this.onPriorityChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }
    onNameChanged(e) {
        this.setState({ name: e.target.value });
    }
    onDescriptionChanged(e) {
        this.setState({ description: e.target.value });
    }
    onPriorityChanged(e) {
        this.setState({ priority: e.target.value });
    }
    onDateChange(newDate) {
        this.setState({ date: newDate });
    }
    onSubmit() {
        fetch('api/SampleData/', {
            method: 'put',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: this.props.featuretoEdit.id, name: this.state.name,
                description: this.state.description,
                priority: this.state.priority,
                time: this.state.date
            })
        });
        window.location.reload();

    }
    onCancel() {

        this.props.onStateUpdating(false);
    }


    render() {

        return <tr>
            <td>
                <form>
                    <div>
                        <label for="name">Name</label>
                        <input type="text" class="form-control" onChange={e => this.onNameChanged(e)} defaultValue={this.props.featuretoEdit.name} />
                    </div>

                    <div>
                        <label for="description">Description</label>
                        <input type="text" class="form-control" onChange={e => this.onDescriptionChanged(e)} defaultValue={this.props.featuretoEdit.description} />
                    </div>

                    <div>
                        <label for="priority">Priority</label>
                        <select class="btn btn-light dropdown-toggle" name="prioriry" onChange={e => this.onPriorityChanged(e)} value={this.props.featuretoEdit.priority} >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div>
                        <label for='date'> Start Date</label>
                        <DatePicker onChange={this.onDateChange} dateFormat="yyyy/MM/dd" />

                    </div>
                </form>
            </td>
            <td>
                <button type="submit" onClick={this.onSubmit} class="btn btn-dark">Save</button>
                <button type="submit" onClick={this.onCancel} class="btn btn-dark">Cancel</button>
            </td>
        </tr>;

    }
}
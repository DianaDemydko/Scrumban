import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';
import { EditFeature } from './EditFeature';
import buildQuery from 'odata-query';
import '../../GridStyles/StyleForGrid.css';


export class FeatureFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterQuery: null,
            findName: '',
            findDescription: '',
            findPriorityID: 0,
            findDate: null,
            findStateID: 0,
            priorities: [], 
            states:[]
        };
        this.onFindNameChange = this.onFindNameChange.bind(this);
        this.onFindDescriptionChange = this.onFindDescriptionChange.bind(this);
        this.onFindPriorityChange = this.onFindPriorityChange.bind(this);
        this.onFindDateChange = this.onFindDateChange.bind(this);
        this.onFindStateChange = this.onFindStateChange.bind(this);
        this.findData = this.findData.bind(this);
        this.clearData = this.clearData.bind(this);
    }
    componentDidMount() {
        fetch('api/FeatureData/getPriorities')
            .then(res => res.json())
            .then(json => {
                this.setState({ priorities: json })
            });
        fetch('api/FeatureData/getStates')
            .then(res => res.json())
            .then(json => {
                this.setState({ states: json })
            });
    }
    findData() {

        var filter = []
        if (this.state.findName != '') {
            filter.push({ 'tolower(Name)': { contains: this.state.findName.toLowerCase() } })
        }
        if (this.state.findDescription != '') {
            filter.push({ 'tolower(Description)': { contains: this.state.findDescription } })
        }

        if (this.state.findDate != null) {
            filter.push({ time: { gt: this.state.findDate } })
        }
        if (this.state.findPriorityID != 0) {
            filter.push({ priorityid: parseInt(this.state.findPriorityID) })
        }
        if (this.state.findStateID != 0) {
            filter.push({ stateid: parseInt(this.state.findstateID) })
        }
        var query = buildQuery({ filter })
        this.props.changeFindData(query);
    }

    clearData() {
        this.setState({ findName: '', findDescription: '', findPriority: '', findDate: null });
        this.props.changeFindData('');
    }

    onFindNameChange(e) {
        this.setState({ findName: e.target.value });
    }
    onFindDescriptionChange(e) {
        this.setState({ findDescription: e.target.value });

    }
    onFindPriorityChange(e) {
        var i = this.state.priorities.find(x => x.name === e.target.value).id;
        this.setState({ findPriorityID: i });
    }
    onFindDateChange(dateToFind) {
        this.setState({ findDate: dateToFind });
    }
    onFindStateChange(e) {
        var i = this.state.states.find(x => x.name === e.target.value).id;
        this.setState({ findstateID: i });
    }

    render() {
        return <div className='filterContainer' id='filterForm'>
            <div class='row'>
                <div class="col-sm">
                    <label>Name</label>
                </div>
                <div class="col-sm">
                    <label>Description</label>
                </div>
                <div class="col-sm">
                    <label>State</label>
                </div>
                <div class="col-sm">
                    <label>Owner</label>
                </div>
                <div class="col-sm">
                    <label>Priority</label>
                </div>
                <div class="col-sm">
                    <label>Date</label>
                </div>
                <div class="col-sm" />
                <div class="col-sm" />
            </div>

            <div class="row">
                <div class="col-sm">
                    <input className="input" type='text'
                        onChange={e => this.onFindNameChange(e)}
                        value={this.state.findName} />
                </div>

                <div class="col-sm">
                    <input className="input" type='text'
                        onChange={e => this.onFindDescriptionChange(e)}
                        value={this.state.findDescription} />
                </div>
                <div class="col-sm">
                    <select class="btn btn-light dropdown-toggle w-100 m-0" name="state" onChange={e => this.onFindStateChange(e)} >
                        {this.state.states.map(state => (
                            <option>{state.name}
                            </option>))}
                    </select>
                </div>
                <div class="col-sm">
                    <input className="input" type='text' />
                </div>
                <div class="col-sm">
                    <select class="btn btn-light dropdown-toggle m-0" name="prioriry" onChange={e => this.onFindPriorityChange(e)}>
                        {this.state.priorities.map(priority => (
                            <option> {priority.name}</option>))}
                    </select>
                </div>
                <div class="col-sm">
                    <DatePicker className="input" dateFormat="yyyy/MM/dd"
                        selected={this.state.findDate}
                        onChange={this.onFindDateChange}
                        value={this.state.findDate} />
                </div>
                <div class="col-sm">
                    <td />
                    <button class="btn btn-sm btn-outline-dark w-100" onClick={this.findData}>
                        Find
                 </button>
                </div>
                <div class="col-sm">
                    <td />
                    <button class="btn btn-sm btn-outline-dark w-100" onClick={this.clearData}>
                        Clear
                 </button>
                </div>
                

            </div>

        </div>




    }
}
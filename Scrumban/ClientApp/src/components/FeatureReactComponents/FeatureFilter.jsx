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
            findPriority: '',
            findDate: null,
        };
        this.onFindNameChange = this.onFindNameChange.bind(this);
        this.onFindDescriptionChange = this.onFindDescriptionChange.bind(this);
        this.onFindPriorityChange = this.onFindPriorityChange.bind(this);
        this.onFindDateChange = this.onFindDateChange.bind(this);

        this.findData = this.findData.bind(this);
        this.clearData = this.clearData.bind(this);
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
        if (this.state.findPriority != '') {
            filter.push({ priority: parseInt(this.state.findPriority) })
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
        this.setState({ findPriority: e.target.value });

    }
    onFindDateChange(dateToFind) {
        this.setState({ findDate: dateToFind });

    }

    render() {
        return <div class="container bg-light" id='filterForm'>
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
                    <label>Stories</label>
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
                    <input className="input" type='text' />
                </div>
                <div class="col-sm">
                    <input className="input" type='text' />
                </div>
                <div class="col-sm">
                    <input className="input" type='text'
                        onChange={e => this.onFindPriorityChange(e)}
                        value={this.state.findPriority} />
                </div>
                <div class="col-sm">
                    <input className="input" type='text' />
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
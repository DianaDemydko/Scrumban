import React from 'react';
import buildQuery from 'odata-query';

const data = require('../../DefectData.json');
const priorityOption = data.priority;
const stateOption = data.state;
const severityOption = data.severity;
const statusOption = data.status;

export class DefectFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nameSearch: "",
            descriptionSearch: "",
            stateSearch: "All",
            prioritySearch: "All",
            storyIdSearch: "",
            severitySearch: "All",
            statusSearch: "All",
        };
      
        this.onNameSearchChanged = this.onNameSearchChanged.bind(this);
        this.onDescriptionSearchChanged = this.onDescriptionSearchChanged.bind(this);
        this.onStateSearchChanged = this.onStateSearchChanged.bind(this);
        this.onPrioritySearchChanged = this.onPrioritySearchChanged.bind(this);
        this.onSeveritySearchChanged = this.onSeveritySearchChanged.bind(this);
        this.onStatusSearchChanged = this.onStatusSearchChanged.bind(this);
        this.onFiltersApply = this.onFiltersApply.bind(this)
        this.onFiltersClear = this.onFiltersClear.bind(this)
    }
    onNameSearchChanged(e) {
        this.setState({ nameSearch: e.target.value });
    }
    onDescriptionSearchChanged(e) {
        this.setState({ descriptionSearch: e.target.value });
    }
    onStateSearchChanged(e) {
        this.setState({ stateSearch: e.target.value });
    }
    onPrioritySearchChanged(e) {
        this.setState({ prioritySearch: e.target.value });
    }
    onSeveritySearchChanged(e) {
        this.setState({ severitySearch: e.target.value });
    }
    onStatusSearchChanged(e) {
        this.setState({ statusSearch: e.target.value });
    }

    onFiltersApply() {
        var filter = []

        if (this.state.nameSearch != "") {
            filter.push({ "tolower(Name)": { contains: this.state.nameSearch.toLowerCase() } })
        }

        if (this.state.descriptionSearch != "") {
            filter.push({ "tolower(Description)": { contains: this.state.descriptionSearch } })
        }

        if (this.state.stateSearch != "All") {
            filter.push({ State: this.state.stateSearch })
        }

        if (this.state.prioritySearch != "All") {
            filter.push({ Priority: this.state.prioritySearch })
        }
        if (this.state.severitySearch != "All") {
            filter.push({ Severity: this.state.severitySearch })
        }
        if (this.state.storyIdSearch != "") {
            filter.push({ defectStoryId: { contains: this.state.storyIdSearch } })
        }
        if (this.state.statusSearch != "All") {
            filter.push({ Status: this.state.statusSearch })
        }

        var query = buildQuery({ filter })

        this.props.loadData(query)
    }
    onFiltersClear() {
        this.state.nameSearch = "";
        this.state.descriptionSearch = "";
        this.state.stateSearch = "All";
        this.state.prioritySearch = "All";
        this.state.severitySearch = "All";
        this.state.storyIdSearch = "";
        this.state.statusSearch = "All";

        this.onFiltersApply();
    }

    render() {

        return (<div className='filterContainer' id='filterForm'>
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
                    <label>Priority</label>
                </div>
                <div class="col-sm">
                    <label>Severity</label>
                </div>
                <div class="col-sm">
                    <label>Status</label>
                </div>
                <div class="col-sm" />
                <div class="col-sm" />
            </div>
            <div class="row">
                <div class="col-sm"><input type="text" className="input" placeholder="Search" onChange={this.onNameSearchChanged} value={this.state.nameSearch} /></div>
                <div class="col-sm"><input type="text" className="input" placeholder="Search" onChange={this.onDescriptionSearchChanged} value={this.state.descriptionSearch} /></div>
                <div class="col-sm"><select class="btn btn-light dropdown-toggle m-0" placeholder="Search" onChange={this.onStateSearchChanged} value={this.state.stateSearch}>
                    <option value="All">All</option>
                    {stateOption.map((item) => <option>{item.name}</option>)}
                </select></div>
                <div class="col-sm"><select class="btn btn-light dropdown-toggle m-0" placeholder="Search" onChange={this.onPrioritySearchChanged} value={this.state.prioritySearch}>
                    <option value="All">All</option>
                    {priorityOption.map((item) => <option>{item.name}</option>)}
                </select></div>
                <div class="col-sm"><select class="btn btn-light dropdown-toggle m-0" placeholder="Search" onChange={this.onSeveritySearchChanged} value={this.state.severitySearch}>
                    <option value="All">All</option>
                    {severityOption.map((item) => <option>{item.name}</option>)}
                </select></div>

                <div class="col-sm">
                    <select class="btn btn-light dropdown-toggle m-0" placeholder="Search" onChange={this.onStatusSearchChanged} value={this.state.statusSearch}>
                        <option value="All">All</option>
                        {statusOption.map((item) => <option>{item.name}</option>)}
                    </select>
                </div>
                <div class="col-sm" >
                    <td />
                    <button class="btn btn-sm btn-outline-dark w-100" type="button" onClick={this.onFiltersApply}>Search</button>
                </div>
                <div class="col-sm" >
                    <td />
                    <button class="btn btn-sm btn-outline-dark w-100" type="button" onClick={this.onFiltersClear}>Clear</button>
                </div>
            </div>
        </div>)
    }
}


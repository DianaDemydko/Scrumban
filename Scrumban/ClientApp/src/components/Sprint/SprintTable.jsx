import React from 'react';
import { SprintRow } from './SprintRow'
import buildQuery from 'odata-query'
import DatePicker from "react-datepicker";
import { Link } from 'react-router-dom';

const CreateSprintURL = "/CreateNewSprint";

export class SprintTable extends React.Component
{
   
    constructor(props) {
        super(props)
        this.state =
        {
            sprints: [],
            statuses: [],
            loading: true,

            nameSearch: "",
            descriptionSearch: "",
            startDateSearch: null,
            endDateSearch: null,
            statusSearch: "All",

            currentSort:
            {
                columnName: '',
                sortingOrder: ''
            }
        }

        this.fetchSprintData = this.fetchSprintData.bind(this)
        this.fetchSprintStatuses = this.fetchSprintStatuses.bind(this)

        this.onDeletingSprintElement = this.onDeletingSprintElement.bind(this)
        this.onUpdatingSprintElement = this.onUpdatingSprintElement.bind(this)

        this.onNameSearchChanged = this.onNameSearchChanged.bind(this)
        this.onDescriptionSearchChanged = this.onDescriptionSearchChanged.bind(this)
        this.onStartDateSearchChanged = this.onStartDateSearchChanged.bind(this)
        this.onEndDateSearchChanged = this.onEndDateSearchChanged.bind(this)
        this.onStatusSearchChanged = this.onStatusSearchChanged.bind(this)

        this.onFiltersApply = this.onFiltersApply.bind(this)
        this.onKeyDown = this.onKeyDown.bind(this)

        this.sortData = this.sortData.bind(this)
        this.sortByName = this.sortByName.bind(this)
        this.sortByDescription = this.sortByDescription.bind(this)
        this.sortByDate = this.sortByDate.bind(this)
        this.renderCaret = this.renderCaret.bind(this)
        this.clearFilters = this.clearFilters.bind(this)
    }

    componentDidMount()
    {
        this.fetchSprintStatuses()
        this.fetchSprintData("")
    }

    fetchSprintData(query) {
        this.setState({ loading: true })
        fetch('api/Sprint/Index' + query)
            .then(response => response.json())
            .then(data => {
                this.setState({ sprints: data, loading: false });
            })
    }

    fetchSprintStatuses()
    {
        fetch('api/Sprint/GetStatuses')
            .then(response => response.json())
            .then(data => {
                this.setState({ statuses: data });
            })
    }

    onUpdatingSprintElement(sprintToUpdate) {
        let index = this.state.sprints.findIndex(sprint => sprint.sprint_id == sprintToUpdate.sprint_id)
        var tempArray = this.state.sprints
        tempArray[index] = sprintToUpdate
        this.setState(
            {
                sprints: tempArray
            })
        
    }

    onDeletingSprintElement(sprintToDelete_id) {
        let sprint_id = sprintToDelete_id
        this.setState(
            {
                sprints: this.state.sprints.filter(item => { return item.sprint_id != sprint_id })
            })
    }


    onNameSearchChanged(event)
    {
        this.setState({ nameSearch: event.target.value })  
    }

    onDescriptionSearchChanged(event)
    {
        this.setState({ descriptionSearch: event.target.value })
    }

    onStartDateSearchChanged(startDate)
    {
        this.setState({ startDateSearch: startDate })
    }

    onEndDateSearchChanged(endDate)
    {
        this.setState({ endDateSearch: endDate })
    }

    onStatusSearchChanged(event)
    {
        this.setState({ statusSearch: event.target.value })
    }

    onKeyDown(event)
    {
        if (event.key == 'Enter')
        {
            this.onFiltersApply()
        }
    }

    onFiltersApply() {
        var filter = []
        if (this.state.nameSearch != "") {
            filter.push({ "tolower(Name)": { contains: this.state.nameSearch.toLowerCase() } })
        }

        if (this.state.descriptionSearch != "") {
            filter.push({ "tolower(Description)": { contains: this.state.descriptionSearch } })
        }

        if (this.state.startDateSearch != null) {
            filter.push({ startDate: { gt: this.state.startDateSearch } })
        }

        if (this.state.endDateSearch != null) {
            filter.push({ endDate: { lt: this.state.endDateSearch } })
        }

        if (this.state.statusSearch != "All") {
            filter.push({ sprintStatus: this.state.statusSearch })
        }

        var query = buildQuery({ filter })

        this.fetchSprintData(query)

        this.setState({
            currentSort:
            {
                columnName: '',
                sortingOrder: ''
            }
        })
    
    }

    sortByName(sortingOrder, columnName) {

        let compareFunction = function (a, b)
        {
            let aName = a[columnName].toLowerCase()
            let bName = b[columnName].toLowerCase()
            if (aName < bName) {
                return -1;
            }
            if (aName > bName) {
                return 1;
            }
            return 0;
        }

        switch (sortingOrder)
        {
            case 'ascending':
                this.setState({
                    sprints: this.state.sprints.sort(compareFunction)
                })
                break
            case 'descending':
                this.setState({
                    sprints: this.state.sprints.sort(compareFunction).reverse()
                })
                break
        }        
    }

    sortByDescription(sortingOrder, columnName)
    {
        let compareFunction = function (a, b)
        {
            let aDescriptionLength = a[columnName].length
            let bDescriptionLength = b[columnName].length
            if (aDescriptionLength < bDescriptionLength) {
                return -1;
            }
            if (aDescriptionLength > bDescriptionLength) {
                return 1;
            }
            return 0;
        }

        switch (sortingOrder) {
            case 'ascending':
                this.setState({
                    sprints: this.state.sprints.sort(compareFunction)
                })
                break
            case 'descending':
                this.setState({
                    sprints: this.state.sprints.sort(compareFunction).reverse()
                })
                break
        }
    }

    sortByDate(sortingOrder, columnName)
    {

        let compareFunction = function (a, b)
        {
            if (a[columnName] < b[columnName]) {
                return -1;
            }
            if (a[columnName] > b[columnName]) {
                return 1;
            }
            return 0;
        }

        switch (sortingOrder) {
            case 'ascending':
                this.setState({
                    sprints: this.state.sprints.sort(compareFunction)
                })
                break
            case 'descending':
                this.setState({
                    sprints: this.state.sprints.sort(compareFunction).reverse()
                })
                break
        }
    }

    sortByStatus(sortingOrder, columnName) {

        let compareFunction = function (a, b) {

            if (a[columnName] < b[columnName]) {
                return -1;
            }
            if (a[columnName] > b[columnName]) {
                return 1;
            }
            return 0;
        }

        switch (sortingOrder) {
            case 'ascending':
                this.setState({
                    sprints: this.state.sprints.sort(compareFunction)
                })
                break
            case 'descending':
                this.setState({
                    sprints: this.state.sprints.sort(compareFunction).reverse()
                })
                break
        }
    }

    sortData(columnName)
    {
        let currentSort = this.state.currentSort

        if (currentSort.columnName == columnName)
        {
            if (currentSort.sortingOrder == 'ascending')
            {
                currentSort.sortingOrder = 'descending'
            }
            else
            {
                currentSort.sortingOrder = 'ascending'
            }
        }
        else
        {
            currentSort.columnName = columnName
            currentSort.sortingOrder = 'ascending'
        }

        this.setState({ currentSort: currentSort })

        switch (columnName)
        {
            case 'name':
                this.sortByName(currentSort.sortingOrder, columnName)
                break
            case 'description':
                this.sortByDescription(currentSort.sortingOrder, columnName)
                break
            case 'startDate':
                this.sortByDate(currentSort.sortingOrder, columnName)
                break
            case 'endDate':
                this.sortByDate(currentSort.sortingOrder, columnName)
                break
            case 'sprintStatus':
                this.sortByStatus(currentSort.sortingOrder, columnName)
                break
        }
    }

    renderCaret(columnName)
    {
        if (this.state.currentSort.columnName == columnName) {
            if (this.state.currentSort.sortingOrder == 'ascending') {
                return (<span class="fa fa-caret-up" id="active-caret" style={{ color: '#2adc29' }}></span>)
            }
            else {
                return (<span class="fa fa-caret-down" id="active-caret" style={{ color: '#2adc29' }}></span>)
            }
        }
        else {
            return (<span class="fa fa-caret-down"></span>)
        }
    }

    clearFilters()
    {
        this.setState({
            nameSearch: "",
            descriptionSearch: "",
            startDateSearch: null,
            endDateSearch: null,
            statusSearch: "All",
        })
    }

    renderSprintsTable(sprints) {
        return (
            <div class="panel-heading">

                <table className='table'>
                    <thead>
                        {/*Sorting row*/}

                        <tr>
                            <th style={{ cursor: 'pointer' }} onClick={() => this.sortData('name')}>
                                Name {this.renderCaret('name')}
                            </th>
                            <th style={{ cursor: 'pointer' }} onClick={() => this.sortData('description')}>
                                Description {this.renderCaret('description')}
                            </th>
                            <th style={{ cursor: 'pointer' }} onClick={() => this.sortData('startDate')}>
                                Start Date {this.renderCaret('startDate')}
                            </th>
                            <th style={{ cursor: 'pointer' }} onClick={() => this.sortData('endDate')}>
                                End Date {this.renderCaret('endDate')}
                            </th>
                            <th style={{ cursor: 'pointer' }} onClick={() => this.sortData('sprintStatus')}>
                                Status {this.renderCaret('sprintStatus')}
                            </th>
                            <th colspan="2">
                            </th>
                        </tr>

                        {/*Filters row*/}
                        <tr>
                            <th>
                                <input type="text" class="form-control" placeholder="Search..." onChange={this.onNameSearchChanged} onKeyDown={this.onKeyDown} value={this.state.nameSearch} />
                            </th>
                            <th>
                                <div><input type="text" class="form-control" placeholder="Search..." onChange={this.onDescriptionSearchChanged} onKeyDown={this.onKeyDown} value={this.state.descriptionSearch} /></div>
                            </th>
                            <th>
                                <DatePicker
                                    className="form-control"
                                    todayButton={"Today"}
                                    selected={this.state.startDateSearch}
                                    onChange={this.onStartDateSearchChanged}
                                    onKeyDown={this.onKeyDown}
                                    isClearable={true}
                                    placeholderText="Search..."
                                />
                            </th>
                            <th>
                                <DatePicker
                                    className="form-control"
                                    todayButton={"Today"}
                                    selected={this.state.endDateSearch}
                                    onChange={this.onEndDateSearchChanged}
                                    onKeyDown={this.onKeyDown}
                                    isClearable={true}
                                    placeholderText="Search..."
                                />
                            </th>
                            <th>
                                <div>
                                    <select class="form-control" onChange={this.onStatusSearchChanged} value={this.state.statusSearch} onKeyDown={this.onKeyDown}>
                                        <option value="All">All</option>
                                        {this.state.statuses.map(status => <option value={status.sprintStatus} >{status.sprintStatus}</option>)}
                                    </select>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <button type="button" style={{ width: '100%'}} class="btn btn-primary" onClick={this.onFiltersApply}>Apply Filters</button>
                                    </div>
                            </th>
                            <th>
                                <div>
                                    <button type="button" style={{ width: '100%' }} class="btn btn-primary" onClick={this.clearFilters}>Clear Filters</button>
                                </div>
                            </th>
                        </tr>
                </thead>
                <tbody>
                    
                    {(sprints.length > 0)
                            ? sprints.map(sprint =>
                                <SprintRow key={sprint.sprint_id} sprint={sprint} statuses={this.state.statuses} onUpdatingSprintElement={this.onUpdatingSprintElement} onDeletingSprintElement={this.onDeletingSprintElement} />
                        )
                        : (<td colSpan="7">
                            No results
                          </td>)
                            
                    }
                </tbody>
            </table>
                <div>
                    <Link to={{
                        pathname: CreateSprintURL,
                        state:
                        {
                            statuses: this.state.statuses
                        }
                    }}><button className="btn btn btn-info">Create New Sprint</button></Link>
                </div>
            </div>
            )
    }

    render() {
        let content = this.state.loading ? (
            <div>
                <h2>Loading...</h2>
            </div>
            )
            : this.renderSprintsTable(this.state.sprints);

        return (
            <div>
                <h1>Sprints</h1>
                <button type="button" class="btn btn-primary" onClick={() => { this.fetchSprintData("") }} >Load Sprint Table</button>
                {content}
            </div>
        );
    }
}

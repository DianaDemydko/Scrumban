import React from 'react';
import { SprintRow } from './SprintRow'
import buildQuery from 'odata-query'
import DatePicker from "react-datepicker";
import { Pagination } from '../DefectReactComponent/Pagination.jsx'

import Spinner from 'react-bootstrap/Spinner'

import '../../GridStyles/StyleForGrid.css';
const icon_up = require("./sort-arrow-up.svg")
const icon_down = require("./sort-arrow-down.svg")

export class SprintTable extends React.Component
{
   
    constructor(props) {
        super(props)
        this.state =
        {
            sprints: [],
            statuses: [],
            loading: true,
            showFilters: false,

            nameSearch: "",
            descriptionSearch: "",
            startDateSearch: null,
            endDateSearch: null,
            statusSearch: "All",

            currentSort:
            {
                columnName: '',
                sortingOrder: ''
            },
            pageOfItems: [],
            teams: []
        }

        this.showFilters = this.showFilters.bind(this);
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
        this.renderCaret = this.renderCaret.bind(this)
        this.clearFilters = this.clearFilters.bind(this)
        this.onChangePage = this.onChangePage.bind(this);
        this.fetchTeams = this.fetchTeams.bind(this);
    }

    async fetchTeams() {
       await fetch('api/team/getTeams')
            .then(res => res.json())
            .then(json => {
                this.setState({ teams: json })
            });
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({
            pageOfItems: pageOfItems
        });

    }

    componentDidMount()
    {
        this.fetchSprintStatuses();
        this.fetchSprintData("");
    }

    showFilters(param) {
        this.setState({ showFilters: param });
    }

    fetchSprintData(query) {
        this.setState({ loading: true })
        fetch('api/Sprint/Index' + query)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    this.setState({ sprints: data, loading: false });
                } else {
                    this.setState({ sprints: [], loading: false, pageOfItems: [] });
                }
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

    sortData(columnName)
    {
        let currentSort = this.state.currentSort
        var query = '?$orderby='

        if (currentSort.columnName == columnName) {
            if (currentSort.sortingOrder == 'asc') {
                currentSort.sortingOrder = 'desc'
            }
            else {
                currentSort.sortingOrder = 'asc'
            }
        }
        else {
            currentSort.columnName = columnName
            currentSort.sortingOrder = 'asc'
        }

        this.setState({ currentSort: currentSort })

        switch (columnName) {
            case 'name':
                query += 'name' + ' ' + this.state.currentSort.sortingOrder;
                if (this.state.currentSort.sortingOrder == 'asc') {
                    this.setState({ sortByName: icon_up });
                }
                else {
                    this.setState({ sortByName: icon_down });
                }
                break
            case 'description':
                query += 'description' + ' ' + this.state.currentSort.sortingOrder;
                if (this.state.currentSort.sortingOrder == 'asc') {
                    this.setState({ sortByDescription: icon_up });
                }
                else {
                    this.setState({ sortByDescription: icon_down });
                }
                break
            case 'startDate':
                query += 'startDate' + ' ' + this.state.currentSort.sortingOrder;
                if (this.state.currentSort.sortingOrder == 'asc') {
                    this.setState({ sortBySDate: icon_up });
                }
                else {
                    this.setState({ sortBySDate: icon_down });
                }
                break

            case 'endDate':
                query += 'endDate' + ' ' + this.state.currentSort.sortingOrder;
                if (this.state.currentSort.sortingOrder == 'asc') {
                    this.setState({ sortByPriority: icon_up });
                }
                else {
                    this.setState({ sortByPriority: icon_down });
                }
                break
            case 'sprintStatus':
                query += 'sprintStatus' + ' ' + this.state.currentSort.sortingOrder;
                if (this.state.currentSort.sortingOrder == 'asc') {
                    this.setState({ sortByState: icon_up });
                }
                else {
                    this.setState({ sortByState: icon_down });
                }
                break
        }

        this.fetchSprintData(query);
    }

    renderCaret(columnName)
    {
        if (this.state.currentSort.columnName == columnName) {
            if (this.state.currentSort.sortingOrder == 'asc') {
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
            currentSort:
            {
                columnName: '',
                sortingOrder: ''
            },
            showFilters: false
        })
        this.fetchSprintData("")
    }

    renderSprintsTable(sprints) {
        return (
            <div className="table-wrapper"> 
                <div>
                    {this.state.showFilters ?
                        (<div className='filterContainer'>
                            <div className="row filter-row-5 ">
                        <div className="col-sm">
                            <label for="inputTitle">Name</label>
                        </div>
                        <div className="col-sm">
                            <label for="description">Description</label><br />
                        </div>
                        <div className="col-sm ">
                            <label for="startDate">Start Date</label>
                        </div>
                        <div className="col-sm">
                            <label for="endDate">End Date</label>
                        </div>
                        <div className="col-sm">
                            <label for="status">Status</label>
                        </div>
                        <div class="col-sm">

                        </div>
                        <div className="col-sm">{/*   */}</div>
                    </div>
                            <div className="row filter-row-10 ">
                        <div classNAme="col-sm">
                            <input type="text" className="form-control" placeholder="Search..." onChange={this.onNameSearchChanged} onKeyDown={this.onKeyDown} value={this.state.nameSearch} />
                        </div>
                        <div className="col-sm">
                            <input type="text" className="form-control" placeholder="Search..." onChange={this.onDescriptionSearchChanged} onKeyDown={this.onKeyDown} value={this.state.descriptionSearch} />
                        </div>
                        <div className="col-sm">
                        <DatePicker
                            todayButton={"Today"}
                            selected={this.state.startDateSearch}
                            onChange={this.onStartDateSearchChanged}
                            onKeyDown={this.onKeyDown}
                            isClearable={true}
                            placeholderText="Search..."
                            className="form-control"
                            />
                        </div>
                        <div className="col-sm">
                        <DatePicker
                            className="form-control"
                            todayButton={"Today"}
                            selected={this.state.endDateSearch}
                            onChange={this.onEndDateSearchChanged}
                            onKeyDown={this.onKeyDown}
                            isClearable={true}
                            placeholderText="Search..."
                        />
                    </div>
                        <div className="col-sm">
                            <select className="btn btn-light dropdown-toggle w-100 m-0" onChange={this.onStatusSearchChanged} value={this.state.statusSearch} onKeyDown={this.onKeyDown}>
                                <option value="All">All</option>
                                {this.state.statuses.map(status => <option value={status.sprintStatus} >{status.sprintStatus}</option>)}
                            </select>
                        </div>
                        <div class="col-sm">
                            <button type="button" className="btn apply-filters w-100" onClick={this.onFiltersApply}>Filter</button>
                        </div>
                        <div class="col-sm">
                            <button type="button" className="btn cancel-filter w-100" onClick={this.clearFilters}>Clear</button>
                         </div>
                      </div>
                        </div>) : null}
                  </div>
           <div className="tablePosition">
             <table class="table" style={{ 'table-layout': 'fixed' }}>
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
                             <th>
                                    Team
                             </th>
                            <th colspan="2">
                            </th>
                        </tr>

                       
                </thead>
                <tbody>
                    
                 {(this.state.pageOfItems.length > 0)//pageOfItems
                                ? this.state.pageOfItems.map((sprint) => {//pageOfItems
                                    return <SprintRow key={sprint.sprint_id} sprint={sprint} statuses={this.state.statuses} onUpdatingSprintElement={this.onUpdatingSprintElement} onDeletingSprintElement={this.onDeletingSprintElement} teams={this.props.teams} currentUser={this.props.currentUser} />
                                }
                        )
                       : (<tbody>
                                    <td>
                                        No results
                            </td>
                                </tbody>)
                            
                    }
                </tbody>
            </table>
                </div>
                <div>
                    <Pagination items={sprints} onChangePage={this.onChangePage} />
                </div>
                </div>
            )
    }

    render() {
        let content = this.state.loading ? (
            <div style={{ 'margin-left': '50%', 'margin-top': '15%' }}>
                <Spinner animation="border" variant="warning" />
            </div>
            )
            : this.renderSprintsTable(this.state.sprints);

        return (
            <div id="Table-container">
                <div className="grid-panel">
                    <div className="grid-name">Sprints</div>
                    <div className="grid-buttons">
                        {this.props.currentUser.roleId != 1 ? <button onClick={() => this.props.moveToComponent("sprintAdd")} className="btn add-new btn-panel-table">Create New</button> : null }
                        <button onClick={() => { this.showFilters(true) }} className="btn btn-panel-table add-filters">Apply Filters</button>
                    </div>
                </div>
                <hr></hr>
                {content}
            </div>
        );
    }
}

import React from 'react';
import { SprintRow } from './CreateForm/SprintRow'
import buildQuery from 'odata-query'
import DatePicker from "react-datepicker";

export class FetchSprintData extends React.Component
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
            statusSearch: "All"
        }

        this.fetchSprintData = this.fetchSprintData.bind(this)
        this.fetchSprintStatuses = this.fetchSprintStatuses.bind(this)

        this.onDeletingSprintElement = this.onDeletingSprintElement.bind(this)
        this.onUpdatingSprintElement = this.onUpdatingSprintElement.bind(this)

        this.onNameSearchChange = this.onNameSearchChange.bind(this)
        this.onDescriptionSearchChange = this.onDescriptionSearchChange.bind(this)
        this.onStartDateSearchChange = this.onStartDateSearchChange.bind(this)
        this.onEndDateSearchChange = this.onEndDateSearchChange.bind(this)
        this.onStatusSearchChange = this.onStatusSearchChange.bind(this)

        this.onFiltersApply = this.onFiltersApply.bind(this)
        this.onKeyDown = this.onKeyDown.bind(this)
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


    onNameSearchChange(event)
    {
        this.setState({ nameSearch: event.target.value })  
    }

    onDescriptionSearchChange(event)
    {
        this.setState({ descriptionSearch: event.target.value })
    }

    onStartDateSearchChange(startDate)
    {
        this.setState({ startDateSearch: startDate })
    }

    onEndDateSearchChange(endDate) {
        this.setState({ endDateSearch: endDate })
    }

    onStatusSearchChange(event)
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

    onFiltersApply()
    {
        var filter = []
        if (this.state.nameSearch != "")
        {
            filter.push({ "tolower(Name)": { contains: this.state.nameSearch.toLowerCase() } })
        }

        if (this.state.descriptionSearch != "")
        {
            filter.push({"tolower(Description)": { contains: this.state.descriptionSearch } })
        }

        if (this.state.startDateSearch != null)
        {
            filter.push({ startDate: { gt: this.state.startDateSearch } })
        }

        if (this.state.endDateSearch != null) {
            filter.push({ endDate: { lt: this.state.endDateSearch } })
        }

        if (this.state.statusSearch != "All")
        {
            filter.push({ sprintStatus: this.state.statusSearch })
        }
            
        var query = buildQuery({ filter })

        this.fetchSprintData(query)
    }




    renderSprintsTable(sprints) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>
                            <div>Name</div>
                            <div><input type="text" class="form-control" placeholder="Search..." onChange={this.onNameSearchChange} onKeyDown={this.onKeyDown} value={this.state.nameSearch}/></div>
                        </th>
                        <th>
                            <div>Description</div>
                            <div><input type="text" class="form-control" placeholder="Search..." onChange={this.onDescriptionSearchChange} onKeyDown={this.onKeyDown} value={this.state.descriptionSearch} /></div>
                        </th>
                        <th>
                            <div>Start Date</div>
                            <DatePicker
                                className="form-control"
                                todayButton={"Today"}
                                selected={this.state.startDateSearch}
                                onChange={this.onStartDateSearchChange}
                                onKeyDown={this.onKeyDown}
                                isClearable={true}
                                placeholderText="Search..."
                            />
                        </th>
                        <th>
                            <div>End Date</div>
                            <DatePicker
                                className="form-control"
                                todayButton={"Today"}
                                selected={this.state.endDateSearch}
                                onChange={this.onEndDateSearchChange}
                                onKeyDown={this.onKeyDown}
                                isClearable={true}
                                placeholderText="Search..."
                            />
                        </th>
                        <th>Status
                            <div>
                                <select class="form-control" onChange={this.onStatusSearchChange} value={this.state.statusSearch}>
                                    <option value="All">All</option>
                                    {this.state.statuses.map(status => <option value={status.sprintStatus}>{status.sprintStatus}</option>)}
                                </select>
                            </div>
                        </th>
                        <th colspan="2">
                            <div>
                                <button type="button" style={{ width: '100%'}} class="btn btn-primary" onClick={this.onFiltersApply}>Apply Filters</button>
                             </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    
                    {(sprints.length > 0)
                        ? sprints.map(sprint =>
                            <SprintRow key={sprint.sprint_id} sprint={sprint} onUpdatingSprintElement={this.onUpdatingSprintElement} onDeletingSprintElement={this.onDeletingSprintElement} />
                        )
                        : (<td colSpan="7">
                            No results
                          </td>)
                            
                    }
                </tbody>
            </table>
            )
    }

    render() {
            let content = this.state.loading ? (
                <p>Loading...</p>
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

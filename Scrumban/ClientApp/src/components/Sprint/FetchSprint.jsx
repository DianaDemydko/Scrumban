import React from 'react';
import { SprintRow } from './CreateForm/SprintRow'
import buildQuery from 'odata-query'

const ENTER_KEY = 13;


export class FetchSprintData extends React.Component
{
   
    constructor(props) {
        super(props)
        this.state = { sprints: [], loading: true, isTyping: false, nameSearch: "" }

        this.fetchSprintData = this.fetchSprintData.bind(this)
        this.onDeletingSprintElement = this.onDeletingSprintElement.bind(this)
        this.onUpdatingSprintElement = this.onUpdatingSprintElement.bind(this)

        this.onNameSearchChange = this.onNameSearchChange.bind(this)
        this.onNameKeyDown = this.onNameKeyDown.bind(this)
    }

    componentDidMount()
    {
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
        let value = event.target.value;
        
            this.setState({
                nameSearch: value,
            })
        
    }

    onNameKeyDown(event)
    {
        if (event.key == 'Enter')
        {
            const orderBy = ['Description']

            const filter = { Name: { contains: this.state.nameSearch } };

            const query = buildQuery({ filter })

            this.fetchSprintData(query)
        }
    }



    renderSprintsTable(sprints) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>
                            <div>Name</div>
                            <div><input type="text" class="form-control" placeholder="Search..." onChange={this.onNameSearchChange} onKeyDown={this.onNameKeyDown} value={this.state.nameSearch}/></div>
                        </th>
                        <th>Description</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {sprints.map(sprint =>
                        <SprintRow key={sprint.sprint_id} sprint={sprint} onUpdatingSprintElement={this.onUpdatingSprintElement} onDeletingSprintElement={this.onDeletingSprintElement} />
                        )
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
                <button type="button" class="btn btn-primary" onClick={this.fetchSprintData} >Load Sprint Table</button>
                {content}
            </div>
        );
    }
}

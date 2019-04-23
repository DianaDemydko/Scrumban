import React, { Component } from 'react';
import buildQuery from 'odata-query';
import { Link } from 'react-router-dom';
import { TeamEdit } from './TeamEdit';

class AddButton extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <Link to="/addTeam">
                <button class="btn btn-dark">
                    Add
                    </button>
            </Link>);
    }
}

class DeleteButton extends Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }
    onClick(e) {
        fetch('api/team/', {
            method: 'delete',
            headers: { "Content-Type": "application/json" },
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: this.props.teamIDtoDelete })
        });

        window.location.reload();
    }
    render() {
        return (
            <button onClick={e => this.onClick(e)} class="btn btn-dark">
                Delete
            </button>
        );
    }
}

class TeamRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        }
        this.onStateChanged = this.onStateChanged.bind(this);
    }
    onStateChanged(editState) {
        this.setState({ edit: editState });
    }
    render() {
        return (this.state.edit ? <TeamEdit teamEdit={this.props.team} onStateUpdating={this.onStateChanged} /> :
            <TeamPrint onStateUpdating={this.onStateChanged} team={this.props.team} />

        );
    }
}

class TeamPrint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            team: this.props.team,
            editState: false
        }
        this.onEditButtonClick = this.onEditButtonClick.bind(this);
    }

    onEditButtonClick(e) {

        this.setState({ editState: !this.state.editState });
        this.props.onStateUpdating(this.state.editState);

    }
    render() {
        return (<tbody>
            <tr id='teamOutputForm'>
                <td class="col"  > {this.state.team.name} </td>
                <td class="col" > {this.state.team.project} </td>
                <td>
                    <button class="btn btn-dark" id='editButton' onClick={e => this.onEditButtonClick(e)} >
                        Edit
                                </button>
                    <DeleteButton teamIDtoDelete={this.state.team.id} />
                </td>
            </tr>

        </tbody>);
    }
}










export class TeamGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            editState: false,
            currentSort:
            {
                columnName: '',
                sortingOrder: ''
            },
            findName: '',
            findProject: '',
        };
        this.sortData = this.sortData.bind(this)

        this.onFindNameChange = this.onFindNameChange.bind(this);
        this.onFindProjectChange = this.onFindProjectChange.bind(this);

        this.findData = this.findData.bind(this);

    }




    findData() {

        var filter = []
        if (this.state.findName != '') {
            filter.push({ 'tolower(Name)': { contains: this.state.findName.toLowerCase() } })
        }

        if (this.state.findProject != '') {
            filter.push({ 'tolower(Project)': { contains: this.state.findProject } })
        }



        var query = buildQuery({ filter })

        fetch('api/team/getTeams' + query)
            .then(res => res.json())
            .then(json => {
                this.setState({ teams: json })
            });
    }

    onFindNameChange(e) {
        this.setState({ findName: e.target.value });
    }
    onFindProjectChange(e) {
        this.setState({ findProject: e.target.value });

    }



    sortData(columnName) {
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
                break
            case 'project':
                query += 'project' + ' ' + this.state.currentSort.sortingOrder;
                break

        }


        fetch('api/team/getTeams' + query)
            .then(res => res.json())
            .then(json => {
                this.setState({ teams: json })
            });
    }

    onEditButtonClick(e) {

        this.setState({ editState: !this.state.editState });

    }


    componentDidMount() {

        fetch('api/team/getTeams')
            .then(res => res.json())
            .then(json => {
                this.setState({ teams: json })
            });

    }


    render() {

        return < div class="panel-heading">

            <table class=" table table-bordered">
                <tr>
                    <th class="col" onClick={() => this.sortData('name')}> Name
                        <div />
                    </th>
                    <th class="col" onClick={() => this.sortData('project')}> Project
                        <div />
                    </th>

                </tr>
                <tr>
                    <th> <input type='text' onChange={e => this.onFindNameChange(e)} /> </th>
                    <th><input type='text' onChange={e => this.onFindProjectChange(e)} /></th>

                    <th><button class="btn btn-dark" onClick={this.findData}>
                        Find
                        </button></th>
                </tr>

                {this.state.teams.map(team => (
                    <TeamRow key={team.id} team={team} />
                )
                )}
            </table>
            <div />
            <AddButton />

        </div>;

    }

}

import React, { Component } from 'react';
import buildQuery from 'odata-query';
import { Link } from 'react-router-dom';
import { TeamEdit } from './TeamEdit';
import '../../GridStyles/StyleForGrid.css';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner'


class DeleteButton extends Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }
    async onClick(e) {
      
        var data = JSON.stringify({ "id" : this.props.teamIDtoDelete })
        await fetch("api/team/" + this.props.teamIDtoDelete, {
            method: 'delete',
            headers: { "Content-Type": "application/json" }
        }).then(response => {
            if (response.status == 200) {
                toast.success("Team was deleted!");

            } else {
                toast.warn("That team have assigned Users and Sprints. To delete it unassigne that items!");
            }
            });
        this.props.loadData();
            
       
    }
    render() {
        return (
            <button onClick={e => this.onClick(e)} className="btn btn-sm btn-outline-dark w-100 m-1">
                Delete
            </button>
        );
    }
}

class TeamRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            team: this.props.team
        }
        this.onStateChanged = this.onStateChanged.bind(this);
    }
    onStateChanged(editState, team) {
        this.setState({ edit: editState, team: team });
    }
    render() {
        return (this.state.edit ? <TeamEdit teamEdit={this.props.team} onStateUpdating={this.onStateChanged} loadData={this.props.loadData} /> :
            <TeamPrint onStateUpdating={this.onStateChanged} team={this.state.team} loadData={this.props.loadData} currentUser={this.props.currentUser} />

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
        this.props.loadData();

    }
    render() {
        return (
            <tr>
                <td  > {this.state.team.name} </td>
                <td > {this.state.team.project} </td>
                <td >
                {this.props.currentUser.roleId != 1 ?
                    (
                        <button className="btn btn-sm btn-outline-dark w-100 m-1" id='editButton' onClick={e => this.onEditButtonClick(e)} >
                            Edit
                                </button> )
                    
                         : null}
                </td>
                <td >
                    {this.props.currentUser.roleId != 1 ?
                        <DeleteButton
                            teamIDtoDelete={this.state.team.teamID} loadData={this.props.loadData} />
                        : null }
                </td>
            </tr>
);
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
            loading: true
            
        };
        this.sortData = this.sortData.bind(this)

        this.onFindNameChange = this.onFindNameChange.bind(this);
        this.onFindProjectChange = this.onFindProjectChange.bind(this);

        this.findData = this.findData.bind(this);
        this.loadData = this.loadData.bind(this);

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
        this.setState({ loading: true });
        fetch('api/team/getTeams')
            .then(res => res.json())
            .then(json => {
                this.setState({ teams: json, loading: false  })
            });

    }

    loadData() {
        this.setState({ loading: true });
        fetch('api/team/getTeams')
            .then(res => res.json())
            .then(json => {
                this.setState({ teams: json, loading: false })
            });
    }


    render() {

        return  < div >
            <div className="grid-panel">
                <div className="grid-name">Teams</div>
                <div className="grid-buttons" style={{ 'margin-left': '78%' }}>
                    {this.props.currentUser.roleId != 1 ? <button onClick={() => this.props.moveToComponent("teamAdd")} className="btn add-new btn-panel-table">Create New</button> : null }
                </div>
            </div>
            <hr></hr>
            {this.state.loading ? (
                <div style={{ 'margin-left': '50%', 'margin-top': '15%' }}>
                    <Spinner animation="border" variant="warning" />
                </div>
            )
                :
                <div className="tablePosition table-wrapper">
                    <table className=" table" style={{ 'table-layout': 'fixed' }}>
                        <tr>
                            <th onClick={() => this.sortData('name')} style={{ 'width': '40%' }}> Name
                        <div />
                            </th>
                            <th onClick={() => this.sortData('project')} style={{ 'width': '30%' }}> Project
                        
                     </th>
                            <th></th>
                            <th></th>

                        </tr>
                        <tbody>
                            {this.state.teams.map(team => (
                                <TeamRow key={team.id} team={team} loadData={this.loadData} currentUser={this.props.currentUser} />
                            )
                            )}
                        </tbody>

                    </table>
                </div>
            }
        </div>;

    }

}

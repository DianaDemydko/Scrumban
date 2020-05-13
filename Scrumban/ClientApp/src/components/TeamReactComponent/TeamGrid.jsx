﻿import React, { Component } from 'react';
import buildQuery from 'odata-query';
import { Link } from 'react-router-dom';
import { TeamEdit } from './TeamEdit';
import '../../GridStyles/StyleForGrid.css';
import { toast } from 'react-toastify';


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
                toast.success("Team was deleted");

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
            
        }
        this.onStateChanged = this.onStateChanged.bind(this);
    }
    onStateChanged(editState) {
        this.setState({ edit: editState });
    }
    render() {
        return (this.state.edit ? <TeamEdit teamEdit={this.props.team} onStateUpdating={this.onStateChanged} loadData={this.props.loadData} onStateUpdating={this.onStateChanged}/> :
            <TeamPrint onStateUpdating={this.onStateChanged} team={this.props.team} loadData={this.props.loadData}/>

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
                    <button className="btn btn-sm btn-outline-dark w-100 m-1" id='editButton' onClick={e => this.onEditButtonClick(e)} >
                        Edit
                                </button>
                </td>
                <td >
                    <DeleteButton
                        teamIDtoDelete={this.state.team.teamID} loadData={this.props.loadData} />
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
            findProject: ''
            
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

        fetch('api/team/getTeams')
            .then(res => res.json())
            .then(json => {
                this.setState({ teams: json })
            });

    }

    loadData() {
        fetch('api/team/getTeams')
            .then(res => res.json())
            .then(json => {
                this.setState({ teams: json })
            });
    }


    render() {

        return  < div >
            <div className="grid-panel">
                <div className="grid-name">Teams</div>
                <div className="grid-buttons" style={{ 'margin-left': '78%' }}>
                    <button onClick={() => this.props.moveToComponent("teamAdd")} className="btn add-new btn-panel-table">Create New</button>
                </div>
            </div>
            <hr></hr>
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
                            <TeamRow key={team.id} team={team} loadData={this.loadData} />
                )
                        )}
                    </tbody>
            </table>
            </div>

        </div>;

    }

}

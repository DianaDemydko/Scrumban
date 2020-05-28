import React from 'react';
import { DefectRow } from './DefectRow';
import { DefectFilter } from './DefectFilter';
import { Pagination } from './Pagination';
import { checkToken } from '../Helpers';
import { toast } from 'react-toastify';
import '../../GridStyles/StyleForGrid.css';

import Spinner from 'react-bootstrap/Spinner'

const apiGetUrl = "/api/Defect/getDefects";
const apiDeleteUrl = "/api/Defect/deleteDefect";

export class DefectGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            defects: [],
            pageOfItems: [],

            //sorting
            currentSort:
            {
                columnName: '',
                sortingOrder: ''
            },

            showFilters: false,
            users: [],
            loading: true
        };
        this.showFilters = this.showFilters.bind(this);
        this.loadData = this.loadData.bind(this);
        this.onChanged = this.onChanged.bind(this);
        this.onRemoveDefect = this.onRemoveDefect.bind(this);

        //sorting
        this.sortData = this.sortData.bind(this)  

        //pagination
        this.onChangePage = this.onChangePage.bind(this);
        this.fetchUsers = this.fetchUsers.bind(this);
        this.load = this.load.bind(this);
    }

    showFilters(param) {
        this.setState({ showFilters: param });
    }

    onChangePage(pageOfItems) {
        // update state with new page of items

        this.setState({
            pageOfItems: pageOfItems
        });
       
    }

    //sorting
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
            case 'description':
                query += 'description' + ' ' + this.state.currentSort.sortingOrder;
                break
            case 'state':
                query += 'state' + ' ' + this.state.currentSort.sortingOrder;
                break
            case 'priority':
                query += 'priority' + ' ' + this.state.currentSort.sortingOrder;
                break
            case 'severity':
                query += 'severity' + ' ' + this.state.currentSort.sortingOrder;
                break
            case 'storyId':
                query += 'storyId' + ' ' + this.state.currentSort.sortingOrder;
                break
            case 'status':
                query += 'status' + ' ' + this.state.currentSort.sortingOrder;
                break
        }
        this.loadData(query);
    }

    renderCaret(columnName) {
        if (this.state.currentSort.columnName == columnName) {
            if (this.state.currentSort.sortingOrder == 'asc') {
                return (<span class="fa fa-caret-up" id="active-caret" style={{ color: '#2adc29' }} ></span>)
            }
            else {
                return (<span class="fa fa-caret-down" id="active-caret" style={{ color: '#2adc29' }} ></span>)
            }
        }
        else {
            return (<span class="fa fa-caret-down"></span>)
        }
    }

    onChanged(item) {
        var arr = this.state.defects;
        var index = arr.indexOf(x => x.defectId === item.defectId);
        arr[index] = item;
        this.setState({ defects: arr, pageOfItems: arr });
    }

    async load() {

        await this.fetchUsers();
        await this.loadData("");
    }

    componentDidMount() {
        this.load();
    }

    async fetchUsers() {

        await fetch('/api/users/getUsers', {

            meethod: "get",

            headers: {

                'Content-Type': 'application/json',

                'Authorization': 'Bearer ' + sessionStorage.getItem("tokenKey")

            }

        })

            .then(function (response) {

                if (response.status == 200) {

                    return response.json()

                }

                else if (response.status == 401) {

                    alert("Not Authorized")

                    window.location.replace("/login");

                }

                else {

                    alert("ERROR ! " + response.status)

                }

            })

            .then(data => this.setState({ users: data }))

    }

    loadData(query) {
        this.setState({ loading: true });
        checkToken()
        fetch(apiGetUrl + query, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + sessionStorage.getItem("tokenKey")
            }
        })
            .then(function (response) {
                let responseStatus = response.status
                switch (responseStatus) {
                    case 200:
                        return response.json()
                        break
                    case 401:
                        toast.warn("You are not authorized. Please login!");
                        window.location.replace("");
                        break
                    case 403:
                        toast.error("You have not permission  !");
                        break
                    default:
                        toast.error("Something wrong  !");
                        break
                }
            })
            .then(data => {
                if (data.length > 0) {
                    this.setState({ defects: data, loading: false })
                } else {
                    this.setState({ defects: [], loading: false, pageOfItems: [] })
                }
            });
       
    }

    onRemoveDefect(defectId) {
        checkToken()
        var url = apiDeleteUrl + "/" + defectId;
        fetch(url, {
            method: "delete",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("tokenKey")
            }
        })
            .then(function (response) {
                let responseStatus = response.status
                switch (responseStatus) {
                    case 200:
                        toast.success("Defect was deleted !");
                        this.loadData("");
                        break
                    case 401:
                        toast.warn("You are not authorized. Please login!");
                        window.location.replace("");
                        break
                    case 403:
                        toast.error("ERROR! You have not permission !");
                        break
                    case 404:
                        toast.error("Incorrect Email or Token!");
                        break
                    default:
                        toast.error("Something wrong!!");
                        this.loadData("");
                        break
                }
            }.bind(this))
    }

    render() {
        var changed = this.onChanged;
        var remove = this.onRemoveDefect;

        return (<div >
            <div className="grid-panel">
                <div className="grid-name">Defects</div>
                <div className="grid-buttons">
                    <button onClick={() => this.props.moveToComponent("defectAdd")} className="btn add-new btn-panel-table">Create New</button>
                    <button onClick={() => { this.showFilters(true) }} className="btn btn-panel-table add-filters">Apply Filters</button>
                </div>
            </div>
            <hr></hr>
            {this.state.showFilters ? <DefectFilter loadData={this.loadData} hideFilters={this.showFilters} /> : null}
            {this.state.loading ? (
                <div style={{ 'margin-left': '50%', 'margin-top': '15%' }}>
                    <Spinner animation="border" variant="warning" />
                </div>
            ) : <div>
                    {/* Table*/}
                    <div className="tablePosition table-wrapper">
                        <table class="table table-hover" style={{ 'table-layout': 'fixed' }} >
                            <thead>
                                <tr>
                                    <th className="col" style={{ cursor: 'pointer' }} onClick={() => this.sortData('name')}> Name {this.renderCaret('name')}</th>
                                    <th className="col" style={{ cursor: 'pointer' }} onClick={() => this.sortData('description')}> Description {this.renderCaret('description')}</th>
                                    <th className="col" style={{ cursor: 'pointer' }} onClick={() => this.sortData('state')}> State {this.renderCaret('state')}</th>
                                    <th className="col" style={{ cursor: 'pointer' }}> Owner</th>
                                    <th className="col" style={{ cursor: 'pointer' }} onClick={() => this.sortData('priority')}> Priority {this.renderCaret('priority')}</th>
                                    <th className="col" style={{ cursor: 'pointer' }} onClick={() => this.sortData('severity')}> Severity {this.renderCaret('severity')}</th>
                                    <th className="col" style={{ cursor: 'pointer' }} onClick={() => this.sortData('storyId')}> Story {this.renderCaret('storyId')}</th>
                                    <th className="col" style={{ cursor: 'pointer' }} onClick={() => this.sortData('status')}> Status {this.renderCaret('status')}</th>
                                    <th class="col" />
                                </tr>

                            </thead>



                            {(this.state.pageOfItems.length > 0)//pageOfItems
                                ? this.state.pageOfItems.map((defect) => {//pageOfItems

                                    return <DefectRow key={defect.defectId} defect={defect} onRemove={this.onRemoveDefect} onChanged={changed} loadData={this.loadData} users={this.state.users} />
                                })
                                : (<tbody>
                                    <td>
                                        No results
                            </td>
                                </tbody>)
                            }
                        </table>
                    </div>
                    <div>
                        <Pagination items={this.state.defects} onChangePage={this.onChangePage} />
                    </div>
                </div>}
        </div>
        )
    }
}

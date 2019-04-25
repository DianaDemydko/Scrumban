import React from 'react';
import { DefectRow } from './DefectRow';
import { Pagination } from './Pagination';
import buildQuery from 'odata-query'
import { checkToken } from '../Helpers'
import '../../GridStyles/StyleForGrid.css';
import { toast } from 'react-toastify';


const apiGetUrl = "/api/DefectData/getDefects";
const apiDeleteUrl = "/api/DefectData";

const data = require('../../DefectData.json');
const priorityOption = data.priority;
const stateOption = data.state;
const severityOption = data.severity;
const statusOption = data.status;


export class DefectGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            defects: [],
            pageOfItems: [],//pagination
            //filter
            nameSearch: "",
            descriptionSearch: "",
            stateSearch: "All",
            prioritySearch: "All",
            storyIdSearch: "",
            severitySearch: "All",
            statusSearch: "All",
            //sorting
            currentSort:
            {
                columnName: '',
                sortingOrder: ''
            }
        };

        this.loadData = this.loadData.bind(this);
        this.onChanged = this.onChanged.bind(this);
        this.onRemoveDefect = this.onRemoveDefect.bind(this);

        //filter
        this.onNameSearchChanged = this.onNameSearchChanged.bind(this);
        this.onDescriptionSearchChanged = this.onDescriptionSearchChanged.bind(this);
        this.onStateSearchChanged = this.onStateSearchChanged.bind(this);
        this.onPrioritySearchChanged = this.onPrioritySearchChanged.bind(this);
        this.onSeveritySearchChanged = this.onSeveritySearchChanged.bind(this);
        //this.onStoryIdSearchChanged = this.onStoryIdSearchChanged.bind(this);
        this.onStatusSearchChanged = this.onStatusSearchChanged.bind(this);
        this.onFiltersApply = this.onFiltersApply.bind(this)
        this.onFiltersClear = this.onFiltersClear.bind(this)

        //sorting
        this.sortData = this.sortData.bind(this)  

        //pagination
        this.onChangePage = this.onChangePage.bind(this);
    }
    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({
            pageOfItems: pageOfItems
        });
       
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
    //onStoryIdSearchChanged(e) {
    //    this.setState({ storyIdSearch: e.target.value });
    //}
    onStatusSearchChanged(e) {
        this.setState({ statusSearch: e.target.value });
    }

    //Filter
    onFiltersApply() {
        var filter = []

        if (this.state.nameSearch != "") {
            filter.push({ "tolower(Name)": { contains: this.state.nameSearch.toLowerCase() } })
        }

        if (this.state.descriptionSearch != "") {
            filter.push({ "tolower(Description)": { contains: this.state.descriptionSearch } })
        }

        if (this.state.stateSearch != "All") {
            filter.push({ State: this.state.stateSearch  })
        }

        if (this.state.prioritySearch != "All") {
            filter.push({ Priority: this.state.prioritySearch  })
        }
        if (this.state.severitySearch != "All") {
            filter.push({ Severity: this.state.severitySearch  })
        }
        if (this.state.storyIdSearch != "") {
            filter.push({ defectStoryId: { contains: this.state.storyIdSearch } })
        }
        if (this.state.statusSearch != "All") {
            filter.push({ Status:  this.state.statusSearch  })
        }

        var query = buildQuery({ filter })

        this.loadData(query)
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
    componentDidMount() {
        this.loadData("");
    }

    loadData(query) {
        checkToken()
        fetch(apiGetUrl + query, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + sessionStorage.getItem("tokenKey")
            }
        })
            .then(function (response) {
                if (response.status == 200) {
                    return response.json()
                }
                else if (response.status == 401) {
                    //var answer = window.confirm("You are not authorized. Move to Login page ?");
                    toast.warn("You are not authorized. Login please !");
                   // if (answer == true) {
                        //window.location.replace("/login");
                        this.props.moveToComponent("login")
                   // }
                }
                else if (response.status == 403) {
                    toast.error("You have not permission  !");
                }
                else {
                    toast.error("Something wrong  !");
                    //alert("ERROR! Status code: " + response.status)
                }
            })
            .then(data => { this.setState({ defects: data }) });
       
    }

    onChanged(item) {
        var arr = this.state.defects;
        var index = arr.indexOf(x => x.defectId === item.defectId);
        console.log(index);
        arr[index] = item;
        console.log(arr[index]);
        console.log(arr);
        this.setState({ defects: arr });
    }

    onRemoveDefect(defectId) {

        if (defectId) {
            var url = apiDeleteUrl + "/" + defectId;

            var xhr = new XMLHttpRequest();
            xhr.open("delete", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status == 200) {
                    toast.success("Defect was deleted !");
                    this.loadData("");
                }
                if (xhr.status == 400) {
                    toast.error("Defect have deleted already ! ");
                    this.loadData("");
                }
            }.bind(this);
            xhr.send();
        }
    }

    renderCaret(columnName) {
        if (this.state.currentSort.columnName == columnName) {
            if (this.state.currentSort.sortingOrder == 'asc') {
                return (<span class="fa fa-caret-up" id="active-caret" ></span>)
            }
            else {
                return (<span class="fa fa-caret-down" id="active-caret" ></span>)
            }
        }
        else {
            return (<span class="fa fa-caret-down"></span>)
        }
    }

    render() {
        var changed = this.onChanged;
        var remove = this.onRemoveDefect;

        return (<div >
            <label style={{ 'fontSize': '40px' }}> Defects </label>
            <div className='filterContainer' id='filterForm'>
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
                    <button class="btn btn-sm btn-outline-dark w-100" type="button"  onClick={this.onFiltersApply}>Search</button>
                </div>
                <div class="col-sm" >
                    <td />
                    <button class="btn btn-sm btn-outline-dark w-100" type="button"  onClick={this.onFiltersClear}>Clear</button>
                </div>
                </div>
            </div>
            {/* Table*/}
            <div className="tablePosition">
                <table class="table table-striped" style={{ 'table-layout': 'fixed' }} >
                    <thead>
                    <tr>
                            <th className="col" style={{ cursor: 'pointer' }} onClick={() => this.sortData('name')}> Name {this.renderCaret('name')}</th>
                            <th className="col" style={{ cursor: 'pointer' }} onClick={() => this.sortData('description')}> Description {this.renderCaret('description')}</th>
                            <th className="col" style={{ cursor: 'pointer' }} onClick={() => this.sortData('state')}> State {this.renderCaret('state')}</th>
                            <th className="col" style={{ cursor: 'pointer' }} onClick={() => this.sortData('priority')}> Priority {this.renderCaret('priority')}</th>
                            <th className="col" style={{ cursor: 'pointer' }} onClick={() => this.sortData('severity')}> Severity {this.renderCaret('severity')}</th>
                            <th className="col" style={{ cursor: 'pointer' }} onClick={() => this.sortData('storyId')}> StoryId {this.renderCaret('storyId')}</th>
                            <th className="col" style={{ cursor: 'pointer' }} onClick={() => this.sortData('status')}> Status {this.renderCaret('status')}</th>
                            <th class="col" />
                    </tr>

                </thead>



                {(this.state.pageOfItems.length > 0)//pageOfItems
                    ? this.state.pageOfItems.map((defect) => {//pageOfItems
                       
                            return <DefectRow key={defect.defectId} defect={defect} onRemove={remove} onChanged={changed} />
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
                <Pagination items={this.state.defects}  onChangePage={this.onChangePage} />
            </div>
            <button class="btn btn-sm btn-outline-dark" onClick={() => this.props.moveToComponent("defectAdd")}>Add defect</button>
        </div>
        )
    }
}

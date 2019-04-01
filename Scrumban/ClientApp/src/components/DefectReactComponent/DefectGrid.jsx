import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DefectTable } from './DefectTable';
import { DefectEdit } from './DefectEdit';
import buildQuery from 'odata-query'


const apiGetUrl = "/api/DefectData/getDefects";
const apiDeleteUrl = "/api/DefectData";

const data = require('../../DefectData.json');
const priorityOption = data.priority;
const stateOption = data.state;
const severityOption = data.severity;
const statusOption = data.status;


class Defect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.defect,
            index: true
        };

        this.onRemoveDefect = this.onRemoveDefect.bind(this);
        this.onEditDefect = this.onEditDefect.bind(this);
        this.onChangedDefect = this.onChangedDefect.bind(this);

    }

    onRemoveDefect() {
        this.props.onRemove(this.state.data.defectId);

    }

    onEditDefect() {
        this.setState({ index: this.state.index === true ? false : true });
    }

    onChangedDefect(item) {
        this.props.onChanged(item);
        this.setState({ data: item });
    }

    render() {
        const isEdit = this.state.index;
        return (<tbody>
            {
                isEdit ?
                    (<DefectTable key={this.props.key} item={this.state.data} editDefect={this.onEditDefect} deleteDefect={this.onRemoveDefect} />)
                    : (<DefectEdit item={this.state.data} editDefect={this.onEditDefect} deleteDefect={this.onRemoveDefect} changed={this.onChangedDefect} />)
            }
        </tbody>

        );
    }
}

export class DefectGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            defects: [],
            //OData filter
            nameSearch: "",
            descriptionSearch: "",
            stateSearch: "All",
            prioritySearch: "All",
            storyIdSearch: "",
            severitySearch: "All",
            statusSearch: "All",
            //OData sorting
            currentSort:
            {
                columnName: '',
                sortingOrder: ''
            }
        };

        this.loadData = this.loadData.bind(this);
        this.onChanged = this.onChanged.bind(this);
        this.onRemoveDefect = this.onRemoveDefect.bind(this);

        //oData filter
        this.onNameSearchChanged = this.onNameSearchChanged.bind(this);
        this.onDescriptionSearchChanged = this.onDescriptionSearchChanged.bind(this);
        this.onStateSearchChanged = this.onStateSearchChanged.bind(this);
        this.onPrioritySearchChanged = this.onPrioritySearchChanged.bind(this);
        this.onSeveritySearchChanged = this.onSeveritySearchChanged.bind(this);
        this.onStoryIdSearchChanged = this.onStoryIdSearchChanged.bind(this);
        this.onStatusSearchChanged = this.onStatusSearchChanged.bind(this);
        this.onFiltersApply = this.onFiltersApply.bind(this)
        this.onFiltersClear = this.onFiltersClear.bind(this)

        //oData sorting
        this.sortData = this.sortData.bind(this)
        this.sortByName = this.sortByName.bind(this)
        this.sortByDescription = this.sortByDescription.bind(this)
        this.sortByState = this.sortByState.bind(this)
        this.sortByPriority = this.sortByPriority.bind(this)
        this.sortBySeverity = this.sortBySeverity.bind(this)
        this.sortByStoryId = this.sortByStoryId.bind(this)
        this.sortByStatus = this.sortByStatus.bind(this)   
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
    onStoryIdSearchChanged(e) {
        this.setState({ storyIdSearch: e.target.value });
    }
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
    //sort by Name
    sortByName(sortingOrder, columnName) {

        let compareFunction = function (a, b) {
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

        switch (sortingOrder) {
            case 'ascending':
                this.setState({
                    defects: this.state.defects.sort(compareFunction)
                })
                break
            case 'descending':
                this.setState({
                    defects: this.state.defects.sort(compareFunction).reverse()
                })
                break
        }
    }
    //sort by Description
    sortByDescription(sortingOrder, columnName) {
        let compareFunction = function (a, b) {
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
                    defects: this.state.defects.sort(compareFunction)
                })
                break
            case 'descending':
                this.setState({
                    defects: this.state.defects.sort(compareFunction).reverse()
                })
                break
        }
    }
    //sort by State
    sortByState(sortingOrder, columnName) {

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
                    defects: this.state.defects.sort(compareFunction)
                })
                break
            case 'descending':
                this.setState({
                    defects: this.state.defects.sort(compareFunction).reverse()
                })
                break
        }
    }
    //sort by Priority
    sortByPriority(sortingOrder, columnName) {

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
                    defects: this.state.defects.sort(compareFunction)
                })
                break
            case 'descending':
                this.setState({
                    defects: this.state.defects.sort(compareFunction).reverse()
                })
                break
        }
    }
    //sort by Severity
    sortBySeverity(sortingOrder, columnName) {

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
                    defects: this.state.defects.sort(compareFunction)
                })
                break
            case 'descending':
                this.setState({
                    defects: this.state.defects.sort(compareFunction).reverse()
                })
                break
        }
    }
    //sort by StoryId
    sortByStoryId(sortingOrder, columnName) {

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
                    defects: this.state.defects.sort(compareFunction)
                })
                break
            case 'descending':
                this.setState({
                    defects: this.state.defects.sort(compareFunction).reverse()
                })
                break
        }
    }
    //sort by Status
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
                    defects: this.state.defects.sort(compareFunction)
                })
                break
            case 'descending':
                this.setState({
                    defects: this.state.defects.sort(compareFunction).reverse()
                })
                break
        }
    }
    sortData(columnName) {
        let currentSort = this.state.currentSort

        if (currentSort.columnName == columnName) {
            if (currentSort.sortingOrder == 'ascending') {
                currentSort.sortingOrder = 'descending'
            }
            else {
                currentSort.sortingOrder = 'ascending'
            }
        }
        else {
            currentSort.columnName = columnName
            currentSort.sortingOrder = 'ascending'
        }

        this.setState({ currentSort: currentSort })

        switch (columnName) {
            case 'name':
                this.sortByName(currentSort.sortingOrder, columnName)
                break
            case 'description':
                this.sortByDescription(currentSort.sortingOrder, columnName)
                break
            case 'state':
                this.sortByState(currentSort.sortingOrder, columnName)
                break
            case 'priority':
                this.sortByPriority(currentSort.sortingOrder, columnName)
                break
            case 'severity':
                this.sortBySeverity(currentSort.sortingOrder, columnName)
                break
            case 'storyId':
                this.sortByStoryId(currentSort.sortingOrder, columnName)
                break
            case 'status':
                this.sortByStatus(currentSort.sortingOrder, columnName)
                break
        }
    }
    componentDidMount() {
        this.loadData("");
    }
    loadData(query) {
        var xhr = new XMLHttpRequest();
        xhr.open("get", apiGetUrl + query, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ defects: data });
        }.bind(this);
        xhr.send();
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
                    this.loadData("");
                }
            }.bind(this);
            xhr.send();
        }
    }
    render() {
        var changed = this.onChanged;
        var remove = this.onRemoveDefect;
        return (<div>
            <h2>Defects</h2>

            <Link to={{ pathname: '/defect_add' }} ><button className="btn btn-primary">Add defect</button></Link>

            <table className="table table-hover">
                <thead className="bg-light">
                    <tr>
                        <th style={{ cursor: 'pointer' }} onClick={() => this.sortData('name')}> Name</th>
                        <th style={{ cursor: 'pointer' }} onClick={() => this.sortData('description')}> Description</th>
                        <th style={{ cursor: 'pointer' }} onClick={() => this.sortData('state')}> State</th>
                        <th style={{ cursor: 'pointer' }} onClick={() => this.sortData('priority')}> Priority</th>
                        <th style={{ cursor: 'pointer' }} onClick={() => this.sortData('severity')}> Severity</th>
                        <th style={{ cursor: 'pointer' }} onClick={() => this.sortData('storyId')}> StoryId</th>
                        <th style={{ cursor: 'pointer' }} onClick={() => this.sortData('status')}> Status</th>
                    </tr>
                    <tr>
                     <th><input type="text" class="form-control" placeholder="Search..." onChange={this.onNameSearchChanged} value={this.state.nameSearch} /></th>
                     <th><input type="text" class="form-control" placeholder="Search..." onChange={this.onDescriptionSearchChanged} value={this.state.descriptionSearch} /></th>
                     <th><select class="form-control" placeholder="Search..." onChange={this.onStateSearchChanged} value={this.state.stateSearch}>
                            <option value="All">All</option>
                            {stateOption.map((item) => <option>{item.name}</option>)}
                        </select></th>
                     <th><select class="form-control" placeholder="Search..." onChange={this.onPrioritySearchChanged} value={this.state.prioritySearch}>
                            <option value="All">All</option>
                            {priorityOption.map((item) => <option>{item.name}</option>)}
                        </select></th>
                     <th><select class="form-control" placeholder="Search..." onChange={this.onSeveritySearchChanged} value={this.state.severitySearch}>
                            <option value="All">All</option>
                            {severityOption.map((item) => <option>{item.name}</option>)}
                        </select></th>
                        <th style={{ width: '10%' }}><input type="text" class="form-control" placeholder="Search..." onChange={this.onStoryIdSearchChanged} value={this.state.storyIdSearch} /></th>
                     <th>
                        <select class="form-control" placeholder="Search..." onChange={this.onStatusSearchChanged} value={this.state.statusSearch}>
                        <option value="All">All</option>
                        {statusOption.map((item) => <option>{item.name}</option>)}
                        </select>
                    </th>
                     <th style={{ width: '15%' }}>
                        <div>
                                <button style={{ width: '50%' }} type="button" class="btn btn-primary" onClick={this.onFiltersApply}>Search</button>
                                <button style={{ width: '50%' }} type="button" class="btn btn-primary" onClick={this.onFiltersClear}>Clear</button>
                        </div>
                    </th>
                        </tr>
                </thead>
                {(this.state.defects.length > 0)
                ? this.state.defects.map(function (defect) { return <Defect key={defect.defectId} defect={defect} onRemove={remove} onChanged={changed} /> })
                    : (<tbody>
                            <td>
                                No results
                            </td>
                       </tbody>)
                }
                </table>
        </div>
        )
    }
}




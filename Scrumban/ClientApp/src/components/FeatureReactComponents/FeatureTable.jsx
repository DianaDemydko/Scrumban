import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';
import { EditFeature } from './EditFeature';
import buildQuery from 'odata-query'



class AddButton extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <Link to="/addfeature">
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
        fetch('api/FeatureData/', {
            method: 'delete',
            headers: { "Content-Type": "application/json" },
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: this.props.featureIDtoDelete })
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

class FeatureRow extends Component {
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
        return (this.state.edit ? <EditFeature featuretoEdit={this.props.feature} onStateUpdating={this.onStateChanged} /> :
            <FeaturePrint onStateUpdating={this.onStateChanged} feature={this.props.feature} />

        );
    }
}
class FeaturePrint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feature: this.props.feature,
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
            <tr id='featureOutputForm'>
                <td class="col"  > {this.state.feature.name} </td>
                <td class="col" > {this.state.feature.description} </td>
                {/* <td class="col" > {this.state.state} </td>*/}
                {/*<td class="col" > {this.state.feature.owner.name } </td>*/}
                <td class="col" > States </td>
                <td class="col" > Owner </td>
                <td class="col" > {this.state.feature.priority} </td>
                {/*<td class="col col-primary dropdown-toggle" type="divider" data-toggle="dropdown"> {feature.stories} </td>*/}
                
                {/* <td class="col" > {this.state.feature.stories} </td>*/}
                <td class="col" > Stories </td>
                <Moment class="col" parse="YYYY-MM-DD" format="YYYY-MM-DD" > {this.state.feature.time} </Moment>
                <td>
                    <button class="btn btn-dark" id='editButton' onClick={e => this.onEditButtonClick(e)} >
                        Edit
                                </button>
                    <DeleteButton featureIDtoDelete={this.state.feature.id} />
                </td>
            </tr>

        </tbody>);
    }
}

export class FeatureTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            features: [],
            editState: false,
            // sortState: false,
            currentSort:
            {
                columnName: '',
                sortingOrder: ''
            },
            findName: '',
            findDescription: '',
            findPriority: 0,
            findDate: null,


        };
        //   this.sort = this.sort.bind(this);
        this.sortData = this.sortData.bind(this)
        //this.sortByName = this.sortByName.bind(this)
        //this.sortByDescription = this.sortByDescription.bind(this)
        //this.sortByDate = this.sortByDate.bind(this)
        //this.sortByPriority = this.sortByPriority.bind(this)

        this.onFindNameChange = this.onFindNameChange.bind(this);
        this.onFindDescriptionChange = this.onFindDescriptionChange.bind(this);
        this.onFindPriorityChange = this.onFindPriorityChange.bind(this);
        this.onFindDateChange = this.onFindDateChange.bind(this);

        this.findData = this.findData.bind(this);

    }


  
   
    findData() {

        var filter = []
        if (this.state.findName != '') {
            filter.push({ 'tolower(Name)': { contains: this.state.findName.toLowerCase() } })
        }

        if (this.state.findDescription != '') {
            filter.push({ 'tolower(Description)': { contains: this.state.findDescription } })
        }

        if (this.state.findDate != null) {
            filter.push({ time: { gt: this.state.findDate} })
        }
        if (this.state.findPriority != 0) {
            filter.push({ priority: parseInt(this.state.findPriority)  })
        }


        
        var query = buildQuery({ filter })

        fetch('api/FeatureData/' + query)
            .then(res => res.json())
            .then(json => {
                this.setState({ features: json })
            });

        

    }
        
        


  onFindNameChange(e) {
        this.setState({ findName: e.target.value }); 
    }
    onFindDescriptionChange(e) {
        this.setState({ findDescription: e.target.value });
       
    }
    onFindPriorityChange(e) {
        this.setState({ findPriority: e.target.value });
       
    }
    onFindDateChange(dateToFind) {
        this.setState({ findDate: dateToFind});

    }

    //sortByPriority(sortingOrder, columnName) {
    //    switch (sortingOrder) {
    //        case 'ascending':
    //            this.setState({
    //                features: this.state.features.sort(compareFunction)
    //            })
    //            break
    //        case 'descending':
    //            this.setState({
    //                features: this.state.features.sort(compareFunction).reverse()
    //            })
    //            break
    //    }

    //}

    //sortByName(sortingOrder, columnName) {
    //    let compareFunction = function (a, b) {
    //        let aName = a[columnName].toLowerCase()
    //        let bName = b[columnName].toLowerCase()
    //        if (aName < bName) {
    //            return -1;
    //        }
    //        if (aName > bName) {
    //            return 1;
    //        }
    //        return 0;
    //    }

    //    switch (sortingOrder) {
    //        case 'ascending':
    //            this.setState({
    //                features: this.state.features.sort(compareFunction)
    //            })
    //            break
    //        case 'descending':
    //            this.setState({
    //                features: this.state.features.sort(compareFunction).reverse()
    //            })
    //            break
    //    }
    //}

    //sortByDescription(sortingOrder, columnName) {
    //    let compareFunction = function (a, b) {
    //        let aDescriptionLength = a[columnName].length
    //        let bDescriptionLength = b[columnName].length
    //        if (aDescriptionLength < bDescriptionLength) {
    //            return -1;
    //        }
    //        if (aDescriptionLength > bDescriptionLength) {
    //            return 1;
    //        }
    //        return 0;
    //    }

    //    switch (sortingOrder) {
    //        case 'ascending':
    //            this.setState({
    //                sprints: this.state.features.sort(compareFunction)
    //            })
    //            break
    //        case 'descending':
    //            this.setState({
    //                sprints: this.state.features.sort(compareFunction).reverse()
    //            })
    //            break
    //    }
    //}

    //sortByDate(sortingOrder, columnName) {

    //    let compareFunction = function (a, b) {
    //        if (a[columnName] < b[columnName]) {
    //            return -1;
    //        }
    //        if (a[columnName] > b[columnName]) {
    //            return 1;
    //        }
    //        return 0;
    //    }

    //    switch (sortingOrder) {
    //        case 'ascending':
    //            this.setState({
    //                features: this.state.features.sort(compareFunction)
    //            })
    //            break
    //        case 'descending':
    //            this.setState({
    //                features: this.state.features.sort(compareFunction).reverse()
    //            })
    //            break
    //    }
    //}

    //sortByStatus(sortingOrder, columnName) {

    //    let compareFunction = function (a, b) {

    //        if (a[columnName] < b[columnName]) {
    //            return -1;
    //        }
    //        if (a[columnName] > b[columnName]) {
    //            return 1;
    //        }
    //        return 0;
    //    }

    //    switch (sortingOrder) {
    //        case 'ascending':
    //            this.setState({
    //                features: this.state.features.sort(compareFunction)
    //            })
    //            break
    //        case 'descending':
    //            this.setState({
    //                features: this.state.features.sort(compareFunction).reverse()
    //            })
    //            break
    //    }
    //}


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
            case 'time':
                query += 'time' + ' ' + this.state.currentSort.sortingOrder;
                break
            case 'priority':
                query += 'priority' + ' ' + this.state.currentSort.sortingOrder;
                break
           




        }
     

                fetch('api/FeatureData/' + query)
                    .then(res => res.json())
                    .then(json => {
                        this.setState({ features: json })
                    });
    }

    onEditButtonClick(e) {

        this.setState({ editState: !this.state.editState });

    }


    componentDidMount() {

        fetch('api/FeatureData/')
            .then(res => res.json())
            .then(json => {
                this.setState({ features: json })
            });

    }


    render() {

        return < div class="panel-heading">

            <table class=" table table-bordered">
                <tr>
                    <th class="col" onClick={() => this.sortData('name')}> Name
                        <div />
                    </th>
                    <th class="col" onClick={() => this.sortData('description')}> Description
                        <div />
                    </th>
                    <th class="col" > State  </th>
                    <th class="col" > Owner  </th>
                    <th class="col" onClick={() => this.sortData('priority')}> Priority
                    </th>
                    <th class="col"> Stories </th>
                    <th class="col" onClick={() => this.sortData('time')} > Time
                    </th>
                   
                </tr>
                <tr>
                    <th> <input type='text' onChange={e => this.onFindNameChange(e)}/> </th>
                    <th><input type='text' onChange={e => this.onFindDescriptionChange(e)} /></th>
                    <th><input type='text' /></th>
                    <th><input type='text' /></th>
                    <th><input type ='text' onChange={e => this.onFindPriorityChange(e)} /></th>
                    <th><input type='text' /></th>
                    <th><DatePicker selected={this.state.findDate} onChange={this.onFindDateChange} dateFormat="yyyy/MM/dd" /> </th >
                    
                    <th><button class="btn btn-dark" onClick={this.findData}>
                        Find
                        </button></th>
                    </tr>

                {this.state.features.map(feature => (
                    <FeatureRow key={feature.id} feature={feature} />
                )
                )}
            </table>
            <div/>
            <AddButton />

        </div>;

    }

}




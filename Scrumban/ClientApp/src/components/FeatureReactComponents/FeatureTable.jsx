import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';

//export class Feature extends Component {
//    state= {
//    name: "",
//    description: "",
//    priority: 0
//}
//    constructor(props) {
//        super(props);
//        this.state = { data: props.feature };
//    }
//    render() {
//        return <div>
           
//        </div>;
//    }
//}



//class EditButton extends Component {
//    constructor(props, context) {
//        super(props, context);

//        this.handleClick = this.handleClick.bind(this);

        
//    }

//    handleClick() {
//    }

//    render() {
//        return (
//            <button onClick={this.handleClick} class="btn btn-dark">
//               Edit
//            </button>
//        );
//    }
//}

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
        fetch('api/SampleData/', {
            method: 'delete',
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

class EditForm extends Component {

   
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.featuretoEdit.name,
            description: this.props.featuretoEdit.description,
            priority: this.props.featuretoEdit.priority,
            date: this.props.featuretoEdit.time,
            clicked: 'false'
        };
        this.onNameChanged = this.onNameChanged.bind(this);
        this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
        this.onPriorityChanged = this.onPriorityChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
    }
    onNameChanged(e) {
        this.setState({ name: e.target.value });
    }
    onDescriptionChanged(e) {
        this.setState({ description: e.target.value });
    }
    onPriorityChanged(e) {
        this.setState({ priority: e.target.value });
    }
    onDateChange(newDate) {
        this.setState({ date: newDate });
    }
    onSubmit() {
        fetch('api/SampleData/', {
            method: 'put',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: this.props.featuretoEdit.id, name: this.state.name ,
                description: this.state.description,
                priority: this.state.priority ,
                time: this.state.date
            })
        });
        window.location.reload();

    }
    

    render() {
        
            return <tr>
                <td>
                    <form>
                        <div>
                            <label for="name">Name</label>
                            <input type="text" class="form-control" onChange={e => this.onNameChanged(e)} defaultValue={this.props.featuretoEdit.name} />
                        </div>

                        <div>
                            <label for="description">Description</label>
                            <input type="text" class="form-control" onChange={e => this.onDescriptionChanged(e)} defaultValue={this.props.featuretoEdit.description} />
                        </div>

                        <div>
                            <label for="priority">Priority</label>
                            <select class="btn btn-light dropdown-toggle" name="prioriry" onChange={e => this.onPriorityChanged(e)} value={this.props.featuretoEdit.priority} >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div>
                        <label for='date'> Start Date</label>
                        <DatePicker onChange={this.onDateChange} dateFormat="yyyy/MM/dd" />
                       
                            </div>
                    </form>
                </td>
                <td>
                    <button type="submit" onClick={this.onSubmit} class="btn btn-dark">Save</button>
                    {/*  cancel*/}
                </td>
            </tr>;
       
    }
}


export class FeatureTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            features: [],
            editState: false,
            sortState: false,
            date : "",

        };
        this.sort = this.sort.bind(this);
        this.onFindChange = this.onFindChange.bind(this);
        this.getDate = this.getDate.bind(this);
    }

    onFindChange(e) {
        fetch('api/SampleData/' + '?$filter=startswith(name,%27' + e.target.value + '%27)')
            .then(res => res.json())
            .then(json => {
                this.setState({ features: json })
            });    }

    sort(key) {
        var sState = this.state.sortState;
        var arr = this.state.features.sort(function (a, b) {
            if (a[key] > b[key]) {
                if (sState == false) {
                    return 1;
                }
                else {
                    return -1;
                }
            }
            if (a[key] < b[key]) {
                if (sState== false) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            
            return 0;
        });
        this.setState({ features: arr, sortState: !this.state.sortState });
    }
  
    onEditButtonClick(e) {

        this.setState({ editState: !this.state.editState });

    }

    
    componentDidMount() {

        fetch('api/SampleData/')
            .then(res => res.json())
            .then(json => {
                this.setState({ features: json })
            });
      
    }

    getDate() {
       
    }
   
    render() {

        return <div>

            <table class=" table table-bordered">
                <tr>
                    <th class="col" > Name
                        <div/>
                        <button class="btn btn-dark" onClick={() => this.sort('name')}>
                            Sort
                        </button>
                        <input type='text' onChange={e=>this.onFindChange(e)}/>

                    </th>
                    <th class="col"> Description  </th>
                    <th class="col" > State  </th>
                    <th class="col" > Owner  </th>
                    <th class="col"> Priority
                         <button class="btn btn-dark" onClick={() => this.sort('priority')}>
                            Sort
                         </button>
                    </th>
                    <th class="col"> Stories </th>
                    <th class="col" > Time
                         <button class="btn btn-dark" onClick={() => this.sort('time')}>
                             Sort
                         </button>
                    </th>
                </tr>
 
                {this.state.features.map(feature => (
                    <tbody>
                    <tr id = 'featureOutputForm'>
                        <td class="col"  > {feature.name} </td>
                            <td class="col" > {feature.description} </td>
                            <td class="col" > State </td>
                            <td class="col" > Owner </td>

                            {/* <td class="col"> {feature.state.name}</td>*/}
                            {/* <td class="col" > {feature.owner.name} </td>*/}
                            <td class="col" > {feature.priority} </td>
                            {/*<td class="col col-primary dropdown-toggle" type="divider" data-toggle="dropdown"> {feature.stories} </td>*/}
                            <td class="col" > Stories </td>
                            <Moment class="col" parse="YYYY-MM-DD" format="YYYY-MM-DD" > {feature.time} </Moment>
                            <td>
                                <button class="btn btn-dark" id='editButton' onClick={e => this.onEditButtonClick(e)} >
                                     Edit
                                </button>
                                <DeleteButton featureIDtoDelete={feature.id} />
                                </td>

                       
                    </tr>
                  
                        <tr id='featureInputForm'>
                            {this.state.editState ? <EditForm editState={this.state.editState} featuretoEdit={feature} /> : null}
                        </tr>
                    </tbody>
                    

                )
                )}
            </table>
            <AddButton/>
           
        </div>;

    }

}




import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export class EditFeature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.featuretoEdit.name,
            description: this.props.featuretoEdit.description,
            priorityID: this.props.featuretoEdit.priority.id,
            stateID: this.props.featuretoEdit.state.id,
            date: this.props.featuretoEdit.time,
            stories: this.props.featuretoEdit.stories,
            clicked: 'false', 
            priorities: [], 
            allStates: [], 
            allStories: [], 
            allStoriesStated:[]
        };
        this.onNameChanged = this.onNameChanged.bind(this);
        this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
        this.onPriorityChanged = this.onPriorityChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onStateChanged = this.onStateChanged.bind(this);
        this.onStoriesChanged = this.onStoriesChanged.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    getStatedStories() {
        var array = [];
        var tmp = this.state.stories;
        this.state.allStories.forEach(function (i) {
            var item = tmp.find(function (j) {
                return j.story_id == i.story_id;
            });
            if (item != null) {
                array.push({ story: item, state: true });
            }
            else {
                array.push({ story: i, state: false });
            }
        });
        return array;
    }

    getFeatureStories() {

        var array = this.getStatedStories();
        return (<select class="btn btn-light dropdown-toggle w-100" value="Stories" onChange={this.onStoriesChanged} > 
            {array.map((item) =>
                (item.state ? <option key={item.story_id} style={{ 'background': 'blue', 'color':'white' }}> {item.story.name} </option> :
                    <option key={item.story_id} > {item.story.name} </option>  ))}
            </select>);
    }

    componentDidMount() {
        fetch('api/FeatureData/getPriorities')
            .then(res => res.json())
            .then(json => {
                this.setState({ priorities: json })
            });
        fetch('api/FeatureData/getStates')
            .then(res => res.json())
            .then(json => {
                this.setState({ allStates: json })
            });
        fetch('api/FeatureData/getAllStories')
            .then(res => res.json())
            .then(json => {
                this.setState({ allStories: json })
            });
    }

    onNameChanged(e) {
        this.setState({ name : e.target.value });
    }
    onDescriptionChanged(e) {
        this.setState({ description: e.target.value });
    }
    onPriorityChanged(e) {
        var i = this.state.priorities.find(x => x.name === e.target.value).id;
        this.setState({ priorityid: i });
    }
    onDateChange(newDate) {
        this.setState({ date: newDate });
    }
    onStateChanged(e) {
        var i = this.state.allStates.find(x => x.name === e.target.value).id;
        this.setState({ stateid: i });
    }
    onStoriesChanged(e) {
        var newStories = this.state.stories;
        var arrayStories = this.getStatedStories();
        var item = arrayStories.find(function (j) {
            return j.story.name == e.target.value;
        });
        if (item.state == true) {
            alert("Sory, if You want to remove any story from Feature you can do it only from Story Grid");
        }
        else {
            newStories.push(item.story);
        }
        this.setState({ stories: newStories })
    }

  
    onSubmit() {
        fetch('api/FeatureData/', {
            method: 'put',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: this.props.featuretoEdit.id, name: this.state.name,
                description: this.state.description,
                priorityID: this.state.priorityID,
                time: this.state.date,
                stateID: this.state.stateID, stories: this.state.stories
            })
        }).then(function (response) {
            let responseStatus = response.status
            switch (responseStatus) {
                case 200:
                    this.props.onStateUpdating(false);
                    this.props.moveToComponent("feature");
                    break
            }
        }.bind(this))



    }
    onCancel() {

        this.props.onStateUpdating(false);
    }


    render() {

        return <tr>
            <td>
               
                    <div>
                    <label for="name">Name</label>
                    <input type="text" class="form-control" onChange={e => this.onNameChanged(e)} defaultValue={this.state.name} />
                    </div>
            </td>
                <td>
                    <div>
                        <label for="description">Description</label>
                    <input type="text" class="form-control" onChange={e => this.onDescriptionChanged(e)} defaultValue={this.state.description} />
                    </div>
            </td>
            <td>
                <div>
                    <label for="state">State</label>
                    <div/>
                    <select class="btn btn-light dropdown-toggle w-100" name="state" onChange={e => this.onStateChanged(e)} value={this.props.featuretoEdit.state.name} >
                        {this.state.allStates.map(state => (
                            <option>{state.name}
                            </option>))}
                    </select>
                </div>
            </td>
                    <td>
                    <div>
                    <label for="priority">Priority</label>
                    <div />
                    <select class="btn btn-light dropdown-toggle" name="prioriry" onChange={e => this.onPriorityChanged(e)} value={this.props.featuretoEdit.priority.name} >
                        {this.state.priorities.map(priority => (
                            <option> {priority.name}</option>))}
                        </select>
                        </div>
            </td>
             <td>
                <div>
                    <label for="stories">Stories</label>
                    <div />
                    <div >
                        {this.getFeatureStories()}
                    </div>
                </div>
            </td>
                        <td>
                    <div>
                        <label for='date'> Start Date</label>
                        <DatePicker todayButton={"Today"} selected={this.state.date} onChange={this.onDateChange} dateFormat="yyyy/MM/dd" />

                    </div>
               
            </td>
            <td/>
            <td>

                <button className="btn btn-sm btn-outline-dark w-100"  type="submit" onClick={this.onSubmit} >Save</button>
                <button className="btn btn-sm btn-outline-dark w-100" type="submit" onClick={this.onCancel} >Cancel</button>
</td>
        </tr>;

    }
}
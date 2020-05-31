import React, { Component } from 'react';
import buildQuery from 'odata-query';
import "react-datepicker/dist/react-datepicker.css";

const data = require('../../GlobalData.json');
const stateTable = data.storyState;

export class StoryFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            storyPoints: '',
            rank: '',
            sprint:"",
            storyState:"",
            sprint_id: '',
            allSprints: [],
            allFeatures: [],
            featureId: ''
        }
        this.onNameChanged = this.onNameChanged.bind(this);
        this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
        this.onStoryPointsChanged = this.onStoryPointsChanged.bind(this);
        this.onStateChanged = this.onStateChanged.bind(this);
        this.onSetFilter = this.onSetFilter.bind(this);
        this.onCancelFilter = this.onCancelFilter.bind(this);
        this.onRankChanged = this.onRankChanged.bind(this);
        this.onSprintChanged = this.onSprintChanged.bind(this);
        this.onFeatureChanged = this.onFeatureChanged.bind(this);
    }

    onNameChanged(e) {
        this.setState({ name: e.target.value });
    }

    onDescriptionChanged(e) {
        this.setState({ description: e.target.value });
    }

    onStoryPointsChanged(e) {
        this.setState({ storyPoints: e.target.value });
    }

    onRankChanged(e) {
        this.setState({ rank: e.target.value });
    }

    onSprintChanged(e) {
        if (e.target.value == "All") {
            this.setState({ sprint_id: '' });
        }
        else {
            var i = this.state.allSprints.find(x => x.name === e.target.value).sprint_id;
            this.setState({ sprint_id: i });
        }
    }
    onFeatureChanged(e) {
        if (e.target.value == "0") {
            this.setState({ featureId: '' });
        }
        else {
            this.setState({ featureId: e.target.value });
        }
    }

    onStateChanged(e) {
        this.setState({ storyState: e.target.value == "All" ? "" : e.target.value });
    }

    onSetFilter() {
        var filter = []
        if (this.state.name != "") {
            filter.push({ "tolower(Name)": { contains: this.state.name.toLowerCase() } })
        }
        if (this.state.description != "") {
            filter.push({ "tolower(Description)": { contains: this.state.description.toLowerCase() } })
        }
        if (this.state.sprint_id != '') {
            filter.push({ sprint_id: parseInt(this.state.sprint_id) })
        }
        if (this.state.storyState != "") {
            filter.push({ storyState:  this.state.storyState })
        }
        if (this.state.featureId != "") {
            filter.push({ featureId: parseInt(this.state.featureId) })
        }
        var query = buildQuery({ filter });
        this.props.changeFilter(query);
    }

    onCancelFilter() {
        this.setState({
            name: "",
            description: "",
            storyState: "",
            storyPoints: '',
            rank: '',
            sprint_id: '',
        })
        this.props.changeFilter("");
        this.props.hideFilters(false);
    }
    componentDidMount() {
        fetch("/api/sprint/index")

            .then(response => response.json())

            .then(data => {

                this.setState({ allSprints: data })

            });
        fetch('api/FeatureData/Get')
            .then(function (response) {
                if (response.status == 200) {
                    return response.json();
                }
            })
            .then(data => {
                if (data != null) {
                    this.setState({ allFeatures: data })
                }
            }
            );
    }

    // render row
    render() {
        return <div className='filterContainer' style={{ "height": "80px", marginLeft: '20px', marginRight: '20px' }}>
            <div class="row filter-row-5">
                <div class="col-sm">
                    <label for="inputTitle">Name</label>
                </div>
                <div class="col-sm">
                    <label for="state">State</label><br />
                </div>
                <div class="col-sm ">
                    <label for="exampleInputDescription">Description</label>
                </div>
                <div class="col-sm">
                    <label for="rank">Feature</label>
                </div>
                <div class="col-sm">
                    <label for="sprint">Sprint</label>
                </div>
                <div class="col-sm">{/*   */}</div>
                <div class="col-sm">{/*   */}</div>
            </div>
            <div class="row filter-row-10">
                <div class="col-sm">
                    <input type="text" className="input" onChange={this.onNameChanged} id="inputTitle" placeholder=" Search..." value={this.state.name} autocomplete="off" />
                </div>
                <div class="col-sm">
                    <select class="btn btn-light dropdown-toggle w-100 m-0" name="storyState" onChange={this.onStateChanged} value={this.state.storyState}>
                        <option>All</option>
                        {stateTable.map((item) => <option>{item.name}</option>)}
                    </select>
                </div>
                <div class="col-sm">
                    <input type="text" className="input" onChange={this.onDescriptionChanged} id="exampleInputDescription" placeholder=" Search..." value={this.state.description} autocomplete="off" />
                </div>

                <div class="col-sm">
                    <select class="btn btn-light dropdown-toggle w-100 m-0" name="features" onChange={e => this.onFeatureChanged(e)}  >
                        <option value="0">All</option>
                        {this.state.allFeatures.map(feature => (
                            <option value={feature.id}> {feature.name}</option>))}
                    </select>
                </div>
               

                <div class="col-sm">
                    <select class="btn btn-light dropdown-toggle w-100 m-0" name="sprints" onChange={e => this.onSprintChanged(e)}  >
                        <option>All</option>
                        {this.state.allSprints.map(sprint => (
                            <option> {sprint.name}</option>))}
                    </select>
                </div>
                <div class="col-sm" >
                    <button type="submit" onClick={this.onSetFilter} className="btn apply-filters w-100">Filter</button>
                </div>
                <div class="col-sm" >
                    <button type="submit" onClick={this.onCancelFilter} className="btn cancel-filter w-100">Clear</button>
                </div>
            </div>

          
        </div>;
    }
}
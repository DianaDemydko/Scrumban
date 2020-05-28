import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { StoryComponent } from './StoryComponent';
import { StoryFilter } from './StoryFilter';
import { toast } from 'react-toastify';
import '../../GridStyles/StyleForGrid.css';
import { Pagination } from '../DefectReactComponent/Pagination.jsx'

import Spinner from 'react-bootstrap/Spinner'

// const
const icon_up = require("../FeatureReactComponents/sort-arrow-up.svg")
const icon_down = require("../FeatureReactComponents/sort-arrow-down.svg")




export class StoryGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stories: [],
            sortByName: icon_up,
            sortByDescription: icon_up,
            sortByStoryPoints: icon_up,
            sortByRank: icon_up,
            sortByState: icon_up,
            currentSort:
            {
                columnName: '',
                sortingOrder: ''
            },
            showFilters: false,
            pageOfItems: [],
            users: [],
            loading: true
        };

        this.showFilters = this.showFilters.bind(this);
        this.onRemoveStory = this.onRemoveStory.bind(this);
        this.onChanged = this.onChanged.bind(this);
        this.loadData = this.loadData.bind(this);
        this.fetchSprints = this.fetchSprints.bind(this);
        this.renderCaret = this.renderCaret.bind(this);
        this.onDeleteItem = this.onDeleteItem.bind(this);
        this.sortData = this.sortData.bind(this);
        this.startFiltration = this.startFiltration.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.fetchUsers = this.fetchUsers.bind(this);
        this.load = this.load.bind(this);
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

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({
            pageOfItems: pageOfItems
        });

    }

    showFilters(param) {
        this.setState({
            showFilters: param
        });
    }

    onDeleteItem(id) {
        var newStory = this.state.stories.filter(function (x) {
            return x.story_id != id;
        });
        this.setState({ stories: newStory });
        toast.success("Story was deleted!");
        this.loadData("");
    }

    fetchSprints() {

        fetch("/api/sprint/index")

            .then(response => response.json())

            .then(data => {

                this.setState({ sprints: data })

            });

    }

    onChanged(item) {
        var arr = this.state.stories;
        var index = arr.indexOf(x => x.id = item.id);
        arr[index] = item;
        toast.success("Updated successfuly");
        this.setState({ stories: arr });
    }

    onRemoveStory(id) {

        fetch('/api/Story/' + id, {
            method: "delete",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            if (response.status == 200) {
                //this.loadData();
                this.onDeleteItem(id);
            }
            else if (response.status == 401) {
                var answer = window.confirm("You are not authorized. Move to Login page ?")
                if (answer == true) {
                    window.location.replace("/login");
                }
            }
            else if (response.status == 403) {
                alert("ERROR! You have not permission !")
            }
            else {
                alert("ERROR! Status code: " + response.status)
            }
        }.bind(this));
    }
    renderCaret(columnName) {
        if (this.state.currentSort.columnName == columnName) {
            if (this.state.currentSort.sortingOrder == 'asc') {
                return (<span class="fa fa-caret-up" id="active-caret" style={{ color: '#2adc29' }} />)
            }
            else {
                return (<span class="fa fa-caret-down" id="active-caret" style={{ color: '#2adc29' }} />)
            }
        }
        else {
            return (<span class="fa fa-caret-down"></span>)
        }
    }
    sortData(columnName){
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
                if (this.state.currentSort.sortingOrder == 'asc') {
                    this.setState({ sortByName: icon_up });
                }
                else {
                    this.setState({ sortByName: icon_down });
                }
                break
            case 'description':
                query += 'description' + ' ' + this.state.currentSort.sortingOrder;
                if (this.state.currentSort.sortingOrder == 'asc') {
                    this.setState({ sortByDescription: icon_up });
                }
                else {
                    this.setState({ sortByDescription: icon_down });
                }
                break
            case 'story_points':
                query += 'storyPoints' + ' ' + this.state.currentSort.sortingOrder;
                if (this.state.currentSort.sortingOrder == 'asc') {
                    this.setState({ sortBySDate: icon_up });
                }
                else {
                    this.setState({ sortBySDate: icon_down });
                }
                break

            case 'rank':
                query += 'rank' + ' ' + this.state.currentSort.sortingOrder;
                if (this.state.currentSort.sortingOrder == 'asc') {
                    this.setState({ sortByPriority: icon_up });
                }
                else {
                    this.setState({ sortByPriority: icon_down });
                }
                break
            case 'state':
                query += 'storyState' + ' ' + this.state.currentSort.sortingOrder;
                if (this.state.currentSort.sortingOrder == 'asc') {
                    this.setState({ sortByState: icon_up });
                }
                else {
                    this.setState({ sortByState: icon_down });
                }
                break
            case 'feature':
                query += 'featureId' + ' ' + this.state.currentSort.sortingOrder;
                if (this.state.currentSort.sortingOrder == 'asc') {
                    this.setState({ sortByState: icon_up });
                }
                else {
                    this.setState({ sortByState: icon_down });
                }
                break
            case 'sprint':
                query += 'sprint_id' + ' ' + this.state.currentSort.sortingOrder;
                if (this.state.currentSort.sortingOrder == 'asc') {
                    this.setState({ sortByState: icon_up });
                }
                else {
                    this.setState({ sortByState: icon_down });
                }
                break
        }

        this.loadData(query);
    }

    async load() {

        await this.fetchUsers();
        await this.loadData("");
    }

    componentDidMount() {
        this.load();
    }

    loadData(query) {
        this.setState({ loading: true });
        fetch('api/Story/GetStories' + query, {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            if (response.status == 200) {
                return response.json()
            }
            else if (response.status == 401) {
                var answer = window.confirm("You are not authorized. Move to Login page ?");
                if (answer == true) {
                    window.location.replace("/login");
                }
            }
            else if (response.status == 403) {
                alert("ERROR! You have not permission !")
            }
            else {
                alert("ERROR! Status code: " + response.status)
            }
            }).then(data => {
                if (data.length > 0) {
                    this.setState({ stories: data, loading: false })
                } else {
                    this.setState({ stories: [], loading: false, pageOfItems: [] })
                }
            }
            );
    }
    startFiltration(filtrParam) {

        this.loadData(filtrParam);

    }


    render() {
        var remove = this.onRemoveStory;
        var changed = this.onChanged;
        return (<div>
            <div className="grid-panel">
                <div className="grid-name">Stories</div>
                <div className="grid-buttons">
                    <button onClick={() => this.props.moveToComponent("storyAdd")} className="btn add-new btn-panel-table">Create New</button>
                    <button onClick={() => { this.showFilters(true) }} className="btn btn-panel-table add-filters">Apply Filters</button>
                </div>
            </div>
            <hr></hr>
            {this.state.showFilters ? <StoryFilter changeFilter={this.startFiltration} hideFilters={this.showFilters} /> : null}
            {this.state.loading ? (
                <div style={{ 'margin-left': '50%', 'margin-top': '15%' }}>
                    <Spinner animation="border" variant="warning" />
                </div>
            )
                :
                <div>
                <div className="tablePosition table-wrapper">
                    <table class="table table-striped" style={{ 'table-layout': 'fixed' }}>
                        <thead>
                            <th className="col" style={{ cursor: 'pointer' }} onClick={() => this.sortData('name')}>Name{this.renderCaret('name')}</th>
                            <th className="col" style={{ cursor: 'pointer' }} onClick={() => this.sortData('state')}>State{this.renderCaret('state')}</th>
                            <th className="col" style={{ cursor: 'pointer' }} onClick={() => this.sortData('description')}>Description{this.renderCaret('description')}</th>
                            <th className="col" style={{ cursor: 'pointer' }}> Owner</th>
                            <th className="col" style={{ cursor: 'pointer' }} onClick={() => this.sortData('story_points')}>Story points{this.renderCaret('story_points')}</th>
                            <th className="col" style={{ cursor: 'pointer' }} onClick={() => this.sortData('rank')}>Rank{this.renderCaret('rank')}</th>
                            <th className="col" style={{ cursor: 'pointer' }} onClick={() => this.sortData('feature')}>Feature{this.renderCaret('feature')}</th>
                            <th className="col" style={{ cursor: 'pointer' }} onClick={() => this.sortData('sprint')}>Sprint{this.renderCaret('sprint')}</th>
                            <th class="col" />
                        </thead>
                        {(this.state.pageOfItems.length > 0)//pageOfItems
                            ? this.state.pageOfItems.map((story) => {
                                return <StoryComponent key={story.story_id} story={story} onRemove={remove} onChanged={changed} users={this.state.users} />
                            }) :
                            (<tbody>
                                <td>
                                    No results
                            </td>
                            </tbody>)
                        }
                    </table>
                </div>
                <div>
                    <Pagination items={this.state.stories} onChangePage={this.onChangePage} />
                    </div>
                </div>
                }
        </div>  
            );
        }
}
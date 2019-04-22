import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import '../../GridStyles/StyleForGrid.css';
import { FeatureFilter } from './FeatureFilter.jsx';
import { FeatureRow } from './FeatureRow.jsx';

const icon_up = require("./sort-arrow-up.svg")
const icon_down = require("./sort-arrow-down.svg")


export class FeatureTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            features: [],
            editState: false,
            sortByName: icon_up,
            sortByDescription: icon_up,
            sortByPriority: icon_up,
            sortBySDate: icon_up,
            sortByState : icon_up,
            currentSort:
            {
                columnName: '',
                sortingOrder: ''
            },
        };
        this.sortData = this.sortData.bind(this)
        this.findData = this.findData.bind(this);
        this.onDeleteItem = this.onDeleteItem.bind(this);
        this.renderCaret = this.renderCaret.bind(this);
        this.loadData = this.loadData.bind(this);
        this.onEditItem = this.onEditItem.bind(this);
    }

    renderCaret(columnName) {
        if (this.state.currentSort.columnName == columnName) {
            if (this.state.currentSort.sortingOrder == 'asc') {
                return (<span class="fa fa-caret-up" id="active-caret"/>)
            }
            else {
                return (<span class="fa fa-caret-down" id="active-caret"/>)
            }
        }
        else {
            return (<span class="fa fa-caret-down"></span>)
        }
    }

    findData(query) {
        fetch('api/FeatureData/' + query)
            .then(res => res.json())
            .then(json => {
                this.setState({ features: json })
            });
    }
    onEditItem() {
        this.loadData();
    }
    onDeleteItem(deletedItem) {
        var newFeatures = this.state.features.filter(function (x) {
            return x.id != deletedItem.id;
        });
        this.setState({ features: newFeatures });
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
            case 'time':
                query += 'time' + ' ' + this.state.currentSort.sortingOrder;
                if (this.state.currentSort.sortingOrder == 'asc') {
                    this.setState({ sortBySDate: icon_up });
                }
                else {
                    this.setState({ sortBySDate: icon_down });
                }
                break

            case 'priority':
                query += 'priorityid' + ' ' + this.state.currentSort.sortingOrder;
                if (this.state.currentSort.sortingOrder == 'asc') {
                    this.setState({ sortByPriority: icon_up });
                }
                else {
                    this.setState({ sortByPriority: icon_down });
                }
                break
            case 'state':
                query += 'stateid' + ' ' + this.state.currentSort.sortingOrder;
                if (this.state.currentSort.sortingOrder == 'asc') {
                    this.setState({ sortByState: icon_up });
                }
                else {
                    this.setState({ sortByState: icon_down });
                }
                break
        }

        fetch('api/FeatureData/' + query)
            .then(res => res.json())
            .then(json => {
                this.setState({ features: json })
            });
    }



    componentDidMount() {
        this.loadData();
    }
    loadData() {
         fetch('api/FeatureData/')
            .then(function (res) {
                return res.json()
            })
            .then(data =>
                this.setState({ features: data })
        );
    }


    render() {
        return <div>
            <label style={{ 'fontSize': '40px' }}> Feature </label>
            <FeatureFilter changeFindData={this.findData} />
            <div className="tablePosition">
            <table class="table table-striped" style={{ 'table-layout': 'fixed' }} >
                <thead>
                    <tr>
                            <th className="col" onClick={() => this.sortData('name')}>
                                Name {this.renderCaret('name')}
                        </th>
                        <th class="col" min-width="100px" onClick={() => this.sortData('description')}>
                                Description {this.renderCaret('description')}                           
                        </th>
                        <th class="col" onClick={() => this.sortData('state')}>
                                State {this.renderCaret('state')}
                        </th>
                        <th class="col"  > Owner  </th>
                        <th class="col" onClick={() => this.sortData('priority')}>
                                Priority {this.renderCaret('priority')}                          
                        </th>
                        <th class="col" > Stories </th>
                        <th class="col" onClick={() => this.sortData('time')} >
                                Start Date {this.renderCaret('time')}
                        </th>

                        <th class="col" />
                    </tr>
                </thead>
                <tbody>

                        {this.state.features.map(feature => (
                            <FeatureRow key={feature.id} feature={feature} moveToComponent={this.props.moveToComponent} deleteItem={this.onDeleteItem} editItem={this.onEditItem}/>)
                    )}
                </tbody>
                </table>
                </div>
            <div />
            <button class="btn btn-sm btn-outline-dark" onClick={() => this.props.moveToComponent("featureAdd")} >
                Create New
                    </button>

        </div>;

    }

}




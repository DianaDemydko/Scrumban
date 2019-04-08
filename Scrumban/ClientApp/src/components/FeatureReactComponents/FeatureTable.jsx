import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import '../../GridStyles/StyleForGrid.css';
import { FeatureFilter } from './FeatureFilter.jsx';
import { FeatureRow } from './FeatureRow.jsx';

const icon_up = require("./sort-arrow-up.svg")
const icon_down = require("./sort-arrow-down.svg")


class AddButton extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <Link to="/addfeature">
                <button class="btn btn-sm btn-outline-dark">
                    Add
                    </button>
            </Link>);
    }



}


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
            sortByFDate: icon_up,
            currentSort:
            {
                columnName: '',
                sortingOrder: ''
            },


        };
        this.sortData = this.sortData.bind(this)
        this.findData = this.findData.bind(this);

    }

    findData(query) {

        fetch('api/FeatureData/' + query)
            .then(res => res.json())
            .then(json => {
                this.setState({ features: json })
            });



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
                query += 'priority' + ' ' + this.state.currentSort.sortingOrder;
                if (this.state.currentSort.sortingOrder == 'asc') {
                    this.setState({ sortByPriority: icon_up });
                }
                else {
                    this.setState({ sortByPriority: icon_down });
                }
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
        return < div>
            <FeatureFilter changeFindData={this.findData} />

            <table class="table table-striped" style={{ 'table-layout': 'fixed' }} >
                <thead>
                    <tr>
                        <th className="col" onClick={() => this.sortData('name')}>
                            <label>Name</label>
                            <ion-icon src={this.state.sortByName} />
                        </th>
                        <th class="col" min-width="100px" onClick={() => this.sortData('description')}>
                            <label>Description</label>
                            <ion-icon src={this.state.sortByDescription} />
                        </th>
                        <th class="col" > State  </th>
                        <th class="col"  > Owner  </th>
                        <th class="col" onClick={() => this.sortData('priority')}>
                            <label>Priority</label>
                            <ion-icon src={this.state.sortByPriority} />
                        </th>
                        <th class="col" > Stories </th>
                        <th class="col" onClick={() => this.sortData('time')} >
                            <label>Start Date</label>
                            <ion-icon src={this.state.sortBySDate} />
                        </th>

                        <th class="col" />
                    </tr>
                </thead>
                <tbody>

                    {this.state.features.map(feature => (
                        <FeatureRow key={feature.id} feature={feature} />)
                    )}
                </tbody>
            </table>
            <div />
            <AddButton />

        </div>;

    }

}




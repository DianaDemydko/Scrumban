import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DefectTable } from './DefectTable';
import { DefectEdit } from './DefectEdit';

const apiGetUrl = "/api/DefectData";
const apiDeleteUrl = "/api/DefectData";

class Defect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.defect,
            index: true
        };

        this.onRemoveDefect = this.onRemoveDefect.bind(this);
        this.onEditDefect = this.onEditDefect.bind(this);
    }

    onRemoveDefect() {
        this.props.onRemove(this.state.data.defectId);

    }

    onEditDefect() {
        this.setState({ index: this.state.index === true ? false : true });
    }

    render() {
        const isEdit = this.state.index;
        return (
            <tbody>
                {
                    isEdit ?
                        (<DefectTable item={this.state.data} editDefect={this.onEditDefect} deleteDefect={this.onRemoveDefect} />)
                        : (<DefectEdit item={this.state.data} editDefect={this.onEditDefect} deleteDefect={this.onRemoveDefect} />)
                }
            </tbody>

        );
    }
}

export class DefectGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = { defects: [] };

        //fetch(apiUrl)
        //    .then(response => response.json())
        //    .then(data => {
        //        this.setState({ defects: data, loading: false });
        //    });
        this.loadData = this.loadData.bind(this);
        this.onRemoveDefect = this.onRemoveDefect.bind(this);
    }

    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", apiGetUrl, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ defects: data });
        }.bind(this);
        xhr.send();
    }
    componentDidMount() {
        this.loadData();
    }

    onRemoveDefect(defectId) {

        if (defectId) {
            var url = apiDeleteUrl + "/" + defectId;

            var xhr = new XMLHttpRequest();
            xhr.open("delete", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status == 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send();
        }
    }
    render() {

        var remove = this.onRemoveDefect;
        return (<div>

            <h2>Defects</h2>
            <Link to={{ pathname: '/defect_add', state: {loadData: this.loadData() }}} ><button className="btn btn-primary">Add defect</button></Link>

            <table className="table table-hover">
                <thead className="bg-light">
                    <th >Name</th>
                    <th >Description</th>
                    <th >State</th>
                    <th >Priority</th>
                    <th >Severity</th>
                    <th >StoryId</th>
                    <th >Status</th>
                </thead>
                {this.state.defects.map(function (defect) { return <Defect key={defect.defectId} defect={defect} onRemove={remove} /> })}
            </table>
        </div>
        )
    }
}
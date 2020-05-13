import React from 'react';
import { toast } from 'react-toastify';

export class DefectPrint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storyName: ''
        }
        this.getAllStories = this.getAllStories.bind(this);
    }
    componentDidMount() {
        this.getAllStories();
    }
    getAllStories() {
        fetch('api/Story/' + this.props.item.storyId, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + sessionStorage.getItem("tokenKey")
            }
        })
            .then(function (response) {
                let responseStatus = response.status
                switch (responseStatus) {
                    case 200:
                        return response.json()
                        break
                }
            })
            .then(data => { if (data != null) { this.setState({ storyName: data.name }) } else { this.setState({ storyName: 'None' }) } });
    }

    render() {
        return (
            <tr key={this.props.key} >
                <td class="col">{this.props.item.name}</td>
                <td class="col">{this.props.item.description}</td>
                <td class="col">{this.props.item.state}</td>
                <td class="col">{this.props.item.priority}</td>
                <td class="col">{this.props.item.severity}</td>
                <td class="col">{this.state.storyName}</td>
                <td class="col" style={{ 'margin': '15px' }}>{this.props.item.status}</td>
                <td class="col">
                    
                    <button type="button" onClick={this.props.editDefect} className="btn btn-sm btn-outline-dark w-100 m-1">Edit</button>
                    <button type="submit" onClick={() =>  this.props.deleteDefect} className="btn btn-sm btn-outline-dark w-100 m-1">Delete</button>
                </td>
            </tr>
        );
    }
}
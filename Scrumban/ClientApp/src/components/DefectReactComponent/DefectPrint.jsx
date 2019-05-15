import React from 'react';
import { toast } from 'react-toastify';

const Msg = ({ closeToast, deleteDefect }) => (
    <div>
        <strong> Are you sure???</strong>
        <button className="btn btn-light w-100 m-1" onClick={deleteDefect}> Yes </button>
        <button className="btn btn-light w-100 m-1" onClick={closeToast}> No </button>
    </div>
)

export class DefectPrint extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <tr key={this.props.key}>
                <td class="col">{this.props.item.name}</td>
                <td class="col">{this.props.item.description}</td>
                <td class="col">{this.props.item.state}</td>
                <td class="col">{this.props.item.priority}</td>
                <td class="col">{this.props.item.severity}</td>
                <td class="col">{this.props.item.storyId}</td>
                <td class="col" style={{ 'margin': '15px' }}>{this.props.item.status}</td>
                <td class="col">
                    
                    <button type="button" onClick={this.props.editDefect} className="btn btn-sm btn-outline-dark w-100 m-1">Edit</button>
                    <button type="submit" onClick={() => toast.error(<Msg deleteDefect={this.props.deleteDefect} />, {
                        position: toast.POSITION.TOP_CENTER
                    })} className="btn btn-sm btn-outline-dark w-100 m-1">Delete</button>
                </td>
            </tr>
        );
    }
}
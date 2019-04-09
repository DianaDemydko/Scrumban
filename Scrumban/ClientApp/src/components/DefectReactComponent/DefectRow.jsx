import React, { Component } from 'react';
import { DefectPrint } from './DefectPrint';
import { DefectEdit } from './DefectEdit';

export class DefectRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.defect,
            index: true
        };

        this.onRemoveDefect = this.onRemoveDefect.bind(this);
        this.onEditDefect = this.onEditDefect.bind(this);
        this.onChangedDefect = this.onChangedDefect.bind(this);

    }

    onRemoveDefect() {
        this.props.onRemove(this.state.data.defectId);

    }

    onEditDefect() {
        this.setState({ index: this.state.index === true ? false : true });
    }

    onChangedDefect(item) {
        this.props.onChanged(item);
        this.setState({ data: item });
    }

    render() {
        const isEdit = this.state.index;
        return (<tbody>
            {
                isEdit ?
                    (<DefectPrint key={this.props.key} item={this.state.data} editDefect={this.onEditDefect} deleteDefect={this.onRemoveDefect} />)
                    : (<DefectEdit item={this.state.data} editDefect={this.onEditDefect} deleteDefect={this.onRemoveDefect} changed={this.onChangedDefect} />)
            }
        </tbody>

        );
    }
}
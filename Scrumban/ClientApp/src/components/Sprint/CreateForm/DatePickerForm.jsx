import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export class DatePickerForm extends Component {
    constructor(props) {
        super(props);
        if (props.startDate && props.endDate) {
            this.state =
                {
                    startDate: props.startDate,
                    endDate: props.endDate
                }
        }
        else {
            this.state =
                {
                    startDate: new Date(),
                    endDate: new Date()
                }
            this.state.endDate.setMonth(this.state.startDate.getMonth() + 1)
        }
        

        props.onStartDateChanged(this.state.startDate);
        props.onEndDateChanged(this.state.endDate);

        this.onStartDateChanged = this.onStartDateChanged.bind(this)
        this.onEndDateChanged = this.onEndDateChanged.bind(this)
    }

    onStartDateChanged(startDate) {
        this.setState({ startDate: startDate });
        this.props.onStartDateChanged(startDate);
    }

    onEndDateChanged(endDate) {
        this.setState({ endDate: endDate });
        this.props.onEndDateChanged(endDate);
    }



    render() {
        return (
            <div>
                <div class="input-group mb-3">
                    <label>Start Date:*</label>
                    <br />
                    <DatePicker
                        todayButton={"Today"}
                        selected={this.state.startDate}
                        onChange={this.onStartDateChanged}
                        minDate={new Date()}
                        maxDate={this.state.endDate}
                        />
                </div>
                <br />
                <div class="input-group mb-3">
                    <label>End Date:*</label>
                    <br />
                    <DatePicker
                        todayButton={"Today"}
                        selected={this.state.endDate}
                        onChange={this.onEndDateChanged}
                        minDate={this.state.startDate}
                        />
                </div>
                <br />
            </div>
        );
    }
}
import React from "react";
import { Line } from "react-chartjs-2";
import { toast } from "react-toastify"; 
import './css/BurnUp_DownCharts.css'

//constant values
const NOT_SELECTED = "Select sprint here...";


/*=====Function for calculating duration of sprint=====*/
function getDuration(startDate, endDate) {
    var startDay = Number(startDate.substring(8, 10));
    var endDay = Number(endDate.substring(8, 10));
    var startMonth = Number(startDate.substring(5, 7));
    var endMonth = Number(endDate.substring(5, 7));
    var year = Number(startDate.substring(0, 4));
    var duration;
    if (endMonth == startMonth) {
        duration = endDay - startDay+1;
        return duration;
    } else {
        switch (startMonth) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                duration = (31 - startDay) + endDay + 1;
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                duration = (30 - startDay) + endDay + 1;
                break;
            case 2:
                if ((year % 4) === 0) {
                    duration = (29 - startDay) + endDay + 1;
                } else {
                    duration = (28 - startDay) + endDay + 1;
                }
        }
        return duration;
    }
}
/*=====Function for forming array with new labels for OX(dates of sprint)=====*/
function getSprintDays(startDate, endDate, duration) {
    var startDay = Number(startDate.substring(8, 10));
    var startMonth = Number(startDate.substring(5, 7));
    var endMonth = Number(endDate.substring(5, 7));
    var year = Number(startDate.substring(0, 4));
    var sprintDaysArray = [];
    var daysInStartMonth;
    var nextMonthDay = 1;
    switch (startMonth) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            daysInStartMonth = 31;
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            daysInStartMonth = 30;
            break;
        case 2:
            if ((year % 4) === 0) {
                daysInStartMonth = 29;
            } else {
                daysInStartMonth = 28;
            }
            break;
    }
    for (var i = 0; i <duration; i++) {
        if (startDay <= daysInStartMonth) {
            var dayPart = startDay.toString();
            var monthPart = startMonth.toString();
            var resault = dayPart + '.' + monthPart + '.' + year;
            sprintDaysArray.push(resault);
            startDay += 1;
        }
        else {
            var dayPart = nextMonthDay.toString();
            var monthPart = endMonth.toString();
            var resault = dayPart + '.' + monthPart + '.' + year;
            sprintDaysArray.push(resault);
            nextMonthDay += 1;
        }
    }
    return sprintDaysArray;
}
/*=====Function for calculating sum of story points of sprint=====*/
function getSumOfStoryPoints(stories) {
    var sum = 0;
    for (var i = 0; i < stories.length; i++) {
        sum += stories[i].storyPoints;
    }
    return sum;
}
/*=====Function for forming array of data for Ideal Task Remaining(Burn Down)=====*/
function getIdealForBurnDown(duration, sumOfAllPoints) {
    var resault_array = [];
    var step = sumOfAllPoints / (duration -1);
    for (var i = 0; i < duration; i++) {
        resault_array.push(sumOfAllPoints);
        sumOfAllPoints -= step;
    }
    return resault_array;
}
/*=====Function for forming array of data for Actual Task Remaining(Burn Down)=====*/
function getActualForBurnDown(duration, doneStories, arrayOfSprintDays, sumOfAllPoints) {
    var resault_array = [];
    ///sorting by dates
    doneStories.sort(function compare(a, b){
        var dateA = new Date(a.endDate);
        var dateB = new Date(b.endDate);
        return dateA - dateB;
    });
    ///delete stories with the same end date except one
    for (var i = 0; i < doneStories.length; i++) {
        if (doneStories.length == 2) {
            var endDayJ = Number(doneStories[1].endDate.substring(8, 10));
            var endDayI = Number(doneStories[0].endDate.substring(8, 10));
            var endMonthI = Number(doneStories[0].endDate.substring(5, 7));
            var endMonthJ = Number(doneStories[1].endDate.substring(5, 7));
            if (endDayI == endDayJ && endMonthI == endMonthJ) {
                doneStories[0].storyPoints += doneStories[1].storyPoints;
                doneStories.splice(1, 1);
            }
        }
        else {
            for (var j = i + 1; j < doneStories.length; j++) {
                var endDayJ = Number(doneStories[j].endDate.substring(8, 10));
                var endDayI = Number(doneStories[i].endDate.substring(8, 10));
                var endMonthI = Number(doneStories[i].endDate.substring(5, 7));
                var endMonthJ = Number(doneStories[j].endDate.substring(5, 7));
                if (endDayI == endDayJ && endMonthI == endMonthJ) {
                    doneStories[i].storyPoints += doneStories[j].storyPoints;
                    doneStories.splice(j, 1);
                }
            }
        }

    }
    var datesOfDoneStories = [];
    if (doneStories.length > 0) {
        for (var i = 0; i < doneStories.length; i++) {
            var endDay = Number(doneStories[i].endDate.substring(8, 10));
            var endMonth = Number(doneStories[i].endDate.substring(5, 7));
            var year = Number(doneStories[i].endDate.substring(0, 4));
            var dayPart = endDay.toString();
            var dayMonth = endMonth.toString();
            var resault = dayPart + '.' + dayMonth + '.' + year;
            datesOfDoneStories.push(resault);
        }
        var pointer_for_stories = 0;
        for (var i = 0 ; i < duration; i++) {
            if (arrayOfSprintDays[i] === datesOfDoneStories[pointer_for_stories]) {
                var storyPoint = doneStories[pointer_for_stories].storyPoints;
                sumOfAllPoints -= storyPoint;
                resault_array.push(sumOfAllPoints);
                pointer_for_stories += 1;
            } else {
                resault_array.push(sumOfAllPoints);
            }

        }
    }
    return resault_array;
}
/*=====Function fpr forming array of data for Total (Burn Up) */
function getTotalForBurnUp(duration, sumOfAllPoints) {
    var resault_array = [];
    for (var i = 0; i <= duration; i++) {
        resault_array.push(sumOfAllPoints);
    }
    return resault_array;
}
/*=====Function fpr forming array of data for Completed  (Burn Up) */
function getCompletedForBurnUp(duration, doneStories, arrayOfSprintDays) {
    var resault_array = [];
    var value = 0;
    
    ///sorting by dates
    doneStories.sort(function compare(a, b) {
        var dateA = new Date(a.endDate);
        var dateB = new Date(b.endDate);
        return dateA - dateB;
    });
    ///delete stories with the same end date except one
    for (var i = 0; i < doneStories.length; i++) {
        if (doneStories.length == 2) {
            var endDayJ = Number(doneStories[1].endDate.substring(8, 10));
            var endDayI = Number(doneStories[0].endDate.substring(8, 10));
            var endMonthI = Number(doneStories[0].endDate.substring(5, 7));
            var endMonthJ = Number(doneStories[1].endDate.substring(5, 7));
            if (endDayI == endDayJ && endMonthI == endMonthJ) {
                doneStories[0].storyPoints += doneStories[1].storyPoints;
                doneStories.splice(1, 1);
            }
        }
          else {
                for (var j = i + 1; j < doneStories.length; j++) {
                    var endDayJ = Number(doneStories[j].endDate.substring(8, 10));
                    var endDayI = Number(doneStories[i].endDate.substring(8, 10));
                    var endMonthI = Number(doneStories[i].endDate.substring(5, 7));
                    var endMonthJ = Number(doneStories[j].endDate.substring(5, 7));
                    if (endDayI == endDayJ && endMonthI == endMonthJ) {
                        doneStories[i].storyPoints += doneStories[j].storyPoints;
                        doneStories.splice(j, 1);
                    }
                }
            }
        
    }
    var datesOfDoneStories = [];
    if (doneStories.length > 0) {
        for (var i = 0; i < doneStories.length; i++) {
            var endDay = Number(doneStories[i].endDate.substring(8, 10));
            var endMonth = Number(doneStories[i].endDate.substring(5, 7));
            var year = Number(doneStories[i].endDate.substring(0, 4));
            var a = endDay.toString();
            var b = endMonth.toString();
            var s = a + '.' + b + '.' + year;
            datesOfDoneStories.push(s);
        }
        var pointer_for_stories = 0;
        for (var i = 0 ; i < duration; i++) {
            if (arrayOfSprintDays[i] === datesOfDoneStories[pointer_for_stories]) {
                var storyPoint = doneStories[pointer_for_stories].storyPoints;
                value += storyPoint;
                resault_array.push(value);
                pointer_for_stories += 1;
            } else {
                resault_array.push(value);
            }
        }
    }
    return resault_array;
}
/*=====Function fpr forming array of data for Ideal  (Burn Up) */
function getIdealForBurnUp(duration, sumOfAllPoints) {
    var resault_array = [];
    var step = sumOfAllPoints / (duration-1);
    var value = 0;
    for (var i = 0; i < duration; i++) {
        resault_array.push(value);
        value += step;
    }
    return resault_array;
} 




export class BurnUp_DownCharts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sumOfAllStoryPoints: 50,
            allSprints: [],
            allStoriesOfSelectedSprint: [],
            selectedSprintID: 1,
            selectedSprint: null,
            sprintDays: ['0', '1.1.19', '2.1.19', '3.1.19'],
            durationOfSprint: 0,
            idealTaskRemainingArray: [],
            actualTaskRemeaningArray: [],
            totalArray: [],
            completedArray: [],
            idealArray: []
        };

        this.onSprintChanged = this.onSprintChanged.bind(this);
    }
    componentDidMount() {

        fetch('api/Sprint/Index')
            .then(res => res.json())
            .then(json => {
                this.setState({ allSprints: json })
            });


    }
    onSprintChanged = async (e) => {
        try {
            if (e.target.value != NOT_SELECTED) {
                var selectedSprint = this.state.allSprints.find(x => x.name === e.target.value);
                var sprintID = selectedSprint.sprint_id;
                var duration = getDuration(selectedSprint.startDate, selectedSprint.endDate);
                var sprintDaysArray = getSprintDays(selectedSprint.startDate, selectedSprint.endDate, duration);
                ///getting all stories which belong to selected sprint
                var responce = await fetch('api/Chart/GetSprintStories/' + sprintID);
                var stories = await responce.json();
                var sumOfStoryPoints = getSumOfStoryPoints(stories);
                var idealForBurnDown = getIdealForBurnDown(duration, sumOfStoryPoints);
                ///getting all stories that are done and which belong to selected sprint
                var responcee = await fetch('api/Chart/GetDoneStories/' + sprintID);
                var doneStories = await responcee.json();
                var actualForBurnDown = getActualForBurnDown(duration, doneStories, sprintDaysArray, sumOfStoryPoints);
                var idealForBurnUp = getIdealForBurnUp(duration, sumOfStoryPoints);
                var completedForBurnUp = getCompletedForBurnUp(duration, doneStories, sprintDaysArray);
                var totalForBurnUp = getTotalForBurnUp(duration, sumOfStoryPoints);
                this.setState({
                    sprintDays: sprintDaysArray,
                    selectedSprintID: sprintID,
                    selectedSprint: selectedSprint,
                    allStoriesOfSelectedSprint: stories,
                    sumOfAllStoryPoints: sumOfStoryPoints,
                    durationOfSprint: duration,
                    idealTaskRemainingArray: idealForBurnDown,
                    actualTaskRemeaningArray: actualForBurnDown,
                    completedArray: completedForBurnUp,
                    idealArray: idealForBurnUp,
                    totalArray: totalForBurnUp
                });
            }
        }
        catch (e) {

            toast.error("Cannot build chart because of data conflict in story's and sprint's dates.");
        }
    }

    render() {
        //Data and Options for BURN DOWN CHART
        const dataBurnDown = {
            labels: this.state.sprintDays,
            datasets: [
                {
                    label: 'Ideal Tasks Remaining',
                    data: this.state.idealTaskRemainingArray,
                    lineTension: 0,
                    fill: false,
                    borderColor: 'blue',
                    borderDash: [5, 5],
                    pointRadius: 0
                },
                {
                    label: 'Actual Tasks Remaining',
                    data: this.state.actualTaskRemeaningArray,
                    lineTension: 0,
                    fill: false,
                    borderColor: 'red',
                    pointRadius: 3,
                    pointHoverRadius: 10,
                    pointHitRadius: 30,
                    pointBorderWidth: 2,
                    pointStyle: 'rectRounded'
                }

            ]
        }
        const optionsBurnDown = {
            scales: {
                yAxes: [{
                    ticks: {
                        max: this.state.sumOfAllStoryPoints,
                        min: 0,
                        stepSize: 15
                    },
                    gridLines: {
                        color: "black",
                        borderDash: [2, 5],
                    },
                    scaleLabel: {
                        display: true,
                        labelString: "Story points",
                        fontColor: "green"
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Sprint's duration",
                        fontColor: "green"
                    }
                }
                ]
            },
        }
        //Data and Options for BURN UP CHART
        const dataBurnUp = {
            labels: this.state.sprintDays,
            datasets: [
                {
                    label: 'Total',
                    data: this.state.totalArray,
                    lineTension: 0,
                    fill: false,
                    borderColor: 'blue'
                },
                {
                    label: 'Completed',
                    data: this.state.completedArray,
                    lineTension: 0,
                    fill: false,
                    borderColor: 'red',
                    pointRadius: 3,
                    pointHoverRadius: 10,
                    pointHitRadius: 30,
                    pointBorderWidth: 2,
                    pointStyle: 'rectRounded'
                },
                {
                    label: 'Ideal',
                    data: this.state.idealArray,
                    lineTension: 0,
                    fill: false,
                    borderColor: 'green',
                    borderDash: [5, 5],
                    pointRadius: 0

                }

            ]
        }
        const optionsBurnUp = {
            scales: {
                yAxes: [{
                    ticks: {
                        max: this.state.sumOfAllStoryPoints,
                        min: 0,
                        stepSize: 15
                    },
                    gridLines: {
                        color: "black",
                        borderDash: [2, 5],
                    },
                    scaleLabel: {
                        display: true,
                        labelString: "Story points",
                        fontColor: "green"
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Sprint's duration",
                        fontColor: "green"
                    }
                }
                ]
            },
        }

        return (
            <div id="burn-up">
                <div>
                    <select className="btn btn-light dropdown-toggle" name="sprints" onChange={e => this.onSprintChanged(e)} style={{ 'margin-left': '220px'}}>
                        <option>{NOT_SELECTED}</option>
                    {this.state.allSprints.map(sprint => (
                        <option> {sprint.name}</option>))}
                    </select>
                    <div className="chart-container">
                        <div className="chart">
                            <h3 className='header'>Burn Down</h3>
                            <Line data={dataBurnDown} options={optionsBurnDown} />
                        </div>
                        <div className="chart">
                            <h3 className='header'>Burn Up</h3>
                            <Line data={dataBurnUp} options={optionsBurnUp} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
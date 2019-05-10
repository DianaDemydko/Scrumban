import React from "react";
import { Line } from "react-chartjs-2";
import './css/BurnUp_DownCharts.css'


/*=====Function for calculating duration of sprint=====*/
function GetDurationOfSprint(startDate, endDate) {
    var sDay = Number(startDate.substring(8, 10));
    var eDay = Number(endDate.substring(8, 10));
    var sMonth = Number(startDate.substring(5, 7));
    var eMonth = Number(endDate.substring(5, 7));
    var year = Number(startDate.substring(0, 4));
    var duration;
    if (sMonth == eMonth) {
        duration = eDay - sDay+1;
        return duration;
    } else {
        switch (sMonth) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                duration = (31 - sDay) + eDay+1;
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                duration = (30 - sDay) + eDay+1;
                break;
            case 2:
                if ((year % 4) === 0) {
                    duration = (29 - sDay) + eDay + 1;
                } else {
                    duration = (28 - sDay) + eDay + 1;
                }
        }
        return duration;
    }
}
/*=====Function for forming array with new labels for OX(dates of sprint)=====*/
function UpdateXaxes(startDate, endDate, duration) {
    var sDay = Number(startDate.substring(8, 10));
    var eDay = Number(endDate.substring(8, 10));
    var sMonth = Number(startDate.substring(5, 7));
    var eMonth = Number(endDate.substring(5, 7));
    var year = Number(startDate.substring(0, 4));
    var arrayOflabels = [];
    var daysInStartMonth;
    var w = 1;
    switch (sMonth) {
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
        if (sDay <= daysInStartMonth) {
            var a = sDay.toString();
            var b = sMonth.toString();
            var s = a + '.' + b + '.' + year;
            arrayOflabels.push(s);
            sDay += 1;
        }
        else {
            var a = w.toString();
            var b = eMonth.toString();
            var s = a + '.' + b + '.' + year;
            arrayOflabels.push(s);
            w += 1;
        }
    }
    return arrayOflabels;
}
/*=====Function for calculating sum of story points of sprint=====*/
function SumOfStoryPoints(stories) {
    var sum = 0;
    for (var i = 0; i < stories.length; i++) {
        sum += stories[i].storyPoints;
    }
    return sum;
}
/*=====Function for forming array of data for Ideal Task Remaining(Burn Down)=====*/
function IdealTaskRemeaning(duration, sumOfAllPoints) {
    var resault_array = [];
    var step = sumOfAllPoints / (duration -1);
    for (var i = 0; i < duration; i++) {
        resault_array.push(sumOfAllPoints);
        sumOfAllPoints -= step;
    }
    return resault_array;
}
/*=====Function for forming array of data for Actual Task Remaining(Burn Down)=====*/
function ActualTaskRemaining(duration, doneStories, arrayOfSprintDays, sumOfAllPoints) {
    var resault_array = [];
    ///sorting by dates
    doneStories.sort(function compare(a, b){
        var dateA = new Date(a.endDate);
        var dateB = new Date(b.endDate);
        return dateA - dateB;
    });
    ///delete stories with the same end date except one
    for (var i = 0; i < doneStories.length ; i++) {
        for (var j = i+1; j < doneStories.length; j++) {
            if (doneStories[i].endDate == doneStories[j].endDate) {
                doneStories[i].storyPoints += doneStories[j].storyPoints;
                doneStories.splice(j, 1);
                j++;
            }
        }
    }
    var datesOfDoneStories = [];
    if (doneStories.length > 0) {
        for (var i = 0; i < doneStories.length; i++) {
            var eDay = Number(doneStories[i].endDate.substring(8, 10));
            var eMonth = Number(doneStories[i].endDate.substring(5, 7));
            var year = Number(doneStories[i].endDate.substring(0, 4));
            var a = eDay.toString();
            var b = eMonth.toString();
            var s = a + '.' + b + '.' + year;
            datesOfDoneStories.push(s);
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
function FormTotalLine(duration, sumOfAllPoints) {
    var resault_array = [];
    for (var i = 0; i <= duration; i++) {
        resault_array.push(sumOfAllPoints);
    }
    return resault_array;
}
/*=====Function fpr forming array of data for Completed  (Burn Up) */
function FormCompletedLine(duration, doneStories, arrayOfSprintDays) {
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
        for (var j = i + 1; j < doneStories.length; j++) {
            if (doneStories[i].endDate == doneStories[j].endDate) {
                doneStories[i].storyPoints += doneStories[j].storyPoints;
                doneStories.splice(j, 1);
                j++;
            }
        }
    }
    var datesOfDoneStories = [];
    if (doneStories.length > 0) {
        for (var i = 0; i < doneStories.length; i++) {
            var eDay = Number(doneStories[i].endDate.substring(8, 10));
            var eMonth = Number(doneStories[i].endDate.substring(5, 7));
            var year = Number(doneStories[i].endDate.substring(0, 4));
            var a = eDay.toString();
            var b = eMonth.toString();
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
function FormIdealLine(duration, sumOfAllPoints) {
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
            allStoriesOfCurrentSprint: [],
            currentSprintID: 1,
            currentSprint: null,
            sprintDays: ['0', '1.1.19', '2.1.19', '3.1.19'],
            durationOfSprint: 0,
            idealTaskRemainingArray: [],
            actualTaskRemainingArray: [],
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
            if (e.target.value != "Select sprint here...") {
                var CurentSprint = this.state.allSprints.find(x => x.name === e.target.value);
                var sprint_id = CurentSprint.sprint_id;
                var duration = GetDurationOfSprint(CurentSprint.startDate, CurentSprint.endDate);
                var arrayOfLabels = UpdateXaxes(CurentSprint.startDate, CurentSprint.endDate, duration);
                ///getting all stories which belong to current sprint
                var responce = await fetch('api/Chart/GetSprintStories/' + sprint_id);
                var stories = await responce.json();
                var sumOfpoints = SumOfStoryPoints(stories);
                var dataForIdealTaskRemeaning = IdealTaskRemeaning(duration, sumOfpoints);
                ///getting all stories that are done and which belong to current sprint
                var responcee = await fetch('api/Chart/GetDoneStories/' + sprint_id);
                var doneStories = await responcee.json();
                var dataForActualTaskRemaining = ActualTaskRemaining(duration, doneStories, arrayOfLabels, sumOfpoints);
                var dataForIdeal = FormIdealLine(duration, sumOfpoints);
                var dataForCompleted = FormCompletedLine(duration, doneStories, arrayOfLabels);
                var dataForTotal = FormTotalLine(duration, sumOfpoints);
                this.setState({
                    sprintDays: arrayOfLabels,
                    currentSprintID: sprint_id,
                    currentSprint: CurentSprint,
                    allStoriesOfCurrentSprint: stories,
                    sumOfAllStoryPoints: sumOfpoints,
                    durationOfSprint: duration,
                    idealTaskRemainingArray: dataForIdealTaskRemeaning,
                    actualTaskRemainingArray: dataForActualTaskRemaining,
                    completedArray: dataForCompleted,
                    idealArray: dataForIdeal,
                    totalArray: dataForTotal
                });
            }
        }
        catch (e) {
            window.alert("Cannot build chart because of data conflict in story's and sprint's dates.");
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
                    data: this.state.actualTaskRemainingArray,
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
                        stepSize: 5
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
                        stepSize: 5
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
            <div className='container'>
                <div className='centered'>
                    <select className="btn btn-light dropdown-toggle" name="sprints" onChange={e => this.onSprintChanged(e)}>
                        <option>Select sprint here...</option>
                    {this.state.allSprints.map(sprint => (
                        <option> {sprint.name}</option>))}
                </select>
                <h3 className='header'>Burn Down</h3>
                <Line data={dataBurnDown} options={optionsBurnDown} />
                <h3 className='header'>Burn Up</h3>
                    <Line data={dataBurnUp} options={optionsBurnUp} />
                </div>

            </div>
        );
    }
}
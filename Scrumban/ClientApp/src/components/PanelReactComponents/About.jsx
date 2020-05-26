import React from 'react';
import mainLogo from './Test.jpg';
import './About.css';
import { Col, Grid, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'




export class About extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            entities: false,
            charts: false,
            sync: false
        };
        this.whatIsScrum = this.whatIsScrum.bind(this);
        this.whatIsKanban = this.whatIsKanban.bind(this);
        this.setEntities = this.setEntities.bind(this);
        this.setCharts = this.setCharts.bind(this);
        this.setSync = this.setSync.bind(this);
    }
    whatIsScrum() {
        window.open('https://www.atlassian.com/ru/agile/scrum');
    }
    whatIsKanban() {
        window.open('https://www.atlassian.com/ru/agile/kanban');
    }
    setEntities(param) {
        this.setState({ entities: param });
    }
    setCharts(param) {
        this.setState({ charts: param });
    }
    setSync(param) {
        this.setState({ sync: param });
    }

	render() {
		return (
			
            <div className="main-wrapper">
                <div className="scrum-kanban-wrapper">
                    <div className="scrum" onClick={() => { this.whatIsScrum() }}>
                        <a className="what">WHAT</a>
                        <a className="is">IS</a>
                        <a className="is-scrum">SCRUM?</a>
                    </div>
                    <div className="kanban" onClick={() => { this.whatIsKanban() }}>
                        <a className="what-k">WHAT</a>
                        <a className="is-k">IS</a>
                        <a className="is-kanban">KANBAN?</a>
                    </div>
                </div>
                <div className="func-wrapper">
                    <div className="grids" onClick={() => this.setEntities(true)}>
                        <span className="how-grids">How can I</span>
                        <span className="manage">MANAGE</span>
                        <span className="your">MY</span>
                        <span className="entities">ENTITIES?</span>
                    </div>
                    <div className="charts" onClick={() => this.setCharts(true)}>
                        <span className="how-charts">How can I</span>
                        <span className="build">BUILD</span>
                        <span className="report">REPORT</span>
                        <span className="charts-is">CHARTS?</span>
                    </div>
                    <div className="sync" onClick={() => this.setSync(true)}>
                        <span className="how-sync">How can I</span>
                        <span className="be">BE</span>
                        <span className="synced">SYNCED</span>
                        <span className="with-jira">WITH JIRA?</span>
                    </div>
                </div>
            
            <Modal
                show={this.state.entities}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Manage your Entities on Grid and Kanban Views
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4>How work with Grids? What Can I see on them?</h4>
                            <p>
                            In our application you can manage such entities like <strong>Teams</strong>,  <strong>Sprints</strong>, <strong>Features</strong>, <strong>Stories</strong>, <strong>Tasks</strong> and <strong>Defects</strong>.
                            Information about that entities you can see on the grid views. To open grid for some entity you need go to the main menu and select <strong>Gids</strong> section and then select there one which you need.
                            Each item in grid can be edited or deleted, for that you need to click on <strong>Edit</strong> or <strong>Delete</strong> buttons.
                            Grid can be sorted by some column in A-Z or Z-A order, for that you need to click on header name.
                            Also you can apply some filters to grid's data, for that click on <strong>Apply Filters</strong> button and select some filters.
                            To create a new entity click on tne <strong>Create new</strong> button.
                            </p>
                        <h4>How work with Kanban Board? What Can I see on it?</h4>
                        <p>
                            On the Kanban Board you can see your <strong>Stories</strong> separated by different columns regarding to their statuses.
                            You can move cards between them. On the card you can see <strong>Rank</strong>, <strong>Points</strong> and <strong>Description</strong> for some story.
                            Good to remember that if you move card to 'In Progress' state you set Start Date for your story and if you move it to 'Done' you set the End Date.
                        </p>
                        </Modal.Body>
                    <Modal.Footer>
                        <button onClick={() => { this.setEntities(false) }} className="btn btn-sm btn-outline-dark" >Close</button>
                        </Modal.Footer>
                </Modal>
                <Modal
                    show={this.state.charts}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Build your report charts and see the progress
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Which charts are available? How can I build them?</h4>
                        <p>
                            In our application you can build thee types of charts. <strong><a href="http://www.clariostechnology.com/productivity/blog/whatisaburnupchart">Burn Up</a></strong>, <strong><a href="https://www.visual-paradigm.com/scrum/scrum-burndown-chart/">Burn Down</a></strong>, <strong><a href="https://kanbanize.com/blog/kanban-analytics-part-ii-cycle-time/">Cycle Time</a></strong>.
                            To build chart you need to select <strong>Charts</strong> section in main menu and open page with proper chart. Yhen select a <strong>Sprint</strong> and chart will be generated automaticly.
                </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={() => { this.setCharts(false) }} className="btn btn-sm btn-outline-dark" >Close</button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={this.state.sync}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Sync your stories with Jira Software
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>How can sync my stories from Jira?</h4>
                        <p>
                            If you have an account and some project data  on <strong><a href="https://start.atlassian.com/">Jira Software</a></strong> you can sync your stories to our application!
                            To do it go to the <strong>Jira Synchronization</strong> section in main menu and enter your enviroment url, project name on Jira, your email and API Token and be synced!
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={() => { this.setSync(false) }} className="btn btn-sm btn-outline-dark" >Close</button>
                    </Modal.Footer>
                </Modal>
            </div>
			
            )
    }
}
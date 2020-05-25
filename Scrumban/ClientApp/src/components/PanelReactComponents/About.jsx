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
                                Modal heading
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4>Centered Modal</h4>
                            <p>
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                                consectetur ac, vestibulum at eros.
                </p>
                        </Modal.Body>
                    <Modal.Footer>
                        <button onClick={() => { this.setEntities(false) }} >Close</button>
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
                            Modal heading
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Centered Modal</h4>
                        <p>
                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                            consectetur ac, vestibulum at eros.
                </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={() => { this.setCharts(false) }} >Close</button>
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
                            Modal heading
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Centered Modal</h4>
                        <p>
                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                            consectetur ac, vestibulum at eros.
                </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={() => { this.setSync(false) }} >Close</button>
                    </Modal.Footer>
                </Modal>
            </div>
			
            )
    }
}
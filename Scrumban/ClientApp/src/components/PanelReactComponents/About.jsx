import React from 'react';
import mainLogo from './Test.jpg';
import './About.css';
import { Col, Grid, Row } from 'react-bootstrap';



export class About extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            
        };
       
    }
    render() {
        return (
            <div>
                <Col>
                    <Row>
                        <div className="header">
                            <img src={mainLogo} alt="What is Scrumban?" />
                            
                        </div>
                    </Row>
       
                    <Row>
                        <div className="container">
                            <hr></hr>
                            <p> <em>Scrumban</em> – it’s a project which are developing  for the implementation a process of development management called “Scrumban”.</p><br />
                            <p>We know <a href="https://www.scrum.org/resources/what-is-scrum">Scrum</a> and <a href="https://www.digite.com/kanban/what-is-kanban/">Kanban</a> as flavors of Agile. Scrum is best-suited for products and development projects. Kanban is best for production support. <br />
                                We use Scrumban – which combines the best features of both – for maintenance projects. Scrumban is becoming very popular these days in service industries, where we have both development and maintenance projects.</p>
                        </div>

                    </Row>
                </Col>
            </div>
            )
    }
}
import React from 'react';
import mainLogo from './WhatisScrumban.png';
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
            <Grid fluid>
                <Row>
                    <Col>
                        <div className="header">
                           <img src={mainLogo} alt="What is Scrumban?" />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="info">
                          Scrum
                        </div>
                    </Col>
                </Row>
            </Grid>
            )
        
    }
}
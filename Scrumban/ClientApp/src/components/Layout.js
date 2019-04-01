import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { NavMenu } from './NavMenu';
import { Panel } from './Panel.jsx'


export class Layout extends Component {
  displayName = Layout.name

  render() {
    return (

        <div>
            <span>
                <Panel />
            </span>
        
        <Grid fluid>
              

        <Row>
          <Col sm={1}>
                        {/*<NavMenu />*/}
          </Col>
          <Col sm={10}>
            {this.props.children}
          </Col>
        </Row>
            </Grid>
        </div>
        
    );
  }
}

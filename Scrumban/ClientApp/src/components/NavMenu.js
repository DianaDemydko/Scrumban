import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export class NavMenu extends Component {
    displayName = NavMenu.name


  render() {
      return (
          
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>Scrumban</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={'/'} exact>
              <NavItem>
                <Glyphicon glyph='home' /> Home
              </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/counter'}>
                            <NavItem>
                                <Glyphicon glyph='education' /> Counter
              </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/fetchdata'}>
                            <NavItem>
                                <Glyphicon glyph='th-list' /> Fetch data
              </NavItem>

                        </LinkContainer>
                        <LinkContainer to={'/defects'}>
                            <NavItem>
                                <Glyphicon glyph='th-list' /> Defects
              </NavItem>
                        </LinkContainer>

		                <LinkContainer to={'/stories'}>
		                    <NavItem>
		                        <Glyphicon glyph='th-list' /> Stories
		        </NavItem>
		                </LinkContainer>
            <LinkContainer to={'/tasks'}>
              <NavItem>
                <Glyphicon glyph='th-list' /> Tasks
              </NavItem>
            </LinkContainer>
                    <LinkContainer to={'/Sprints'}>
                <NavItem>
                    <Glyphicon glyph='th-list' /> Sprint Test
                </NavItem>
            </LinkContainer>
          </Nav>
              </Navbar.Collapse>
              </Navbar>

      
    );
  }
}

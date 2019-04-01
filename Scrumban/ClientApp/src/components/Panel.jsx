import React from 'react';
import './Panel.css';
import { div, span, button } from 'react-bootstrap';
import { Login } from './Login.jsx'
import { LinkContainer } from 'react-router-bootstrap';

export class Panel extends React.Component {
    render() {
        return (

            <ul className="panelUl">
                <li className="panelLi">
                    <LinkContainer to={'/login'} exact>

                        <button  className="panelBtn">Log In</button>
              
                </LinkContainer></li>
                <li className="panelLi">
                    <LinkContainer to={'/register'} exact>
                        <button className="panelBtn">Sign Up</button>
                    </LinkContainer></li>
                <li className="panelLi">
                    <LinkContainer to={''} exact>
                        <button className="panelBtn">Contact</button>
                    </LinkContainer> </li>
                <li className="panelLi">
                    <LinkContainer to={''} exact>
                        <button className="panelBtn">About</button>
                    </LinkContainer></li>
                
            </ul>

       
        )
    }
}
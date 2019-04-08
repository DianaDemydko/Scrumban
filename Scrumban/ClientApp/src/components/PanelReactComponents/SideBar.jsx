import React from "react";
import { slide as Menu } from "react-burger-menu";

export class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sideStatus: ""
        }
        this.onSideAction = this.onSideAction.bind(this);
    }
    onSideAction(param) {
        this.setState({ sideStatus: param });
        //this.props.login(this.state.sideStatus);
    }

    render() {
        return (
            <Menu>
                <a className="menu-item" onClick={() => this.onSideAction("home")}>
                    Home
                </a>
                <a className="menu-item" href="/Sprints">
                    Sprints
                </a>
                <a className="menu-item" href="/feature">
                    Features
                </a>
                <a className="menu-item" href="/stories">
                    Stories
                </a>
                <a className="menu-item" href="/tasks">
                    Tasks
                </a>
                <a className="menu-item" href="/defects">
                    Defects
                </a>
            </Menu>
        );
    }
};
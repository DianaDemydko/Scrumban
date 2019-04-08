import React from "react";
import { slide as Menu } from "react-burger-menu";

export class SideBar extends React.Component {
    constructor(props) {
        super(props);
    }
    

    render() {
        return (
            <Menu>
                <a className="menu-item" onClick={() => this.props.moveToComponent("home")}>
                    Home
                </a>
                <a className="menu-item" onClick={() => this.props.moveToComponent("sprints")}>
                    Sprints
                </a>
                <a className="menu-item" onClick={() => this.props.moveToComponent("feature")}>
                    Features
                </a>
                <a className="menu-item" onClick={() => this.props.moveToComponent("stories")}>
                    Stories
                </a>
                <a className="menu-item" onClick={() => this.props.moveToComponent("tasks")}>
                    Tasks
                </a>
                <a className="menu-item" onClick={() => this.props.moveToComponent("defects")}>
                    Defects
                </a>
            </Menu>
        );
    }
};
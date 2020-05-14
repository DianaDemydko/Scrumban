import React from "react";
import { slide as Menu } from "react-burger-menu";
import './SideBar.css';


export class SideBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Menu>
                <a className="menu-item" onClick={() => this.props.moveToComponent("kanbanBoard")}>Kanban Board</a>
                <a className="menu-dropdown">
                    <a className="dropbtn">Grids &nbsp;
                    <i className="fa fa-caret-down"></i>
                    </a>
                    <div className="menu-dropdown-content">
                        {this.props.user.roleId === 5 ? <a className="menu-item" onClick={() => this.props.moveToComponent("admin")}>Users</a> : null}
                        <a className="menu-item" onClick={() => this.props.moveToComponent("teams")}>Teams</a>
                        <a className="menu-item" onClick={() => this.props.moveToComponent("sprints")}>Sprints</a>
                        <a className="menu-item" onClick={() => this.props.moveToComponent("feature")}>Features</a>
                        <a className="menu-item" onClick={() => this.props.moveToComponent("stories")}>Stories</a>
                        <a className="menu-item" onClick={() => this.props.moveToComponent("tasks")}>Tasks</a>
                        <a className="menu-item" onClick={() => this.props.moveToComponent("defects")}>Defects</a>
                    </div>
                </a>
                <a className="menu-dropdown">
                    <a className="dropbtn">Charts &nbsp;
                    <i className="fa fa-caret-down"></i>
                    </a>
                    <div className="menu-dropdown-content">
                        <a className="menu-item" onClick={() => this.props.moveToComponent("burnDown_Up")}>Burn Up and Burn Down charts</a>
                        <a className="menu-item" onClick={() => this.props.moveToComponent("cycle_time")}>Cycle Time chart</a>
                    </div>
                </a>
                {this.props.user.roleId === 5 || this.props.user.roleId === 3 ? <a className="menu-item" onClick={() => this.props.moveToComponent("jira")}>Jira Synchronization</a> : null}
                

            </Menu>
        );
    }
};



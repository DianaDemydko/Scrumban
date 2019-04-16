import React from 'react';
import './Panel.css';

export class Panel extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            user:  props.currentUser,
            loginStatus: props.loginStatusCallBack, // false - Not logined, true - logined
            contact: "contact",
            about: "about"
        }
        this.onLogOut = this.onLogOut.bind(this);
    }

    onLogOut() {
        //localStorage.clear();
        this.props.onLogOut(false, null, "login");
    }

    render() {
        return (
            <div>
                <ul className="panelUl">
                    <li className="panelLi">
                        {this.state.loginStatus == "true" ?
                            (  <button className="panelBtn" onClick={() => this.onLogOut("login")}>             Log Out </button>)
                            : (<button className="panelBtn" onClick={() => this.props.moveToComponent("login")}>Log In  </button>)
                        }
                    </li >
                    <li className="panelLi">
                        {this.state.loginStatus == "true" ?
                            (<button className="panelBtn" onClick={() => this.props.moveToComponent("profile")} >{this.state.user} </button>)
                            : (<button className="panelBtn" onClick={() => this.props.moveToComponent("about")}>Sign Up</button>)
                         }

                    </li>
                    <li className="panelLi">
                        <button className="panelBtn" onClick={() => this.props.moveToComponent("about")}>About</button>
                    </li>
                </ul>
            </div>
        )
    }
}
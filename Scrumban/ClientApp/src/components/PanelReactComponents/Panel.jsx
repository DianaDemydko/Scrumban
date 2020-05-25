import React from 'react';
import './Panel.css';

const emptyAvatar = require('./user.png');

export class Panel extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            user: props.currentUser,
            picture: props.currentUserPicture,
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
            <div className="panelDiv">
                <ul className="panelUl">
                    <li className="panelLi">
                        {this.state.loginStatus == "true" ?
                            (  <button className="panelBtn" onClick={() => this.onLogOut("login")}>             Log Out </button>)
                            : (<button className="panelBtn" onClick={() => this.props.moveToComponent("login")}>Log In  </button>)
                        }
                    </li >
                    {this.state.loginStatus == "true" ?
                        (<span>
                            <li className="panelLi">
                                <button className="panelBtn" onClick={() => this.props.moveToComponent("profile")}>
                                    <img src={this.state.picture != null ? this.state.picture : emptyAvatar} className="picture" title={this.state.user} />
                                </button>
                            </li>
                        </span>
                        )
                        : (<li className="panelLi"><button className="panelBtn" onClick={() => this.props.moveToComponent("signup")}> Sign Up </button></li>)
                    }
                    <li className="panelLi">
                            <button className="panelBtn" onClick={() => this.props.moveToComponent("about")}>About</button>
                    </li>
                </ul>
            </div>
        )
    }
}
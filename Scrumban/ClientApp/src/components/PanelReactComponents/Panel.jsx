import React from 'react';
import './Panel.css';

export class Panel extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            user: { ...props.currentUser },
            loginStatus: props.loginStatusCallBack, // false - Not logined, true - logined
            //loginStatusName: "Log In",
            contact: "contact",
            about: "about"
        }
        this.onLogin = this.onLogin.bind(this);
        this.onLogOut = this.onLogOut.bind(this);
    }

    onLogin(param) {
        this.setState({ loginStatus: true, loginStatusName: "Log out" })
        this.props.moveToComponent(param)
    }
    onLogOut() {
        localStorage.clear();
        this.setState({ loginStatus: false, user: null, loginStatusName: "Log in" });
        this.props.moveToComponent(false, null, "login");
    }

    render() {
 
        return (
            <div>
                
                <ul className="panelUl">
                    <li className="panelLi">
                        {this.state.loginStatus ?
                            (  <button className="panelBtn" onClick={() => this.onLogOut("login")}>            Log Out </button>)
                            : (<button className="panelBtn" onClick={() => this.onLogin("login")}>Log In  </button>)
                        }
                    </li >
                    <li className="panelLi">
                        {this.state.loginStatus ?
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
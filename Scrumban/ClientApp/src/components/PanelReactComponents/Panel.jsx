import React from 'react';
import './Panel.css';

export class Panel extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            user: { ...props.currentUser },
            loginStatus: props.loginStatusCallBack, // false - Not logined, true - logined
            panelStatus: "", 
            loginStatusName: "Log In",
            contact: "contact",
            about: "about"
        }
        this.onPanelAction = this.onPanelAction.bind(this);
    }


    onPanelAction(param) {
        this.props.moveToComponent(this.state.panelStatus)
        this.setState({ panelStatus: param })
    }
    onLogOut() {
        localStorage.clear();
        this.setState({ loginStatus: false, user: null });
        this.props.moveToComponent(false, null, "login");
    }

    render() {

        //var user = "panel_user";
        var loginStatus =     "panel_loginStatus:     ";
        var panelStatus =     "panel_panelStatus:     ";
        var loginStatusName = "panel_loginStatusName  ";

        //if (this.state.user != null) {
        //    user = { name: this.state.user.name }
        //}
        if (this.state.loginStatus != null) {
            loginStatus += this.state.loginStatus.toString()
        }
        if (this.state.panelStatus != null) {
            panelStatus += this.state.panelStatus.toString()
        }
        if (this.state.loginStatusName != null) {
            loginStatusName += this.state.loginStatusName.toString()
        }

        //<div>{loginStatus}</div>
        //    <div>{panelStatus}</div>
        //    <div>{loginStatusName}</div>
 
        return (
            <div>
                <ul className="panelUl">
                    <li className="panelLi">
                        {this.state.loginStatus ?
                            (  <button className="panelBtn" onClick={() => this.onLogOut()}>            Log Out </button>)
                            : (<button className="panelBtn" onClick={() => this.onPanelAction("login")}>Log In  </button>)
                        }
                    </li >
                    <li className="panelLi">
                        {this.state.loginStatus ?
                            (<button className="panelBtn">{this.state.user.firstName} </button>)
                            :
                            (<button className="panelBtn" onClick={() => this.onPanelAction("signup")}>Sign Up</button>)
                         }
                    </li>
                    <li className="panelLi">
                        <button className="panelBtn" onClick={() => this.onPanelAction("about")}>About</button>
                    </li>
                </ul>
            </div>
        )
    }
}


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
        this.setState({ panelStatus: param });
        this.props.login(this.state.panelStatus);
    }
    onLogOut() {
        localStorage.clear();
        this.setState({ loginStatus: false });
        this.setState({ user: null });
        window.location.replace("./login");
    }
    componentWillMount() {
        this.setState({ loginStatus: this.props.loginStatusCallBack })
    }

    render() {
 
        return (
            <div>
                    <ul className="panelUl">
                    <li className="panelLi">
                        {this.state.loginStatus ?
                            (<button className="panelBtn" onClick={() => this.onLogOut()}>Log Out</button>)
                            : (<button className="panelBtn" onClick={()=>this.onPanelAction("login")}>Log In</button>)
                        }
                    </li >
                    <li className="panelLi">
                        {this.state.loginStatus ?
                            (<button className="panelBtn">{this.state.user.firstName} {this.state.user.surname}</button>)
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


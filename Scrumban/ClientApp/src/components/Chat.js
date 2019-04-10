import React, { Component } from 'react';
//import * as signalR from '@aspnet/signalr';
import { HubConnectionBuilder } from '@aspnet/signalr';



export class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nick: '',
            message: '',
            messages: [],
            hubConnection: null,
            error: "__",
        };
    }

    componentDidMount = () => {
        const nick = window.prompt('Your name:', 'John');
       

        let hubConnection = new HubConnectionBuilder()
            .withUrl("/chatHub")
            .build();
        //alert(hubConnection.callbacks);
        //hubConnection.serverTimeoutInMilliseconds = 1000 * 60 * 10;
        
        this.setState({ hubConnection, nick }, () => {
            this.state.hubConnection
                .start()
                .then(() => console.log('Connection started!'))
                .catch((err) => this.setState({ error: err }))
                //.catch(err => console.log('Error while establishing connection :('+err));
            this.setState({ message: '' });

            this.state.hubConnection.on('ReceiveMessage', (nick, receivedMessage) => {
                const text = nick + ":" + receivedMessage;
                const messages = this.state.messages.concat([text]);
                this.setState({ messages });

            });
        });
       
        
    };

            sendMessage = () => {

                this.state.hubConnection

                    .invoke('SendMessage', this.state.nick, this.state.message)

                    .catch(err => console.error(err));

                //event.preventDefault();

            };




    render() {

        return (

            <div>

                <br />

                <input

                    type="text"

                    value={this.state.message}

                    onChange={e => this.setState({ message: e.target.value })}

                />



                <button onClick={this.sendMessage}>Send</button>



                <div>

                    {this.state.messages.map((message, index) => (

                        <span style={{ display: 'block' }} key={index}> {message} </span>

                    ))}

                </div>

            </div>

        );

    }
}
export default Chat;
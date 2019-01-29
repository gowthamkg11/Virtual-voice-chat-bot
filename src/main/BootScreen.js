import React, {Component} from "react";
import SockJsClient from "react-stomp";
import UsernameGenerator from "username-generator";
import Fetch from "json-fetch";
import { TalkBox } from "react-talk";
import {fetchValuesSuccess} from "../actions";

const randomstring = require("randomstring");
export default class BootScreen extends React.Component {
    constructor(props) {
        super(props);
        //randomUserId is used to emulate a unique user id for this demo usage
        this.randomUserName = UsernameGenerator.generateUsername("-");
        this.randomUserId = randomstring.generate();
        this.state = {
            clientConnected: false,
            messages: []
        };
    }

    onMessageReceive = (msg, topic) => {
        console.log("msg :" + msg)
        this.setState(prevState => ({
            messages: [...prevState.messages, msg]
        }));
    }

    sendMessage = (msg, selfMsg) => {
        try {
            this.clientRef.sendMessage("/app/all", JSON.stringify(selfMsg));
            return true;
        } catch(e) {
            return false;
        }
    }

    componentWillMount() {
        Fetch("http://localhost:8080/history", {
            method: "GET"
        }).then((response) => {
            this.setState({ messages: response.body });
        });
    }

    render() {
        const wsSourceUrl = "http://localhost:8080" + "/handler";
        return (
            <div>
                <TalkBox messages={ this.state.messages }
                         onSendMessage={ this.sendMessage }/>

                <SockJsClient url={ wsSourceUrl } topics={["/topic/all"]}
                              onMessage={ this.onMessageReceive } ref={ (client) => { this.clientRef = client }}
                              onConnect={ () => { this.setState({ clientConnected: true }) } }
                              onDisconnect={ () => { this.setState({ clientConnected: false }) } }
                              debug={ false }/>


            </div>
        );
    }
}
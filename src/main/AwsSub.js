import React, {Component} 	from 'react';
import { Redirect, browserHistory } from 'react-router'
import {
    withRouter, BrowserRouter as Router, Route,
} from 'react-router-dom'

import MqttClient           from '../../node_modules/mqtt/lib/client';
import v4                   from 'aws-signature-v4';
import crypto               from 'crypto';
import websocket            from 'websocket-stream';
import MainScreen from "./MainScreen";

const AWS_ACCESS_KEY          = 'XXXXXX';
const AWS_SECRET_ACCESS_KEY   = 'XXXXXXXXXXXX';
const AWS_IOT_ENDPOINT_HOST   = 'XXXXXXXXXXX.iot.us-east-1.amazonaws.com';
const AWS_REGION              = 'us-east-1';
const MQTT_TOPIC              = 'myTopic';

export default class MqttAws extends Component{

    client;

    state = {
        messages: [],
        timer:"",
        timerCheck:false,
        youtubeVideo:""
    }

    addLogEntry(info){
        var messages = this.state.messages;
        messages.push(info);
        this.setState({
            messages
        });
    }

    addTimer(time, url){
        this.setState({
            timer:time,
            timerCheck:true,
            youtubeVideo:url
        })
        console.log('AWSSUb state :'+this.state.timer+'  '+this.state.youtubeVideo + ' ' + this.state.timerCheck)
        //this.returnMain()
    }


    componentDidMount(){
        this.client = new MqttClient(() => {
            var url = v4.createPresignedURL(
                'GET',
                AWS_IOT_ENDPOINT_HOST.toLowerCase(),
                '/mqtt',
                'iotdevicegateway',
                crypto.createHash('sha256').update('', 'utf8').digest('hex'),
                {
                    'key': AWS_ACCESS_KEY,
                    'secret': AWS_SECRET_ACCESS_KEY,
                    'region': AWS_REGION,
                    'protocol': 'wss',
                    'expires': 15
                }
            );

            this.addLogEntry('Connecting to: ' + url);
            console.log('Connecting to: ' + url)
            return websocket(url, [ 'mqttv3.1' ]);
        });

        this.client.on('connect', () => {
            this.client.subscribe(MQTT_TOPIC);
            this.addLogEntry('Connected to AWS IoT :D');
            console.log('Connected to AWS IoT :D')
        });

        this.client.on('close', () => {
            this.addLogEntry('Connection closed');
            console.log('Connection closed')
            this.client.end();
            this.client = undefined;
        });

        this.client.on('message', (topic, message) => {
            this.addLogEntry('New message' + message.toString());
            console.log('New message' + message.toString())
            //var obj = message;
            var obj = JSON.parse(message.toString())
            console.log(obj.toString() + '  ' + obj.message)
            this.addTimer(obj.message, obj.url);
        });

    }


    render(){
        if(this.state.timerCheck) {

                 return(
                     <Router>
                         <Route path={'/'} component={(props) => <MainScreen {...props} timer={this.state.timer} videoTip={false} youtubeVideo={this.state.youtubeVideo}/>}
                         />
                     </Router>
                 )
        }
        else {
            return(
                <div></div>
            )
        }
    }
}
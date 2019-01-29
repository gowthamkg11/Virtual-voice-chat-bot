import * as React from "react/cjs/react.development";
import YouTube from "react-youtube"
import SockJsClient from "react-stomp";
import Tilt from "react-tilt";
import '../App.css';
import {fetchValuesSuccess} from "../actions";
import ReactPlayer from 'react-player'
import {
    withRouter, BrowserRouter as Router, Route
} from 'react-router-dom'


class  MainScreen extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            response: "",
            endpoint: "http://localhost:8087/api/voice",
            fieldValue:"",
            timer:this.props.timer,
            toolTip:false,
            videoTip:this.props.videoTip,
            youtubeVideo:this.props.youtubeVideo
        };
    }

    componentDidMount() {
        //this.interval = setInterval(() => {this.fetchData()}, 5000)
        setTimeout(this.closeDiv, this.state.timer)
    }

    fetchData() {
        // fetch("http://localhost:8087/api/youtube").then(response => response.json())
        //     .then(data => this.handleData(data))
    }


    /*handleChange = (event) => {
        this.setState({
            fieldValue:event.target.value
        })
        console.log(this.state.fieldValue)
    }

    sendMessage = () => {
        try {
            console.log("send")
            this.clientRef.sendMessage("/app/all", this.state.fieldValue);
            return true;
        } catch(e) {
            return false;
        }
    }*/

    /*onMessageReceive = (msg, topic) => {
        console.log("msg :" + msg)
        this.setState(prevState => ({
            timer:msg,
            toolTip:true
        }));
        setTimeout(this.closeDiv, 5000)
    }*/

    closeDiv = () => {
        this.setState({
            videoTip:true
        })
    }
    render() {
        const opts = {
            height: '700',
            width: '1400',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1
            }
        };
        console.log('state'+this.state.timer + ' this.props.route.timer ' + this.props.timer)

        //console.log("state :" + this.state.response)
        const textStyle = this.state.toolTip ? {display: 'none'} : {}
        const videoStyle = this.state.videoTip ? {display: 'none'} : {}
        const video = this.state.response
        const wsSourceUrl = "http://localhost:8080" + "/handler";
            if(this.state.youtubeVideo != null) {
                return(
                    <div>
                        <ReactPlayer className='tilt-bottom' url={this.state.youtubeVideo} playing={true} width={'250px'} height={'250px'}/>
                        <ReactPlayer className='tilt-right' url={this.state.youtubeVideo} playing={true} width={'250px'} height={'250px'}/>
                        <ReactPlayer className='tilt-left' url={this.state.youtubeVideo} playing={true} width={'250px'} height={'250px'}/>
                        <ReactPlayer className='tilt-top' url={this.state.youtubeVideo} playing={true} width={'250px'} height={'250px'}/>
                    </div>
                )

            }
            else {
                return(
                    <ReactPlayer style={videoStyle} url='https://s3.amazonaws.com/holexa/New+Project+-+Made+with+Clipchamp.mp4' playing={true} volume={null} muted={true} loop={true} width={'1250px'} height={'650px'} />
                    )
            }
    }
}

export default MainScreen;
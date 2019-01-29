import React from "react";
import YouTube from "react-youtube"

export default class VideoBotton extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            video:this.props.video,
            opts: this.props.opts
        }

    }

    render() {
        return(
            <div className="tilt-bottom">
                <YouTube
                    videoId={this.state.video}
                    opts={this.state.opts}
                />
            </div>
        )
    }
}
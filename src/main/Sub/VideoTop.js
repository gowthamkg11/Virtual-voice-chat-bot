import React from "react";
import YouTube from "react-youtube"

export default class VideoTop extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            video:this.props.video,
            opts: this.props.opts
        }

    }

    render() {
        return(
            <div className="tilt-top">
                <YouTube
                    videoId={this.state.video}
                    opts={this.state.opts}
                />
            </div>
        )
    }
}
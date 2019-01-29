import React from "react";
import YouTube from "react-youtube"

export default class VideoRight extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            video:this.props.video,
            opts: this.props.opts
        }

    }

    render() {
        return(
            <div className="tilt-right">
                <YouTube
                    videoId={this.state.video}
                    opts={this.state.opts}
                />
            </div>
        )
    }
}
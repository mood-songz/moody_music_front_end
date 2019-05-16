import React, {Component} from 'react';
import CameraPhoto from './camera-photo.js';
/*
code for camera taken from
http://sviridovserg.com/2017/09/18/react-photo-capture/
*/
class CameraImageUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoSrc: {}
    };
  }

  componentDidMount = () => {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
    if (navigator.getUserMedia) {
      navigator.getUserMedia({video: true}, this.handleVideo, this.videoError);
    }
  }

  handleVideo = (stream) => {
    // Update the state, triggering the component to re-render with the correct stream
    this.setState({ videoSrc: new MediaSource() });
    this.videoElement.play();
  }

  videoError = () => {

  }
  updateErrorMessage = errorMessage => {
    this.props.handleErrorMessage(errorMessage);
  }


  render() {
    const video = (<video id="video" width="640" height="480" className="cameraFrame" src={this.state.videoSrc} autoPlay="true"
      ref={(input) => { this.videoElement = input; }}></video>);
    return (
      <div>
        <h3>Take a photo</h3>
          <form>
            <input type="checkbox"></input>I allow Moody Songz to take my picture.
          </form>
        {video}
        <CameraPhoto />
      </div>
    );
  }

}


export default CameraImageUploader;


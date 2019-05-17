import React, {Component} from 'react';
import Webcam from "react-webcam";

class CameraImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoSrc: {}
    };
  }
  enableWebcam = () => this.setState({ webcamEnabled: true });

  updateErrorMessage = errorMessage => {
    this.props.handleErrorMessage(errorMessage);
  }

  handleClick = async () => {
    const screenshot = this.webcam.getScreenshot();
    await this.setState({ screenshot });
    console.log(this.state.screenshot);
    const contentType = 'image/jpeg';

    let base64String = await this.state.screenshot; 
    let base64Image = await base64String.split(',')[1];
    const blob = this.b64toBlob(base64Image, contentType);
    const blobUrl = URL.createObjectURL(blob);
    await this.setState({imgUrl: blobUrl});
    console.log(this.state.imgUrl);
    
    await fetch(blobUrl).then(response => response.blob())
    .then(blob => { 
      const fd = new FormData();
      fd.append("theFile", blob, "userimage.jpg"); 
    return  fetch("http://localhost:8080/upload", {method:"POST", body:fd})
    })
    .then(response => response.ok)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  
  }

  b64toBlob = (b64Data, contentType='', sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }   
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  offWebcam = () => {
    this.setState({screenshot: null});
    this.setState({imgUrl: ''});
    this.setState({ webcamEnabled: false });
}

  render() {
    return (
      <div>
        <h1>Take photo here</h1>
        {this.state.webcamEnabled ? (
          <Webcam audio={false} height={300} 
            width={300}  
            screenshotFormat="image/jpeg"  
            ref={node => this.webcam = node} />
        ) : (
          <button type="button" onClick={this.enableWebcam}>
            Enable webcam
          </button>
        )}
             <h2>Screenshots</h2>
          <div className='screenshots'>
            <div className='controls'>
              <button onClick={this.handleClick}>capture</button>
              <button onClick={this.offWebcam}> Off Camera </button>
            </div>
            {this.state.screenshot ? <img src={this.state.screenshot}  name="theFile" alt="" /> : null}
          </div>
        </div>
       
    );
  }

}


export default CameraImageUploader;


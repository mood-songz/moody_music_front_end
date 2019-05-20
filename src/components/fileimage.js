import React, { Component } from 'react';
import superagent from 'superagent';
import Webcam from "react-webcam";

//gets a file upload
class Image extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedFile: '',
      file: null,
      userEmotion: 'defaultEmotion',
      errorMessage: '',
      webcamEnabled: false,
      screenshot: '',
      imgUrl: '',
      blobUrl: ''
    }
  }

  componentDidMount() {
    this.updateFileImage();
  }

  componentWillMount() {
    if(this.state.userEmotion) {
      this.setState({userEmotion: 'defaultEmotion'});
    }
    this.updateFileImage();
  }

  fileSelectedHandler = async e => {
    let emotionData;
    let backendUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:8080' : 'https://desolate-shelf-44063.herokuapp.com';
      let backendUploadUrl = `${backendUrl}/upload`; 

    //if button clicked to upload file
    if(e.target.files) {
      e.preventDefault();
      console.log(e.target.files[0])
      await this.setState({
        selectedFile: URL.createObjectURL(e.target.files[0]),
        file:e.target.files[0]
      })
      emotionData = await superagent.post(backendUploadUrl).attach('theFile',this.state.file)
      .then(imageUploadResponse => imageUploadResponse.body) 
    } else {
      const screenshot = this.webcam.getScreenshot();
      await this.setState({ screenshot });
      
      const contentType = 'image/jpeg';
      
      let base64String = await this.state.screenshot; 
      let base64Image = await base64String.split(',')[1];
      const blob = this.b64toBlob(base64Image, contentType);
      const blobUrl = URL.createObjectURL(blob);
      await this.setState({imgUrl: blobUrl});
      //console.log(this.state.imgUrl);

      emotionData = await fetch(blobUrl)
        .then(response => response.blob())
        .then(blob => {
          console.log(blob)
          const fd = new FormData();
          fd.append("theFile", blob, "userimage.jpg"); 
          return fetch(backendUploadUrl, {method:"POST", body:fd})
        }) 
        .then(imageUploadResponse => imageUploadResponse.json())
        .catch(err => console.log(err));
    }
  
    //if we have response we update userEmotion 
    if(emotionData){    
      if(emotionData.success){  
        if(this.props.updateEmotion){
          this.props.updateEmotion(emotionData.emotion);
          this.setState({userEmotion: emotionData.emotion});
          this.props.photoUploadUpdateHandler();
        }     
      } else {
      this.updateFileImage();
      this.props.handleErrorMessage('Please upload a new image with a face');
      }   
    }

  }
  //if the image is not including face, set url to empty string 
  updateFileImage = () => {
    this.props.updateEmotion('defaultEmotion');
    this.setState({selectedFile: '', file: null, userEmotion: 'defaultEmotion', screenshot: '', imgUrl: '',
    blobUrl: ''});
  }

  //send user error message if they upload incorrectly
  updateErrorMessage = errorMessage => {
    this.props.handleErrorMessage(errorMessage);
  }

  //camera functions
  enableWebcam = () => this.setState({ webcamEnabled: true });

  stopWebcam = () => {
    this.setState({screenshot: null});
    this.setState({imgUrl: ''});
    this.setState({ webcamEnabled: false });
  }

  b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
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

  render(){                              
    return(
      <React.Fragment>
        <div className="file-uploader">
          <h3>Upload an image below</h3>
          <input type="file" name="theFile" onChange={this.fileSelectedHandler} accept="image/*"/>
          {this.state.selectedFile ? <img src={this.state.selectedFile} alt="" width={250} height={250} /> : null}
          {this.state.screenshot ? <img src={this.state.screenshot} name="theFile" alt="" width={250} height={250}/> : null}
        </div>

        <h3>Take photo here</h3>
        {this.state.webcamEnabled ? (
          <>
            <Webcam audio={false} height={300} 
              width={300}  
              screenshotFormat="image/jpeg"  
              ref={node => this.webcam = node} />
            <h2>Screenshots</h2>
            <div className='screenshots'>
              <div className='controls'>
                <button onClick={this.fileSelectedHandler}>Take Picture</button>
                <button onClick={this.stopWebcam}> Turn Off Camera </button>
              </div>
            </div>
            </>
        ) : (
          <button type="button" onClick={this.enableWebcam}>
            Enable webcam
          </button>
        )}  
      </React.Fragment>
      
    )
  } 
}

export default Image;

import React, { Component } from 'react';
import superagent from 'superagent';
//gets a file upload
class Image extends React.Component {
  constructor(props){
    super(props);
    this.state = {

      selectedFile: '',
      file: null,
      userEmotion: '',
      errorMessage: ''
    }
  }

fileSelectedHandler= async e=>{
  e.preventDefault();
  await this.setState({
    selectedFile: URL.createObjectURL(e.target.files[0]),
    file:e.target.files[0]
  })
  let backendUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:8080' : 'https://desolate-shelf-44063.herokuapp.com';
  let backendUploadUrl = `${backendUrl}/upload`;    
  let emotionData = await superagent.post(backendUploadUrl).attach('theFile',this.state.file)
     .then(imageUploadResponse => imageUploadResponse.body) 
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
updateFileImage = () =>{
  this.setState({selectedFile: '', file: null});

}

//send user error message if they upload incorrectly
updateErrorMessage = errorMessage => {
  this.props.handleErrorMessage(errorMessage);
}

render(){                              
  return(
    <div className="file-uploader">
      <h3>Upload an image below</h3>
      <input type="file" name="theFile" onChange={this.fileSelectedHandler} accept="image/*"/>
      <img src={this.state.selectedFile} alt="" />
    </div>
  )
  } 
}

export default Image;

// newcomment
import React, { Component } from 'react';

//gets a file upload
class Image extends React.Component {
  constructor(props){
    super(props);
    this.state={
      selectedFile: null,
      file:null
    }
  }

fileSelectedHandler= async e=>{
  e.preventDefault();
  await this.setState({
    selectedFile: URL.createObjectURL(e.target.files[0]),
    file:e.target.files[0]
  })
}

updateErrorMessage = errorMessage => {
  this.props.handleErrorMessage(errorMessage);
}

render(){
  let backendUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:8080' : '';
  let backendUploadUrl = `${backendUrl}/upload`;    
                                          
  return(
    <div className="file-uploader">
      <h3>Upload an image below</h3>
      <form action={backendUploadUrl} encType="multipart/form-data" method="POST"> 
        <input type="file" name="theFile" onChange={this.fileSelectedHandler} accept="image/*"/>
        <input type="submit"  value="Upload Photo" />
      </form>
      <img src={this.state.selectedFile} alt="" />
      {/* <button onClick={this.fileUploadHandler}>Upload My Image</button> */}
    </div>
  )
  } 
}

export default Image;

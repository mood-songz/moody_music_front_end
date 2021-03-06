import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Image from './fileimage.js';
import ErrorMessage from './error-message.js';

class TakePhoto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
      photoUploadSucess: false,
      redirectToPlaylistPage: false,
      errorMessage: ''
    }
  }

  componentDidMount() {
    this.updateCurrentUser();
  }

  updateCurrentUser = () => {
    let {currentUser} = this.props;
    this.setState({currentUser});
  }

  updatePhotoUploadStatus = () => {
    let photoUploadSucess = true;
    let redirectToPlaylistPage = true;
    this.setState({photoUploadSucess});
    this.setState({redirectToPlaylistPage});
  }

  handleErrorMessage = errorMessage => {
    this.setState({errorMessage});
  }
  
  render() {
    //redirect to playlist page if a photo was successfully uploaded
    if (this.state.redirectToPlaylistPage) {
      return <Redirect to="/playlist" />
    }
    console.log(this.props);
    return (
      <div className="image-uploads">
        <ErrorMessage message={this.state.errorMessage} />
        <Image 
          photoUploadUpdateHandler={this.updatePhotoUploadStatus} 
          handleErrorMessage={this.handleErrorMessage}  
          updateEmotion={this.props.updateEmotion}/>
      </div>
    );
  }
};

export default TakePhoto;

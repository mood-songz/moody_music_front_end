import React, {Component} from 'react';

// shows image that represents emotion
class PhotoContainer extends Component {

  render(){
    let imageSource;
    let imageSources = ['https://media0.giphy.com/media/Lb4IZLmCfALhm/giphy.gif?cid=790b76115cdd01ce706f303736bb8b03&rid=giphy.gif','https://66.media.tumblr.com/960515c55083912f5bcaef8493d5dc79/tumblr_mgc21rbVEZ1qlmd4co1_500.gif', 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/3e58e047365985.5877f23b6f264.gif']
    if(this.props.userEmotion === 'happy') {
      imageSource = imageSources[0];
    } else if(this.props.userEmotion === 'sad') {
      imageSource = imageSources[1];
    } else {
      imageSource = imageSources[2]
    }
    return (
      <div className="emotion-container">
        <img  src={imageSource} alt={this.props.userEmotion}/>
        <h3>You look {this.props.userEmotion}</h3>
      </div>
    );
  }
}

export default PhotoContainer;
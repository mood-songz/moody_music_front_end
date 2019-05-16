import React from 'react';
import superagent from 'superagent';
import Song from './song.js';
import PhotoContainer from './photo-container.js';

class Playlist extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      songs: []
    }
  }


  componentDidMount() {
    if (this.props.userEmotion) {
      this.fetchMusic();
    }
  }

  fetchMusic = () => {
    event.preventDefault();
    let backendUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:8080' : 'https://desolate-shelf-44063.herokuapp.com';

    superagent.get(`${backendUrl}/recommendations/${this.props.userEmotion}`)
      .set({emotion_id: this.props.emotion_id})
      .then(result => {
        this.setState({songs : JSON.parse(result.text)});
      })
      .catch((error)=> {
        console.log('THERE\'S BEEN AN ERROR WITH SUPERAGENT', error);
      });
  }

  render() {

    if (this.state.songs.length > 0) {
      return (
        <React.Fragment>
          <PhotoContainer userEmotion={this.props.userEmotion}/>
          <div className="playlist">
            {this.state.songs.map((song,i) => 

             <div> <Song key={i} songObj={song}/> </div>
            )}          

          </div>
        </React.Fragment>
      );
    } else {
      return (
        <button onClick={this.fetchMusic}>Moody Music</button>
      );
    }

    // return(
    // <>
    // <PhotoContainer userEmotion={this.props.userEmotion}/>
    // <div className="playlist">
    //  <div> <Song /> </div> 
    //  <div> <Song /> </div> 
    //  <div> <Song /> </div> 
    //  <div> <Song /> </div> 
    //  <div> <Song /> </div> 
    //  <div> <Song /> </div> 
    //  <div> <Song /> </div> 
    //  <div> <Song /> </div> 
    //  <div> <Song /> </div> 
    //  <div> <Song /> </div> 
    //  <div> <Song /> </div> 
    //  <div> <Song /> </div> 
    //  <div> <Song /> </div> 
    //  <div> <Song /> </div>
    // </div>
    // </>
    // )

  }
}

export default Playlist;

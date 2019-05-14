import React from 'react';
import superagent from 'superagent';
import Song from './song.js';

class Playlist extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      songs: []
    }
  }

  fetchMusic = event => {
    event.preventDefault();

    superagent.get('http://localhost:8080/recommendations')
      // .set({emotion_id: this.props.emotion_id})
      .then(result => {
        this.setState({songs : JSON.parse(result.text)})
      })
      .catch((error)=> {
        console.log('THERE\'S BEEN AN ERROR WITH SUPERAGENT', error);
      });
  }

  render() {
    if (this.state.songs.length > 0) {
      return (
        <>
          <button onClick={this.fetchMusic}>Moody Music</button><br/>
          <Song songObj={this.state.songs[0]}/>
          <Song songObj={this.state.songs[1]}/>
          <Song songObj={this.state.songs[2]}/>
          <Song songObj={this.state.songs[3]}/>
          <Song songObj={this.state.songs[4]}/>
          <Song songObj={this.state.songs[5]}/>
          
        </>
      );
    } else {
      return (
        <button onClick={this.fetchMusic}>Moody Music</button>
      );
    }
  }
}

export default Playlist;

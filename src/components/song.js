import React from 'react';

class Song extends React.Component {

  render () {
    return(

        <iframe title={this.props.songObj.title} src={`https://open.spotify.com/embed/track/${this.props.songObj.spotifyid}`} width="600" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    )
  }
}

export default Song;
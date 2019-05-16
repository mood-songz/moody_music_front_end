import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Song extends React.Component {

  render () {
    return(

        <div>
          <iframe title={this.props.songObj.title} src={`https://open.spotify.com/embed/track/${this.props.songObj.spotifyid}`} width="600" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          <span><FontAwesomeIcon icon="heart" /> <FontAwesomeIcon icon="times" /></span>
        </div>

    )
  }
}

export default Song;
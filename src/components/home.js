import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class Home extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      redirectToPicturePage: false
    }
  }
  
  handleClick = async event => {
    event.preventDefault();
    this.setState({'redirectToPicturePage': true});
  }

  render() {
    if(this.state.redirectToPicturePage) {
      return <Redirect to="/takephoto" />
    }

    return (
      <div className="intro">
       <h1>Welcome to Mood Songz! Music based on your mood!</h1> 
       <ul>
         <li>Take <br/>your <br/>Picture</li>
         <li>Discover <br/>your <br/>mood</li>
         <li>Generate <br/>your <br/>playlist</li>
       </ul>
        <div>
         <button onClick={this.handleClick}>Play Music</button> 
        </div>
      </div>
    );
  }
};

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';


const Home = props => {
  return (
    <div className="intro">
     <h1>Welcome to Mood Songz!</h1>
     <h1>Music based on your mood.</h1> 
     <ul>
       <li>Take <br/>your <br/>Picture</li>
       <li>Discover <br/>your <br/>mood</li>
       <li>Generate <br/>your <br/>playlist</li>
     </ul>
      <div>
       <button>Play Music</button> 
      </div>
    </div>
    
  );
};

export default Home;

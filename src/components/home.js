import React from 'react';
import { Link } from 'react-router-dom';


const Home = props => {
  return (
    <div>
     <p>Welcome!<b/>Get music based on your mood!</p> 
     <ul>
       <li>Take Picture</li>
       <li>Get your mood</li>
       <li>Get your playlist</li>
     </ul>
      <div>
       <button>Play Music</button> 
      </div>
    </div>
    
  );
};

export default Home;

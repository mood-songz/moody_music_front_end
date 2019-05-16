import React, {Component} from 'react';
import { Route, BrowserRouter,  Switch } from 'react-router-dom';
import Header from './header.js';
import About from './about.js';
import Register from './register.js';
import Home from './home.js';
import Footer from './footer.js';
import Playlist from './playlist.js';
import TakePhoto from './take-photo.js';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentUser: {},
      userEmotion: ''
    }
  }

  // updates the current user of the application
  currentUserHandler = currentUser => {
    this.setState({currentUser});
  }

  //updates the emotion of the user
  updateEmotion = userEmotion => {
    this.setState ({userEmotion});
  };

  render() {
    return (
      <BrowserRouter>
      <div className={this.state.userEmotion} >
        <Header />
        <main className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/register" 
              render = {(props) => <Register {...props} currentUser={this.state.currentUser} currentUserHandler={this.currentUserHandler}/>}/>
            <Route exact path="/playlist" 
              render = {(props) => <Playlist {...props} userEmotion={this.state.userEmotion}/>}
             />
            <Route exact path="/takephoto" 
              render = {(props) => <TakePhoto {...props} currentUser={this.state.currentUser} 
              updateEmotion={this.updateEmotion}/>}
           />          
          </Switch>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
    )
  }
}

export default App;

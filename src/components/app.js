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
  updateEmotion = (userEmotion) => {
   this.setState ({userEmotion})
  };


  render() {
    return (
      <BrowserRouter>
      <React.Fragment>
        <Header />
        <main className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/about" component={About} />
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
      </React.Fragment>
    </BrowserRouter>
    )
  }
}

export default App;
// newcomment
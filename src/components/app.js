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
      currentUser: {}
    }
  }

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
            <Route exact path="/playlist" component={Playlist} />
            <Route exact path="/takephoto" component={TakePhoto} currentUser={this.state.currentUser}/>
          </Switch>
        </main>
        <Footer />
      </React.Fragment>
    </BrowserRouter>
    )
  }
}

export default App;

import React, {Component} from 'react';
import { Route, BrowserRouter,  Switch } from 'react-router-dom';
import Header from './header.js';
import About from './about.js';
import Register from './register.js';
import Home from './home.js';
import Footer from './footer.js';

class App extends Component {
  constructor(props){
    super(props);

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
          </Switch>
        </main>
        <Footer />
      </React.Fragment>
    </BrowserRouter>
    )
  }
}

export default App;

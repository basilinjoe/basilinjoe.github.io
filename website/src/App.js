import logo from './logo.svg';
import './App.css';
import "xterm/css/xterm.css";
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Contact from './components/Contact/Contact';
import About from './components/About/About';
import Resume from './components/Resume/Resume';
import Home from './components/Home/Home';
import Cli from './components/Cli/Cli';
function App() {
  return (
    <div className="App">
      <Router>
        <header className="shrink">
          <Navbar />
        </header>
        <main className="grow">
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/resume">
              <Resume />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
        <footer className="shrink">
          <Cli />
        </footer>
      </Router>
    </div>
  );
}

export default App;

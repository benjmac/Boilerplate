import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Redirect} from 'react-router-dom';

//load components
import Navbar from './components/Navbar';

const App = () => (
  <div id="main" className="container-fluid">
    <Navbar />
    <h1>Testing</h1>
  </div>
);

export default App;

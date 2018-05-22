

import React, { Component } from 'react';
import './index.css';
import Search from './Components/Search'
import NavBar from './Components/NavBar'


class App extends Component {


    componentDidMount() {

    }

    render() {
      return (

        <div className="holder">
            
            <Search />
            <NavBar />

            <div className="photo-container">
                <h2>Results</h2>
            </div>
        </div>
    );
  }
}

export default App;

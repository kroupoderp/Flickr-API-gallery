

import React, { Component } from 'react';
import './index.css';
import Search from './Components/Search'


class App extends Component {

    render() {
      return (

        <div className="holder">

            <Search />

            <nav className="main-nav">
                <ul>
                    <li><a href='#'>Cats</a></li>
                    <li><a href='#'>Dogs</a></li>
                    <li><a href='#'>Computers</a></li>
                </ul>
            </nav>

            {/*<div className="photo-container">*/}
                {/*<h2>Results</h2>*/}


            {/*</div>*/}
        </div>
    );
  }
}

export default App;

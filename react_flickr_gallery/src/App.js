

import React, { Component } from 'react';
import './index.css';
import Search from './Components/Search';
import NavBar from './Components/NavBar';
import ImageList from './Components/ImageList';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';


class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
    }

    componentDidMount() {
        this.performQuery();
    }

    performQuery = (query = 'Desert') => {
        console.log(query);
        fetch(`http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?`)
            .then((data) => data.json())
            .then((data) => console.log(data))
    };


    render() {
      return (
        <BrowserRouter>
            <div className="holder">

                <Search />
                <NavBar search={this.performQuery} />

                <Route exact path="/"
                       render={() => <Redirect to={"/desert"}/>}/>
                <Route path="/" component={ImageList}/>
            </div>
        </BrowserRouter>
    );
  }
}
// data returned in performQuery will needs to be passed to ImageList.

export default App;


// props) => <ImageList data={this.state.data}/>
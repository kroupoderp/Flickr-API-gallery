import React, { Component } from 'react';
import './index.css';
import Search from './Components/Search';
import NavBar from './Components/NavBar';
import ImageList from './Components/ImageList';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import apiKey from './config';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
        }
    }

    componentDidMount() {
        this.performQuery();
    }

    generatePhotoLinks(obj) {
        return `https://farm${obj.farm}.staticflickr.com/${obj.server}/${obj.id}_${obj.secret}_z.jpg`
    }

    performQuery = (query) => {

        let text = query ? query : window.location.href;
        if (!query) {
                let index = text.lastIndexOf('/');
                text = text.slice(index + 1);
        }

        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${text}&per_page=20&format=json&nojsoncallback=1`)
            .then((data) => data.json())
            .then((data) => data.photos.photo)
            .then((data) => data.map(this.generatePhotoLinks))
            .then((data) => this.setState({images: data}))
            .catch((error) => console.log("There's an error: ", error))
    };

    render() {

        return (
              <BrowserRouter>
                  <div className="holder">

                      <Search/>
                      <NavBar search={this.performQuery}/>

                      <Route exact path="/"
                             render={() => <Redirect to={"/cats"}/>}/>

                      <Route path="/" render={(props) =>
                          <ImageList photos={this.state.images}/>}/>

                  </div>
              </BrowserRouter>
          );
  }
}

export default App;
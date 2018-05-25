import React, { Component } from 'react';
import './index.css';
import Search from './Components/Search';
import NavBar from './Components/NavBar';
import ImageList from './Components/ImageList';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import apiKey from './config';
import Spinner from './Spinner'
import NotFound from './Components/NotFound'



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            loading: true,
            not_found: false,
        }
    }

    componentDidMount() {
        this.performQuery();
    }


    generatePhotoLinks(obj) {
        return `https://farm${obj.farm}.staticflickr.com/${obj.server}/${obj.id}_${obj.secret}_z.jpg`
    }

    componentWillMount() {
        let tag = this.getTag();
        if (tag !== 'cars' && tag !== 'ships' && tag !== 'airplanes' && tag !== "") {
            this.setState({not_found: true})
        }
    }

    getTag() {
        let url = window.location.href;
        let index = url.lastIndexOf('/');
        let tag = url.slice(index + 1);
        return tag;
    }

    performQuery = (query) => {

        this.setState({loading: true});

        let text = query ? query : this.getTag();

        if(query) {
            this.setState({not_found: false})
        }

        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${text}&per_page=20&format=json&nojsoncallback=1`)
            .then((data) => data.json())
            .then((data) => data.photos.photo)
            .then((data) => data.map(this.generatePhotoLinks))
            .then((data) => this.setState({images: data, title: text, loading: false}))
            .catch((error) => console.log("There's an error: ", error))
    };

    render() {

        if (!this.state.not_found) {

            return (
                <BrowserRouter>
                    <div className="holder">

                    <Search/>

                    <NavBar search={this.performQuery}/>


                    <Route exact path="/"
                           render={() => <Redirect to={"/cars"}/>}/>


                    {this.state.loading ? <Spinner/> :

                        <Switch>
                            <Route exact path="/cars" render={(props) =>
                                <ImageList photos={this.state.images}
                                           title={this.state.title}
                                           />}/>

                            <Route exact path="/ships" render={(props) =>
                                <ImageList photos={this.state.images}
                                           title={this.state.title}
                                           />}/>

                            <Route exact path="/airplanes" render={(props) =>
                                <ImageList photos={this.state.images}
                                           title={this.state.title}
                                           />}/>
                        </Switch>

                    }
                    </div>
                </BrowserRouter>
            );
        } else {
            return (
                <BrowserRouter>
                     <div className="holder">
                         <Search/>
                         <NavBar search={this.performQuery}/>
                         <NotFound/>
                     </div>
                </BrowserRouter>
            )
        }
  }
}

export default App;
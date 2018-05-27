import React, { Component } from 'react';
import './index.css';
import Search from './Components/Search';
import NavBar from './Components/NavBar';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import NotFound from './Components/NotFound'
import Cars from './Components/Categories/Cars';
import Ships from './Components/Categories/Ships';
import Airplanes from './Components/Categories/Airplanes';
import SearchResults from './Components/Categories/SearchResults'


class App extends Component {

    search(text) {
        console.log(text);
        window.location.pathname = '/Search/' + text;
    }

    render() {

        let query = window.location.pathname.slice(8);
        let tagName = decodeURI(query);

        // let splitStr = tagName.split(' ');
        //
        // for (let i = 0; i < splitStr.length; i++) {
        //     splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].slice(1);
        // }
        //
        // let title = splitStr.join(' ');

        return (
            <BrowserRouter>
                <div className="holder">

                    <Search performSearch={this.search}/>

                    <NavBar/>

                    <Route exact path="/"
                           render={() => <Redirect to={"/cars"}/>}/>

                    <Switch>
                        <Route exact path="/cars"
                               render={(props) => <Cars title="Cars" tag="cars"/>}/>

                        <Route exact path="/ships"
                               render={(props) => <Ships title="Ships" tag="ships"/>}/>

                        <Route exact path="/airplanes"
                               render={(props) => <Airplanes title="Airplanes" tag="airplanes"/>}/>

                        <Route path="/Search"
                               render={(props) => <SearchResults
                                   title={tagName}
                                   tag={query}/>}/>

                        <Route component={NotFound}/>

                    </Switch>

                </div>
            </BrowserRouter>
        );

    }
}

export default App;
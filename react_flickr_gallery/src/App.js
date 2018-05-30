import React, { Component } from 'react';
import './index.css';
import Search from './Components/Search';
import NavBar from './Components/NavBar';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import NotFound from './Components/NotFound';
import Cars from './Components/Categories/Cars';
import Ships from './Components/Categories/Ships';
import Airplanes from './Components/Categories/Airplanes';
import SearchResults from './Components/Categories/SearchResults';


class App extends Component {

    render() {

        return (
            <BrowserRouter>
                <div className="holder">

                    <Route render={(props) => <Search
                                                  history={props.history}/>}/>

                    {/*history object is passed to the Search component, so it can update*/}
                    {/*the URL by calling this.props.history.push(path);*/}

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


                        {/*:term will be passed to SearchResults and will be used as*/}
                        {/*a title and tag just like for the above components*/}
                        <Route path="/Search/:term"
                               render={(props) => <SearchResults
                                   match={props.match}/>}/>

                        <Route component={NotFound}/>
                    </Switch>

                </div>
            </BrowserRouter>
        );

    }
}

export default App;
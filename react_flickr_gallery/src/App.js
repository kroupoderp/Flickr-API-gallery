import React, { Component } from 'react';
import './index.css';
import Search from './Components/Search';
import NavBar from './Components/NavBar';
import ImageList from './Components/ImageList';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import NotFound from './Components/NotFound'



class App extends Component {


    render() {

            return (
                <BrowserRouter>
                    <div className="holder">

                        <Search/>

                        <NavBar/>


            {/*NotFound is being rendered all the time. To prevent that, I would*/}
            {/*place all Routes inside of a Switch component. But if I do that */}
            {/*there'll be a new problem: when clicking a navigation button from NavBar, */}
            {/*ImageList will not get rendered again, and new title and photos will*/}
            {/*not appear, why is that?!?!?*/}

                        <Route exact path="/"
                               render={() => <Redirect to={"/cars"}/>}/>

                        <Route path="/cars" component={ImageList}/>
                        <Route path="/ships" component={ImageList}/>
                        <Route path="/airplanes" component={ImageList}/>
                        <Route component={NotFound}/>




                    </div>
                </BrowserRouter>
            );

  }
}

export default App;
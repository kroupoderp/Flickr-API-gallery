import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NavBar extends Component {

    render() {
        return (
            <nav className="main-nav">
                <ul>
                    <li tabIndex={0}><NavLink exact to="/cars">Cars</NavLink></li>
                    <li tabIndex={0}><NavLink exact to="/ships">Ships</NavLink></li>
                    <li tabIndex={0}><NavLink exact to="/airplanes">Airplanes</NavLink></li>
                </ul>
            </nav>
        )
    }
}

export default NavBar
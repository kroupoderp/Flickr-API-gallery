

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'

class NavBar extends Component {

    //
    // link_search = e => {
    //     if(e.target.tagName === 'A') {
    //         let query = e.target.textContent;
    //         this.props.search(query)
    //     }
    // };

    render() {
        return (
            <nav className="main-nav">
                <ul>
                    <li><NavLink exact to="/cars">Cars</NavLink></li>
                    <li><NavLink exact to="/ships">Ships</NavLink></li>
                    <li><NavLink exact to="/airplanes">Airplanes</NavLink></li>
                </ul>
            </nav>
        )
    }
}

export default NavBar

NavBar.propTypes = {
  search: PropTypes.func,
};
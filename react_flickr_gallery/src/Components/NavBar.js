

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'

class NavBar extends Component {


    link_search = e => {
        if(e.target.tagName === 'A') {
            let query = e.target.textContent;
            this.props.search(query)
        }
    };

    render() {
        return (
            <nav className="main-nav" onClick={this.link_search}>
                <ul>
                    <li><NavLink to="/cars">Cars</NavLink></li>
                    <li><NavLink to="/ships">Ships</NavLink></li>
                    <li><NavLink to="/airplanes">Airplanes</NavLink></li>
                </ul>
            </nav>
        )
    }
}

export default NavBar

NavBar.propTypes = {
  search: PropTypes.func,
};
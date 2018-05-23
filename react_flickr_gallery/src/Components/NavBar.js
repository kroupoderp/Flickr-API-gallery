

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'

class NavBar extends React.Component {


    link_search = e => {
        let query = e.target.textContent;
        this.props.search(query)
    };

    render() {
        return (
            <nav className="main-nav" onClick={this.link_search}>
                <ul>
                    <li><NavLink to="/cats">Cats</NavLink></li>
                    <li><NavLink to="/dogs">Dogs</NavLink></li>
                    <li><NavLink to="/cars">Cars</NavLink></li>
                </ul>
            </nav>
        )
    }
}

export default NavBar

NavBar.propTypes = {
  search: PropTypes.func,
};
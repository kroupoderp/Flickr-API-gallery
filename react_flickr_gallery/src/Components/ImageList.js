

import React, { Component } from 'react';



class ImageList extends React.Component {

        // Fetch call will be made here
        // We will use string interpolation to pass
        // this.props.location.pathname into the query string.

    render() {
        return (
            <div className="photo-container">
                <h2>{this.props.location.pathname}</h2>
            </div>
        )
    }
}

export default ImageList;




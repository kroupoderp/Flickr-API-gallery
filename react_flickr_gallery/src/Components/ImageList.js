

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Image from './Image'



class ImageList extends React.Component {

        // Fetch call will be made here
        // We will use string interpolation to pass
        // this.props.location.pathname into the query string.
    // {this.props.location.pathname}

    render() {
        return (
            <div className="photo-container">
                <h2>Photos</h2>
                <ul>
                    {/*{this.props.photos.map((url) =>*/}
                        {/*<Image photo_url={url}/>*/}
                    {/*)}*/}
                </ul>
            </div>
        )
    }
}

export default ImageList;

ImageList.propTypes = {
  photos: PropTypes.array.isRequired
};






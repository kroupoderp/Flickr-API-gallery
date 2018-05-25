

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Image from './Image'

class ImageList extends Component {

    render() {

        return (
            <div className="photo-container">
                <h2>{this.props.title}</h2>
                <ul>
                    {this.props.photos.map((url, i) =>
                        <Image photo_url={url} key={"photo_" + i}/>
                    )}
                </ul>
            </div>
        )
    }
}


export default ImageList;

ImageList.propTypes = {
  photos: PropTypes.array.isRequired,
  title: PropTypes.string,
};






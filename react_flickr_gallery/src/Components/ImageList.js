

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Image from './Image'

const ImageList = (props) => {

    let results = props.photos;

    return (
        <div className="photo-container">
            <h2>Photos</h2>
            <ul>
                {results.map((url) =>
                    <Image photo_url={url}/>
                )}
            </ul>
        </div>
    )

};

export default ImageList;

ImageList.propTypes = {
  photos: PropTypes.array,
};






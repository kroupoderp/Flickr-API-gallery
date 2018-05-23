

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Image from './Image'

const ImageList = (props) => {

    let results = props.photos;

    return (
        <div className="photo-container">
            <h2>Photos</h2>
            <ul>
                {results.map((url, i) =>
                    <Image photo_url={url} key={"photo_" + i}/>
                )}
            </ul>
        </div>
    )

};

export default ImageList;

ImageList.propTypes = {
  photos: PropTypes.array,
};






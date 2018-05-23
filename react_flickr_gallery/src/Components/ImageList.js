

import React from 'react';
import PropTypes from 'prop-types'
import Image from './Image'

const ImageList = (props) => {

    let results = props.photos;
    console.log(ImageList.props);
    return (
        <div className="photo-container">
            <h2>{props.title}</h2>
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
  photos: PropTypes.array.isRequired,
  title: PropTypes.string
};






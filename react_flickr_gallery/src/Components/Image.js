
import React from 'react';
import PropTypes from 'prop-types'

const Image = (props) => {

   return (
       <li>
            <img src={props.photo_url} alt=""/>
       </li>
   )

};

Image.propTypes = {
  photo_url: PropTypes.string.isRequired,
};

export default Image




import React from 'react';
import PropTypes from 'prop-types';

class Image extends React.Component {

  render() {
    return (
      <div style={this.props.styles}>
        <img onLoad={this.props.onLoader} data-key={this.props.label} src={this.props.photo_url} alt=""/>
      </div>
    )
  }
}

Image.propTypes = {
  photo_url: PropTypes.string.isRequired,
  // origin: PropTypes.string.isRequired,
  // hovering: PropTypes.bool.isRequired,
};

export default Image;
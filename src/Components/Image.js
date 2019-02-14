
import React from 'react';
import PropTypes from 'prop-types';

class Image extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hovering: false
    }
  }

  hoverHandler = (e) => {
    this.setState({hovering: true})
  }

  handleLeave = (e) => {
    this.setState({hovering: false})
  }

  render() {
    if (!this.state.hovering) {
      return (
        <div onMouseOver={this.hoverHandler} style={this.props.styles} className="image">
          <img onLoad={this.props.onLoader} src={this.props.photo_url} alt=""/>
        </div>
      )
    } else {
      // return the overlay div
      // the filter style is here temporarily
      return (
        <div onMouseOver={this.hoverHandler} onMouseLeave={this.handleLeave} className="image">
          <img style={{filter: 'opacity(20%)'}} onLoad={this.props.onLoader} data-key={this.props.label} src={this.props.photo_url} alt=""/>
        </div>
      )
    }
  }
}

Image.propTypes = {
  photo_url: PropTypes.string.isRequired,
  // origin: PropTypes.string.isRequired,
};

export default Image;
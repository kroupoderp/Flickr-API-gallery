
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
    return (
      <div onMouseOver={this.hoverHandler} onMouseLeave={this.handleLeave} style={this.props.styles}>
          <a href={this.props.origin}>
            {this.state.hovering ? 
              <img style={{filter: "opacity(20%)"}} onLoad={this.props.onLoader} src={this.props.photo_url} alt=""/>
                :
              <img onLoad={this.props.onLoader} src={this.props.photo_url} alt=""/>
            } 
          </a>
      </div>
    )
  }
}

Image.propTypes = {
  photo_url: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired,
};

export default Image;
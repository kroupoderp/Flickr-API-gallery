
import React from 'react';
import PropTypes from 'prop-types';

class Image extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      hover: false
    }

    this.hover = this.hover.bind(this)
    this.leave = this.leave.bind(this)
  }

  componentDidUpdate() {
    if (this.state.hover) {
      let imgHeight = this.image.height
      console.log(imgHeight)
      if(imgHeight > 165) {
        this.overlay.style.height = '165px'
        this.text.style.lineHeight = '165px'
      } else {
        this.overlay.style.height = imgHeight + 'px'
        this.text.style.lineHeight = imgHeight + 'px'
      }
    }
  }

  hover() {
    this.setState({hover: true})
  }

  leave() {
    this.setState({hover: false})
  }

  render() {
    return (
      <li>
        {this.state.hover ?
        <React.Fragment>
          <img ref={ el => {this.image = el} } src={this.props.photo_url} alt=""/>
          <div ref={ el => {this.overlay = el } }  className="overlay" onMouseOut={this.leave}>
          <div ref = { el => {this.text = el } } className="overlayText"><a href="https://www.flickr.com" className="text">visit</a></div>
          </div>
        </React.Fragment> :

        <img onMouseOver={this.hover} src={this.props.photo_url} alt=""/> 
      }
      </li>
    )
  }
}

Image.propTypes = {
  photo_url: PropTypes.string.isRequired,
};

export default Image;




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
      } else {
        this.overlay.style.height = imgHeight + 'px'
      }
    }
  }

  hover(e) {
    this.setState({hover: true})
  }

  leave(e) {
    this.setState({hover: false})
  }

  render() {
    return (
      <li>
        {this.state.hover ?
        <React.Fragment>
          <img ref={ el => {this.image = el} } src={this.props.photo_url} alt=""/>
          <div ref={ el => {this.overlay = el } }  className="overlay" onMouseOut={this.leave}>
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



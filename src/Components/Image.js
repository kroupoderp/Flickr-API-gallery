
import React from 'react';
import PropTypes from 'prop-types';

class Image extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      hovering: false
    }
  }

  componentDidMount() {
    let body = document.getElementsByTagName('body')[0]

    let hoverHandler = (e) => {
      if (parseInt(e.target.dataset.key) === this.props.label) {
        console.log(e.target.dataset.key)
      }
    }

    body.addEventListener('mouseover', hoverHandler)
  }



  render() {
    if (!this.state.hovering) {
      return (
        <div style={this.props.styles} className="image">
          <img onLoad={this.props.onLoader} data-key={this.props.label} src={this.props.photo_url} alt=""/>
        </div>
      )
    }
  }
}

Image.propTypes = {
  photo_url: PropTypes.string.isRequired,
  // origin: PropTypes.string.isRequired,
  // hovering: PropTypes.bool.isRequired,
};

export default Image;
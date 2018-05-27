import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Image from './Image'
import apiKey from "../config";
import Spinner from '../Spinner';
import NoMatches from './NoMatches'


class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            heading: "title",
            images: [],
            loading: true,
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.performQuery();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    generatePhotoLinks(obj) {
        return `https://farm${obj.farm}.staticflickr.com/${obj.server}/${obj.id}_${obj.secret}_z.jpg`
    }

    performQuery = () => {

        this.setState({loading: true});

        let text = this.props.tag;

        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${text}&per_page=16&format=json&nojsoncallback=1`)
            .then((data) => data.json())
            .then((data) => data.photos.photo)
            .then((data) => data.map(this.generatePhotoLinks))
            .then((data) => { if(this._isMounted) {this.setState({images: data,loading: false})}})
            .catch((error) => console.log("There's an error: ", error))
    };

    render() {

            if (!this.state.loading) {

                if(this.state.images.length === 0) {
                    return <NoMatches/>
                }

                return (
                    <div className="photo-container">
                        <h2>{this.props.title}</h2>
                        <ul>
                            {this.state.images.map((url, i) =>
                                <Image photo_url={url} key={"photo_" + i}/>
                            )}
                        </ul>
                    </div>
                )
            }   else {

                return <Spinner/>
            }
    }
}

Gallery.propTypes = {
  title: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired
};

export default Gallery;








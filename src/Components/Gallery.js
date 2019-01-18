import React, { Component } from 'react';
import Image from './Image';
import apiKey from "../config";
import Spinner from '../Spinner';
import NoMatches from './NoMatches';


class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            loading: true   // used for the loading animation
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.performQuery();
    }

    componentWillUnmount() {            // stops any unfinished async operation
        console.log("ummounted");
        this._isMounted = false;
    }

    // function for creating a Flickr photo URL from the fetch response data
    generatePhotoLinks(obj) {
        return `https://farm${obj.farm}.staticflickr.com/${obj.server}/${obj.id}_${obj.secret}_z.jpg`
    }

    performQuery = () => {
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${this.props.tag}&per_page=16&format=json&nojsoncallback=1`)
            .then((response) => response.json())
            .then((data) => data.photos.photo)
            .then((photoInfo) => photoInfo.map(this.generatePhotoLinks))
            .then((photoLinks) => { if(this._isMounted) {this.setState({images: photoLinks,loading: false})}})
            .catch(() => alert("Something has gone wrong and there's an error. Try " +
                "refreshing the page or come back later."));
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

export default Gallery;

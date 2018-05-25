

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Image from './Image'
import apiKey from "../config";
import Spinner from '../Spinner';


class ImageList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            heading: "title",
            images: [],
            title: '',
            loading: true,
        }
    }


    componentDidMount() {
        this.performQuery();
        console.log('mounted')
    }


    generatePhotoLinks(obj) {
        return `https://farm${obj.farm}.staticflickr.com/${obj.server}/${obj.id}_${obj.secret}_z.jpg`
    }

    getTag() {
        let url = window.location.href;
        let index = url.lastIndexOf('/');
        let tag = url.slice(index + 1);
        return tag;
    }


    performQuery = () => {

        this.setState({loading: true});

        let text = this.getTag();

        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${text}&per_page=20&format=json&nojsoncallback=1`)
            .then((data) => data.json())
            .then((data) => data.photos.photo)
            .then((data) => data.map(this.generatePhotoLinks))
            .then((data) => this.setState({images: data, title: text, loading: false}))
            .catch((error) => console.log("There's an error: ", error))
    };


    render() {

            if (!this.state.loading) {

                return (
                    <div className="photo-container">
                        <h2>{this.state.title}</h2>
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


export default ImageList;








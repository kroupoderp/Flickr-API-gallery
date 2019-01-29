import React, { Component } from 'react';
import Image from './Image';
import apiKey from "../config";
import Spinner from '../Spinner';
import NoMatches from './NoMatches';

class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageWithOverlay: null,
            images: [],
            loading: true   // used for the loading animation
        }
        this.handleStateChange = this.handleStateChange.bind(this)
    }

    componentDidMount() {
        this.count = 0;
        this._isMounted = true;
        this.performQuery();

        function changeState(e) {
            let elm = e.target
            if (elm.dataset.key) {
                this.setState({
                    imageWithOverlay: parseInt(e.target.dataset.key)
                })
            } else 
            if (elm.tagName === 'BODY' || elm.className === 'holder' ||
            elm.tagName === 'UL' || elm.tagName === 'LI' 
            || elm.className === "photo-container") {
                this.setState({
                    imageWithOverlay: null,
                })
            }
        }
        changeState = changeState.bind(this)
        let body = document.getElementsByTagName("body")[0]
        body.addEventListener('mouseover', changeState) 
    }

    componentWillUnmount() {            // stops any unfinished async operation
        this._isMounted = false;
    }

    // function for creating a Flickr photo URL from the fetch response data
    generatePhotoLinks(obj) {
        return { source: `https://farm${obj.farm}.staticflickr.com/${obj.server}/${obj.id}_${obj.secret}_z.jpg`,
                 origin: `https://flickr.com/photos/${obj.owner}/${obj.id}/`}
    }

    performQuery = () => {
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${this.props.tag}&per_page=16&format=json&nojsoncallback=1`)
            .then((response) => response.json())
            .then((data) => data.photos.photo)
            .then((photoInfo) => photoInfo.map(this.generatePhotoLinks))
            .then((photoLinks) => { if(this._isMounted) {this.setState({images: photoLinks})}})
            .catch(() => alert("Something has gone wrong and there's an error. Try " +
                "refreshing the page or come back later."));
        };

    imagesLoaded() {
        const imgElements = document.querySelectorAll("img");
        for (const img of imgElements) {
            if (!img.complete) {
            return false;
            }
        }
        return true;
    }    


    renderSpinner() {
        if (!this.state.loading) {
            return null
        }
        return <Spinner />
    }

    handleStateChange() {
        this.setState({
            loading: !this.imagesLoaded()
        })
    }

    render() {
            const style = this.state.loading ? {'display': 'none'} : {'display':'inline-block'}

            if(this.state.images.length === 0 && !this.state.loading) {
                return <NoMatches/>
            }
            return (
                <div className="photo-container">
                    <h2>{this.props.title}</h2>
                    <ul>
                        {/* spinner could also go here     */}
                        {this.renderSpinner()}
                        {this.state.images.map((url, i) =>
                            {if (this.state.imageWithOverlay === i) {
                                return <Image  hovering={true} key={"photo_" + i} label={i} origin={url.origin} photo_url={url.source} />
                            } else {
                                return <Image styles={style} loader={this.handleStateChange} hovering={false} key={"photo_" + i} label={i} origin={url.origin} photo_url={url.source} />
                            }}
                        )}
                    </ul>
                </div>
            )
    }
}

export default Gallery;
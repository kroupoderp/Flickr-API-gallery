import React, { Component } from 'react';
import Image from './Image';
import apiKey from "../config";
import Spinner from '../Spinner';
import NoMatches from './NoMatches';
import $ from 'jquery';

let pageNumber = 1;

class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageWithOverlay: null,
            images: [],
            loading: true,   // used for the loading animation
            loadingMore: false,
        }
        this.handleStateChange = this.handleStateChange.bind(this)
    }

    componentDidMount() {
        this.count = 0;
        this._isMounted = true;
        this.performQuery(pageNumber);

        $(window).scroll(() => {

            if (Math.ceil($(window).scrollTop() + $(window).height()) === $(document).outerHeight()) {
                setTimeout(() => {
                    if (!this.state.loading) {
                        pageNumber += 1;
                        console.log('bottom')
                        this.setState({loadingMore: true})
                    }
                }, 500)
            }
        })
    }

    componentDidUpdate() {
        if (pageNumber > 1 && this.state.loadingMore) {
            this.performQuery(pageNumber)
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        pageNumber = 1;
    }

    generatePhotoLinks(obj) {
        return { source: `https://farm${obj.farm}.staticflickr.com/${obj.server}/${obj.id}_${obj.secret}_z.jpg`,
                 origin: `https://flickr.com/photos/${obj.owner}/${obj.id}/`}
    }

    performQuery = (page) => {
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${this.props.tag}&per_page=24&page=${page}&format=json&nojsoncallback=1`)
            .then((response) => response.json())
            .then((data) => data.photos.photo)
            .then((photoInfo) => photoInfo.map(this.generatePhotoLinks))
            .then((photoLinks) => { if(this._isMounted) {
                    if (pageNumber === 1) {
                        this.setState({images: photoLinks})
                    } else {
                        this.setState((prevState) => {
                            return {
                                loadingMore: false,
                                images: [
                                    ...prevState.images,
                                    ...photoLinks,
                                ]
                            }
                        })
                    }
                }
            
            })
            .catch(() => alert("Something has gone wrong and there's an error. Try " +
                "refreshing the page or come back later."));
        };

    imagesLoaded() {
        let imgElements = document.querySelectorAll("img");

        if (pageNumber > 1) {
            imgElements = [...imgElements].slice(this.previousImageCount)
        }

        for (const img of imgElements) {
            if (!img.complete) {
            return false;
            }
        }
        return true;
    } 

    handleStateChange() {
        if (pageNumber === 1) {
            this.setState({
                loading: !this.imagesLoaded()
            })
        } else {
            this.previousImageCount = this.state.images.length;
            this.setState({
                loadingMore: !this.imagesLoaded()
            })
        }
    }

    render() {
            const style = this.state.loading ? {'display': 'none'} : {}

            if(this.state.images.length === 0 && !this.state.loading) {
                return <NoMatches/>
            }
            return (
                <div className="photo-container">
                    <h2>{this.props.title}</h2>
                    {this.state.loading ? <Spinner position="0px" /> : null}
                    <ul>
                        {this.state.images.map((url, i) =>
                            // {if (this.state.imageWithOverlay === i) {
                            //     return <Image hovering={true} key={"photo_" + i} label={i} origin={url.origin} photo_url={url.source} />
                            // } else {
                                {return <Image loader={this.handleStateChange} styles={style} hovering={false} key={"photo_" + i} label={i} origin={url.origin} photo_url={url.source} />}
                            // }}
                        )}
                    </ul>
                    <div className="loadingMoreContainer">
                        {this.state.loadingMore ? <Spinner position="130px" /> : null}
                    </div>
                </div>
            )
    }
}

export default Gallery;
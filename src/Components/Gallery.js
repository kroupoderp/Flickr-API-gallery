import React, { Component } from 'react';
import Image from './Image';
import apiKey from "../config";
import Spinner from '../Spinner';
import NoMatches from './NoMatches';

let pageNumber = 1;
let imagesLoaded = 0;
let x = 0;

class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageWithOverlay: null,
            images: [],
            loading: true,   // used for the loading animation
            loadingMore: false,
        }
        this.loadMore = this.loadMore.bind(this)
    }

    componentDidMount() {
        this.count = 0;
        this._isMounted = true;
        this.performQuery(pageNumber);
    }

    componentWillUnmount() {
        this._isMounted = false;
        pageNumber = 1;
        imagesLoaded = 0;
    }

    generatePhotoLinks(obj) {
        return { source: `https://farm${obj.farm}.staticflickr.com/${obj.server}/${obj.id}_${obj.secret}_z.jpg`,
                 origin: `https://flickr.com/photos/${obj.owner}/${obj.id}/`}
    }

    performQuery = (page) => {
        console.log('runs only once')
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${this.props.tag}&per_page=20&page=${page}&format=json&nojsoncallback=1`)
            .then((response) => response.json())
            .then((data) => data.photos.photo)
            .then((photoInfo) => photoInfo.map(this.generatePhotoLinks))
            .then((photoLinks) => { if(this._isMounted) {
                    if (pageNumber === 1) {
                        this.setState({images: photoLinks})
                    } else {
                        this.setState((prevState) => {
                            return {
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

    loadMore() {
        if (!this.state.loading) {
            pageNumber += 1;
            this.setState({loadingMore: true})
            this.performQuery(pageNumber)
        }
    }
    
    handleStateChange = () => {
        imagesLoaded += 1
        if (this.state.images.length === imagesLoaded) {
            if (pageNumber === 1) {
                this.setState({loading: false})
                x = this.state.images.length
            } else {
                if (pageNumber > 1) {
                    this.setState({loadingMore: false})
                    x = this.state.images.length
                }
            }
        }
    }

    render() {

            // style must be applied to images
            let style;
            if (this.state.loading || this.state.loadingMore) {
                style = {'display': 'none'}
            } else {
                style = {}
            }

            if(this.state.images.length === 0 && !this.state.loading) {
                return <NoMatches/>
            }
            return (
                <div className="photo-container">
                    <h2>{this.props.title}</h2>
                    {this.state.loading ? <Spinner position="0px" /> : null}
                    <ul>
                        {this.state.images.map((url, i) =>
                            {if (!this.state.loadingMore) {
                                {return <Image styles={style} onLoader={this.handleStateChange} hovering={false} key={"photo_" + i} label={i} origin={url.origin} photo_url={url.source} />}
                            } else {
                                if (i >= x) {
                                    {return <Image styles={style} onLoader={this.handleStateChange} hovering={false} key={"photo_" + i} label={i} origin={url.origin} photo_url={url.source} />}
                                } else {
                                     {return <Image onLoader={this.handleStateChange} hovering={false} key={"photo_" + i} label={i} origin={url.origin} photo_url={url.source} />}
                                }
                            }}
                        )}
                    </ul>
                    <div className="loadingMoreContainer">
                        {this.state.loadingMore ? <Spinner position="130px" /> : <button onClick={this.loadMore}>Load More</button>}
                    </div>
                </div>
            )
    }
}

export default Gallery;
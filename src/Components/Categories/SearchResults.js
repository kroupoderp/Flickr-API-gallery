
import React, { Component } from 'react';
import Image from '../Image';
import apiKey from "../../config";
import Spinner from '../../Spinner';
import NoMatches from '../NoMatches';


let pageNumber = 1;
let imagesLoaded = 0;
let newImagesStartIndex = 0;

class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            loading: true,
            loadingMore: false,
            mounted: false // used for determining if componentDidUpdate should run.
        }
    }

    // runs when user performs second search in a row
    componentWillReceiveProps(nextProps) {
        pageNumber = 1
        imagesLoaded = 0;
        this.setState({loading: true})
        if (nextProps !== this.props) {
            this.state.mounted = true;
        }
    }
    // this function runs when a user does a search for the first time, because
    // performQuery() updates the state by setting the images changing loading
    // to false. componentDidUpdate should only run when a user does a second search
    // in a row - SearchResults will have new props passed to it, making
    // componentWillReceiveProps run, setting state.mounted to true. componentDidUpdate
    // evaluates this.state.mounted, and if it's true, it will call performQuery
    // (componentDidMount is not calling performQuery anymore)

    componentDidUpdate() {
        if(this.state.mounted) {
            this.performQuery(pageNumber);
        }
        this.state.mounted = false; // prevents continuous fetch calls
    }

    componentDidMount() {
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
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${this.props.match.params.term}&per_page=36&page=${page}&format=json&nojsoncallback=1`)
            .then((response) => response.json())
            .then((data) => data.photos.photo)
            .then((photoInfo) => photoInfo.map(this.generatePhotoLinks))
            .then((photoLinks) => { if(this._isMounted) {

                if (photoLinks.length === 0) {
                    this.setState({loading: false})
                }

                if (pageNumber === 1) {
                        this.setState({images: photoLinks})
                    } else {
                        if (photoLinks.length === 0) {
                            this.setState({loadingMore: false})
                        }
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



    loadMore = () => {
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
                newImagesStartIndex = this.state.images.length
            } else {
                if (pageNumber > 1) {
                    this.setState({loadingMore: false})
                    newImagesStartIndex = this.state.images.length
                }
            }
        }
    }


    render() {

        let style;
        if (this.state.loading || this.state.loadingMore) {
            style = {'display': 'none'}
        } else {
            style = {}
        }

        if(this.state.images.length === 0 && !this.state.loading) {
            return <NoMatches />
        }

        return (
            <div className="photo-container">

                <h2>{this.props.match.params.term}</h2>
                {this.state.loading ? <Spinner /> : null}
                
                <div className="photosHolder">
                    {this.state.images.map((url, i) =>
                        {if (!this.state.loadingMore) {
                            {return <Image styles={style} onLoader={this.handleStateChange} hovering={false} key={"photo_" + i} origin={url.origin} photo_url={url.source} />}
                        } else {
                            if (i >= newImagesStartIndex) {
                                {return <Image styles={style} onLoader={this.handleStateChange} hovering={false} key={"photo_" + i} origin={url.origin} photo_url={url.source} />}
                            } else {
                                    {return <Image onLoader={this.handleStateChange} hovering={false} key={"photo_" + i} origin={url.origin} photo_url={url.source} />}
                            }
                        }}
                    )}
                </div>
                <div className="loadingMoreContainer">
                        {this.state.loadingMore ? <Spinner /> : <button className='loadMore' style={style} onClick={this.loadMore}>Load More</button>}
                </div>
            </div>
        )
    }
}

export default SearchResults;
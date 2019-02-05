
import React, { Component } from 'react';
import Image from '../Image';
import apiKey from "../../config";
import Spinner from '../../Spinner';
import NoMatches from '../NoMatches';


let pageNumber = 1;
let imagesLoaded = 0;
let x = 0;

class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageWithOverlay: null,
            images: [],
            loading: true,
            loadingMore: false,
            mounted: false // used for determining if componentDidUpdate should run.
        }
    }

    // runs when user performs second search in a row
    componentWillReceiveProps(nextProps) {
        this.state.loading = true;
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
            this.performQuery();
        }
        this.state.mounted = false; // prevents continuous fetch calls
    }

    componentDidMount() {
        this._isMounted = true;
        this.performQuery();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    generatePhotoLinks(obj) {
        return { source: `https://farm${obj.farm}.staticflickr.com/${obj.server}/${obj.id}_${obj.secret}_z.jpg`,
                 origin: `https://flickr.com/photos/${obj.owner}/${obj.id}/`}
    }

    performQuery = () => {
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${this.props.match.params.term}&per_page=20&format=json&nojsoncallback=1`)
            .then((response) => response.json())
            .then((data) => data.photos.photo)
            .then((photoInfo) => photoInfo.map(this.generatePhotoLinks))
            .then((photoLinks) => { if(this._isMounted) {this.setState({images: photoLinks, loading: false})}})
            .catch(() => alert("Something has gone wrong and there's an error. Try " +
                "refreshing the page or come back later."));
    };


    render() {

        if(this.state.images.length === 0 && !this.state.loading) {
            return <NoMatches/>
        }

        return (
            <div className="photo-container">
                <h2>{this.props.match.params.term}</h2>
                {this.state.loading ? <Spinner /> : null}
                <ul>
                    {this.state.images.map((url, i) =>
                        {return <Image key={"photo_" + i} label={i} origin={url.origin} photo_url={url.source} />}
                    )}
                </ul>
            </div>
        )
    }
}

export default SearchResults;


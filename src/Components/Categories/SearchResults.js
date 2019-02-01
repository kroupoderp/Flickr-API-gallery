
import React, { Component } from 'react';
import Image from '../Image';
import apiKey from "../../config";
import Spinner from '../../Spinner';
import NoMatches from '../NoMatches';


class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageWithOverlay: null,
            images: [],
            loading: true,
            mounted: false // used for determining if componentDidUpdate should run.
        }
        this.handleStateChange = this.handleStateChange.bind(this)
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

        // function changeState(e) {
        //     let elm = e.target
        //     if (elm.dataset.key) {
        //         this.setState({
        //             imageWithOverlay: parseInt(e.target.dataset.key)
        //         })
        //     } else 
        //     if (elm.tagName === 'BODY' || elm.className === 'holder' ||
        //     elm.tagName === 'UL' || elm.tagName === 'LI' 
        //     || elm.className === "photo-container") {
        //         this.setState({
        //             imageWithOverlay: null,
        //         })
        //     }
        // }
        // changeState = changeState.bind(this)
        // let body = document.getElementsByTagName("body")[0]
        // body.addEventListener('mouseover', changeState) 
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    generatePhotoLinks(obj) {
        return { source: `https://farm${obj.farm}.staticflickr.com/${obj.server}/${obj.id}_${obj.secret}_z.jpg`,
                 origin: `https://flickr.com/photos/${obj.owner}/${obj.id}/`}
    }

    performQuery = () => {

        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${this.props.match.params.term}&per_page=40&format=json&nojsoncallback=1`)
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

    handleStateChange() {
        this.setState({
            loading: !this.imagesLoaded()
        })
    }

    render() {

        const style = this.state.loading ? {'display': 'none'} : {}

        if(this.state.images.length === 0 && !this.state.loading) {
            return <NoMatches/>
        }

            return (
                <div className="photo-container">
                    <h2>{this.props.match.params.term}</h2>
                    {this.state.loading ? <Spinner /> : null}
                    <ul>
                        {this.state.images.map((url, i) =>
                            // {if (this.state.imageWithOverlay === i) {
                            //     return <Image hovering={true} key={"photo_" + i} label={i} origin={url.origin} photo_url={url.source} />
                            // } else {
                                {return <Image loader={this.handleStateChange} styles={style} hovering={false} key={"photo_" + i} label={i} origin={url.origin} photo_url={url.source} />}
                            // }}
                        )}
                    </ul>
                </div>
            )
      
    }
}

export default SearchResults;


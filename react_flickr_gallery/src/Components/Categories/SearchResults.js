

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Image from '../Image';
import apiKey from "../../config";
import Spinner from '../../Spinner';
import NoMatches from '../NoMatches';


class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            loading: true,
            mounted: false,
        }
    }




    componentWillReceiveProps(nextProps) {
        this.state.loading = true;
        if (nextProps !== this.props) {
            this.state.mounted = true;
        }
    }

    componentDidUpdate() {
        if(this.state.mounted) {
            this.performQuery();
        }
        this.state.mounted = false;
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



        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${this.props.match.params.term}&per_page=16&format=json&nojsoncallback=1`)
            .then((response) => response.json())
            .then((data) => data.photos.photo)
            .then((photoInfo) => photoInfo.map(this.generatePhotoLinks))
            .then((photoLinks) => { if(this._isMounted) {this.setState({images: photoLinks,loading: false})}})
            .catch(() => alert("Something has gone wrong and there's an error. Try " +
                "refreshing the page or come back later."));

    };

    render() {

        if (this.state.loading === false) {

            if(this.state.images.length === 0) {
                return <NoMatches/>
            }

            return (
                <div className="photo-container">
                    <h2>{this.props.match.params.term}</h2>
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
//
// SearchResults.propTypes = {
//     title: PropTypes.string.isRequired,
//     tag: PropTypes.string.isRequired
// };

export default SearchResults;
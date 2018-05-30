

import React from 'react';
import { Link } from 'react-router-dom'

const NotFound = () => (
    <div className="main-content not-found">
        <h2>Ooops!!! The page you requested cannot be found.</h2>
        <p className="banner">The link may be broken or the page may have been removed</p>
        {/*the below link is for navigating back to /, which will redirect to /cars*/}
        <Link to="/">Back to main page</Link>
    </div>
);

export default NotFound;
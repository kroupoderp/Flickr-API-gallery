

import React from 'react';

const NoMatches = () => (
    <div className="main-content not-found">
        <h2>Oh No!!! No results were returned.</h2>
        <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 64 64">
            <g fill="#1976D2">
                <path
                    d="M32 0C14.355 0 0 14.355 0 32s14.355 32 32 32 32-14.355 32-32S49.645 0 32 0zm0 60C16.561 60 4 47.439 4 32S16.561 4 32 4s28 12.561 28 28-12.561 28-28 28z"
                    data-original="#000000" className="active-path" fill="#1976D2"/>
                <circle cx="20.518" cy="21.361" r="4.338" data-original="#000000" className="active-path" fill="#1976D2"/>
                <circle cx="43.48" cy="21.361" r="4.338" data-original="#000000" className="active-path" fill="#1976D2"/>
                <path
                    d="M32 36.643c-9.732 0-14.355 6.859-15.441 10.484a1.993 1.993 0 0 0 1.334 2.48c.193.061.389.088.582.088.854 0 1.646-.553 1.912-1.41.098-.312 2.488-7.643 11.613-7.643 9.107 0 11.504 7.299 11.611 7.641a2.002 2.002 0 0 0 2.486 1.334 2 2 0 0 0 1.344-2.488C46.357 43.502 41.734 36.643 32 36.643z"
                    data-original="#000000" className="active-path" fill="#1976D2"/>
            </g>
        </svg>
    </div>
);

export default NoMatches;
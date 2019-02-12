

import React from 'react';

const Spinner = (props) => {

    return (
        <div className="ispinner ispinner--animating ispinner--gray">
            <div className="ispinner__blade"></div>
            <div className="ispinner__blade"></div>
            <div className="ispinner__blade"></div>
            <div className="ispinner__blade"></div>
            <div className="ispinner__blade"></div>
            <div className="ispinner__blade"></div>
            <div className="ispinner__blade"></div>
            <div className="ispinner__blade"></div>
            <div className="ispinner__blade"></div>
            <div className="ispinner__blade"></div>
            <div className="ispinner__blade"></div>
            <div className="ispinner__blade"></div>
        </div>
    )
};

export default Spinner;

// Spinner animation component. There are CSS animation styles declared for the
// above markup.
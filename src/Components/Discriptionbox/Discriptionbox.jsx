import React from 'react';
import './Discriptionbox.css';

const Discriptionbox = ({ description }) => {
    return (
        <div className='Discriptionbox'>
            <div className="discriptionbox-navigator">
                <div className="discriptionbox-nav-box">Description</div>
                <div className="discriptionbox-nav-box faade">Reviews (132)</div>
            </div>
            <div className="discriptionbox-discription">
                <p>{description}</p>
            </div>
        </div>
    );
}

export default Discriptionbox;

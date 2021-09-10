import React from 'react';

const LoadingIcon = () => {
    return (
        <div className='loading-div rotating'>
            <img src={window.loadingIcon} alt="Loading..." />
        </div>
    )
}

export default LoadingIcon;
import { Link } from 'react-router-dom';
import React from 'react';


const CreatePinLink = () => {
    
    return (
        <div className="logo-on-logged-in-header-plus-allpage">
            <Link className='link-thing-plus' to='/pin-create'> <img className='the-big-plus-in-corner' src={window.plusSignURL} alt="+" /> </Link>
        </div>
    )
}



export default CreatePinLink;
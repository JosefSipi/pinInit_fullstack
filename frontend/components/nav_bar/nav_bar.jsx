import React from 'react';
import { Link } from 'react-router-dom';





export default ({ currentUser, logout }) => {
    const inUpBtn = currentUser ? (
        <div>
            <div>Account opt. dropdown
                <button onClick={logout}>Log out</button>
            </div>
            <Link>UserShowPage</Link>
            <div>DM dropdown</div>
            <div>Updates dropdown</div>
            <div>search bar</div>
            <Link className="home-btn" to="/">Home</Link>
            <Link className="P-avatar" to="/"> P </Link>

        </div>
    ) : (
        <div>
            <Link className="loginBtn">Log in</Link>
            <p>

            </p>
            <Link className="SignBtn" to="/signup">Sign up</Link>
        </div>
    )
    
    return (
        <header className="nav-bar">
            <Link>github - Joseph S.</Link>
            <Link>Linked In</Link>
            <div>
                {inUpBtn}
            </div>



        </header>
    )
};

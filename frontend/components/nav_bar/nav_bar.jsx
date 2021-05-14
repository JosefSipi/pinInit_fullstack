import React from 'react';
import { Link } from 'react-router-dom';
// import { openModal } from '../../actions/modal';



class NavBar extends React.Component {

    constructor(props) {
        super(props);
}


render(){
        if (this.props.currentUser) {this.bar = (
            <div>
                <img id="logo" src={require('../images/logo.png')} alt="pinterest logo" />
                <div>Account opt. dropdown
                <button onClick={this.props.logout}>Log out</button>
                </div>
                <div>UserShowPage</div>
                <div>DM dropdown</div>
                <div>Updates dropdown</div>
                <div>search bar</div>
                <Link className="home-btn" to="/feed">Home</Link>
                <Link className="P-avatar" to="/feed"> P </Link>
            </div>
        ) } else {this.bar = (
                <div className="header">
                    <div id="logo" >
                    <img id="logo" src={require('../images/logo.png')} alt="pinterest logo" />Pininit

                    </div>
                    <button onClick={() => this.props.openModal('login')}>Log in</button>
                    {/* <Link className="LoginBt" to="/login">Log in</Link> */}
                
                    <button onClick={() => this.props.openModal('signup')}>Sign up</button>
                    {/* <Link className="SignBtn" to="/signup">Sign up</Link> */}
                </div>
            )
        
        }

        return (
            <header className="nav-bar">
                <div>github - Joseph S.</div>
    
                <div>Linked I</div>
                <div>
                    {this.bar}
                </div>
            </header>
        )
    }
           
}


export default NavBar;
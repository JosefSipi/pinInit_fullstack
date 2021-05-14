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
                    <div className="header-left" >
                        <img id="logo" src={require('../images/logo.png')} alt="pinterest logo" />
                        <h4 className="pinlabel" >Pininit</h4>
                    </div>

                    <div className="header-right">
                        <a className="other-url" href="https://www.linkedin.com/in/joseph-sipiorski-590452195/" target="_blank" >linkedIn</a>
                        <a className="other-url" href="https://github.com/JosefSipi" target="_blank" >github</a>
                        <button className="login-btn" onClick={() => this.props.openModal('login')}>Log in</button>
                        <button className="signup-btn" onClick={() => this.props.openModal('signup')}>Sign up</button>
                    </div>

                </div>
            )
        
        }

        return (
            <header className="nav-bar">
                <div>
                    {this.bar}
                </div>
            </header>
        )
    }
           
}


export default NavBar;
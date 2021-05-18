import React from 'react';
import { Link } from 'react-router-dom';
// import { openModal } from '../../actions/modal';



class NavBar extends React.Component {

    constructor(props) {
        super(props);

    

}


render(){

        if (this.props.currentUser) {this.bar = (
            <div className="header" >
                <div className="header-logged-in-1">
                    <div className="logo-on-logged-in-header">
                        <Link id="logo-logged-in" to="/feed" >
                            {/* src={require('../images/logo.png')} */}
                            <img id="logo" src={window.logoURL} alt="logo" />
                        </Link>
                    </div>
                </div>

                <div className="header-left-home-btn-loggedin">
                    <Link className="home-btn-loggedin" to="/feed">Home</Link>
                </div>

                <div className="header-left-home-btn-loggedin">
                    <Link className="home-btn-loggedin" to="/feed">Today</Link>
                </div>

                <input 
                    className="searchBar"
                    type="text">
                        {/* <div className="searchBar">this will be the search bar</div>
                        <div className="dropdown">DD-icon</div> */}
                </input>

                <div className="header-right-logged-in">
                    <div>
                        <img id="logo" src={window.bellURL} alt="bell" />
                    </div>
                    <div>
                        <img id="logo" src={window.messageIconURL} alt="message Icon" />
                    </div>


                    <div className="link-logo-div">
                        {/* src={require('../images/logo.png')} */}
                        <img id="logo-dropdown" src={window.logoURL}  alt="logo" />
                    </div>

                    <div>dropdown
                        <button onClick={this.props.logout}>Log out</button>
                    </div>
                </div>
                    
                    

                    <Link className="P-avatar" to="/feed"> P </Link>
            </div>
        ) } else {this.bar = (
                <div className="header">
                    <div className="header-left" >
                    {/* require('../images/logo.png') */}
                    <img id="logo" src={window.logoURL} alt="logo" />
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
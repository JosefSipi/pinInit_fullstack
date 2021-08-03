import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { debounce } from 'lodash';
// import { openModal } from '../../actions/modal';



class NavBar extends React.Component {

    constructor(props) {
        super(props);

        this.toggleContent = this.toggleContent.bind(this);
        this.state = {
            showDropdown: false,
            searchInput: ''
        };
        this.prepSearch = this.prepSearch.bind(this);
        this.updateState = this.updateState.bind(this);
    }


prepSearch = debounce(() => {
    debugger
    this.props.updateSearch(this.state.searchInput); // this should take a string which will be used to query the users

}, 2000);

updateState(e){
    e.preventDefault();
    // debugger
    console.log('before' + this.state.searchInput)
    this.setState({ searchInput: e.currentTarget.value})
    
    console.log('after' + this.state.searchInput)
    this.prepSearch(this.state.searchInput)
}

componentDidMount(){
    if (!window.currentUser) {
    } else {
        this.props.fetchUser(window.currentUser.id);
    }
}

toggleContent (e){
    e.preventDefault();
    this.setState({showDropdown: !this.state.showDropdown});

}

render(){

        let {showDropdown} = this.state;


        if (this.props.currentUser) {this.bar = (
            <div className="header" >
               {/* <h1 className="very-hidden">
                   {this.grabUser}
                </h1>  */}
                <div className="header-logged-in-1">
                    <div className="logo-on-logged-in-header">
                        <Link id="logo-logged-in" to="/feed" >
                            {/* src={require('../images/logo.png')} */}
                            <img id="logo-header-loggedin" src={window.logoURL} alt="logo" />
                        </Link>
                    </div>
                </div>

                <div className="header-left-home-btn-loggedin">
                    <Link className="home-btn-loggedin" to="/feed">Home</Link>
                </div>

                <div className="header-left-home-btn-loggedin">
                    <Link className="home-btn-loggedin" to="/feed">Today</Link>
                </div>

                <div className="search-bar-section-1">
                    <img className="search-bar-icon" src={window.magnaURL} alt="search icon" />
                    <input className="searchBar" type="text" placeholder="Search" onChange={this.updateState }></input>
                </div>
                
{/* <button onClick={this.props.logout}>Log out</button> */}

                <div className="header-right-logged-in">
                    
                    <div className="logo-on-logged-in-header" >
                        <img id="logo-bell-icon" src={window.bellURL} alt="bell" />
                    </div>
                    <div className="logo-on-logged-in-header" >
                        <img id="logo-message-icon" src={window.messageIconURL} alt="message Icon" />
                    </div>


                    <div className="link-logo-div">
                        {/* src={require('../images/logo.png')} */}
                        <img id="logo-dropdown" src={window.logoURL}  alt="logo" />
                    </div>
                    

                    <Link to={`/profile/${this.props.currentUser.id}`}>
                        <div className="logo-on-logged-in-header">

                            <div className="profile-div-small">

                                <img className="profile-photo-icon" src={this.props.user.photoUrl} alt="profile photo" />
                                {/* <img className="profile-photo-header-bar" src={window.currentUser.profile_pic} alt="profile photo" /> */}
                            </div>

                        </div>

                    </Link>

                       
                    {/* <Link className="P-avatar" to="/feed"> */}




                        <div className="the-outer-dropdown">
                            <div className="logo-on-logged-in-header-dropdown" onClick={this.toggleContent}>
                                    <img id="logo-arrow" src={window.dropdownIcon} alt="dropdown-icon" />
                            </div>

                            <div className={`${showDropdown ? "ul-logged-dropdown-active-background" : "ul-logged-dropdown-background"}`} onClick={this.toggleContent}> 

                                <ul className={`${showDropdown ? "ul-logged-dropdown-active" : "ul-logged-dropdown"}`}>
                                    <Link className="link-settings" to="/edit-profile"><li className="the-li-dropdown"> Settings</li></Link>
                                    <li className="the-li-dropdown" ><div className="logout-dropdown-btn" onClick={this.props.logout}>Log out</div></li>
                                </ul>

                            </div>

                        </div>


                    {/* </Link> */}


                </div>
                    
                    

            </div>
        ) } else {this.bar = (
                <div className="header">
                    <div className="header-left" >
                    {/* require('../images/logo.png') */}
                    <img id="logo-header-loggedout" src={window.logoURL} alt="logo" />
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
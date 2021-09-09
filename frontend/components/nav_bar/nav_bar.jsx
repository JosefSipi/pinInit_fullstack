import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useState } from 'react';
import { debounce } from 'lodash';
// import { openModal } from '../../actions/modal';



class NavBar extends React.Component {

    constructor(props) {
        super(props);
        
        this.toggleContent = this.toggleContent.bind(this);
        this.state = {
            showDropdown: false,
            searchInput: '',
            update: null
        };

        this.state = {
            logedInUser: this.props.currentUser
        }

        this.prepSearch = this.prepSearch.bind(this);
        this.updateState = this.updateState.bind(this);
        this.searchingTime = this.searchingTime.bind(this);
        this.searchOver = this.searchOver.bind(this);
        this.redirectProfile = this.redirectProfile.bind(this);
        this.logoutFunction = this.logoutFunction.bind(this);
        this.reloadIng = this.reloadIng.bind(this);
        // this.directToProfile = this.directToProfile.bind(this);
        // this.redirectProfileCurrentUser = this.redirectProfileCurrentUser.bind(this);
    }

// directToProfile = debounce((e) => {
//     
//     // window.location.reload();
// }, 1)


prepSearch = debounce(() => {
    // 
    this.props.updateSearch(this.state.searchInput); // this should take a string which will be used to query the users

}, 100);

logoutFunction(){
    this.props.logout().then(
        this.props.history.push('/home')
    )

}

reloadIng(){

    window.location.reload();
}

// redirectProfileCurrentUser(){
//     this.props.history.push(`profile/${window.currentUser.id}`);
//     window.location.reload();
// }

redirectProfile(e){
    this.props.history.push(`/profile/${e.currentTarget.getAttribute('data-user_id')}`)
    window.location.reload();
}

searchingTime(e){
    e.preventDefault();
    let ddSearch = document.getElementById('the-dropdown-on-nav-bar-search')
    let backdrop = document.getElementById('backdrop-div-create-search')

    if(ddSearch.style.display === 'none' || ddSearch.style.display === ''){
        ddSearch.style.display = 'flex'
        backdrop.style.display = 'block'
    } else {
        ddSearch.style.display = 'none'
        backdrop.style.display = 'none'
    }

}

searchOver(e){
    e.preventDefault();
    let ddSearch = document.getElementById('the-dropdown-on-nav-bar-search')
    let backdrop = document.getElementById('backdrop-div-create-search')

    ddSearch.style.display = 'none'
    backdrop.style.display = 'none'
}

// backdropClick(e){
//     e.preventDefault();

//     let dropDown = document.getElementById("delete-dropdown-menue-id");
//     let backdrop = document.getElementById('backdrop-div-create-search')
//     if(dropDown.style.display === "none"){
//         // dropDown.style.display = "flex"
//         // backdrop.style.display = "block"

//         backdrop.style.display = "none"
//     } else {
//         dropDown.style.display = "none"
//         backdrop.style.display = "none"
//     }


//     let ul = document.getElementById('board-dropdown-create-search')
//     if (ul.style.display === "block") {
//         ul.style.display = "none"
//     } else {
//         // ul.style.display = "block"
//     }
// }

updateState(e){
    e.preventDefault();
    this.setState({ searchInput: e.currentTarget.value})
    this.prepSearch(this.state.searchInput)

}

componentDidMount(){
    

    this.setState({logedInUser: this.props.currentUser})
    
    if (!!window.currentUser || !!this.props.currentUser) {

        this.props.fetchUser(this.props.currentUser.id || window.currentUser.id);
    }
    // if (!window.currentUser) {
    // } else {
    //     this.props.fetchUser(window.currentUser.id);
    // }
}

// componentDidUpdate(prevProps){
//     
    
//     if(prevProps.currentUser !== this.props.currentUser){
//         this.setState({logedInUser: this.props.currentUser})
//     }
// }

toggleContent (e){
    e.preventDefault();
    this.setState({showDropdown: !this.state.showDropdown});
}

render(){

    



    // if(!this.props.currentUser){
    //     
    //     return null
    // }

        let {showDropdown} = this.state;

        let ready = false

        let theUsers

        if(!!this.props.users){
            // 
            theUsers = Object.values(this.props.users)
            ready = true
        }

        // if (!this.state.logedInUser){
        //     return null
        // }

        
        if (!!this.props.currentUser) {
            
            this.bar = (
            
            <div className="header" >
                <div className="backdrop-div-create-search"  id="backdrop-div-create-search" onClick={this.searchOver}></div>
                {/* <div className="backdrop-div-create-search" onClick={this.searchOver} id="backdrop-div-create-search"></div> */}
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

                {/* <div className="header-left-home-btn-loggedin">
                    <Link className="home-btn-loggedin" to="/feed">Today</Link>
                </div> */}

                <div className="search-bar-section-1">
                    <input className="searchBar" type="text" placeholder="Search" onChange={this.updateState} onFocus={this.searchingTime} onBlur={this.searchingTime}></input>
                    {/* <input className="searchBar" type="text" placeholder="Search" onChange={this.updateState} onFocus={this.searchingTime} onBlur={this.searchOver}></input> */ }
                    <div className="drop-down-holder-nav-bar">
                        <img className="search-bar-icon" src={window.magnaURL} alt="search icon" />
                        <div className="the-dropdown-on-nav-bar-search" id="the-dropdown-on-nav-bar-search">
                            { ready ? 
                                theUsers.map(user => 
                                    // <Link to={`/profile/${user.id}`} >
                                    <div key={user.id} className="list-search-user" onMouseDown={this.redirectProfile} data-user_id={user.id}>
                                        <div className="div-for-search-user-img">
                                            {/* <img className="search-user-img" src={user.photoUrl} alt="user avatar" /> */}
                                            { !!user.photoUrl ? <img className="profile-photo-icon" src={user.photoUrl} alt="profile photo" /> : <img className="search-user-img" src={window.picLogoURL} alt="profile photo" />}
                                        </div>
                                        <div className="last-div-1">{user.username}</div>
                                    </div>
                                    // </Link>

                                ) : <div></div>
                            }
                        </div>
                    </div>
                </div>
                
{/* <button onClick={this.props.logout}>Log out</button> */}

                <div className="header-right-logged-in">
                    
                    {/* <div className="logo-on-logged-in-header" >
                        <img id="logo-bell-icon" src={window.bellURL} alt="bell" />
                    </div>
                    <div className="logo-on-logged-in-header" >
                        <img id="logo-message-icon" src={window.messageIconURL} alt="message Icon" />
                    </div> */}


                    <div className="link-logo-div">
                        {/* src={require('../images/logo.png')} */}
                        <img id="logo-dropdown" src={window.logoURL}  alt="logo" />
                    </div>
                    

                    <Link className='nav-bar-prof-icon' to={`/profile/${window.currentUser.id}`}>
                    {/* <Link className='nav-bar-prof-icon' to={`/profile/${this.props.currentUser.id}`} > */}
                    {/* <Link to={`/profile/${window.currentUser.id}`} > */}
                        <div className="logo-on-logged-in-header">

                            <div className="profile-div-small">
                                
                                {/* { !!window.currentUser.photoUrl ? <img className="profile-photo-icon" src={window.currentUser.photoUrl} alt="profile photo" /> : <p className='profile-letter-default' >{window.currentUser.f_name[0]}</p>} */}
                                {/* { !!this.props.currentUser.photoUrl ? <img className="profile-photo-icon" src={this.props.currentUser.photoUrl} alt="profile photo" /> : <p className='profile-letter-default' >{this.props.currentUser.f_name[0]}</p>} */}
                                { !!this.state.logedInUser.photoUrl ? <img className="profile-photo-icon" src={this.state.logedInUser.photoUrl} alt="profile photo" /> : <p className='profile-letter-default' >{this.state.logedInUser.f_name[0]}</p>}
                            </div>

                        </div>

                    </Link>

                       
                    {/* <Link className="P-avatar" to="/feed"> */}




                        <div className="the-outer-dropdown">
                            <div className="logo-on-logged-in-header-dropdown" onClick={this.toggleContent}>
                                    <img id="logo-arrow" src={window.dropdownIcon} alt="dropdown-icon" />
                            </div>

                            <div className={`${showDropdown ? "ul-logged-dropdown-active-background" : "ul-logged-dropdown-background"}`} onClick={this.toggleContent}> 
                            </div>

                                <ul className={`${showDropdown ? "ul-logged-dropdown-active" : "ul-logged-dropdown"}`}>
                                    <Link className="link-settings" to="/edit-profile"><li className="the-li-dropdown"> Settings</li></Link>
                                    <li className="the-li-dropdown" ><div className="logout-dropdown-btn" onClick={this.logoutFunction}>Log out</div></li>
                                    {/* <li className="the-li-dropdown" ><div className="logout-dropdown-btn" onClick={this.props.logout}>Log out</div></li> */}
                                </ul>


                        </div>


                    {/* </Link> */}


                </div>
                    
                    

            </div>
        ) } else {
            
            this.bar = (
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
                <div className="nav-bar-sub-div-1">
                    {this.bar}
                </div>
            </header>
        )
    }
           
}


export default NavBar;
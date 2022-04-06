import React from 'react';
import { Link } from 'react-router-dom';
import { ProfileAvatar } from '../../utils/util_components/image_components';

// import BoardForShowPage from '../board/show_board_container';
// import { render } from 'react-dom';


class UserShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photoUrl: [],
            isActive: false,
            boards: [],
            userProfile: []
        };

        this.state = {
            following: [],
            followers_count: [],
            following_count: [],
        }

        this.state = {
            showDropdown: false,
            currentUserProfile: false,
        };

        this.state = {
            profileBeingViewed: Number(this.props.match.params.id),
            userProfiles: {}
        }

        this.state.display_name = props.f_name;
        this.toggleClass = this.toggleClass.bind(this);
        this.toggleBox = this.toggleBox.bind(this);
        this.editPen = this.editPen.bind(this);
        this.directToCreatePin = this.directToCreatePin.bind(this);
        this.unfollowUser = this.unfollowUser.bind(this);
        this.followUser = this.followUser.bind(this);
        this.newBoardClick = this.newBoardClick.bind(this);
        // this.callTheFunction = this.callTheFunction.bind(this);
    }

    // callTheFunction(){
    //     
        

    // }

    newBoardClick(){


        this.props.openModal('createBoard')
        
        let dropDiv = document.getElementById('hidden-plus-opt')
        let backgroundDiv = document.getElementById('background-plus-modal')

        if (dropDiv.className === "hidden-plus-opt-h"){
            dropDiv.className = "hidden-plus-opt";
            backgroundDiv.className="ul-logged-dropdown-active-background-plus"
        } else if (backgroundDiv.className === "ul-logged-dropdown-active-background-plus") {
            backgroundDiv.className = "ul-logged-dropdown-background-plus"
            dropDiv.className = "hidden-plus-opt-h"
        }
    }
    
    unfollowUser(e){
        e.preventDefault();

        let delteIds = {
            follower_id: this.props.currentUser.id,
            followed_user_id: Number(this.props.match.params.id),
            id: this.props.currentUser.id
        }

        let followData = {
            id: Number(this.props.match.params.id),
            current_user_id: this.props.currentUser.id,
            profile_users_id: Number(this.props.match.params.id)
        }
        
        this.props.unfollowUser(delteIds).then(
            () => this.props.fetchUserFollowing(followData) // take a look at
        )
    }

    followUser(e){
        e.preventDefault();

        let followForm = {
            follower_id: this.props.currentUser.id,
            followed_user_id: Number(this.props.match.params.id)
        }

        let followData = {
            id: Number(this.props.match.params.id),
            current_user_id: this.props.currentUser.id,
            profile_users_id: Number(this.props.match.params.id)
        }

        this.props.createFollow(followForm).then(
            () => { this.props.fetchUserFollowing(followData)} // take a look at
        )
    }

    directToCreatePin(e){
        e.preventDefault();

        this.props.history.push('/pin-create')
    }

    componentDidMount(){
        

        let followData = {

            id: Number(this.props.match.params.id),
            current_user_id: this.props.currentUser,
            profile_users_id: Number(this.props.match.params.id)
        }
        
        if(this.props.currentUser.id === Number(this.props.match.params.id)){
            this.setState({currentUserProfile: true})
        }
        
        this.props.fetchUserFollowing(followData)
        // .then(
        //     (data) => {
        //         let prevState = this.state.userProfiles
        //         prevState[Number(this.props.match.params.id)][followData] = data
        //         this.setState({userProfile: prevState})
        //     }
        // );

        this.props.fetchUserProfile(this.props.match.params.id).then(
            (data) => {
                debugger
                
                let prevState = this.state.userProfiles
                prevState[data.userProfile.id] = {user: data.userProfile}
                this.setState({userProfile: prevState})
            }
        );

        this.props.fetchBoards(this.props.match.params.id);
        // .then(
        //     (data) => {
        //         let prevState = this.state.userProfiles
        //         prevState[Number(this.props.match.params.id)][boards] = data
        //         this.setState({userProfile: prevState})
        //     }
        // );

    }

    componentDidUpdate(prevProps){

        if(prevProps.boards !== this.props.boards){
            this.setState({boards: Object.values(this.props.boards.boards)});
        } else if (prevProps.follow !== this.props.follow) {
            this.setState(
                {following: this.props.follow.amFollowing, followers_count: this.props.follow.followers.count, following_count: this.props.follow.following.count})
        } else if (prevProps.userProfile !== this.props.userProfile){
            
            let prevState = this.state.userProfiles
            prevState[this.props.userProfile.id] = this.props.userProfile
            this.setState({userProfile: prevState})

            this.props.fetchBoards(this.props.match.params.id);

            let followData = {
                id: Number(this.props.match.params.id),
                current_user_id: this.props.currentUser.id,
                profile_users_id: Number(this.props.match.params.id)
            }
        
            if(Number(this.props.currentUser.id) === Number(this.props.match.params.id)){
                this.setState({currentUserProfile: true})
            }
            this.props.fetchUserFollowing(followData)

            this.setState(
                {userProfile: this.props.userProfile}
            )
        }
        // else if (prevProps.userProfile !== Number(this.props.match.params.id)) {
        //     
        //     let followData = {
        //         id: Number(this.props.match.params.id),
        //         current_user_id: window.currentUser.id,
        //         profile_users_id: Number(this.props.match.params.id)
        //     }

        //     this.props.fetchUserProfile(this.props.match.params.id);

        //     if(Number(window.currentUser.id) === Number(this.props.match.params.id)){
        //     this.setState({currentUserProfile: true})

        //     this.props.fetchBoards(this.props.match.params.id);
        //     this.props.fetchUserFollowing(followData);

        // }
        // }
    }

    componentWillUnmount(){
        debugger
    }

    toggleClass(e) {
        // e.preventDefault();
        this.setState({isActive: !this.state.isActive});
    }

    editPen(e){
        window.editingBoard = e.currentTarget.id;
        // e.stopPropagation();
        e.preventDefault();

        this.props.openModal('editBoard')
            
    }

    toggleBox(e){
            e.preventDefault();

        let dropDiv = document.getElementById('hidden-plus-opt')
        let backgroundDiv = document.getElementById('background-plus-modal')
        // let logoHeader = document.body.getElementsById('logo-on-logged-in-header-plus-id')

        if (dropDiv.className === "hidden-plus-opt-h"){
            dropDiv.className = "hidden-plus-opt";
            backgroundDiv.className="ul-logged-dropdown-active-background-plus"
            // logoHeader.style.backgroundColor = "red";
        } else if (backgroundDiv.className === "ul-logged-dropdown-active-background-plus") {
            backgroundDiv.className = "ul-logged-dropdown-background-plus"
            dropDiv.className = "hidden-plus-opt-h"
        }
    
    }
// ---------- create darkening effect when hovering tile ----------- 
    // hoverEvent(){
    //     // e.preventDefault();
    //   
    //     if(condition){
    //       
    //     } else {
    //       
    //     }
    //   
    //     // let imageSection = document.getElementById('image-section-board');
    //     // imageSection.style.filter = 'brightness(0.9)';

    //     // let editIcon = document.getElementById('');
    //     // editIcon.style.display = "relative"


    // };

    render() {

        if (!this.state.boards || !this.state.userProfile){

            return null
        }

        const handelDate = (updatedTime) => {
            let currentTime = new Date();
            let expireTime = new Date(updatedTime);
    
            let days = (currentTime - expireTime) / (1000 * 3600 * 24);
            return (Math.floor(days));
        };

        let boards = Object.values(this.props.boards.boards)

        let profilePage
        
        if(this.state.userProfile.id !== (Number(this.props.match.params.id))){
            this.props.fetchUserProfile(Number(this.props.match.params.id))
        }

        

        if(this.state.userProfile.id === this.props.currentUser.id){profilePage = (
        // if(this.state.currentUserProfile){profilePage = (
            <div>

                <div className="show-page-box-1">
                    <header className="profile-header">

                        <div className="profile-div">
                            <ProfileAvatar
                                usersName={this.props.userProfile.f_name}
                                photoUrl={this.props.userProfile.photoUrl}
                                // photoUrl={'false'}
                                textId={'text-show-avatar'}
                            />

                            {/* {!(this.props.userProfile.photoUrl === 'false') ? <img className="profile-photo" src={this.props.userProfile.photoUrl} alt="profile photo"/> : <p>{this.props.userProfile.f_name[0]}</p>} */}
                        </div>

                        <h2 className="username-on-profile">{this.props.userProfile.f_name}{(this.props.userProfile.l_name ? this.props.userProfile.l_name : "").charAt(0)}</h2>
                    <div className='bio-on-profile'>
                        <h1 className="email-on-profile">{"@"}{this.props.userProfile.username}{!!this.props.userProfile ? " · " + this.props.userProfile.bio : '' }</h1>
                        
                    </div>

                        <h1 className="email-on-profile follow-following-show"> {this.state.followers_count} followers • {this.state.following_count} following</h1>
    
                    </header>
               </div>
{/* ----------------------- this is the profile page edit bar while loged in as user ------------- */}

               <div className="edit-bar-profile-page">

                    <div className="left-box-edit-bar">

                        <Link to="/edit-profile">
                            <div className="logo-on-logged-in-header">
                                <img id="logo" src={window.penURL} alt="edit-pen-icon" />
                            </div>
                        </Link>

                        
                        {/* <div className="logo-on-logged-in-header">
                            <img id="logo-share-icon" src={window.shareLogoURL} alt="share-icon" />
                        </div> */}


                    </div>

                    <div className="righ-box-edit-bar">

                        {/* <div className="logo-on-logged-in-header">
                            <img id="logo" src={window.settingsIconURL} alt="settings-icon" />
                        </div> */}

                        <div className="show-dropdown">

                            <div className="logo-on-logged-in-header" onClick={this.toggleBox}>
                                <img id="logo-cross" src={window.plusURL} alt="+ icon" />
                            </div>
                            <div className="ul-logged-dropdown-background-plus" id="background-plus-modal" onClick={this.toggleBox}>
                            </div>
                                <div className="hidden-plus-opt-h" id="hidden-plus-opt">
                                    <p className="create-p-tag">Create</p>
                                    <ul className="list-plus-men">
                                        <li className="pin-link-bton-mid-bar" onClick={this.directToCreatePin}>Pin</li>
                                        <li className="pin-link-bton-mid-bar" onClick={this.newBoardClick} >Board</li> 
                                    </ul>

                                </div>

                        </div>

                        <div className="dropdown">
                           
                        </div>


                    </div>
               </div>

{/* --------------- will need to display one or the other depending if profile's user is logged in ---------------------------------- */}

{/* -------------------------- the below boards will render either way ----------------- */}

                <div className="boards-grid-area">
                
                    {boards.map(board => 
                    <div className='dont-show-me' key={board.id} >
                        <div className="logo-on-logged-in-header-board-tile" onClick={this.editPen} id={board.id}>
                                <img id="logo-edit-board" src={window.penURL} alt="edit-pen-icon" />
                        </div>
                            <Link key={board.id} id="board-show-link" to={`/board/${board.id}`}      
                                // onMouseEnter={() => this.hoverEvent(board.id)}
                                // onMouseLeave={() => this.hoverEvent(board.id)}
                            >

                        <div className="board-display-card">
                            {/* Place a lock icon if the board is private */}
                            <div className="outer-div-tile-edit" id="outer-div-tile-edit">
                                <div className="logo-on-logged-in-header-board-lock" style={board.is_private ? {display: "flex" } : { display: "none" }}>
                                    <img id="logo-lock-icon" src={window.lockURL} alt="lock-icon" />
                                </div> 
                            </div>

                            <div className="image-section-board" id="image-section-board">
                                <div className="large-image-onboard">
                                    <div className='inner-large-image1'>
                                        {!!board.pinPhotos.one ? <img className="image-board-1" src={board.pinPhotos.one} alt="" /> : <img src='' alt='' />}
                                    </div>
                                </div>

                                <div className="other-two-images">

                                    <div className="top-box-123">
                                        <div className="smaller-image-show-board-tiles1">
                                            {!!board.pinPhotos.two ? <img className="image-board-1" src={board.pinPhotos.two} alt="" /> : <img src='' alt='' />}
                                        </div>
                                    </div>
                                    
                                    <div className="bottom-box">
                                        <div className="smaller-image-show-board-tiles1">
                                            {!!board.pinPhotos.three ? <img className="image-board-1" src={board.pinPhotos.three} alt="" /> : <img src='' alt='' />}
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        
                        
                        <div className="title-pin-section">

                                <h2 className="board-title">{ board.title.charAt(0).toUpperCase() + board.title.slice(1)}</h2>
                                {/* <h2 className="board-title">{ board.title.charAt(1).toUpperCase() + board.title.slice(2, -1)}</h2> */}
                                <div className="pins-days"> 
                                    <h2 className="pin-num-board">{board.pinsCount === 1 ? '1 Pin' : `${board.pinsCount} Pins`}</h2> 
                                    <h2 className="days-number">{handelDate(board.updated_at)} d</h2> 
                                </div>

                        </div>
                        </div>
                        </Link>
                    </div>
                    )}

                </div>

            </div>
        )

        } else {profilePage = (
            <div>
                <div className="show-page-box-1">
                    <header className="profile-header">

                        <div className="profile-div">
                            <ProfileAvatar
                                usersName={this.props.userProfile.f_name}
                                photoUrl={this.props.userProfile.photoUrl}
                                // photoUrl={'false'}
                                textId={'text-show-avatar'}
                            />
                        </div>

                        <h2 className="username-on-profile">{this.props.userProfile.f_name}{(this.props.userProfile.l_name ? this.props.userProfile.l_name : "").charAt(0)}</h2>
                        
                        <div className='bio-on-profile'>
                            <h1 className="email-on-profile">{"@"}{this.props.userProfile.username}{!!this.props.userProfile ? " · " + this.props.userProfile.bio : '' }</h1>
                        </div>

                        <h1 className="email-on-profile follow-following-show"> {this.state.followers_count} followers • {this.state.following_count} following</h1>

                        <div className="following-btn-22-1" id="following-btn-22-1" onClick={this.followUser} style={this.state.following ? {display: 'none'} : {display: 'flex'}} >Follow</div>

                        <div className="following-btn-22-2" id="following-btn-22-2" onClick={this.unfollowUser} style={this.state.following ? {display: 'flex'} : {display: 'none'}}>Following</div>
    
                    </header>
               </div>
{/* ----------------------- this is the profile page edit bar while loged in as user ------------- */}

               <div className="edit-bar-profile-page">
                    <div className="left-box-edit-bar">

                        
                        {/* <div className="logo-on-logged-in-header">
                            <img id="logo-share-icon" src={window.shareLogoURL} alt="share-icon" />
                        </div> */}


                    </div>
               </div>

{/* --------------- will need to display one or the other depending if profile's user is logged in ---------------------------------- */}

{/* -------------------------- the below boards will render either way ----------------- */}

                <div className="boards-grid-area">
                
                    {boards.map(board => 
                    
                    {if(!board.is_private){
                    
                    return (
                    
                    <div className='dont-show-me' key={board.id} >

                        {/* <div className="logo-on-logged-in-header-board-tile" onClick={this.editPen} id={board.id}>
                                <img id="logo-edit-board" src={window.penURL} alt="edit-pen-icon" />
                        </div> */}
                            <Link key={board.id} id="board-show-link" to={`/board/${board.id}`}      
                                // onMouseEnter={() => this.hoverEvent(board.id)}
                                // onMouseLeave={() => this.hoverEvent(board.id)}
                            >

                        <div className="board-display-card">
                        <div className="outer-div-tile-edit" id="outer-div-tile-edit">
                            {/* <div className="logo-on-logged-in-header-board-lock" style={board.is_private ? {display: "flex" } : { display: "none" }}>
                                    <img id="logo-lock-icon" src={window.lockURL} alt="lock-icon" />
                            </div>  */}
                        </div>
                            <div className="image-section-board" id="image-section-board">
                                <div className="large-image-onboard">
                                    <div className='inner-large-image1'>
                                        {!!board.pinPhotos.one ? <img className="image-board-1" src={board.pinPhotos.one} alt="" /> : <img src='' alt='' />}
                                    </div>
                                </div>

                                <div className="other-two-images">

                                    <div className="top-box-123">
                                        <div className="smaller-image-show-board-tiles1">
                                            {!!board.pinPhotos.two ? <img className="image-board-1" src={board.pinPhotos.two} alt="" /> : <img src='' alt='' />}
                                        </div>
                                    </div>
                                    
                                    <div className="bottom-box">
                                        <div className="smaller-image-show-board-tiles1">
                                            {!!board.pinPhotos.three ? <img className="image-board-1" src={board.pinPhotos.three} alt="" /> : <img src='' alt='' />}
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        
                        
                        <div className="title-pin-section">

                                <h2 className="board-title">{ board.title.charAt(0).toUpperCase() + board.title.slice(1)}</h2>
                                {/* <h2 className="board-title">{ board.title.charAt(1).toUpperCase() + board.title.slice(2, -1)}</h2> */}
                                <div className="pins-days"> 
                                    <h2 className="pin-num-board">{board.pinsCount === 1 ? '1 Pin' : `${board.pinsCount} Pins`}</h2>  
                                    <h2 className="days-number">{handelDate(board.updated_at)} d</h2> 
                                </div>

                        </div>
                        </div>
                        </Link>
                    </div> )}
                    
                
                }
                    )}

                </div>

            </div>
        )}




        return (
            <div>
                {profilePage}
            </div>
        )
    }
}

export default UserShow;
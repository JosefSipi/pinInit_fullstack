import React from 'react';
import { Link } from 'react-router-dom';


class Feed extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            feed: null,
            currentUser: null,
            usersFollowed: null,
            numFollowers: null,
            showFollowOpt: null
        }
        
        this.photoLoaded = this.photoLoaded.bind(this);
        this.onMouseLeaveCall = this.onMouseLeaveCall.bind(this);
        this.onMouseEnterCall = this.onMouseEnterCall.bind(this);
        this.openTheLink = this.openTheLink.bind(this);
        this.selectFollow = this.selectFollow.bind(this);
        this.updateNumFollowers = this.updateNumFollowers.bind(this);
        this.displayTheseBoards = this.displayTheseBoards.bind(this);
        this.reloadFunc = this.reloadFunc.bind(this);

        
    }

    reloadFunc(e){
        e.preventDefault();
        window.location.reload();
    }
    displayTheseBoards(boards){
    return(
        boards.map(board => 
            {if(!board.is_private){
                return (
                    <div className='dont-show-me' key={board.id} >
                        <div key={board.id} id="board-show-link">
                            <div className="board-display-card mod-feed-card">

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
                            
                            
                                <div className="title-pin-section mod-feed-title-section">
                                    <h2 className="board-title mod-feed-board-title">{ board.title.charAt(0).toUpperCase() + board.title.slice(1)}</h2>
                                </div>

                            </div>
                        </div>
                    </div> 
                )
            }}
        )
    )}

    openTheLink(e){
        e.preventDefault();
        window.open(e.currentTarget.id)
    }

    onMouseLeaveCall(e){
        e.preventDefault();

        let theId = Number(e.currentTarget.children[1].children[1].getAttribute('data-div_id'))
        let shadowCover = document.getElementById(`the-shade-over-pin${theId}`)
        shadowCover.style.display = 'none'
    }

    onMouseEnterCall(e){
        e.preventDefault();

        let theId = Number(e.currentTarget.children[1].children[1].getAttribute('data-div_id'))
        let shadowCover = document.getElementById(`the-shade-over-pin${theId}`)
        shadowCover.style.display = 'block'
    }

    photoLoaded(e){
        e.preventDefault();

        let titleCondition = !!e.currentTarget.getAttribute('data-link_title')

        let imageHeight = e.currentTarget.children[1].clientHeight;
        let spanVal
        {titleCondition ? spanVal = Math.trunc((imageHeight/10) + 5) : spanVal = Math.trunc((imageHeight/10) + 2)  }

        let card = document.getElementById(`${e.currentTarget.id}`)

        card.style.gridRowEnd = `span ${spanVal}`
        e.currentTarget.style.visibility = "";
    }

    componentDidMount(){

        window.currentUser = this.props.currentUser

        this.setState({currentUser: this.props.currentUser})

        this.props.fetchUsers('fetch for index').then(
            data => {
                this.setState({usersFollowed: Object.values(this.props.usersFollowed.usersList)})
            }
        )

        this.props.numFollowing(this.props.currentUser.id).then(
            (data) => {
                this.setState({showFollowOpt: this.props.numFollowers})
            }
        )
        
        this.props.fetchFeedPins(this.props.currentUser.id).then(
            (data) => {
                data
                this.setState({feed: this.props.feed})
            }
        )
    }

    updateNumFollowers(){
        
        this.props.numFollowing(this.props.currentUser.id)
    }

    componentDidUpdate(prevProps){
        
        if(this.props.feed !== prevProps.feed){
            this.setState({feed: this.props.feed})
        } else if(this.props.usersFollowed !== prevProps.usersFollowed){
            this.setState({usersFollowed: Object.values(this.props.usersFollowed.usersList)})
        } else if (this.props.numFollowers !== prevProps.numFollowers){
            this.setState({numFollowers: this.props.numFollowers})
        }
    }

    selectFollow(e){
        e.preventDefault();

        

        let userBox = e.currentTarget

        // -------  toggle the class -----
            if(userBox.classList.length >= 2){
                let delteIds = {
                    follower_id: this.props.currentUser.id,
                    followed_user_id: Number(userBox.id),
                    id: this.props.currentUser.id
                }
                this.props.unfollowUser(delteIds).then(
                    data => {
                        userBox.classList.remove('selected-follow-feed')
                        userBox.parentElement.classList.remove('toggle-border')
                        this.updateNumFollowers()
                    }
                )
            } else {
                let followForm = {
                    follower_id: this.props.currentUser.id,
                    followed_user_id: Number(userBox.id)
                }
                this.props.createFollow(followForm).then(
                    (data) => {
                        userBox.classList.add('selected-follow-feed')
                        userBox.parentElement.classList.add('toggle-border')
                        this.updateNumFollowers()
                        }
                    )
            }
        // -------  toggle the class -----
    }

    render(){
        
        if(!this.state.feed){
            return null
        }  else if (!this.state.usersFollowed){
            return null
        }
       
        let users = this.state.usersFollowed
        let pins = Object.values(this.state.feed)
        
        
        return (
            <div>
                <div className="pin-area-on-board-show" >
                    {this.state.showFollowOpt >= 5 ? <div className="pin_container" id="pin_container">
                        {pins.map(pin => 
                                <Link data-link_title={pin.title} to={`/pin/${pin.id}`} onLoad={this.photoLoaded} id={`card-card-card${pin.id}`} className="card-update" style={{gridRowEnd: `span 45` }, {visibility: 'hidden'}} key={pin.id} onMouseEnter={this.onMouseEnterCall} onMouseLeave={this.onMouseLeaveCall}>

                                    <div className="outside-edit-pin-board-show">

                                    </div>

                                    <div className="outside-surrounding-pin-image-div">
                                        <img loading='lazy' className="pin-photo" src={pin.photoUrl} alt="pin photo" />

                                        <div data-div_id={pin.id} className="the-shade-over-pin" id={`the-shade-over-pin${pin.id}`}>
                                            <div style={ pin.websiteURL.length < 3 ? {display: 'none'} : {display: 'flex'}} className="website-url-div-hoverthing" id={pin.websiteURL} onClick={this.openTheLink}> <img className="arr-in-website" src={window.upRightArrowURL} alt="up arrow" /> {`${pin.websiteURL}`.slice(8, 16)+ "...."}</div>
                                            
                                            {/* <div id={pin.id} className="edit-pen-div-show-board" onClick={this.modalFunction}>
                                                <img src={window.editPenURL} alt="edit pen" />
                                            </div> */}
                                        </div>

                                    </div>

                                    <div className="card-title-pin">{pin.title}</div>

                                </Link>
                        )}
                    </div> : 
                    
                    <div className='it-looks-like'>
                        <div className='it_looks_main_div'>
                            <div className='feed-div-top'>
                                Follow some users you're interested in
                            </div>
                            <ul className='ul-feed-for-follow'>
                                {users.map(user => 
                                <li key={user.id}>
                                    <div className={user.followThisUser ? 'outside-border-layer toggle-border' : 'outside-border-layer'}>
                                        <div className={user.followThisUser ? 'list-div-feed selected-follow-feed' : 'list-div-feed'} id={user.id} onClick={this.selectFollow}> 
                                            <div className='profile-icon-feed'>
                                                <div id='123 E' className="div-for-search-user-img mod-feed-img" >
                                                    { !(user.photoUrl === 'false') ? <img className="profile-photo-icon" src={user.photoUrl} alt="profile photo" /> : <p className='profile-letter-default-search' >{user.username[0].toUpperCase()}</p>}
                                                </div>
                                                <div className='user-feed' >{(user.username).trim()}</div>
                                            </div>

                                            <div className='div-pin-boards'>
                                                {!!user.boards ? this.displayTheseBoards(Object.values(user.boards)) : <div className='no-board-yet-feed'>This user hasn't created a board yet :/</div>  }
                                            </div>
                                        </div>
                                    </div>    
                                </li> 
                            )
                                }
                            </ul>
                            
                            <div className='feed-div-btm'>
                                {this.state.numFollowers < 5 ? <div className='btn-feed'>Pick {5 - this.state.numFollowers} more</div>  :
                                <div className='btn-feed done-btn' onClick={this.reloadFunc}>Done</div>}  
                            </div>
                        </div>
                    </div> }
                    
                </div>
            </div>
            )
    }
}

export default Feed;
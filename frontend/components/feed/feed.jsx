import React from 'react';
import { Link } from 'react-router-dom';


class Feed extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            feed: null,
            currentUser: null,
            usersFollowed: [],
            numFollowers: null
        }
        
        this.photoLoaded = this.photoLoaded.bind(this);
        this.onMouseLeaveCall = this.onMouseLeaveCall.bind(this);
        this.onMouseEnterCall = this.onMouseEnterCall.bind(this);
        this.openTheLink = this.openTheLink.bind(this);
        this.assembleFollowSugestion = this.assembleFollowSugestion.bind(this);

        
    }

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
        this.setState({numFollowers: this.props.numFollowers})

        this.assembleFollowSugestion()
        
        this.props.fetchFeedPins(this.props.currentUser.id).then(
            (data) => {
                data
                this.setState({feed: this.props.feed})
            }
        )
    }

    componentDidUpdate(prevProps){
        
        if(this.props.feed !== prevProps.feed){
            this.setState({feed: this.props.feed})
        } 
    }

    assembleFollowSugestion(){
        this.props.fetchUsers().then(
            data => {
                this.setState({usersFollowed: Object.values(data.users.usersList)})
                this.setState({ numFollowers: data.users.curUserFollCount})
            }
        )
    }

    render(){
        
        if(!this.state.feed){
            return null
        }

        let users = this.state.usersFollowed

        let pins = Object.values(this.state.feed)
        debugger

        return (
            <div>
                <div className="pin-area-on-board-show" >
                    {this.state.numFollowers >= 3 ? <div className="pin_container" id="pin_container">
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
                                {users.map(user => Object.values(users[0].boards).length >= 1 ?
                                <li key={user.id}>
                                    <div>
                                        <div id='123 E' className="div-for-search-user-img" >
                                            { !(user.photoUrl === 'false') ? <img className="profile-photo-icon" src={user.photoUrl} alt="profile photo" /> : <p className='profile-letter-default-search' >{user.username[0].toUpperCase()}</p>}
                                        </div>
                                        <div >{user.username}</div>
                                        <div>
                                            
                                        </div>
                                    </div>
                                </li> : null
                            )
                                }
                            </ul>
                            <div className={this.state.numFollowers < 3 ? `feed-div-btm` : `make-it-red`}>
                                {this.state.numFollowers < 3 ? <div className='btn-feed'>Pick {3 - this.state.numFollowers} more</div>  :
                                <div className='btn-feed'>Done</div>}  
                            </div>
                        </div>
                    </div> }
                    
                </div>
            </div>
            )
    }
}

export default Feed;
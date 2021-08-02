import React from 'react';
import { Link } from 'react-router-dom';

class BoardShow extends React.Component {
    constructor(props){
        super(props);

        this.modalFunction = this.modalFunction.bind(this);
        this.photoLoaded = this.photoLoaded.bind(this);
        this.isProfileUser = this.isProfileUser.bind(this);
        this.moreClickedDD = this.moreClickedDD.bind(this);
        this.backdropClick = this.backdropClick.bind(this);
        this.editPen = this.editPen.bind(this);
    }

    editPen(e){
        e.preventDefault();
        window.editingBoard = e.currentTarget.id
        this.props.openModal('editBoard');

        
        let dropDown = document.getElementById("edit-dropdown-menue-123-id");
        let backdrop = document.getElementById('backdrop-div-create-pin')
        if(dropDown.style.display === "none"){
            dropDown.style.display = "none"
            // backdrop.style.display = "block"

            backdrop.style.display = "none"
        } else {
            dropDown.style.display = "none"
            backdrop.style.display = "none"
        }
    }

    moreClickedDD(e){
        e.preventDefault();
        let dropDown = document.getElementById("edit-dropdown-menue-123-id");
        let backdrop = document.getElementById('backdrop-div-create-pin')
        if(dropDown.style.display === "none" || dropDown.style.display === "" ){
            dropDown.style.display = "flex"
            backdrop.style.display = "block"
        } else {
            dropDown.style.display = "none"
            backdrop.style.display = "none"
        }
    }
    backdropClick(e){
        e.preventDefault();

       let dropDown = document.getElementById("edit-dropdown-menue-123-id");
        let backdrop = document.getElementById('backdrop-div-create-pin')
        if(dropDown.style.display === "none"){
            dropDown.style.display = "none"
            // backdrop.style.display = "block"

            backdrop.style.display = "none"
        } else {
            dropDown.style.display = "none"
            backdrop.style.display = "none"
        }


        // let ul = document.getElementById('board-dropdown-create-pin')
        // if (ul.style.display === "block") {
        //     ul.style.display = "none"
        // } else {
        //     // ul.style.display = "block"
        // }
    }

    photoLoaded(e){
        e.preventDefault();
        debugger
        let imageHeight = e.currentTarget.children[1].clientHeight;
        let spanVal = Math.trunc((imageHeight/10) + 7)
        debugger

        let card = document.getElementById(`${e.currentTarget.id}`)

        card.style.gridRowEnd = `span ${spanVal}`
        
        debugger
        e.currentTarget.style.visibility = "";

    }

    modalFunction(e){
        e.preventDefault();
        window.editPin = e.currentTarget.id
        this.props.openModal('editPin')
    }

    componentDidMount(){
        this.props.fetchBoard(Number(this.props.match.params.id))
        this.props.fetchPins(Number(this.props.match.params.id))

    }


    componentDidUpdate(prevProps){
        if(prevProps.boardProfile !== this.props.boardProfile){
            this.props.fetchUser(this.props.boardProfile.owner_id)
        } 
    }

    isProfileUser(){
            debugger
        if(window.currentUser.id === this.props.boardProfile.owner_id){
                return (
            <div className="top-section">
                <div className="backdrop-div-create-pin" onClick={this.backdropClick} id="backdrop-div-create-pin"></div>

                <div>

                    <h1 className="header-title-boards-show-123">{this.props.boardProfile.title}<div className="board-duplicate-button-dd" onClick={this.moreClickedDD}>
                        <img className="boards-123-1" src={window.dotsBlackURL} alt="more icon"/>
                    </div>
                        <div className="div-holder-helper-123">
                            <div className="edit-dropdown-menue-123" id="edit-dropdown-menue-123-id">
                                <h1 className="title-dd">Board options</h1>
                                <div onClick={this.editPen} id={this.props.boardProfile.id}>Edit</div>
                            </div>
                        </div>
                    </h1>

                    
                </div>

                <Link to={`/profile/${this.props.userProfile.id}`}>
                    <div className="profile-div-small-photo-div-123">
                        <img src={this.props.userProfile.photoUrl} alt="profile photo" />
                        {/* <img className="profile-photo-header-bar" src={window.currentUser.profile_pic} alt="profile photo" /> */}
                    </div>
                </Link>

            <div>
                <h2>{this.props.boardProfile.description} </h2>
                <div className="is-private-board-show" style={this.props.boardProfile.is_private ? {display: "block"} : {display: "none"}} ><img src={window.smallLockURL} alt="lock" />secret board</div>
            </div>

            {/* <p>45 followers</p> */}

            {/* <button>Share</button> */}

            </div>

        )


        } else {

            return (
                <div className="top-section">
                        <h1>{this.props.boardProfile.title}</h1>

                        <Link to={`/profile/${this.props.userProfile.id}`}>
                            <div className="logo-on-logged-in-header">

                                <div className="profile-div-small">

                                    <img className="profile-photo-icon" src={this.props.userProfile.photoUrl} alt="profile photo" />
                                    {/* <img className="profile-photo-header-bar" src={window.currentUser.profile_pic} alt="profile photo" /> */}
                                </div>

                            </div>
                        </Link>

                    <div>
                        <Link to={`/profile/${this.props.userProfile.id}`}> 
                            <p>{this.props.userProfile.f_name} {this.props.userProfile.l_name}</p>
                        </Link> 

                        <h2>· {this.props.boardProfile.description} </h2>
                    </div>

                    {/* <p>45 followers</p> */}

                    {/* <button>Share</button> */}

                </div>

            )
        }
    }


    render(){
        
        if (!this.props.boardProfile || !this.props.pins.pins){
            return null
        }
        

        
        const pins = Object.values(this.props.pins.pins)
        
        // const photoUrl = this.props.pins.pin.pins.photoUrl
        const theHeight = 45;




        return (

        <div>

            <div className="boards-grid-area-for-pins">

                { this.isProfileUser()}

            </div>

                <div className="pin-area-on-board-show" >
                    <div className="pin_container" id="pin_container">
                        {pins.map(pin => 

                            <div onLoad={this.photoLoaded} id={`card-card-card${pin.id}`} className="card-update" style={{gridRowEnd: `span 45` }, {visibility: 'hidden'}} key={pin.id}>

                                
                                <div className="outside-edit-pin-board-show">
                                    <div id={pin.id} className="edit-pen-div-show-board" onClick={this.modalFunction}>
                                    <img src={window.editPenURL} alt="edit pen" />
                                    </div>

                                </div>
                                
                                <img className="pin-photo" src={pin.photoUrl} alt="pin photo" />
                                <div className="card-title-pin">{pin.title}</div>
                            </div>


                        )}
                    </div>
                </div>
        </div>
        )
    }
}

export default BoardShow;
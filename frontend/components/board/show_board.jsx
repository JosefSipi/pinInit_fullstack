import React from 'react';
import { Link } from 'react-router-dom';

class BoardShow extends React.Component {
    constructor(props){
        super(props);
        this.modalFunction = this.modalFunction.bind(this);
    }

    modalFunction(e){
        e.preventDefault();
        debugger
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


    render(){
        
        if (!this.props.boardProfile || !this.props.pins.pins){
            return null
        }
        

        
        const pins = Object.values(this.props.pins.pins)
        
        // const photoUrl = this.props.pins.pin.pins.photoUrl
        // debugger
        const theHeight = 45;
debugger
        return (

        <div>

            <div className="boards-grid-area-for-pins">
                
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

            </div>

                <div className="pin-area-on-board-show" >
                    <div className="pin_container" id="pin_container">
                        {pins.map(pin => 

                            <div className="card" style={{gridRowEnd: `span ${((Math.trunc((pin.heightof / 100) * 45)) )}` }} key={pin.id}>

                                {/* <div className="over-lay">
                                </div> */}

                                <div id={pin.id} className="edit-pen-div-show-board" onClick={this.modalFunction}>
                                   <img src={window.editPenURL} alt="edit pen" />
                                </div>
                                
                                <img className="pin-photo" src={pin.photoUrl} alt="pin photo"/>
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
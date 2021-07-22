import React from 'react';
import { Link } from 'react-router-dom';

class BoardShow extends React.Component {
    constructor(props){
        super(props);
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
        const theHeight = 26;

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

                            <div className="card" key={pin.id} >
                            {/* <div className="card" style={{gridRowEnd: `span ${theHeight}` }} key={pin.id}> */}
                                
                                <div className="over-lay">
                                   <img className="pin-photo" src={pin.photoUrl} alt="pin photo"/>
                                   
                                </div>

                                <div className="card-title-pin">{pin.title}</div>
                                <div>
                                    {/* image of user who originally pined this pin */}
                                    {/* name of user who originaly pined this pin */}

                                </div>
                            </div>

                        )}
                        
                    </div>
                </div>
        </div>
        )
    }
}

export default BoardShow;
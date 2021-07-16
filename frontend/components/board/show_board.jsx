import React from 'react';
import { Link } from 'react-router-dom';

class BoardShow extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchBoard(Number(this.props.match.params.id))
    }

    componentDidUpdate(prevProps){
        if(prevProps.boardProfile !== this.props.boardProfile){
            this.props.fetchUser(this.props.boardProfile.owner_id)
        }
    }

    render(){
        if (!this.props.boardProfile){
            return null
        }
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

                <div>

                    this will display all pins in this board

                    
                </div>
                </div>

            </div>

        </div>
        )
    }
}

export default BoardShow;
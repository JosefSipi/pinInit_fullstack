import React from 'react';
// import { render } from 'react-dom';


class UserShow extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {photoUrl: []};
        this.state.display_name = props.f_name;

        // this.fetchUser = this.fetchUser.bind(this);
    }

    componentDidMount(){

        this.props.fetchUser(window.currentUser.id);
    }



    render() {

        return(
            <div>
                
                <div className="show-page-box-1">
                    <header className="profile-header">

                        <div className="profile-div">
                            <img className="profile-photo" src={this.props.user.photoUrl} alt="profile photo" />
                        </div>

                        <h2 className="username-on-profile">{this.props.user.f_name}{(window.currentUser.l_name).charAt(0)}</h2>
                        
                        <h1 className="email-on-profile">{[this.props.user.email].slice("@")}</h1>

                        <h1 className="email-on-profile"> 0 followers  • 0 following </h1>
    
                    </header>
               </div>




            </div>
        )
    }
}

export default UserShow;
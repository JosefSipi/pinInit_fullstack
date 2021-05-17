import React from 'react';
// import { render } from 'react-dom';


class UserShow extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {photoUrl: []};
        // this.state = { isBoxVisible: false};

        this.state.display_name = props.f_name;
        // this.toggleBox = this.toggleBox.bind(this);
        // this.fetchUser = this.fetchUser.bind(this);
    }

    componentDidMount(){

        this.props.fetchUser(window.currentUser.id);
    }

    // toggleBox() {
    //     this.setState(prevState => ({ isBoxVisible:
    //          !prevState.isBoxVisible}));
    // }


    render() {
        // let toggleBox = function() {
        //     prevState =>({
        //         isBoxVisible: !prevState
        //     })
        // };

        // let isBoxVisible = false;
        //     debugger
        return(
            <div>
                
                <div className="show-page-box-1">
                    <header className="profile-header">

                        <div className="profile-div">
                            <img className="profile-photo" src={this.props.user.photoUrl} alt="profile photo" />
                        </div>

                        <h2 className="username-on-profile">{this.props.user.f_name}{(window.currentUser.l_name).charAt(0)}</h2>
                        
                        <h1 className="email-on-profile">{"@"}{this.props.user.username}</h1>

                        <h1 className="email-on-profile"> 0 followers  • 0 following </h1>
    
                    </header>
               </div>

               <div className="edit-bar-profile-page">

                    <div className="left-box-edit-bar">

                        <div className="logo-on-logged-in-header">
                            <img id="logo" src={require('../images/pen-solid.png')} alt="edit-pen-icon" />
                        </div>

                        <div className="logo-on-logged-in-header">
                            <img id="logo" src={require('../images/share-logo.png')} alt="share-icon" />
                        </div>

                    </div>

                    <div className="righ-box-edit-bar">

                        <div className="logo-on-logged-in-header" onClick={this.toggleBox}>
                            <img id="logo" src={require('../images/settings-icon.png')} alt="share-icon" />
                        </div>

                        <div className="show-dropdown">

                            <div className="logo-on-logged-in-header" onClick={this.toggleBox}>
                                <img id="logo" src={require('../images/plus-solid.png')} alt="share-icon" />
                            </div>

                            <div className="hidden">

                                <ul >
                                    <li>Pin</li>
                                    <li>Board</li>
                                </ul>

                            </div>
                        </div>


                    </div>


               </div>




            </div>
        )
    }
}

export default UserShow;
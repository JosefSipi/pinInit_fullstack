import React from 'react';
import { Link } from 'react-router-dom';
import BoardForShowPage from '../board/show_board_container';
// import { render } from 'react-dom';


class UserShow extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            photoUrl: [],
            isActive: false,
            boards: []
        };
        // this.state = { isBoxVisible: false};

        this.state.display_name = props.f_name;
        this.toggleClass = this.toggleClass.bind(this);
        // this.numDays = this.numDays.bind(this);
        // this.fetchUser = this.fetchUser.bind(this);
    }

    componentDidMount(){
        // this.props.fetchUser(window.currentUser.id);
        this.props.fetchUser(this.props.match.params.id);
        this.props.fetchBoards(this.props.match.params.id);
    }

    toggleClass() {

        this.setState({isActive: !this.state.isActive});
    }

    // numDays(updatedTime) {
    //     let currentTime = new Date();
    //     let expireTime = new Date(updatedTime);

    //     let days = (currentTime - expireTime) / (1000 * 3600 * 24);
    //     return (Math.floor(days));
    // }


    render() {
        // let toggleBox = function() {
        //     prevState =>({
        //         isBoxVisible: !prevState
        //     })
        // };

        // let isBoxVisible = false;

        const handelDate = (updatedTime) => {
            let currentTime = new Date();
            let expireTime = new Date(updatedTime);
    
            let days = (currentTime - expireTime) / (1000 * 3600 * 24);
            return (Math.floor(days));
        };

        return(
            
            <div>

                <div className="show-page-box-1">
                    <header className="profile-header">

                        <div className="profile-div">
                            <img className="profile-photo" src={this.props.user.photoUrl} alt="profile photo" />
                        </div>

                        <h2 className="username-on-profile">{this.props.user.f_name}{(this.props.user.l_name ? this.props.user.l_name : "").charAt(0)}</h2>
                        
                        <h1 className="email-on-profile">{"@"}{this.props.user.username}</h1>

                        <h1 className="email-on-profile"> 0 followers  • 0 following </h1>
    
                    </header>
               </div>





{/* ----------------------- this is the profile page edit bar while loged it as user ------------- */}

               <div className="edit-bar-profile-page">

                    <div className="left-box-edit-bar">

                        <Link to="/edit-profile">
                            <div className="logo-on-logged-in-header">
                                <img id="logo" src={window.penURL} alt="edit-pen-icon" />
                            </div>
                        </Link>

                        
                            <div className="logo-on-logged-in-header">
                                <img id="logo-share-icon" src={window.shareLogoURL} alt="share-icon" />
                            </div>


                    </div>

                    <div className="righ-box-edit-bar">

                        <div className="logo-on-logged-in-header" onClick={this.toggleBox}>
                            <img id="logo" src={window.settingsIconURL} alt="settings-icon" />
                        </div>

                        <div className="show-dropdown">

                            <div className="logo-on-logged-in-header" onClick={this.toggleBox}>
                                <img id="logo" src={window.plusURL} alt="+ icon" />
                            </div>

                            <div className="hidden">

                                <ul >
                                    <li>Pin</li>
                                    <li>Board</li>
                                </ul>

                            </div>
                        </div>

                        <div className="dropdown">
                            {/* <button onClick={toggleClass()} className="dropbtn">Dropdown</button>
                            <div id="myDropdown" className={this.state.isActive ? "displayed-dropdown" : "hidden"}>
                                <a href="#">Link</a>
                                
                            </div>
                            {"testing out git branches"} */}
                        </div>


                    </div>
               </div>

{/* --------------- will need to display one or the other depending if profile's user is logged in ---------------------------------- */}

{/* -------------------------- the below boards will render either way ----------------- */}

                <div className="boards-grid-area">
                    {/* I will need to pass in profile user :id not current user :id */}

                    {/* <BoardForShowPage profileId={this.props.match.params.id} /> */}

                {/* {this.props.boards.map((board) =>
                    <div>   
                        <div className="photosection">

                        </div>

                        <div className="title-pins">
                            this.
                        </div>


                    </div>
                )} */}
                    {this.props.boards.map(board => 

                    <div className="board-display-card">

                        <div className="image-section-board">
                            <div className="large-image-onboard">
                               <img className="image-board-1" src={window.photo1} alt="logo" />
                            </div>




                            <div className="other-two-images">

                                <div className="top-box-123">
                                    <img className="image-board-2" src={window.photo2} alt="logo" />
                                </div>
                                
                                <div className="bottom-box">
                                    <img className="image-board-3" src={window.photo3} alt="logo" />
                                </div>
                            </div>
                            
                        </div>
                       
                       
                       <div className="title-pin-section">

                            <h2 className="board-title">{board.title.charAt(1).toUpperCase() + board.title.slice(2, -1)}</h2>
                            
                            <div className="pins-days"> 
                                <h2 className="pin-num-board"> 3 Pins </h2>   
                                <h2 className="days-number">{handelDate(board.updated_at)} d</h2> 
                            </div>

                       </div>
                    </div>
                    
                    )}

                </div>

            </div>
        )
    }
}

export default UserShow;
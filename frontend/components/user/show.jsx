import React from 'react';
import { Link } from 'react-router-dom';
// import BoardForShowPage from '../board/show_board_container';
// import { render } from 'react-dom';


class UserShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photoUrl: [],
            isActive: false,
            boards: []
        };

        this.state = {
            showDropdown: false
        };

        this.state.display_name = props.f_name;
        this.toggleClass = this.toggleClass.bind(this);
        this.toggleBox = this.toggleBox.bind(this);
    }

    // clickBoardDD(e){
    //     e.preventDefault();
    //     (e) => this.props.openModal('createBoard')

        // let dropDiv = document.getElementById('hidden-plus-opt')
        // let backgroundDiv = document.getElementById('background-plus-modal')
        // // let logoHeader = document.body.getElementsById('logo-on-logged-in-header-plus-id')

        // if (dropDiv.className === "hidden-plus-opt-h"){
        //     dropDiv.className = "hidden-plus-opt";
        //     backgroundDiv.className="ul-logged-dropdown-active-background-plus"
        //     // logoHeader.style.backgroundColor = "red";
        // } else if (backgroundDiv.className === "ul-logged-dropdown-active-background-plus") {
        //     backgroundDiv.className = "ul-logged-dropdown-background-plus"
        //     dropDiv.className = "hidden-plus-opt-h"
        // }


    // }

    componentDidMount(){
        this.props.fetchUser(this.props.match.params.id);
        debugger
        this.props.fetchBoards(this.props.match.params.id);
        debugger
    }

    toggleClass(e) {
        this.setState({isActive: !this.state.isActive});
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


    render() {

        const handelDate = (updatedTime) => {
            let currentTime = new Date();
            let expireTime = new Date(updatedTime);
    
            let days = (currentTime - expireTime) / (1000 * 3600 * 24);
            return (Math.floor(days));
        };

        debugger
        let {boards} = this.props
        debugger
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
{/* ----------------------- this is the profile page edit bar while loged in as user ------------- */}

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

                        <div className="logo-on-logged-in-header">
                            <img id="logo" src={window.settingsIconURL} alt="settings-icon" />
                        </div>

                        <div className="show-dropdown">

                            <div className="logo-on-logged-in-header" onClick={this.toggleBox}>
                                <img id="logo-cross" src={window.plusURL} alt="+ icon" />
                            </div>
                            <div className="ul-logged-dropdown-background-plus" id="background-plus-modal" onClick={this.toggleBox}>
                            </div>
                                <div className="hidden-plus-opt-h" id="hidden-plus-opt">
                                    <p className="create-p-tag">Create</p>
                                    <ul className="list-plus-men">
                                        <li>Pin</li>
                                        <li onClick={() => this.props.openModal('createBoard')} >Board</li> 
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
                    {boards.map(board => 
                            <Link key={board.id} id="board-show-link" to={`/board/${board.id}`}>
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

                                <h2 className="board-title">{ board.title.charAt(0).toUpperCase() + board.title.slice(1)}</h2>
                                {/* <h2 className="board-title">{ board.title.charAt(1).toUpperCase() + board.title.slice(2, -1)}</h2> */}
                                <div className="pins-days"> 
                                    <h2 className="pin-num-board"> 3 Pins </h2>   
                                    <h2 className="days-number">{handelDate(board.updated_at)} d</h2> 
                                </div>

                        </div>
                        </div>
                        </Link>
                    )}

                </div>

            </div>
        )
    }
}

export default UserShow;
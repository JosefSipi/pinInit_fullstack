import React from 'react';

class EditPinShow extends React.Component {
    constructor(props){
        super(props);

        this.state= {
            pin: this.props.pin.pin,
            boards: this.props.boards.boards,
            titleofBoard: ""
        }

        this.handelBoardSelect = this.handelBoardSelect.bind(this);
        this.deletePinFunction = this.deletePinFunction.bind(this);
        this.backdropClick = this.backdropClick.bind(this);
        this.testingClick = this.testingClick.bind(this);
        this.handeSave = this.handeSave.bind(this);
        // this.closingModal = this.closingModal.bind(this);

    }

    // closingModal(){
    //     this.props.closeModal()
    // }

    handeSave(e){
        
        let theboardId = this.state.pin.board_id
        let pinId = this.state.pin.id

        
        // 
        
        
        this.props.updatePin(this.state.pin).then(
            
            this.props.closeModal(),
            this.props.fetchPin(window.editPin)

        )

    }


    testingClick(e){
        e.preventDefault();

        let backdrop = document.getElementById('backdrop-div-edit-pin');
        let pinDD = document.getElementById('outer-of-edit-dropdown');
        if(pinDD.style.display === "" || pinDD.style.display === 'none'){
            backdrop.style.display = "block"
            pinDD.style.display = 'flex'
        } else {
            pinDD.style.display = 'none'
            backdrop.style.display = "none"
        }
    }
    backdropClick(e){
        e.preventDefault();
        let backdrop = document.getElementById('backdrop-div-edit-pin');
        let pinDD = document.getElementById('outer-of-edit-dropdown');
        pinDD.style.display = 'none'
        backdrop.style.display = "none"
    }
    
    handelBoardSelect(e){

        let prevState = this.state.pin
        prevState["board_id"] = e.currentTarget.id
        this.setState({pin: prevState})
    }

    componentDidMount(){
        
        this.props.fetchPin(window.editPin).then(
            (data) => {
                this.setState({pin: data.pin})
            }
        )
        this.props.fetchBoards(window.currentUser.id)
    }
    
    componentDidUpdate(prevProps){
        if(this.props.pin !== prevProps.pin){
            this.setState({pin: this.props.pin.pin})
        } else if (this.props.boards !== prevProps.boards){

            this.setState({boards: this.props.boards.boards})
        }
    }


    deletePinFunction(e){
        this.props.deletePin(Number(window.editPin)).then(
            this.props.closeModal(),
            window.location.reload(),
            this.props.history.push(`/board/${this.state.pin.board_id}`)
        )
    }

    handelChange(field){

        let prevState = this.state.pin
        return (e) => {

            if(field === "boardListTitle"){
                this.setState({titleofBoard: e.currentTarget.value})
            } else {
                prevState[field] = e.currentTarget.value
                this.setState({pin: prevState})
            }
        }
    }


    render(){
        
        if(!this.state.pin || !this.state.boards){
            return null
        }
        

        const boards = Object.values(this.props.boards.boards)
        const stateBoard = boards.filter(board => board.id === Number(this.state.pin.board_id))

        

        return(
            <div className="outer-div-edit-pin-modalthing">
                <div className="top-section-edit-pin">Edit this Pin</div>

                <div className="middle-section-edit-pin">
                    <div className="left-section-edit-p">

                        <div className="board-section-edit-p all-left-section-edit-p">
                            
                            <div className="board-word-edit-p the-edit-labels" >Board</div>
                            <div className="backdrop-div-edit-pin" onClick={this.backdropClick} id="backdrop-div-edit-pin"></div>
                            <div className="drop-down-display-edit-pin" onClick={this.testingClick}>
                                <div className="outer-of-edit-dropdown" id="outer-of-edit-dropdown">

                                    <div id="dd-list-edit-p" className="dd-list-edit-p">{boards.map(boardList => 
                                            <div key={boardList.id} className="list-item-edit-p" value={boardList.title} id={boardList.id} onClick={this.handelBoardSelect} >
                                                <div>{boardList.title}</div>
                                                <div className="logo-on-logged-in-header-board-lock-pin logo-mod-edit-pin" style={boardList.is_private ? {display: "flex" } : { display: "none" }}>
                                                    <img id="logo-lock-icon-pin-page" src={window.lockURL} alt="lock-icon" />
                                                </div>
                                            </div>
                                    )}</div>
                                </div>

                                <div className="board-label-edit-pin-dd">
                                    {stateBoard[0].title}
                                </div>

                                <img src={window.downArrowURL} alt="down arrow icon" id="down-arrow-image-edit-pin" />
                            </div> 
                        </div>

                        {/* <div className="section-section-edit-p">
                            <div className="section-word-edit-p"></div>
                            <div className="section-dd-edit-p"></div>
                        </div> */}

                        <div className="title-edit-pin all-left-section-edit-p">
                            <div className="title-word the-edit-labels">Title</div>
                            <input type="text" className="edit-pin-input input-section-edit-pin-123" value={this.state.pin.title === null ? '' : this.state.pin.title} onChange={this.handelChange('title')}/>
                        </div>

                        <div className="description-section-edit-p all-left-section-edit-p">
                            <div className="description-word-edit-p the-edit-labels">Description</div>
                            <textarea className="description-input-edit-p input-section-edit-pin-123" value={this.state.pin.description} onChange={this.handelChange('description')} name="" id="" cols="30" rows="3"></textarea>
                            {/* <input type="text" className="edit-pin-input" value={this.state.pin.description} onChange={this.handelChange('description')}/> */}
                        </div>

                        <div className="url-link-edit-p all-left-section-edit-p">
                            <div className="url-website-edit-p-word the-edit-labels">Website</div>
                            <input type="text" className="edit-pin-input input-section-edit-pin-123" value={this.state.pin.websiteURL} onChange={this.handelChange('websiteURL')}/>
                        </div>

                        <div className="alt-txt-edit-p all-left-section-edit-p">
                            <div className="alt-txt-word-edit-p the-edit-labels">Alt Text</div>
                            <div className="input-section-alt-txt-edit-p">
                                <input className="edit-pin-input input-section-edit-pin-123" type="text" value={this.state.pin.description2} onChange={this.handelChange('description2')}/>
                                <div className="alt-txt-underinput-edit-p">
                                    This helps people using screen readers understand what your Pin is about.
                                </div>
                            </div>
                        </div>

                        {/* <div className="note-to-self-edit-p">
                            <div className="note-self-edit-p-word">Note to self</div>
                            <input type="text" className="edit-pin-input-notetoself" placeholder="Add a private note to remember your ideas about this Pin" value={}/>
                        </div> */}

                        {/* <div className="comments-and-photo-permis">
                            <div className="com-perm-txt">Comment and Photo Permissions</div>
                            <label htmlFor="comment-photo-per">Allow people to comment

                               <input type="checkbox" name="comment-photo-per" id="comment-photo-per" />
                            </label>
                        </div> */}
                    </div>
                    

                    <div className="right-section-edit-p">
                        <img className="pin-photo-edit-pin" src={this.state.pin.photoUrl} alt="pin photo" />
                    </div>
                    
                </div>

                <div className="bottom-section-edit-pin" >
                    <div className="footer-edit-pin-gray-button" onClick={this.deletePinFunction}>Delete</div>
                    
                    <div className="right-side-footer-edit-p">
                        <div className="footer-edit-pin-gray-button" onClick={this.props.closeModal}>Cancel</div>
                        <div className="save-btn-edit-pin" onClick={this.handeSave}>Save</div>
                    </div>
                </div>
            </div>
        )
    }
    

}

export default EditPinShow;
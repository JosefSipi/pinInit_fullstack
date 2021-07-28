import React from 'react';

class EditPinShow extends React.Component {
    constructor(props){
        super(props);
        debugger

        this.state= {
            pin: this.props.pin.pin,
            boards: this.props.boards.boards,
            titleofBoard: ""
        }

        this.handelBoardSelect = this.handelBoardSelect.bind(this);
        this.deletePinFunction = this.deletePinFunction.bind(this);
        this.showHideDD = this.showHideDD.bind(this);
        this.backdropClick = this.backdropClick.bind(this);

    }
    backdropClick(e){
        e.preventDefault();
        let backdrop = document.getElementById('backdrop-div-edit-pin');
        let pinDD = document.getElementById('dd-list-edit-p');
        if(pinDD.style.display === "none"){
            backdrop.style.display = "none"
        } else {
            pinDD.style.display = 'none'
            backdrop.style.display = "none"
        }
    }

    showHideDD(e){
        debugger
        e.preventDefault();
        let pinDD = document.getElementById('dd-list-edit-p');
        let backdrop = document.getElementById('backdrop-div-edit-pin');
        if(pinDD.style.display === 'none'){
            backdrop.style.display = "block"
            pinDD.style.display = 'flex'
        } else if (pinDD.style.display === 'flex'){
            backdrop.style.display = "none"
            pinDD.style.display = 'none'
        }
    }

    handelBoardSelect(e){

        let prevState = this.state.pin
        prevState["board_id"] = e.currentTarget.id
        this.setState({pin: prevState})
        console.log(`handel board at ${e.currentTarget.id}`)
        // debugger
        // // this.setState({titleofBoard: title})

        // return(e) => {
        //     let prevState = this.state.pin
        //     prevState["board_id"] = e.currentTarget.id
        //     this.setState({pin: prevState})
        //     console.log(`handel board at ${e.currentTarget.id}`)
        // }
    }

    componentDidMount(){
        debugger
        console.log('pin edit modal component did mount')
        this.props.fetchPin(window.editPin)

        this.props.fetchBoards(window.currentUser.id).then(console.log('we hit fetchBoards in edit_pin component'))
    }
    
    componentDidUpdate(prevProps){
        if(this.props.pin !== prevProps.pin){
            this.setState({pin: this.props.pin.pin})
        } else if (this.props.boards !== prevProps.boards){

            this.setState({boards: this.props.boards.boards})
        }
    }

    deletePinFunction(e){
        debugger
        this.props.deletePin(this.state.pin.id)
    }

    handelChange(field){
        debugger
        let prevState = this.state.pin
        return (e) => {
            debugger
            if(field === "boardListTitle"){
                this.setState({titleofBoard: e.currentTarget.value})
            }else {
                prevState[field] = e.currentTarget.value
                console.log(prevState[field])
                this.setState({pin: prevState})
            }
        }
    }


    render(){
        
        if(!this.state.pin || !this.state.boards){
            return null
        }
        debugger

        const boards = Object.values(this.props.boards.boards)
        // const stateBoard = boards.filter(board => board.id === this.state.pin.board_id)
        return(
            <div className="outer-div-edit-pin-modalthing">
                <div className="top-section-edit-pin">Top Section</div>

                <div className="middle-section-edit-pin">
                    <div className="left-section-edit-p">

                        <div className="board-section-edit-p">
                            
                            <div className="board-word-edit-p" onClick={this.showHideDD}>Board</div>
                                <div className="backdrop-div-edit-pin" onClick={this.backdropClick} id="backdrop-div-edit-pin"></div>
                                <div id="dd-list-edit-p" className="dd-list-edit-p">{boards.map(boardList => 
                                        <div key={boardList.id} className="list-item-edit-p" value={boardList.title} id={boardList.id} onClick={this.handelBoardSelect, this.handelChange('boardListTitle')} >
                                            <div>{boardList.title}</div>
                                            <div className="logo-on-logged-in-header-board-lock-pin" style={boardList.is_private ? {display: "flex" } : { display: "none" }}>
                                                <img id="logo-lock-icon-pin-page" src={window.lockURL} alt="lock-icon" />
                                            </div>
                                        </div>
                                )}</div>

                                <div className="board-label-edit-pin-dd">
                                    {this.state.titleofBoard}
                                </div>
                        </div>

                        {/* <div className="section-section-edit-p">
                            <div className="section-word-edit-p"></div>
                            <div className="section-dd-edit-p"></div>
                        </div> */}

                        <div className="title-edit-pin">
                            <div className="title-word">Title</div>
                            <input type="text" className="edit-pin-input" value={this.state.pin.title} onChange={this.handelChange('title')}/>
                        </div>

                        <div className="description-section-edit-p">
                            <div className="description-word-edit-p">Description</div>
                            <textarea value={this.state.pin.description} onChange={this.handelChange('description')} name="" id="" cols="30" rows="3"></textarea>
                            {/* <input type="text" className="edit-pin-input" value={this.state.pin.description} onChange={this.handelChange('description')}/> */}
                        </div>

                        <div className="url-link-edit-p">
                            <div className="url-website-edit-p-word">Website</div>
                            <input type="text" className="edit-pin-input" value={this.state.pin.websiteURL} onChange={this.handelChange('websiteURL')}/>
                        </div>

                        <div className="alt-txt-edit-p">
                            <div className="alt-txt-word-edit-p">Alt Text</div>
                            <div className="input-section-alt-txt-edit-p">
                                <input className="edit-pin-input" type="text" value={this.state.pin.description2} onChange={this.handelChange('description2')}/>
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
                        <img className="pin-photo" src={this.state.pin.photoUrl} alt="pin photo" />
                    </div>
                    
                </div>

                <div className="bottom-section-edit-pin" >
                    <div className="footer-edit-pin-gray-button" onClick={this.deletePinFunction}>Delete</div>
                    <div className="footer-edit-pin-gray-button">Cancel</div>
                    <div className="save-btn-edit-pin">Save</div>
                </div>
            </div>
        )
    }
    

}

export default EditPinShow;
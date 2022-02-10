import React from 'react';
// import {Link} from 'react-router-dom';

class EditBoardShow extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            board: this.props.boards.displayBoard
        }
        this.handelChange = this.handelChange.bind(this);
        this.handelSubmit = this.handelSubmit.bind(this);
        this.handelDelete = this.handelDelete.bind(this);
    }

    componentDidMount(){
        this.props.fetchBoard(window.editingBoard)
    }

    componentWillUnmount(){
        this.props.fetchBoards(this.props.currentUser.id)
    }

    componentDidUpdate(prevProps){
        if(this.props.boards !== prevProps.boards){
            this.setState({ board: this.props.boards.displayBoard })
        }
    }

    handelChange(field){
        let prevState = this.state.board
        return (e) => {
            if (field === "is_private"){
                prevState[field] = e.currentTarget.checked
            } else {
                prevState[field] = e.currentTarget.value
            }
            this.setState({ board: prevState})
        }
    }

    handelDelete(e){
        e.preventDefault();
        this.props.deleteBoard(this.state.board.id);
        this.props.closeModal();
        this.props.history.push(`/profile/${window.currentUser.id}`);
        this.props.fetchBoards(window.currentUser.id);
    }

    handelSubmit(e){
        e.preventDefault();
        const updatedBoard = this.state.board
        this.props.updateBoard(updatedBoard).then(
            () => {
            this.props.fetchBoards(window.currentUser.id) 
        })
        this.props.closeModal();
    }

    render(){
        if (!this.state.board){
            return null
        }


        // if (this.state.board.description === null || this.state.board.description.trim().length > 0){
        //      this.description = ""
        // } else {
        //     this.description = "What's your board about?"
        // }
        return(
            <div className="div-prim-edit-board">
                <div className="top-div-edit-board-modal">
                   
                    <p>Edit your board</p>   
                   
                    <div className="X-icon-div">
                        <img onClick={this.props.closeModal} className="x-on-edit-board" src={window.theXURL} alt="X icon" />
                    </div>
                        
                </div>


            <div className="middle-section-edit-from-board">
                <form className="editng-board-from-board" id="the-button-edinging-board-onboard" onSubmit={this.handelSubmit}>
                    <p className="name-div-editing-1">Name</p>
                    <input type="text" autocomplete="off" className="edit-pin-input input-section-edit-pin-123" value={this.state.board.title} onChange={this.handelChange('title')}/>

                    <p className="name-div-editing-1">Description</p>
                    <textarea className="description-input-edit-p input-section-edit-pin-123" onChange={this.handelChange('description')} name="" id=""  >
                        {this.state.board.description}
                    </textarea>

                    <p className="name-div-editing-1" >Settings</p>
                        
                    <label className="check-box-label-edingboard" htmlFor="private-checkbox">
                        <input className="the-check-box-edingingboardonboard" checked={this.state.board.is_private === true ? true : false} type="checkbox" name="example name" id="private-checkbox" value={!this.state.board.is_private} onChange={this.handelChange('is_private')}/> 
                        <p className="theediningkeep-board">Keep this board secret</p>
                    </label>
                        <div className="div-word-1">So only you and collaborators can see it.</div>

                </form>

                <div className="edit-board-bottom-div">
                    <p className="name-div-editing-1" >Action</p>
                    <div className="delete-action-div" onClick={this.handelDelete}>
                        <h2 className="div-word-2">Delete board</h2>
                        <div className="div-word-3" >Delete this board and all its Pins forever. <br />
                            You can't undo this!</div>
                    </div>

                </div>

            </div>

            <div className="bottom-div-edit-board-on-board">
                    <div className="save-btn-edit-pin" onClick={this.handelSubmit} >Done</div>
            </div>

            </div>


        )
    }
}

export default EditBoardShow;
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
    }

    componentDidMount(){
        this.props.fetchBoard(window.editingBoard)
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

    handelSubmit(e){
        e.preventDefault();
        const updatedBoard = this.state.board
        this.props.updateBoard(updatedBoard);
        this.props.closeModal();
    }

    render(){
        if (!this.state.board){
            return null
        }
        console.log(this.state.board.title)
        console.log(this.state.board.description)


        // if (this.state.board.description === null || this.state.board.description.trim().length > 0){
        //      this.description = ""
        // } else {
        //     this.description = "What's your board about?"
        // }
        return(
            <div>
                <p>Edit your board</p>

                <form action="" onSubmit={this.handelSubmit}>
                    <p>Name</p>
                    <input type="text" value={this.state.board.title} onChange={this.handelChange('title')}/>

                    <p>Description</p>
                    <textarea onChange={this.handelChange('description')} name="" id="" cols="30" rows="10" >
                        {this.state.board.description}
                    </textarea>

                    <p>Settings</p>
                        
                    <input checked={this.state.board.is_private === true ? true : false} type="checkbox" name="example name" id="private-checkbox" value={!this.state.board.is_private} onChange={this.handelChange('is_private')}/> 
                    <label for="private-checkbox">
                        <p>Keep this board secret</p>
                        <div>So only you and collaborators can see it.</div>
                    </label>


                    <div>
                        <button>Done</button>
                    </div>
                </form>

                {/* <div>
                    <p>Action</p>
                    <h2>Delete board</h2>
                    <h3>Delete this board and all its Pins forever.
                        You can't undo this!</h3>

                </div> */}

            </div>


        )
    }
}

export default EditBoardShow;
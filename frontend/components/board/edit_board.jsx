import React from 'react';
// import {Link} from 'react-router-dom';

class EditBoardShow extends React.Component {
    constructor(props){
        super(props);
        debugger

        this.state = this.props.board;
    }

    componentDidMount(){
        this.props.fetchBoard(window.editingBoard)
    }

    render(){
        debugger
        return(
            <div>
                <p>Edit your board</p>

                <form action="">
                    <p>Name</p>
                    <input type="text" />

                    <p>Description</p>
                    <input type="text" value={this.state.board.description}/>

                    <p>Settings</p>
                    <input type="checkbox" name="" id="" /> 
                    <h2>So only you and collaborators can see it.</h2>
                </form>
            </div>


        )
    }
}

export default EditBoardShow;
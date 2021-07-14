import React from "react";

class CreateBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            title: "",
            is_private: false,
            owner_id: window.currentUser.id,
        }

        this.checkboxChange = this.checkboxChange.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
        this.handelSubmit = this.handelSubmit.bind(this);
    }

    componentDidMount(e){
        let dropDiv = document.getElementById('hidden-plus-opt')
        let backgroundDiv = document.getElementById('background-plus-modal')

        if (dropDiv.className === "hidden-plus-opt-h"){
            dropDiv.className = "hidden-plus-opt";
            backgroundDiv.className="ul-logged-dropdown-active-background-plus"
        } else if (backgroundDiv.className === "ul-logged-dropdown-active-background-plus") {
            backgroundDiv.className = "ul-logged-dropdown-background-plus"
            dropDiv.className = "hidden-plus-opt-h"
        }

        // this.props.fetchBoards(this.props.history.location.pathname.slice(-2));
    }
    

    handelSubmit(e){
        e.preventDefault();
        let board = this.state;
        this.props.createNewBoard(board).then(
            this.props.closeModal()
            )
    }

    updateTitle(e) {
        e.preventDefault();

        if (e.target.value.trim() === ""){
            document.getElementById('create-board-btn').className = "create-board-btn-gray";
        } else {
            document.getElementById('create-board-btn').className = "create-board-btn";
        }

        this.setState({ title: e.target.value})
    }

    checkboxChange(e) {
        e.preventDefault();
        if (e.target){
            this.setState({is_private: true})
        } else {
            this.setState({is_private: false})
        }
    }

    render() {

        return (
            <div className="create-board-main-div">


                <div className="create-board-title">Create Board</div>

                <form className="create-board-form" onSubmit={this.handelSubmit}>
                    <div className="name-div-create-b">Name</div>
                    <input className="input-box-create-b" type="text" onChange={this.updateTitle} placeholder='Like "Places to Go" or "Recipes to Make"'/>

                    <div className="bottom-create-b">
                        <input className="create-board-checkbox" type="checkbox" onChange={this.checkboxChange}/>

                        <div className="create-board-checkbox-div-sub">
                            <div className="first">Keep this board secret</div>
                            <div className="second">So only you and collaborators can see it.</div>
                        </div>
                    </div>
                <div className="create-board-div" >
                    <button className="create-board-btn-gray" id="create-board-btn">Create</button>
                </div>
                </form>





            </div>
        )
    }
}

export default CreateBoard;
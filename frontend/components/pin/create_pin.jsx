import React from 'react';

class CreatePin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pin: {
                creator_id: window.currentUser.id,
                title: null,
                description: "",
                description2: null,
                websiteURL: null,
                board_id: null,
                photo: null,
            },
            isTrue: false,
            thePhotoURL: ""
        }

        this.handelAddText = this.handelAddText.bind(this);
        this.handelUlClick = this.handelUlClick.bind(this);
        this.boardClickSelect = this.boardClickSelect.bind(this);
        this.handelSubmit = this.handelSubmit.bind(this);
        // this.mouseHoverBoard = this.mouseHoverBoard.bind(this);
        this.handelPhotoSelect = this.handelPhotoSelect.bind(this);
        this.deletePreview = this.deletePreview.bind(this);
        this.deleteDropDownClick = this.deleteDropDownClick.bind(this);
        this.moreClicked = this.moreClicked.bind(this);
        this.backdropClick = this.backdropClick.bind(this);
    }


    handelSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('pin[photo]', this.state.pin.photo);
        formData.append('pin[creator_id]', this.state.pin.creator_id);
        formData.append('pin[title]', this.state.pin.title);
        formData.append('pin[description]', this.state.pin.description);
        formData.append('pin[description2]', this.state.pin.description2);
        formData.append('pin[websiteURL]', this.state.pin.websiteURL);
        formData.append('pin[board_id]', this.state.pin.board_id);
        this.props.createNewPin(formData)
            .then(() => {
                // direct to pin show page
                console.log('should now direct to pin show page')

            })
    }


    componentDidMount(){
        this.props.fetchBoards(window.currentUser.id)

        if (!window.currentUser) {
        } else {
            this.props.fetchUser(window.currentUser.id);
        }
    }

    // componentDidUpdate(prevProps){
    //     if(prevProps.boards !== this.props.boards || this.props.boards === undefined){
    //         this.props.fetchBoards(window.currentUser.id)
    //     }
    // }

    handelAddText(e){
        e.preventDefault();
        let textarea = document.getElementById('alt-text-area');
        let button = document.getElementById('alt-text-area-button');
        textarea.style.display = 'block';
        button.style.display = 'none';
    }

    handelUlClick(e){
        e.preventDefault();

        let backdrop = document.getElementById('backdrop-div-create-pin')
        if(backdrop.style.display === "none"){
            backdrop.style.display = "block"
        } else {
            backdrop.style.display = "none"
        }
        
        let ul = document.getElementById('middle-box-thing')
        if (ul.style.display === "block") {
            ul.style.display = "none"
            backdrop.style.display = "none"
        } else {
            ul.style.display = "block"
            backdrop.style.display = "block"
        }
    }

    inputChange(field){
        let prevState = this.state.pin
        return (e) => {
            prevState[field] = e.currentTarget.value
            this.setState({ pin: prevState })
        }
    }


    boardClickSelect(e){
        e.preventDefault();
        let prevState = this.state.pin
        prevState["board_id"] = e.currentTarget.id
        this.setState({ pin: prevState })


        let ul = document.getElementById('middle-box-thing')
        ul.style.display = "none"

        debugger

        let displayTitle = document.getElementById('board-dd-create-pin');
        let titleWorkingOn = e.currentTarget.innerText;
        if(titleWorkingOn.length > 13){
            displayTitle.innerText = titleWorkingOn.slice(0, 13).trim() + "..."
        } else {
            displayTitle = titleWorkingOn
        }

        let backdrop = document.getElementById('backdrop-div-create-pin')
        if(backdrop.style.display === "none"){
            // dropDown.style.display = "flex"
            // backdrop.style.display = "block"
        } else {
            backdrop.style.display = "none"
        }
    }

    deletePreview(e){
        e.preventDefault();
       let labelElement = document.getElementById('input-image-label-pin')
       labelElement.style.display = 'flex'

       let uploadImageStateEl = document.getElementById('modals_pin-display')
       uploadImageStateEl.style.display = 'none';
    }
    // mouseHoverBoard(e){
    //     e.preventDefault();
    //     let elementHovered = document.getElementById(e.currentTarget.id + "save-button")
    //     if(elementHovered.style.display === 'relative'){
    //         elementHovered.style.display = 'none';
    //     } else {
    //         elementHovered.style.display = 'relative';
    //     }
    // }

    handelPhotoSelect(e){
        debugger
        const prevState = this.state.pin
        prevState["photo"] = e.currentTarget.files[0]
        
        const file = e.currentTarget.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            
            this.setState({ pin: prevState, thePhotoURL: fileReader.result, isTrue: true });
        }
        
        if(file) {
            fileReader.readAsDataURL(file);
        }

       let labelElement = document.getElementById('input-image-label-pin')
       labelElement.style.display = 'none'

       let uploadImageStateEl = document.getElementById('modals_pin-display')
       uploadImageStateEl.style.display = 'flex';
    }

    deleteDropDownClick(e){
        let dropDown = document.getElementById("delete-dropdown-menue-id");

        dropDown.style.display = "none"

        window.location.reload();
    }

    moreClicked(e){
        e.preventDefault();

        let dropDown = document.getElementById("delete-dropdown-menue-id");
        let backdrop = document.getElementById('backdrop-div-create-pin')
        if(dropDown.style.display === "none"){
            dropDown.style.display = "flex"
            backdrop.style.display = "block"
        } else {
            dropDown.style.display = "none"
            backdrop.style.display = "none"
        }
    }
    backdropClick(e){
        e.preventDefault();

       let dropDown = document.getElementById("delete-dropdown-menue-id");
        let backdrop = document.getElementById('backdrop-div-create-pin')
        if(dropDown.style.display === "none"){
            // dropDown.style.display = "flex"
            // backdrop.style.display = "block"
        } else {
            dropDown.style.display = "none"
            backdrop.style.display = "none"
        }


        let ul = document.getElementById('middle-box-thing')
        if (ul.style.display === "block") {
            ul.style.display = "none"
        } else {
            // ul.style.display = "block"
        }
    }

    render() {
        if (!this.props.boards || this.props.boards === undefined || this.props.boards.length === 0){
            return null
        }
        const boards = this.props.boards
        const firstBoard = boards[0].title


        let description1 = 500 - this.state.pin.description.length

        if (this.state.isTrue){
            debugger
           
        }


        // const dropDDisplayB = this.state.pin.board_id;
        return (
            <div className="create-pin-main-div">
            <div className="backdrop-div-create-pin" onClick={this.backdropClick, this.handelUlClick} id="backdrop-div-create-pin"></div>

            <div className="delete-dropdown-menue" id="delete-dropdown-menue-id">
                <div onClick={this.deleteDropDownClick}>Delete</div>
                <div >Duplicate</div>
            </div>

                <div className="primary-createpin-card">

                    <div className="top-bar-create-pin">
                        <div className="delete-duplicate-button-dd" onClick={this.moreClicked}>
                                <img src={window.moreURL} alt="more icon" id="more-logo-icon"/>
                        </div>

                        <div className="left-top-bar-createpindiv">
                            
                            <div placeholder="Select" id="board-dd-create-pin" className="board-dd-create-pin" onClick={this.handelUlClick}>
                                {firstBoard} 
                            </div>

                            <div className="down-arrow-div" onClick={this.handelUlClick} >

                                <img src={window.downArrowURL} alt="down arrow icon" id="down-arrow-image-create-pin" />
                            </div>

                            <div className="save-button-create-pin" onClick={this.handelSubmit}>Save</div>
                        
                            <div className="middle-box-thing" id="middle-box-thing">
                                                <div className="board-dropdown-create-pin" id="board-dropdown-create-pin">
                                                    <ul className="board-dropdown-ol" id="board-dropdown-ol">
                                                    {boards.map(board => 
                                                        <div className="this-list-children-pin" key={board.id} onClick={this.boardClickSelect} id={board.id} onMouseEnter={this.mouseHoverBoard} onMouseLeave={this.mouseHoverBoard}>
                                                             {board.title.length > 20 ? board.title.slice(0, 20).trim() + "..." : board.title}

                                                                <div className="logo-on-logged-in-header-board-lock-pin" style={board.is_private ? {display: "flex" } : { display: "none" }}>
                                                                    <img id="logo-lock-icon-pin-page" src={window.lockURL} alt="lock-icon" />
                                                                </div>

                                                                {/* <div className="save-button-create-pin" id={board.id + "save-button"}>Save</div> */}
                                                            </div>
                                                        //    <li>{"Photo"}{board.title}</li>
                                                    )}
                                                    </ul>
                                                </div>
                            </div>
                        </div>

                            {/* ------------------ drop down part --------------- */}
                    </div>




                    <div className="bottom-create-pin">

                        <div className="left-side-create-pin">

                            <label htmlFor="input-image-pin" id="input-image-label-pin">
                                
                                <div className="upload-img-container">
                                    <div className="doted-border">
                                        <img src={window.upArrowURL} alt="up Arrow" id="up-arrow-icon" />

                                        <div className="drag-class-name">Drag and drop or click to upload</div>
                                        <div className="second-blerb-pin">Recomendation: Use high-quality .jpg files less than 20MB</div>
                                    </div>
                                </div>

                                <input type="file" name="input-image-pin" id="input-image-pin" 
                                onChange={this.handelPhotoSelect}/>

                            </label>

                            <div className="modals_pin" id="modals_pin-display">
                                <div className="pin_image">
                                    <img src={this.state.isTrue ? this.state.thePhotoURL : ""} alt="pin_image" className="preview-image"/>
                                    <div className="delete-icon-logo-div" onClick={this.deletePreview}>
                                        <img className="delete-icon-logo" src={window.deleteURL} alt="Delete icon" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="right-side-create-pin">

                            <input type="text" placeholder="Add your title" onChange={this.inputChange('title')}/>

                            <div>
                                <div className="profile-div-small">
                                    <img className="profile-photo-icon" src={this.props.user.photoUrl} alt="logo" />
                                </div>

                                <div>{this.props.user.f_name} {this.props.user.l_name}</div>

                            </div>

                            <textarea  onChange={this.inputChange('description')} name="" id="" cols="40" rows="1" placeholder="Tell everyone what your Pin is about">
                            </textarea>
                            <div>
                                <div>People will usually see the first 50 characters when they click on your Pin </div>
                                <div>{description1}</div>
                            </div>

                            <textarea onChange={this.inputChange('description2')} name="" id="alt-text-area" cols="40" rows="1" placeholder="Explain what people can see in the Pin" style={{display: 'none'}}>
                            </textarea>

                            {/* <div>
                                <div>This text will be read aloud by screen readers</div>
                                <div>{description2}</div>
                            </div> */}

                            <div  onClick={this.handelAddText} id="alt-text-area-button">Add alt text</div>

                            <input onChange={this.inputChange('websiteURL')} type="text" placeholder="Add a destination link"/>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

export default CreatePin;
import React from 'react';
// import { Redirect } from 'react-router-dom';
import LoadingIcon from './loading';
import Compressor from 'compressorjs';
import imageCompression from 'browser-image-compression';

class CreatePin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pin: {
                creator_id: window.currentUser.id,
                title: "",
                description: "",
                description2: "",
                websiteURL: "",
                board_id: null,
                photo: null,
                heightof: null,
            },
            isTrue: false,
            thePhotoURL: "",
            loading: false,
            boardTitle: false,
            boards: null,
            img_err: false,
            err_msg: "",
            showHelpDes: false,
            showHelpMount: false,
        }

        this.handelAddText = this.handelAddText.bind(this);
        this.handelUlClick = this.handelUlClick.bind(this);
        this.boardClickSelect = this.boardClickSelect.bind(this);
        this.handelSubmit = this.handelSubmit.bind(this);
        this.handelPhotoSelect = this.handelPhotoSelect.bind(this);
        this.deletePreview = this.deletePreview.bind(this);
        this.deleteDropDownClick = this.deleteDropDownClick.bind(this);
        this.moreClicked = this.moreClicked.bind(this);
        this.backdropClick = this.backdropClick.bind(this);
        this.supTextShow = this.supTextShow.bind(this);
        this.toggleDesTxt = this.toggleDesTxt.bind(this);
        this.populateBoardField = this.populateBoardField.bind(this);
        this.createABoard = this.createABoard.bind(this);
        this.boardDropDownSelectCreate = this.boardDropDownSelectCreate.bind(this);
        this.helpDescription = this.helpDescription.bind(this);
        // this.compresionCallback = this.compresionCallback.bind(this);
        this.handleImageUploadCompression = this.handleImageUploadCompression.bind(this);
        this.errHandler = this.errHandler.bind(this);
    }

    helpDescription(){

        if (this.state.showHelpMount){

            this.setState({showHelpDes: true});
            
            setTimeout(() => {
                this.setState({showHelpDes: false});
                this.setState({showHelpMount: false});
            }, 10000);

        }

    }

    boardDropDownSelectCreate(){
        
        const boardsFromState = this.state.boards;

        const boards = Object.values(boardsFromState);
        const objBoards = {...boardsFromState};


        let displayBoardId = this.state.pin.board_id;

        let displayTitle = boardsFromState[displayBoardId];

        if(displayBoardId === null && boards.length === 0){
            displayTitle = 'Select';
        } else if (displayBoardId === null && boards.length > 0) {
            
            displayTitle = objBoards[Object.keys(objBoards)[0]].title;
        } else {
            displayTitle = objBoards[displayBoardId].title;
        }

        return (
            <div className="left-top-bar-createpindiv">
                            
                <div placeholder="Select" id="board-dd-create-pin" className="board-dd-create-pin" onClick={this.handelUlClick}>
                    <div>{displayTitle}</div>
                </div>

                <div className="down-arrow-div" onClick={this.handelUlClick} >
                    <img src={window.downArrowURL} alt="down arrow icon" id="down-arrow-image-create-pin" />
                </div>

                <div className="save-button-create-pin" onClick={this.handelSubmit}>Save</div>
            
                <div className="board-dropdown-create-pin" id="board-dropdown-create-pin">
                    <div className='arround-ul-dd'>                                   
                        <ul className="board-dropdown-ol" id="board-dropdown-ol">
                        {boards.map(board => 
                            <div className="this-list-children-pin" key={board.id} onClick={this.boardClickSelect} id={board.id} onMouseEnter={this.mouseHoverBoard} onMouseLeave={this.mouseHoverBoard}>
                                <div className='around-dd-board-pin-display'>
                                    <div className='rounded-border-for-img'>
                                        {board.pinPhotos.one ? <img className='photo-pin-in-board-opt' src={board.pinPhotos.one} alt="" /> : null}
                                    </div>
                                </div> 
                                
                                <div>
                                    {board.title.length > 20 ? board.title.slice(0, 20).trim() + "..." : board.title}
                                </div>

                                <div className="logo-on-logged-in-header-board-lock-pin" style={board.is_private ? {display: "flex" } : { display: "none" }}>
                                    <img id="logo-lock-icon-pin-page" src={window.lockURL} alt="lock-icon" />
                                </div>

                            </div>
                        )}
                        </ul> 
                    </div>
                    <div className='bottom-section-in-dd-pin' onClick={this.createABoard}>
                        <div className='red-plus-icon-div'>
                            <img className='red-plus-icon' src={window.redPlusIcon} alt="red +" />
                        </div>
                        <div className='d334'>Create Board</div>
                    </div>
                </div>
            </div>
        )
    }

    createABoard(){

        this.props.openModal('createBoard')

    }

    toggleDesTxt(e){
        e.preventDefault();
        let toggleTxt = document.getElementById('txt-create-p-fifty');
        if(toggleTxt.style.display === "flex"){
            toggleTxt.style.display = "none"
        } else {
            toggleTxt.style.display = "flex"

        }
    }

    handelSubmit(e) {
        e.preventDefault();
        

        if(this.errHandler(e)) return

        

        let boards = Object.values(this.props.boards.boards)
        const objBoards = {...this.props.boards.boards}

        let the_board_id

        

        if(this.state.pin.board_id === null && boards.length === 0){
        } else if (this.state.pin.board_id === null && boards.length > 0){
            the_board_id = objBoards[Object.keys(objBoards)[0]].id
        } else {
            the_board_id = this.state.pin.board_id
        }
        
        let thePinHeightFinder = document.getElementById('pin_image-create-pin-height');
        let imageHeightFor43 = document.getElementById('preview-image-456');
        if(imageHeightFor43.offsetHeight >= thePinHeightFinder.offsetHeight){
            var heightOfValue = 100;
        } else {
            var heightOfValue = ((imageHeightFor43 / thePinHeightFinder) * 100)
        }

        const formData = new FormData();
        formData.append('pin[photo]', this.state.pin.photo);
        formData.append('pin[creator_id]', this.state.pin.creator_id);
        formData.append('pin[title]', this.state.pin.title);
        formData.append('pin[description]', this.state.pin.description);
        formData.append('pin[description2]', this.state.pin.description2);
        formData.append('pin[websiteURL]', this.state.pin.websiteURL);
        formData.append('pin[board_id]', the_board_id);
        formData.append('pin[heightof]', heightOfValue);

        this.setState({loading: true})
        this.props.createNewPin(formData).then(
            (data) => {
                data
                this.props.history.goBack()
            } 
        )
    }

    populateBoardField(){
        let prevState = this.state.pin
        prevState["board_id"] = firstBoard
        this.setState({ pin: prevState })
    }


    componentDidMount(){
        this.props.fetchBoards(this.props.currentUser.id).then(
            (data) => {
                this.setState({boards: data.boards})

                if(window.currentUser.id === 5){
                    this.setState({showHelpMount: true})
                } else {
                    this.setState({showHelpMount: !Object.values(this.state.boards)[0].pinPhotos.one})
                }
            }
        )

        if (!window.currentUser) {
        } else {
            this.props.fetchUser(window.currentUser.id);
        }

    }

    componentDidUpdate(prevProps){
        if(prevProps.boards !== this.props.boards){
            
            this.setState({boards: this.props.boards.boards})
        }
    }

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
        

        this.setState({boards: this.props.boards.boards})

        if(backdrop.style.display === "none"){
            backdrop.style.display = "block"
        } else {
            backdrop.style.display = "none"
        }
        
        let ul = document.getElementById('board-dropdown-create-pin')
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


        let ul = document.getElementById('board-dropdown-create-pin')
        ul.style.display = "none"

        let backdrop = document.getElementById('backdrop-div-create-pin')
        if(backdrop.style.display === "none"){
            backdrop.style.display = "none"
        } else {
            backdrop.style.display = "none"
        }
    }

    deletePreview(e){
        e.preventDefault();

        this.setState({img_err: false})

       let labelElement = document.getElementById('input-image-label-pin')
       labelElement.style.display = 'flex'

       let uploadImageStateEl = document.getElementById('modals_pin-display')
       uploadImageStateEl.style.display = 'none';
    }

    // handleConvertedImage(url){
    //     

    //     console.log(url)
    // }

    async handleImageUploadCompression(image){

        const options = {
          maxSizeMB: 0.09,
          maxWidthOrHeight: 670,
          useWebWorker: true
        }

        try {
            const compressedImage = await imageCompression(image, options)

            const fileReader = new FileReader();
            let filePho = new File([compressedImage], compressedImage.name)
            
            const prevState = this.state.pin
            prevState["photo"] = filePho

            fileReader.onloadend = () => {
                this.setState({ pin: prevState, thePhotoURL: fileReader.result, isTrue: true})
            }

            if(filePho) {
                fileReader.readAsDataURL(filePho);
            }
        } catch (err){
            console.log(err)
        }
    }

    errHandler(e){

        
        if(!e.currentTarget.files) {
            this.setState({img_err: true, err_msg: "An image is required to create a Pin."})
            
            return true
        }

        if(e.currentTarget.files[0].type !== 'image/jpeg') {
            this.setState({img_err: true, err_msg: "Your upload failed because it's the wrong format."})
            
            return true
        }

        
        return false
    }
    
    handelPhotoSelect(e){

        

        if(this.errHandler(e)) return

        
       
        this.handleImageUploadCompression(e.currentTarget.files[0])

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
            backdrop.style.display = "none"
        } else {
            dropDown.style.display = "none"
            backdrop.style.display = "none"
        }

        let ul = document.getElementById('board-dropdown-create-pin')
        if (ul.style.display === "block") {
            ul.style.display = "none"
        }
    }

    supTextShow(e){
        e.preventDefault();
        let divFocus = document.getElementById('second-div-title-pininput-1')
        let divFocus2 = document.getElementById('second-div-title-pininput-2')
        if(divFocus.style.display === "flex"){
            divFocus.style.display = 'none'
            divFocus2.style.display = 'none'
        } else {
            divFocus.style.display = 'flex'
            divFocus2.style.display = 'flex'
        }
    }

    render() {

        if (!this.props.boards.boards || this.props.boards.boards === undefined || this.props.boards.boards.length === 0){
            return null
        }

        

        const boardsFromProps = this.props.boards.boards
        const boardsFromState = this.state.boards
        

        let description1 = 500 - this.state.pin.description.length

        
        
        
        return (
            <div className="create-pin-main-div">
            <div className="backdrop-div-create-pin" onClick={this.backdropClick} id="backdrop-div-create-pin"></div>

           
            <div className="delete-dropdown-menue" id="delete-dropdown-menue-id">
                <div onClick={this.deleteDropDownClick}>Delete</div>
            </div>

            <div className="primary-createpin-card">
                
                 {this.state.loading ? <LoadingIcon/> : null } 
                
                <div className={this.state.loading ? 'deactivate' : ''} >

                    <div className="top-bar-create-pin">
                        <div className="delete-duplicate-button-dd" onClick={this.moreClicked}>
                            <img src={window.moreURL} alt="more icon" id="more-logo-icon"/>
                        </div>

                        { !!this.state.boards ? this.boardDropDownSelectCreate() : null}

                            {/* ------------------ drop down part --------------- */}
                    </div>

                    <div className="bottom-create-pin">

                        <div className="left-side-create-pin">

                            <label htmlFor="input-image-pin" id="input-image-label-pin">
                                
                                <div className={this.state.img_err ? 'upload-img-container-err' : 'upload-img-container'}>
                                    <div className="doted-border">
                                        {this.state.img_err ?  <img src={window.redWarning} alt="Alert icon" id="up-arrow-icon" /> : <img src={window.upArrowURL} alt="up Arrow" id="up-arrow-icon" />}

                                        <div className={this.state.img_err ? 'drag-class-name red-txt' : "drag-class-name" }>
                                            {this.state.img_err ? this.state.err_msg : 'Click to upload'}
                                        </div>

                                        <div className={this.state.img_err ? 'second-blerb-pin red-txt' : "second-blerb-pin" }>
                                            Recomendation: Use high-quality .jpg files less than 20MB
                                        </div>
                                    </div>
                                </div>

                                <input type="file" accept=".jpg" autoComplete="off" name="input-image-pin" id="input-image-pin" 
                                //  accept=".jpg, .jpeg, .png"
                                onChange={this.handelPhotoSelect}/>

                            </label>

                            <div className="modals_pin" id="modals_pin-display">
                                <div className="pin_image" id="pin_image-create-pin-height">
                                    <img src={this.state.isTrue ? this.state.thePhotoURL : ""} alt="pin_image" id="preview-image-456" className="preview-image"/>
                                    <div className="delete-icon-logo-div" onClick={this.deletePreview}>
                                        <img className="delete-icon-logo" src={window.deleteURL} alt="Delete icon" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="right-side-create-pin">

                            <div className="input-div-top">
                                <input type="text" autoComplete="off" className="input-for-title-pin" placeholder="Add your title" onChange={this.inputChange('title')} onFocus={this.supTextShow} onBlur={this.supTextShow}/>
                                <div className="second-div-title-pininput-outer" id="second-div-title-pininput">
                                    <div className="second-div-title-pininput-1" id="second-div-title-pininput-1">Your first 40 characters are what usually show up in feeds </div> <div id="second-div-title-pininput-2" className="second-div-title-pininput-2">{100 - this.state.pin.title.length}</div>                              
                                </div>
                            </div>
                            <div className="outer-div-for-profile-photo-pin">
                                <div className="profile-div-small-pin">
                                    <img className="profile-photo-icon" src={this.props.user.photoUrl} alt="logo" />
                                </div>

                                <div>{this.props.user.f_name} {this.props.user.l_name}</div>

                            </div>

                            <textarea id="text-area-pin-create" className="text-area-pin-create" onChange={this.inputChange('description')} name="" cols="40" rows="1" placeholder="Tell everyone what your Pin is about" onFocus={this.toggleDesTxt} onBlur={this.toggleDesTxt}>
                            </textarea>
                            <div className="txt-create-p-fifty" id="txt-create-p-fifty">
                                <div className="char-fifty-txt-create-p">People will usually see the first 50 characters when they click on your Pin </div>
                                <div className="description-char-count">{description1}</div>
                            </div>

                            <textarea className="text-area-pin-create txt-area-create-p-moveup" onChange={this.inputChange('description2')} name="" id="alt-text-area" cols="40" rows="1" placeholder="Explain what people can see in the Pin" style={{display: 'none'}}>
                            </textarea>

                            <div className="footer-create-pin-gray-button" onClick={this.handelAddText} id="alt-text-area-button">Add alt text</div>
                            
                            {this.state.showHelpDes ? <div className='blue-info'>
                                    <div>
                                        <img onClick={() => {this.setState({showHelpDes: false, showHelpMount: false})}} src={window.whiteX} alt="X" />
                                    </div>
                                    <p>The destination link is where you can add a URL to direct your followers to where on the internet you found this pin, if applicable </p>
                                </div> : null
                            }

                            <input type="text" autoComplete="off" className="text-area-pin-create last-in-556" onFocus={this.helpDescription} onChange={this.inputChange('websiteURL')} placeholder="Add a destination link"/>
                        </div>
                    </div>

                </div>
              </div>                  
            </div>
        )
    }
}

export default CreatePin;
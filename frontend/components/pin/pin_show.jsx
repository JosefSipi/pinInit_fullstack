import React from 'react';

class PinShow extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pin: null,
            comment: {
                commenter_id: window.currentUser.id,
                pin_id: Number(this.props.match.params.id),
                body: null
            },
            comments: null,
            commentDDActive: false,
            ddStat: null
        }

        this.editPin = this.editPin.bind(this);
        // this.editComment = this.editComment.bind(this);
        this.classAddInput = this.classAddInput.bind(this);
        this.isFieldEmpty = this.isFieldEmpty.bind(this);
        this.handelSubmitComment = this.handelSubmitComment.bind(this);
        this.moreClickedDDComment = this.moreClickedDDComment.bind(this);
        this.moreClickedDD = this.moreClickedDD.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.backdropClick = this.backdropClick.bind(this);
    }

    // editComment(e){
    //     this.props.editComment
    // }

    deleteComment(e){
        // e.preventDefault()

        let commentIds = {
            pinId: Number(this.props.match.params.id),
            commentId: e.currentTarget.id
        }
        this.props.deleteComment(commentIds).then(
            this.backdropClick(),
            this.props.fetchPin(Number(this.props.match.params.id))
        )
    }

    handelSubmitComment(e){
        e.preventDefault();
        debugger
        let input = document.getElementById('comment-input-pin-show');

        if(e.currentTarget.classList.length === 3){
            debugger
            this.props.newComment(this.state.comment)
            this.props.fetchPin(Number(this.props.match.params.id)).then(
                input.value = '',
                e.currentTarget.classList.remove('done-red-btn')
            )
        }
        debugger
    }

    classAddInput(e){
        e.preventDefault();
        e.currentTarget.classList.add('change-input')
        let buttons = document.getElementById('pin-show-btn');
        buttons.style.display = 'flex'
    }

    isFieldEmpty(e){
        e.preventDefault();
        debugger

        let prevState = this.state.comment
        prevState.body = e.currentTarget.value
        this.setState({comment: prevState})

        debugger

        if(e.currentTarget.value.trim().length === 0){
            let doneBtn = document.getElementById('done-btn-show-pin')
            doneBtn.classList.remove('done-red-btn')
        } else {
            let doneBtn = document.getElementById('done-btn-show-pin')
            doneBtn.classList.add('done-red-btn')
        }
    }

    editPin(e){
        e.preventDefault();
        window.editPin = Number(this.props.match.params.id)
        this.backdropClick(e)
        this.props.openModal('editPin')
    }

    moreClickedDD(e){
        e.preventDefault();
        let dropDown = document.getElementById("edit-dropdown-menue-123-id");
        let backdrop = document.getElementById('backdrop-div-create-pin')
        if(dropDown.style.display === "none" || dropDown.style.display === "" ){
            this.setState({ddStat: true})
            dropDown.style.display = "flex"
            backdrop.style.display = "block"
        } else {
            this.setState({ddStat: false})
            dropDown.style.display = "none"
            backdrop.style.display = "none"
        }
    }

    moreClickedDDComment(e){
        e.preventDefault();
        debugger
        let dropDown = document.getElementById(`edit-dropdown-menue-124-id` + e.currentTarget.id);
        let backdrop = document.getElementById('backdrop-div-create-pin')
        debugger
        if(dropDown.style.display === "none" || dropDown.style.display === "" ){
            this.setState({ddStat: `edit-dropdown-menue-124-id` + e.currentTarget.id})
            this.setState({commentDDActive: true})
            dropDown.style.display = "flex"
            backdrop.style.display = "block"
        } else {
            this.setState({ddStat: false})
            dropDown.style.display = "none"
            backdrop.style.display = "none"
        }
    }

     backdropClick(e){
        // e.preventDefault();
        debugger

        let dropDownClass = document.getElementById(this.state.ddStat);
        debugger
        let dropDown = document.getElementById("edit-dropdown-menue-123-id");
        let backdrop = document.getElementById('backdrop-div-create-pin')
        if(dropDown.style.display === "none"){
            dropDown.style.display = "none"
            backdrop.style.display = "none"
            if(this.state.commentDDActive){
                dropDownClass.style.display = 'none'
                this.setState({ddStat: false})
            }
        } else {
            dropDown.style.display = "none"
            backdrop.style.display = "none"
            if(this.state.commentDDActive){
                dropDownClass.style.display = 'none'
                this.setState({ddStat: false})
            }
        }
     }

    componentDidMount(){
        this.props.fetchPin(Number(this.props.match.params.id))
    }


    componentDidUpdate(prevProps){
        debugger
        if(this.props.pin !== prevProps.pin){
            debugger
            this.setState({pin: this.props.pin.pin})

            if (!!this.props.pin.pin.comments){
                this.setState({ comments: Object.values(this.props.pin.pin.comments)})
            }
        }
        // } else if (this.props.comments !== prevProps.comments) {
        //     debugger
        //     this.setState({comments: this.props.pin})
        // }
    }

    render(){

        if(!this.state.pin){
            debugger
            return null
        }

        const comments = this.state.comments
        debugger

        let pinShow

        if(window.currentUser.id === this.props.pin.pin.creator_id){
            pinShow = (
                <div className='background-div-pin-show'>

                <div className="backdrop-div-create-pin" onClick={this.backdropClick} id="backdrop-div-create-pin"></div>
                <div className='main-div-pin-show'>

                    <div className="image-show-pin-1">
                        <img className='image-show-pin' src={this.state.pin.photoUrl} alt="photo?" />
                    </div>

                    <div className='right-half-pin-show'>
                        <div className='top-bar-right-show-pin'>

                            <div>
                                <h1 className="header-title-boards-show-123">
                                
                                <div className="pin-duplicate-button-dd" onClick={this.moreClickedDD}>
                                    <img className="pin-123-1" src={window.dotsBlackURL} alt="more icon"/>
                                </div>
                                    <div className="div-holder-helper-123">
                                        <div className="edit-dropdown-menue-123 pin-show" id="edit-dropdown-menue-123-id">
                                            <div onClick={this.editPin} >Edit Pin</div>
                                        </div>
                                    </div>
                                </h1>
                            </div>


                        </div>

                        <a className='url-link-tag' href={this.state.pin.websiteURL} target='_blank' >{this.state.pin.websiteURL}</a>
                        <div className='title-pin-show'>{this.state.pin.title}</div>
                        <p className='description-pin-show' >{this.state.pin.description}</p>

                        {/* <div>
                            <img src={} alt="" />
                        </div> */}

                        <div className='comments-section'>
                            <div className="comments-lable-pin-show">Comments</div>

                            <div className="describing-comments">Share feedback, ask a question or give a high five</div>
                        <div className="outer-comment-pin-show-1">

                        { !!this.state.comments ?
                        <div className='comment-array-holding-div'>
                             <div className='comment-array-pin-show'>
                                { comments.map( comment => 
                                    <div className='outside-comment-main' key={comment.id + "outside"}>
                                        <div className='one-comment-pin-show' key={comment.id}>
                                        
                                            <div className="image-div-show-pin-page comment-list-2">
                                                <img className='profile-icon-photo-pinshow' src={comment.photoUrl} alt="pic" />
                                            </div>

                                            <div className='right-txt-pin-show'>
                                                <div className='name-list-pin-show' >{comment.name}</div>
                                                <div className='body-list-pin-show'>{comment.body}</div>
                                            </div>
                                        </div>

                                        <div className='bottom-section-comment-pin-show'>
                                            
                                            <h1 className="header-title-boards-show-123">
                                            
                                            <div className="pin-duplicate-button-dd comment-edition-div" id={comment.id} onClick={this.moreClickedDDComment}>
                                                <img className="pin-123-1 comment-edition-dot" src={window.dotsBlackURL} alt="more icon"/>
                                            </div>
                                                <div className="div-holder-helper-123-pin-show">
                                                    <div className="edit-dropdown-menue-123-pin-show" id={`edit-dropdown-menue-124-id` + comment.id}>
                                                        <div >Edit</div>
                                                        <div id={comment.id} onClick={this.deleteComment}>Delete</div>
                                                    </div>
                                                </div>
                                            </h1>

                                        </div>

                                    </div>
                                    )
                                }
                            </div> 

                            <div className="comment-count">{comments.length} comments </div>
                            </div>
                            : null }
                            <div className="comments-in-section" >
                                <div className="image-div-show-pin-page" >
                                    <img className="profile-icon-photo-pinshow" src={window.currentUser.photoUrl} alt="profile" />
                                </div>
                                <input id='comment-input-pin-show' className="input-pin-show" type="text" placeholder="Add a comment" onClick={this.classAddInput} onChange={this.isFieldEmpty}/>
                            </div>

                            <div id="pin-show-btn" className='outer-comment-pin-show-2'>
                                <div id='cancel-btn-show-pin' className="button-show-pin-comment cancel-btn-show-pin" >Cancel</div>
                                <div id='done-btn-show-pin' className="button-show-pin-comment done-123" onClick={this.handelSubmitComment}>Done</div>
                            </div>
                        </div> 

                        </div>
                    </div>

                </div>
            
            
            </div> 
            )
        } else {
            pinShow = (
                <div className='background-div-pin-show'>

                <div className="backdrop-div-create-pin" onClick={this.backdropClick} id="backdrop-div-create-pin"></div>
                <div className='main-div-pin-show'>

                    <div className="image-show-pin-1">
                        <img className='image-show-pin' src={this.state.pin.photoUrl} alt="photo?" />
                    </div>

                    <div className='right-half-pin-show'>
                        <div className='top-bar-right-show-pin'>

                            <div>
                                <h1 className="header-title-boards-show-123">
                                
                                <div className="pin-duplicate-button-dd" onClick={this.moreClickedDD}>
                                    <img className="pin-123-1" src={window.dotsBlackURL} alt="more icon"/>
                                </div>
                                    <div className="div-holder-helper-123">
                                        <div className="edit-dropdown-menue-123 pin-show" id="edit-dropdown-menue-123-id">
                                            <div onClick={this.editPin} >Edit Pin</div>
                                        </div>
                                    </div>
                                </h1>
                            </div>


                        </div>

                        <a className='url-link-tag' href={this.state.pin.websiteURL} target='_blank' >{this.state.pin.websiteURL}</a>
                        <div className='title-pin-show'>{this.state.pin.title}</div>
                        <p className='description-pin-show' >{this.state.pin.description}</p>

                        {/* <div>
                            <img src={} alt="" />
                        </div> */}

                        <div className='comments-section'>
                            <div className="comments-lable-pin-show">Comments</div>

                            <div className="describing-comments">Share feedback, ask a question or give a high five</div>
                        <div className="outer-comment-pin-show-1">

                        { !!this.state.comments ?
                        <div className='comment-array-holding-div'>
                             <div className='comment-array-pin-show'>
                                { comments.map( comment => 
                                    <div className='outside-comment-main' key={comment.id + "outside"}>
                                        <div className='one-comment-pin-show' key={comment.id}>
                                        
                                            <div className="image-div-show-pin-page comment-list-2">
                                                <img className='profile-icon-photo-pinshow' src={comment.photoUrl} alt="pic" />
                                            </div>

                                            <div className='right-txt-pin-show'>
                                                <div className='name-list-pin-show' >{comment.name}</div>
                                                <div className='body-list-pin-show'>{comment.body}</div>
                                            </div>
                                        </div>

                                        <div className='bottom-section-comment-pin-show'>
                                            
                                            <h1 className="header-title-boards-show-123">
                                            
                                            <div className="pin-duplicate-button-dd comment-edition-div" id={comment.id} onClick={this.moreClickedDDComment}>
                                                <img className="pin-123-1 comment-edition-dot" src={window.dotsBlackURL} alt="more icon"/>
                                            </div>
                                                <div className="div-holder-helper-123-pin-show">
                                                    <div className="edit-dropdown-menue-123-pin-show" id={`edit-dropdown-menue-124-id` + comment.id}>
                                                        <div >Edit</div>
                                                        <div id={comment.id} onClick={this.deleteComment}>Delete</div>
                                                    </div>
                                                </div>
                                            </h1>

                                        </div>

                                    </div>
                                    )
                                }
                            </div> 

                            <div className="comment-count">{comments.length} comments </div>
                            </div>
                            : null }
                            <div className="comments-in-section" >
                                <div className="image-div-show-pin-page" >
                                    <img className="profile-icon-photo-pinshow" src={window.currentUser.photoUrl} alt="profile" />
                                </div>
                                <input id='comment-input-pin-show' className="input-pin-show" type="text" placeholder="Add a comment" onClick={this.classAddInput} onChange={this.isFieldEmpty}/>
                            </div>

                            <div id="pin-show-btn" className='outer-comment-pin-show-2'>
                                <div id='cancel-btn-show-pin' className="button-show-pin-comment cancel-btn-show-pin" >Cancel</div>
                                <div id='done-btn-show-pin' className="button-show-pin-comment done-123" onClick={this.handelSubmitComment}>Done</div>
                            </div>
                        </div> 

                        </div>
                    </div>

                </div>
            
            
            </div> 
            )
        }

        return(
            <div>
                {pinShow}
            </div>
        )
    }
}

export default PinShow;
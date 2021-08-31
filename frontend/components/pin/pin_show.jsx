import React from 'react';
import { Link } from 'react-router-dom';

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
            ddStat: null,
            editComment: '',
            editingCommentId: null,

        }

        this.editPin = this.editPin.bind(this);
        this.editComment = this.editComment.bind(this);
        this.classAddInput = this.classAddInput.bind(this);
        this.isFieldEmpty = this.isFieldEmpty.bind(this);
        this.handelSubmitComment = this.handelSubmitComment.bind(this);
        this.moreClickedDDComment = this.moreClickedDDComment.bind(this);
        this.moreClickedDD = this.moreClickedDD.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.backdropClick = this.backdropClick.bind(this);
        this.handelEditChange = this.handelEditChange.bind(this);
        this.handelSubmitCommentEdit = this.handelSubmitCommentEdit.bind(this);
        this.createLike = this.createLike.bind(this);
        this.removeLike = this.removeLike.bind(this);
        this.elapsedTime = this.elapsedTime.bind(this);
        this.cancelEditComment = this.cancelEditComment.bind(this);
    }


    cancelEditComment(e){
        e.preventDefault();
        debugger

        document.getElementById('edit-form-div' + e.currentTarget.getAttribute('data-comment_id')).style.display = 'none'
        document.getElementById('right-txt-pin-show' + e.currentTarget.getAttribute('data-comment_id')).style.display = 'flex'
        document.getElementById('bottom-section-comment-pin-show' + e.currentTarget.getAttribute('data-comment_id')).style.display = 'flex'


        this.setState({editComment: ''})

    }

    elapsedTime(time){
        

        let retTime = null

        
        while(retTime === null){
            
            if(time.year > 0){
                retTime = `${time.year}y`
            } else if (time.month > 0 ){
                retTime = `${time.month}M`
            } else if (time.day > 0){
                retTime = `${time.day}d`
            } else if(time.hours > 0){
                retTime = `${time.hours}h`
            } else if (time.min > 0) {
                retTime = `${time.min}m`
            } else {
                retTime = 'now'
            }
            
        }

        return retTime

    }

    removeLike(e){

        let id = e.currentTarget.getAttribute('data-like_id')
        this.props.deleteLike(id).then(
            () => {this.props.fetchPin(Number(this.props.match.params.id))}
        )
        

    }

    createLike(e){
        console.log('clicked gray heart')
        let liker_id = e.currentTarget.getAttribute('data-img_liker_id')
        let comment = e.currentTarget.getAttribute('data-img_comment')

        let info = {liker_id, comment_liked_id: comment}
        this.props.createLike(info).then(
            () => {this.props.fetchPin(Number(this.props.match.params.id))}
        )
    }

    handelSubmitCommentEdit(e){
        e.preventDefault();
        let commentIds = {
            commentId: this.state.editingCommentId,
            pinId: Number(this.props.match.params.id),
            commentForm: {body: this.state.editComment}
        }

        this.props.editComment(commentIds).then(
            () => {this.props.fetchPin(Number(this.props.match.params.id))}
        )
        
        document.getElementById('edit-form-div' + commentIds.commentId).style.display = 'none'
        document.getElementById('right-txt-pin-show' + commentIds.commentId).style.display = 'flex'
        document.getElementById('bottom-section-comment-pin-show' + commentIds.commentId).style.display = 'flex'
            
        this.setState({editingCommentId: null})
        // this.props.fetchPin(Number(this.props.match.params.id))
            
    }

    handelEditChange(e){
        e.preventDefault();
        this.setState({editComment: e.currentTarget.value})
    }

    editComment(e){

        let editForm = document.getElementById(`edit-form-div` + e.currentTarget.id)
        let commentShow = document.getElementById('right-txt-pin-show' + e.currentTarget.id)
        let optionsDiv = document.getElementById('bottom-section-comment-pin-show' + e.currentTarget.id)
        let backdrop = document.getElementById('backdrop-div-create-pin')
        let editDropDownMenue = document.getElementById('edit-dropdown-menue-124-id' + e.currentTarget.id)
  
        editForm.style.display = 'flex'
        commentShow.style.display = 'none'
        optionsDiv.style.display = 'none'
        backdrop.style.display = 'none'
        editDropDownMenue.style.display = 'none'

        this.setState({editComment: e.currentTarget.getAttribute('data-div_val')})

        this.setState({editingCommentId: e.currentTarget.id}) //this is a potential problem



    }

    deleteComment(e){
        // e.preventDefault()

        let commentIds = {
            pinId: Number(this.props.match.params.id),
            commentId: e.currentTarget.id
        }
        this.props.deleteComment(commentIds).then(
            this.backdropClick(),

            this.props.fetchPin(Number(this.props.match.params.id)),
            this.setState({comments: this.props.pin.pin.comments})
        )
    }

    handelSubmitComment(e){
        e.preventDefault();
        
        let input = document.getElementById('comment-input-pin-show');

        
        if(e.currentTarget.classList.length === 3){
            
            
            this.props.newComment(this.state.comment)
            this.props.fetchPin(Number(this.props.match.params.id)).then(
                input.value = '',
                e.currentTarget.classList.remove('done-red-btn'),

                this.props.fetchPin(Number(this.props.match.params.id)),
                this.setState({comments: this.props.pin.pin.comments})
            )
        }
        
    }

    classAddInput(e){
        e.preventDefault();
        e.currentTarget.classList.add('change-input')
        let buttons = document.getElementById('pin-show-btn');
        buttons.style.display = 'flex'
    }

    isFieldEmpty(e){

        
        e.preventDefault();
        

        let prevState = this.state.comment
        prevState.body = e.currentTarget.value
        this.setState({comment: prevState})

        
        let doneBtn = document.getElementById('done-btn-show-pin')

        if(e.currentTarget.value.trim().length === 0){
            doneBtn.classList.remove('done-red-btn')
        } else {
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
        
        let dropDown = document.getElementById(`edit-dropdown-menue-124-id` + e.currentTarget.id);
        let backdrop = document.getElementById('backdrop-div-create-pin')
        
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
        let dropDownClass = document.getElementById(this.state.ddStat);
        
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
        // .then(
        //     this.setState({comments: this.props.comments})
        // )
    }


    componentDidUpdate(prevProps){
        
        
        if(this.props.pin !== prevProps.pin){
            
            this.setState({pin: this.props.pin.pin})
            this.setState({comments: this.props.pin.pin.comments})

        }
    }

    render(){

        if(!this.state.pin){
            return null
        }
        

        let comments

        if(!!this.state.comments){
            comments = Object.values(this.state.comments)
        } else {
            comments = null
        }


        // if( this.state.comments.length === 0 ){
        //     comments = null
        // } else {
        //     comments = this.state.comments
        // }
        

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

                        <a className='url-link-tag' href={this.state.pin.websiteURL} target='_blank' >{this.state.pin.websiteURL.slice(0, 27) + '...'}</a>
                        <div className='title-pin-show'>{this.state.pin.title}</div>
                        <p className='description-pin-show' >{this.state.pin.description}</p>

                        {/* <div>
                            <img src={} alt="" />
                        </div> */}

                        <div className='comments-section'>
                            <div className="comments-lable-pin-show">Comments</div>

                            <div className="describing-comments">Share feedback, ask a question or give a high five</div>
                        <div className="outer-comment-pin-show-1">

                        { !!comments ?
                        <div className='comment-array-holding-div'>
                             <div className='comment-array-pin-show'>
                                { comments.map( comment => 
                                    <div className='outside-comment-main' key={comment.id + "outside"}>
                                        <div className='one-comment-pin-show' key={comment.id}>

                                            <div className='outside-of-image-div'>
                                                <div className="image-div-show-pin-page comment-list-2">
                                                    <img className='profile-icon-photo-pinshow' src={comment.photoUrl} alt="pic" />
                                                </div>
                                            </div>

                                            <div className='right-txt-pin-show' id={`right-txt-pin-show`+ comment.id} >
                                                <div className='outer-div-time-elapsed-comment'>
                                                    <Link to={`/profile/${comment.commenter_id}`}><div className='name-list-pin-show' >{comment.name}</div></Link>
                                                    <div className='time-elapsed-comment' >{this.elapsedTime(comment.timeElapsed)}</div>
                                                </div>
                                                <div className='body-list-pin-show'>{comment.body}</div>
                                            </div>
                                                
                                            <div className='edit-form-div-outter' id={'edit-form-div' + comment.id} >
                                                <textarea placeholder='Add a comment' className='blank-input-style' type="text" value={this.state.editComment} onChange={this.handelEditChange} />
                                                <div className='edit-comment-btns'>
                                                    <div data-comment_id={comment.id} onClick={this.cancelEditComment} id='cancel-btn-show-pin' className="button-show-pin-comment cancel-btn-show-pin cancel-124" >Cancel</div>
                                                    <div id='save-btn-show-pin' className="button-show-pin-comment save-123" onClick={this.handelSubmitCommentEdit}>Save</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='bottom-section-comment-pin-show' id={'bottom-section-comment-pin-show' + comment.id}>
                                            
                                            <h1 className="header-title-boards-show-123">

                                            <div className='like-icon-div'>
                                                {comment.like.liked ? 
                                                <img data-img_liker_id={window.currentUser.id} data-img_comment={comment.id} data-like_id={comment.like.like.id} onClick={this.removeLike} src={window.redHeartURL} alt="red heart" /> : 
                                                <img data-img_liker_id={window.currentUser.id} data-img_comment={comment.id} onClick={this.createLike} src={window.grayHeartURL} alt="gray heart" /> }

                                               {comment.like.like_count > 0 ? <div className='like-count'>{comment.like.like_count}</div> : null} 
                                            </div>
                                            
                                            { comment.commenter_id === window.currentUser.id ? <div className="pin-duplicate-button-dd comment-edition-div" id={comment.id} onClick={this.moreClickedDDComment}>
                                                <img className="pin-123-1 comment-edition-dot" src={window.dotsBlackURL} alt="more icon"/>
                                            </div> : null}
                                                <div className="div-holder-helper-123-pin-show">
                                                    <div className="edit-dropdown-menue-123-pin-show" id={`edit-dropdown-menue-124-id` + comment.id}>
                                                        <div data-div_val={comment.body} id={comment.id} onClick={this.editComment}>Edit</div>
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
                                    { !!window.currentUser.photoUrl ? <img className="profile-photo-icon" src={window.currentUser.photoUrl} alt="profile photo" /> : <p className='profile-letter-default' >{window.currentUser.f_name[0]}</p>}
                                    {/* <img className="profile-icon-photo-pinshow" src={window.currentUser.photoUrl} alt="profile" /> */}
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

                        <a className='url-link-tag' href={this.state.pin.websiteURL} target='_blank' >{this.state.pin.websiteURL.slice(0, 27) + '...'}</a>
                        <div className='title-pin-show'>{this.state.pin.title}</div>
                        <p className='description-pin-show' >{this.state.pin.description}</p>

                        {/* <div>
                            <img src={} alt="" />
                        </div> */}

                        <div className='comments-section'>
                            <div className="comments-lable-pin-show">Comments</div>

                            <div className="describing-comments">Share feedback, ask a question or give a high five</div>
                        <div className="outer-comment-pin-show-1">

                        { !!comments ?
                        <div className='comment-array-holding-div'>
                             <div className='comment-array-pin-show'>
                                { comments.map( comment => 
                                    <div className='outside-comment-main' key={comment.id + "outside"}>
                                        <div className='one-comment-pin-show' key={comment.id}>
                                            <div>
                                                <div className="image-div-show-pin-page comment-list-2">
                                                    <img className='profile-icon-photo-pinshow' src={comment.photoUrl} alt="pic" />
                                                </div>
                                            </div>

                                            <div className='right-txt-pin-show' id={`right-txt-pin-show`+ comment.id}>
                                                 <div className='outer-div-time-elapsed-comment'>
                                                    <Link to={`/profile/${comment.commenter_id}`}><div className='name-list-pin-show' >{comment.name}</div></Link>
                                                    <div className='time-elapsed-comment' >{this.elapsedTime(comment.timeElapsed)}</div>
                                                </div>
                                                <div className='body-list-pin-show'>{comment.body}</div>
                                            </div>
                                        </div>

                                        <div className='bottom-section-comment-pin-show' id={'bottom-section-comment-pin-show' + comment.id}>
                                            
                                            <h1 className="header-title-boards-show-123">

                                            <div className='like-icon-div'>
                                                {comment.like.liked ? 
                                                <img data-img_liker_id={window.currentUser.id} data-img_comment={comment.id} data-like_id={comment.like.like.id} onClick={this.removeLike} src={window.redHeartURL} alt="red heart" /> : 
                                                <img data-img_liker_id={window.currentUser.id} data-img_comment={comment.id} onClick={this.createLike} src={window.grayHeartURL} alt="gray heart" /> }

                                                {comment.like.like_count > 0 ? <div className='like-count'>{comment.like.like_count}</div> : null} 
                                            </div>
                                            
                                            { comment.commenter_id === window.currentUser.id ? <div className="pin-duplicate-button-dd comment-edition-div" id={comment.id} onClick={this.moreClickedDDComment}>
                                                <img className="pin-123-1 comment-edition-dot" src={window.dotsBlackURL} alt="more icon"/>
                                            </div> : null}
                                                <div className="div-holder-helper-123-pin-show">
                                                    <div className="edit-dropdown-menue-123-pin-show" id={`edit-dropdown-menue-124-id` + comment.id}>
                                                        <div data-div_val={comment.body} id={comment.id} onClick={this.editComment}>Edit</div>
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
                                    { !!window.currentUser.photoUrl ? <img className="profile-photo-icon" src={window.currentUser.photoUrl} alt="profile photo" /> : <p className='profile-letter-default' >{window.currentUser.f_name[0]}</p>}
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
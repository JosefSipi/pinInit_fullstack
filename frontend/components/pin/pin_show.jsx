import React from 'react';

class PinShow extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pin: null
        }

        this.editPin = this.editPin.bind(this);
        this.classAddInput = this.classAddInput.bind(this);
    }

    classAddInput(e){
        e.preventDefault();
        e.currentTarget.classList.add('change-input')
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
            dropDown.style.display = "flex"
            backdrop.style.display = "block"
        } else {
            dropDown.style.display = "none"
            backdrop.style.display = "none"
        }
    }

     backdropClick(e){
        e.preventDefault();

        let dropDown = document.getElementById("edit-dropdown-menue-123-id");
        let backdrop = document.getElementById('backdrop-div-create-pin')
        if(dropDown.style.display === "none"){
            dropDown.style.display = "none"
            // backdrop.style.display = "block"

            backdrop.style.display = "none"
        } else {
            dropDown.style.display = "none"
            backdrop.style.display = "none"
        }
     }

    componentDidMount(){
        this.props.fetchPin(Number(this.props.match.params.id))
    }


    componentDidUpdate(prevProps){
        if(this.props.pin !== prevProps.pin){
            this.setState({pin: this.props.pin.pin})
        }
    }

    render(){

        if(!this.state.pin){
            return null
        }

        return(

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

                        <div className='comments-section'>
                            <div className="comments-lable-pin-show">Comments</div>

                            <div className="describing-comments">Share feedback, ask a question or give a high five</div>

                        <div className="outer-comment-pin-show-1">
                            <div className="comments-in-section" >
                                <div className="image-div-show-pin-page" >
                                    <img className="profile-icon-photo-pinshow" src={window.currentUser.photoUrl} alt="profile" />
                                </div>
                                <input className="input-pin-show" type="text" name="" id="" onClick={this.classAddInput} onChange={this.isFieldEmpty}/>
                            </div>

                            <div className='outer-comment-pin-show-2'>
                                <div className="button-show-pin-comment cancel-btn-show-pin" >Cancel</div>
                                <div className="button-show-pin-comment" >Done</div>
                            </div>
                        </div>

                        </div>
                    </div>

                </div>
            
            
            </div>
        )
    }


}

export default PinShow;
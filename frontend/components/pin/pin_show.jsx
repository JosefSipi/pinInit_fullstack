import React from 'react';

class PinShow extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pin: null
        }

        this.editPin = this.editPin.bind(this);
    }

    editPin(e){
        e.preventDefault();
        debugger
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
        debugger
        this.props.fetchPin(Number(this.props.match.params.id))
    }


    componentDidUpdate(prevProps){
        debugger
        if(this.props.pin !== prevProps.pin){
            this.setState({pin: this.props.pin.pin})
        }
    }

    render(){

        if(!this.state.pin){
            return null
        }

        debugger

        return(

            <div className='background-div-pin-show'>
                <div className="backdrop-div-create-pin" onClick={this.backdropClick} id="backdrop-div-create-pin"></div>
                <div className='main-div-pin-show'>

                    <img className='image-show-pin' src={this.state.pin.photoUrl} alt="photo?" />

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
                            <div className="comments-in-section" >

                            </div>
                        </div>
                    </div>

                </div>
            
            
            </div>
        )
    }


}

export default PinShow;
import React from 'react';
import { Link } from 'react-router-dom';


class Feed extends React.Component {
    constructor(props) {
        super(props);

        

        this.state = {
            feed: null
        }
        
        this.photoLoaded = this.photoLoaded.bind(this);
        this.onMouseLeaveCall = this.onMouseLeaveCall.bind(this);
        this.onMouseEnterCall = this.onMouseEnterCall.bind(this);
        this.openTheLink = this.openTheLink.bind(this);

    }

    openTheLink(e){
        e.preventDefault();
        window.open(e.currentTarget.id)
    }

    onMouseLeaveCall(e){
        e.preventDefault();

        let theId = Number(e.currentTarget.children[1].children[1].getAttribute('data-div_id'))
        let shadowCover = document.getElementById(`the-shade-over-pin${theId}`)
        shadowCover.style.display = 'none'
    }

    onMouseEnterCall(e){
        e.preventDefault();

        let theId = Number(e.currentTarget.children[1].children[1].getAttribute('data-div_id'))
        let shadowCover = document.getElementById(`the-shade-over-pin${theId}`)
        shadowCover.style.display = 'block'
    }

    photoLoaded(e){
        e.preventDefault();

        let imageHeight = e.currentTarget.children[1].clientHeight;
        let spanVal = Math.trunc((imageHeight/10) + 7)
        let card = document.getElementById(`${e.currentTarget.id}`)

        card.style.gridRowEnd = `span ${spanVal}`
        e.currentTarget.style.visibility = "";
    }

    componentDidMount(){
        
        this.props.fetchFeedPins(window.currentUser.id)
    }

    componentDidUpdate(prevProps){
        
        if(this.props.feed !== prevProps.feed){
            this.setState({feed: this.props.feed})
        }
    }

    render(){

        
        
        if(!this.state.feed){
            
            return null
        }

        

        let pins = Object.values(this.state.feed)

        

        return (

            <div>
                <div className="pin-area-on-board-show" >
                    <div className="pin_container" id="pin_container">
                        {pins.map(pin => 
                                <Link to={`/pin/${pin.id}`} onLoad={this.photoLoaded} id={`card-card-card${pin.id}`} className="card-update" style={{gridRowEnd: `span 45` }, {visibility: 'hidden'}} key={pin.id} onMouseEnter={this.onMouseEnterCall} onMouseLeave={this.onMouseLeaveCall}>

                                    <div className="outside-edit-pin-board-show">

                                    </div>

                                    <div className="outside-surrounding-pin-image-div">
                                        <img loading='lazy' className="pin-photo" src={pin.photoUrl} alt="pin photo" />

                                        <div data-div_id={pin.id} className="the-shade-over-pin" id={`the-shade-over-pin${pin.id}`}>
                                            <div style={ pin.websiteURL.length < 3 ? {display: 'none'} : {display: 'flex'}} className="website-url-div-hoverthing" id={pin.websiteURL} onClick={this.openTheLink}> <img className="arr-in-website" src={window.upRightArrowURL} alt="up arrow" /> {`${pin.websiteURL}`.slice(8, 16)+ "...."}</div>
                                            
                                            {/* <div id={pin.id} className="edit-pen-div-show-board" onClick={this.modalFunction}>
                                                <img src={window.editPenURL} alt="edit pen" />
                                            </div> */}
                                        </div>

                                    </div>

                                    <div className="card-title-pin">{pin.title}</div>

                                </Link>
                        )}
                    </div>
                </div>
            </div>
            )
    }
}

export default Feed;
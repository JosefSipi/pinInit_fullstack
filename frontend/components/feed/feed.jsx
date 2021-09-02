import React from 'react';
import { Link } from 'react-router-dom';


class Feed extends React.Component {
    constructor(props) {
        super(props);

        debugger

        this.state = {
            feed: null
        }
        

    }

    componentDidMount(){
        debugger
        this.props.fetchFeedPins(window.currentUser.id).then(
            (data) => {
                debugger
                this.setState({feed: data})
            }
        )

    }

    componentDidUpdate(prevProps){
        debugger
        if(this.props.feed !== prevProps.feed){
            this.setState({feed: this.props.feed})
        }
    }

    render(){

        debugger
        
        if(!this.state.feed){
            debugger
            return null
        }

        debugger

        let pins = Object.values(this.state.feed)

        debugger

        return (

            <div> This is Home Feed
                {/* <div className="pin-area-on-board-show" >
                    <div className="pin_container" id="pin_container">
                        {pins.map(pin => 
                        //    <Link className="link-pin-on-board-pins" to={`/pin/${pin.id}`} key={pin.id + 'pin-key'}> 
                                <Link to={`/pin/${pin.id}`} onLoad={this.photoLoaded} id={`card-card-card${pin.id}`} className="card-update" style={{gridRowEnd: `span 45` }, {visibility: 'hidden'}} key={pin.id} onMouseEnter={this.onMouseEnterCall} onMouseLeave={this.onMouseLeaveCall} onClick={() => this.showPin(pin.id)}>

                                    <div className="outside-edit-pin-board-show">

                                    </div>

                                    <div className="outside-surrounding-pin-image-div">
                                        <img className="pin-photo" src={pin.photoUrl} alt="pin photo" />

                                        <div data-div_id={pin.id} className="the-shade-over-pin" id={`the-shade-over-pin${pin.id}`}>
                                            <div style={ pin.websiteURL.length < 3 ? {display: 'none'} : {display: 'flex'}} className="website-url-div-hoverthing" id={pin.websiteURL} onClick={this.openTheLink}> <img className="arr-in-website" src={window.upRightArrowURL} alt="up arrow" /> {`${pin.websiteURL}`.slice(8, 16)+ "...."}</div>
                                            
                                            <div id={pin.id} className="edit-pen-div-show-board" onClick={this.modalFunction}>
                                                <img src={window.editPenURL} alt="edit pen" />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="card-title-pin">{pin.title}</div>

                                </Link>
                            // </Link>
                        )}
                    </div>
                </div> */}
            </div>
            )
    }
}

export default Feed;
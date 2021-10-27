import React from 'react';
import { Link } from 'react-router-dom';

class SearchFeed extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            feed: null
        }

        this.openTheLink = this.openTheLink.bind(this);
        this.photoLoaded = this.photoLoaded.bind(this);
    }

    componentDidMount(){
        // make backend call to get data for setting feed in state
        debugger
        this.props.searchFeedCall(this.props.history.location.params)
    }

    componentDidUpdate(){
        // if(this.props.feed !== prevProps.feed){
        //     this.setState({feed: this.props.feed})
        // }
    }

    photoLoaded(e){
        e.preventDefault();

        let titleCondition = !!e.currentTarget.getAttribute('data-link_title')
        let imageHeight = e.currentTarget.children[1].clientHeight;
        let spanVal
        {titleCondition ? spanVal = Math.trunc((imageHeight/10) + 5) : spanVal = Math.trunc((imageHeight/10) + 2)  }
        let card = document.getElementById(`${e.currentTarget.id}`)
        card.style.gridRowEnd = `span ${spanVal}`
        e.currentTarget.style.visibility = "";
    }

    openTheLink(e){
        e.preventDefault();
        window.open(e.currentTarget.id)
    }

    render(){

        // if(!this.state.feed){
        //     return null
        // }

        // let pins = Object.values(this.state.feed)

        return(
            // <div className='search-feed-main-div'>
            //    <div className="pin_container" id="pin_container">
            //         {pins.map(pin => 
            //             <Link 
            //                 data-link_title={pin.title} 
            //                 to={`/pin/${pin.id}`} onLoad={this.photoLoaded} 
            //                 id={`card-card-card${pin.id}`} className="card-update" 
            //                 style={{gridRowEnd: `span 45` }, {visibility: 'hidden'}} 
            //                 key={pin.id} 
            //                 onMouseEnter={this.onMouseEnterCall} 
            //                 onMouseLeave={this.onMouseLeaveCall}
            //             >

            //                 <div className="outside-edit-pin-board-show"></div>

            //                 <div className="outside-surrounding-pin-image-div">
            //                     <img loading='lazy' className="pin-photo" src={pin.photoUrl} alt="pin photo" />

            //                     <div data-div_id={pin.id} className="the-shade-over-pin" id={`the-shade-over-pin${pin.id}`}>
            //                         <div 
            //                             style={ pin.websiteURL.length < 3 ? {display: 'none'} : {display: 'flex'}} 
            //                             className="website-url-div-hoverthing" 
            //                             id={pin.websiteURL} onClick={this.openTheLink}>
            //                                 <img className="arr-in-website" src={window.upRightArrowURL} alt="up arrow" /> 
            //                                 {`${pin.websiteURL}`.slice(8, 16)+ "...."}
            //                         </div>
            //                     </div>

            //                 </div>

            //                 <div className="card-title-pin">{pin.title}</div>

            //             </Link>
            //         )}
            //     </div>
            // </div>
            <div>Testing run search feed</div>
        )
    }
}

export default SearchFeed;
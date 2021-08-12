import React from 'react';

class PinShow extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pin: null
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

        return(
            <div>This is pin show container{this.props.match.params.id}

                <div className='main-div-pin-show'>

                    <img className='image-show-pin' src={this.state.pin.photoUrl} alt="photo?" />

                    <div className='right-half-pin-show'>
                        <div className='top-bar-right-show-pin'>

                        </div>
                        <a className='url-link-tag' href={this.props.pin.websiteURL}>{this.props.pin.websiteURL}</a>
                    </div>

                </div>
            
            
            </div>
        )
    }


}

export default PinShow;
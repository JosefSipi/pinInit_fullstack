import React from "react";

class Landing extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            displayPhoto: 0,
            images: {
                0: window.gif_0,
                1: window.gif_1,
                2: window.gif_2,
                3: window.gif_3,
                4: window.gif_4,
            }
        }

        this.arrowClick = this.arrowClick.bind(this);
    }

    arrowClick(e){
        e.preventDefault();
        let pNum = this.state.displayPhoto
        
        if(e.currentTarget.id === 'landing-left'){
            if(pNum === 0){
                this.setState({displayPhoto: 5})
            } else {
                this.setState({displayPhoto: pNum - 1})
            }
        } else {
            
            if(pNum === 5){
                this.setState({displayPhoto: 0})
            } else {
                this.setState({displayPhoto: pNum + 1})
            }
        }
    }

    render(){

        debugger
        return (

            <div className='main-splash'>
                <div onClick={this.arrowClick} className='arrow-landing' id='landing-left'><img src={window.left_arrow} alt="" /></div>
                <div className='list-div-splash'>
            
                    <img src={this.state.images[this.state.displayPhoto]} alt="gif 1" />
                </div>
                <div onClick={this.arrowClick} id='landing-right' className='arrow-landing' ><img src={window.right_arrow} alt="" /></div>
            </div>
        )
    }
}

export default Landing;
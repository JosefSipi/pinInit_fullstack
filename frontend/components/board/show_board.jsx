import React from 'react';


class BoardShow extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        fetchBoards()
    }

    render(){
        return (
        <div>

            <div className="boards-grid-area">
                
                <div className="images-part-board">
                    
                    {/* will contain images of pins from within the board */}
                </div>

                <div className="title-pinscount-updatedat">
                    <h1>{this.props.title}</h1>
                </div>

            </div>

        </div>
        )
    }
}

export default BoardShow;
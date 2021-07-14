import React from 'react';


class BoardShow extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        debugger
        this.props.fetchBoard(Number(this.props.match.params.id)),
        console.log(Number(this.props.match.params.id))
        debugger
    }

    render(){
        debugger
        return (
        <div>

            <div className="boards-grid-area-for-pins">
                
                <div className="top-section">
                    <h1>{this.props.boards.title}</h1>
                    <img src="" alt="" />
                </div>

                <div className="title-pinscount-updatedat">
                    <h1>{this.props.boards.title}</h1>
                </div>

            </div>

        </div>
        )
    }
}

export default BoardShow;
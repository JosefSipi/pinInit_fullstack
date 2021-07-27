import React from 'react';

class EditPinShow extends React.Component {
    constructor(props){
        super(props);
        debugger

        this.state= {
            // pin: this.props.pins.displayPin
        }

    }

    componentDidMount(){
        console.log('pin edit modal component did mount')
        // this.props.fetchPin(window.editingPin)
    }

    render(){
        debugger
        return(
            <div>This is the edit pin modal</div>
        )
    }
    

}

export default EditPinShow;
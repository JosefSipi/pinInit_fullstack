import React from 'react';


class Signup extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            email: "",
            password: "",
            age: ""
        };
    }

    handelInput(field){
        return (e) => {
            this.setState({[field]: e.target.value });
        };
    }

    // handel submit function

    handelSubmit(e) {
        e.preventDefault();
        this.props.createNewUser(this.state)
            .then(() => this.props.history.push('/')); // here we will want to redirect the user to their home feed and display a welcome model
    }
    render(){
        return (
            <div></div>
        )
    }
}


export default Signup;
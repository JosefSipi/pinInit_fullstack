import React from 'react';


class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            age: ""
        };
        this.handelSubmit = this.handelSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }

    onChange(field){
        return (e) => {
            this.setState({[field]: e.target.value });
        };
    }

    handelSubmit(e) {
        e.preventDefault();
        
        this.props.createNewUser(this.state)
            .then(() => {
                this.props.history.push('/feed'),
                this.props.closeModal();
            }); // here we will want to redirect the user to their home feed and display a welcome model
    }

    renderErrors() {
        return (
            <ul>
                {this.props.errors.map((error, i) => (
                    <div key={i}>{error} </div>
                )
                    )}
            </ul>
        )
    }



    render(){
        return (

            <div className="session-form">
                <div className="theX" onClick={this.props.closeModal}>X</div>

                    <img className="logo-modal" src={require('../images/logo.png')} alt="pinterest logo" />

                    <h2>Welcome to Pininit</h2>
                    <h3>Find new ideas to try</h3>

                <div className="second-part-form">

                <form className="page-form" onSubmit={this.handelSubmit}>
                    
                        <label className="input-box"> 
                        <input 
                            type="text"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.onChange("email")}
                        />
                    </label>

                    <label className="input-box">
                        <input
                            type="password"
                            placeholder="Create a password"
                            value={this.state.password}
                            onChange={this.onChange("password")}
                        />
                    </label>

                    <label className="input-box">
                        <input
                            type="number"
                            placeholder="Age"
                            value={this.state.age}
                            onChange={this.onChange("age")}
                        />
                    </label>

                    <div className="errors">{this.renderErrors()}</div>

                    <input className="login-button" type="submit" value="Continue" />

                </form>
                    <a className="sign-up-small-btn" href="#0" onClick={() => this.props.openModal('login')}>Already a member? Log in</a>
             </div>
            </div>

        )
    }
}


export default SignUp;
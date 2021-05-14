import React from 'react';


class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
        this.handelSubmit = this.handelSubmit.bind(this);
        this.handelDemo = this.handelDemo.bind(this);
        this.renderErrors = this.renderErrors.bind(this);

    }

    onChange(field) {
        return (e) => {
            this.setState({ [field]: e.target.value });
        };
    }

    handelSubmit(e) {

        e.preventDefault();

        this.props.login(this.state)
            .then(() => {
                this.props.history.push('/feed'),
                this.props.closeModal();
            }); // here we will want to redirect the user to their home feed
    }


    handelDemo(e){
        this.props.login({email: "demoUser@email.com", password: "123456"})
            .then(() => { 
                this.props.history.push('/feed'), 
                this.props.closeModal();
            });
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


    render() {
        return (

            <div className="session-form" >

                
            <div className="logo-and-X">

                <div id="spaceholder"> </div>

                <div className="image-div">
                     <img className="logo-modal" src={require('../images/logo.png')} alt="pinterest logo" />
                </div>

                <div className="theX" onClick={this.props.closeModal}>X</div>

            </div>

                <h2>Welcome to PinInit</h2>
            <div className="second-part-form"></div>
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
                            placeholder="password"
                            value={this.state.password}
                            onChange={this.onChange("password")}
                        />
                    </label>

                    <div className="errors">{this.renderErrors()}</div> 

                    <input className="login-button" type="submit" value="Log in" />

                    <input className="login-button" type="submit" onClick={this.handelDemo} value="DemoUser" />
                </form>

                <a className="sign-up-small-btn" href="#0" onClick={() => this.props.openModal('signup')}>Not on Pininit yet? Sign up</a>
            </div>

        )
    }
}



export default LogIn;
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
                this.props.history.push('/feed');
                this.props.closeModal();
            }); // here we will want to redirect the user to their home feed
    }


    handelDemo(e){
        this.setState({ email: "demoUser@email.com", password: "123456" });
        this.props.login({email: "demoUser@email.com", password: "123456"})
            .then(() => { 
                this.props.history.push('/feed');

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

        <div className="the-outer-box-modal">

                <div className="logo-and-X">


                    <div className="image-div">

                        <img className="logo-modal" src={window.logoURL} alt="logo" />
                    </div>


                    <div className="logo-on-logged-in-header-x">
                        <img className="logo-modal-x" src={window.theXURL} alt="X logo" onClick={this.props.closeModal} />
                    </div>

                
                </div>


            <div className="session-form" >





                <h1 className="welcome-pin-login">Welcome to Pininit</h1>


                <form className="main-login-form" onSubmit={this.handelSubmit}>

                    <input
                        className="input-box"
                        type="text"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.onChange("email")}
                    />

                    <input
                        className="input-box"
                        type="password"
                        placeholder="password"
                        value={this.state.password}
                        onChange={this.onChange("password")}
                    />

                    <h2 className="forgot-pw">Forgot your password?</h2>

                    <input className="login-button" type="submit" value="Log in" />

                    <h1 className="or-login-page">OR</h1>
                    
                    
                    <div className="second-part-form"></div>


                    <input className="login-button" type="submit" onClick={this.handelDemo} value="DemoUser" />

                </form>
                    <form className="page-form" onSubmit={this.handelSubmit}>
                        <div className="errors">{this.renderErrors()}</div> 
                    </form>

                <h3 className="policy-text">By continuing, you agree to Pininit's </h3><h3 className="dark-text">Terms of Service, Privacy policy.</h3>

                <div className="gray-line"></div>

                <div className="sign-up-small-btn" href="#0" onClick={() => this.props.openModal('signup')}>Not on Pininit yet? Sign up</div>
            </div>
        </div>

        )
    }
}



export default LogIn;
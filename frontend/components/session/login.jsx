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
                // window.location.reload();
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


        let theError

        if (this.props.errors === 'The password you entered is incorrect.'){
            <div>{this.props.errors}</div>
        }

        return (
            <ul>
                {this.props.errors.map((error, i) => (
                    <div key={i}>{error === 'The password you entered is incorrect.' ? error : null} </div>
                )
                )}
            </ul>
        )
    }


    render() {


        let emailError
        let pwError

        

        if (!!this.props.errors){

            if (this.props.errors[0] === 'The email you entered does not belong to any account.'){
                emailError = 'The email you entered does not belong to any account.'
                pwError = false

            } else if ( this.props.errors[0] === 'The password you entered is incorrect.' && this.state.email !== null && this.state.email !== ""){
                pwError = 'The password you entered is incorrect.'
                emailError = false
            }


        }

        return (

        <div className="the-outer-box-modal">

                <div className="logo-and-X">


                    <div className="image-div">

                        <img className="logo-modal" src={window.logoURL} alt="logo" />
                    </div>

                    <div className='logo-x-out-div'>
                        <div className="logo-on-logged-in-header-x">
                            <img className="logo-modal-x" src={window.theXURL} alt="X logo" onClick={this.props.closeModal} />
                        </div>
                    </div>

                
                </div>


            <div className="session-form" >





                <h1 className="welcome-pin-login">Welcome to Pininit</h1>


                <form className="main-login-form" onSubmit={this.handelSubmit}>

                    <input
                        id='input-box-email'
                        className={`input-box ${emailError ? 'input-error' : null}`}
                        type="text"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.onChange("email")}
                    />
                    {emailError ? <div className='pwError-div' >{emailError}</div> : null}
                    <input
                        id='input-box-pw'
                        className={`input-box ${pwError ? 'input-error' : null}`}
                        type="password"
                        placeholder="password"
                        value={this.state.password}
                        onChange={this.onChange("password")}
                    />
                    {pwError ? <div className='pwError-div'>{pwError}</div> : null}
                    {/* <h2 className="forgot-pw">Forgot your password?</h2> */}

                    <input className="top-margin-login-button" type="submit" value="Log in" />

                    <h1 className="or-login-page">OR</h1>
                    
                    
                    <div className="second-part-form"></div>


                    <input className="login-button" type="submit" onClick={this.handelDemo} value="DemoUser" />

                </form>
                    {/* <form className="page-form" onSubmit={this.handelSubmit}>
                        <div className="errors">{this.renderErrors()}</div> 
                    </form> */}

                <h3 className="policy-text">By continuing, you agree to Pininit's </h3><h3 className="dark-text">Terms of Service, Privacy policy.</h3>

                <div className="gray-line"></div>

                <div className="sign-up-small-btn" href="#0" onClick={() => this.props.openModal('signup')}>Not on Pininit yet? Sign up</div>
            </div>
        </div>

        )
    }
}



export default LogIn;
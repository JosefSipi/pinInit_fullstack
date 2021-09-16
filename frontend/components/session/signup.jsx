import React from 'react';
// import DocumentPicker from 'react-native-document-picker';

class SignUp extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            age: '',
            // profile_pic: null          //--form Data format -'refactor'
        };
        this.state = {
            errors: null
        }

        
        this.handelSubmit = this.handelSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
        this.handelFile = this.handelFile.bind(this);
    }

    onChange(field){
        return (e) => {
            this.setState({[field]: e.target.value });
        };
    }

// -- using form data format--

    handelSubmit(e) {
        e.preventDefault();

        this.props.createNewUser(this.state)
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
//-------------------------------------
    handelFile(e){

        this.setState({profile_pic: e.currentTarget.files[0]})
    }
//-------------------------------------
    render(){
        


        let emailError
        let pwError
        let ageError

        this.props.errors.map((error) => {
            if(error === "Age can't be blank") {
                ageError = "Age can't be blank"
            } else if (error === "Password is too short (minimum is 6 characters)"){
                pwError = "Your password is too short! You need 6+ characters."
            } else if (error === "Email has already been taken" || error === "Username has already been taken") {
                emailError = 'Email has already been taken'
            }
        }

        )

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
                

                <div className="session-form-signUp">

                    <h1 className="welcome-pin-login-signUp">Welcome to Pininit</h1>
                    <h3 className="findNew-signUp">Find new ideas to try</h3>
                    {/* <div className="errors">{this.renderErrors()}</div> */}



                <form className="main-login-form" onSubmit={this.handelSubmit}>
                        <input
                            className={`${emailError ? 'input-box-signUp-error' : 'input-box-signUp'}`}
                            type="text"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.onChange("email")}
                        />
                        {emailError ? <div className='pwError-div' >{emailError}</div> : null}
                        <input
                            className={`${pwError ? 'input-box-signUp-error' : 'input-box-signUp'}`}
                            type="password"
                            placeholder="Create a passowrd"
                            value={this.state.password}
                            onChange={this.onChange("password")}
                        />
                        {pwError ? <div className='pwError-div' >{pwError}</div> : null}
                        <input
                            className={`${ageError ? 'input-box-signUp-error' : 'input-box-signUp'}`}
                            type="number"
                            placeholder="Age"
                            value={this.state.age}
                            onChange={this.onChange("age")}
                        />
                        {ageError ? <div className='pwError-div' >{ageError}</div> : null}
                       
                        <input className="login-button-signUp-Modal" type="submit" value="Continue" />



                        <h1 className="or-login-page">OR</h1>
                    {/* <div className="has-continue-btn"> */}
                        <h3 className="policy-text-signUp">By continuing, you agree to Pininit's </h3><h3 className="dark-text-signUp">Terms of Service, Privacy policy.</h3>
                        <div className="sign-up-small-btn" href="#0" onClick={() => this.props.openModal('login')}>Already a member? Log in</div>

                    {/* </div> */}

                </form>
{/* -------------------------------------------- */}

                {/* <form className="page-form" onSubmit={this.handelSubmit}> */}
                    



                        {/* <input type="file" className="input-box" onChange={this.handelFile}/> */}
                        {/* <input type="file" className="input-box" onChange={this.handelFile} /> */}

                  



                    {/* <input className="login-button" type="submit" value="Continue" /> */}

                {/* </form> */}
                    
             </div>
            </div>

        )
    }
}


export default SignUp;
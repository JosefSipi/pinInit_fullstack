import React from 'react';


class SignUp extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            age: "",
            profile_pic: null
        };
        this.handelSubmit = this.handelSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
        //-------------------------------------
        this.handelSubmitPhoto = this.handelSubmitPhoto.bind(this);
        this.handelFile = this.handelFile.bind(this);
        //-------------------------------------
    }

    onChange(field){
        return (e) => {
            this.setState({[field]: e.target.value });
        };
    }

    handelSubmit(e) {
        e.preventDefault();

        //-------------------------------------
        this.handelSubmitPhoto();
        //-------------------------------------
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
    handelSubmitPhoto(){
        // e.preventDefault();
        const formData = new FormData();
        formData.append('user[profile_pic]', this.state.profile_pic)
        formData.append('user[email]', this.state.email)
        formData.append('user[password]', this.state.password)
        formData.append('user[age]', this.state.password)
        this.setState(formData)
    }


    handelFile(e){

        this.setState({profile_pic: e.currentTarget.files[0]})
    }
//-------------------------------------
    render(){
        return (

            <div className="session-form">
                {console.log(this.state)}

                <div className="logo-on-logged-in-header-x">
                    <img className="logo-modal-x" src={require('../images/the-X.png')} alt="pinterest logo" onClick={this.props.closeModal} />
                </div>

                    <img className="logo-modal" src={require('../images/logo.png')} alt="pinterest logo" />

                    <h2>Welcome to Pininit</h2>
                    <h3>Find new ideas to try</h3>

                <div className="second-part-form">

                <form className="page-form" onSubmit={this.handelSubmit}>
                    
                        <input type="file" className="input-box" onChange={this.handelFile}/>
                        {/* <input type="file" className="input-box" onChange={this.handelFile} /> */}

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
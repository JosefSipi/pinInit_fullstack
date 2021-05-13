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
            <div className="session-form" onSubmit={this.handelSubmit}>
                {/* <div onClick={this.props.closeModal()}>X</div> */}
                <h2>Sign Up!</h2>
                <form>
                    <label>Email:
                        <input 
                            type="text"
                            value={this.state.email}
                            onChange={this.onChange("email")}
                        />
                    </label>
                    <label>age:
                        <input
                            type="number"
                            value={this.state.age}
                            onChange={this.onChange("age")}
                        />
                    </label>
                    <label>Password:
                        <input
                            type="password"
                            value={this.state.password}
                            onChange={this.onChange("password")}
                        />
                    </label>

                    {this.renderErrors()}

                    <button >Continue</button>
                    <button onClick={() => this.props.openModal('login')}>Sign in</button>
                </form>

            </div>
        )
    }
}


export default SignUp;
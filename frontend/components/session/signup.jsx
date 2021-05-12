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
    }

    onChange(field){
        return (e) => {
            this.setState({[field]: e.target.value });
        };
    }

    // handel submit function

    handelSubmit(e) {
        debugger
        e.preventDefault();
        debugger
        this.props.createNewUser(this.state)
            .then(() => this.props.history.push('/')); // here we will want to redirect the user to their home feed and display a welcome model
    }
    render(){
        return (
            <div className="session-form" onSubmit={this.handelSubmit}>
                <h2>Sign Up!</h2>
                <form>
                    <label>Email:
                        <input 
                            type="text"
                            value={this.state.email}
                            onChange={this.onChange("email")}
                        />
                    </label>
                    <label>Password:
                        <input
                            type="password"
                            value={this.state.password}
                            onChange={this.onChange("password")}
                        />
                    </label>
                    <label>age:
                        <input
                            type="number"
                            value={this.state.age}
                            onChange={this.onChange("age")}
                        />
                    </label>
                    <button >Continue</button>
                </form>

            </div>
        )
    }
}


export default SignUp;
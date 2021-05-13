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
                {/* <div onClick={this.props.closeModal()}>X</div> */}
                <h2>Welcome to PinInit</h2>
                <form className="login-form" onSubmit={this.handelSubmit}>
                    <label>Email:
                        <input
                            type="text"
                            value={this.state.email}
                            onChange={this.onChange("email")}
                            />
                    </label>
                        {this.renderErrors()}
                    <label>Password:
                        <input
                            type="password"
                            value={this.state.password}
                            onChange={this.onChange("password")}
                        />
                    </label>
                    <input className="login-button" type="submit" value="Log in" />
                    <button onClick={this.handelDemo}>DemoUser</button>
                    <button onClick={() => this.props.openModal('signup')}>Sign up</button>
                </form>

            </div>
        )
    }
}



export default LogIn;
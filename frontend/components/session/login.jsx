import React from 'react';


class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
        this.handelSubmit = this.handelSubmit.bind(this);
    }

    onChange(field) {
        return (e) => {
            this.setState({ [field]: e.target.value });
        };
    }

    // handel submit function

    handelSubmit(e) {

        e.preventDefault();

        this.props.login(this.state)
            .then(() => this.props.history.push('/feed')); // here we will want to redirect the user to their home feed
    }
    render() {
        return (
            <div className="session-form" onSubmit={this.handelSubmit}>
                <h2>Log in</h2>
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
                    
                    <button >Log in</button>
                </form>

            </div>
        )
    }
}


export default LogIn;
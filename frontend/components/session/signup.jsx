import React from "react";

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: null,
      age: null,
    };
    this.state = {
      errors: null,
      emailErrorCheck: null,
    };

    this.handelSubmit = this.handelSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.setState({ email: "" });
  }

  onChange(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }

  validateEmail() {
    let input = this.state.email;
    const isValidTxt =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (isValidTxt.test(input)) {
      this.setState({ emailErrorCheck: null });
      this.setState({ passowrd: "" });
      return false;
    } else {
      if (input === "") {
        this.setState({ passowrd: null });
        return "You missed a spot! Don't forget to add your email.";
      } else {
        this.setState({ passowrd: null });
        return "Hmm...that doesn't look like an email address.";
      }
    }
  }

  handelSubmit(e) {
    e.preventDefault();
    if (!!this.validateEmail()) {
      this.setState({ emailErrorCheck: this.validateEmail() });
    } else {
      this.props.createNewUser(this.state).then(() => {
        this.props.history.push("/feed"), this.props.closeModal();
      });
    }
  }

  render() {
    let emailError = this.state.emailErrorCheck;
    let pwError = null;
    let ageError = null;

    if (!this.state.emailErrorCheck) {
      if (!!this.props.errors) {
        this.props.errors.map((error) => {
          if (
            error === "Email has already been taken" ||
            error === "Username has already been taken"
          ) {
            emailError = "Email has already been taken";
            pwError = null;
            ageError = null;
          } else {
            this.props.errors.map((error) => {
              if (error === "Age can't be blank") {
                ageError = "Age can't be blank";
              }
              if (error === "Password is too short (minimum is 6 characters)") {
                pwError = "Your password is too short! You need 6+ characters.";
              }
              if (this.state.passowrd === "" || this.state.passowrd === null) {
                pwError = "Password can't be blank, You need 6+ characters.";
              }
            });
          }
        });
      }
    }

    return (
      <div className="the-outer-box-modal">
        <div className="logo-and-X">
          <div className="image-div">
            <img className="logo-modal" src={window.logoURL} alt="logo" />
          </div>

          <div className="logo-x-out-div">
            <div className="logo-on-logged-in-header-x">
              <img
                className="logo-modal-x"
                src={window.theXURL}
                alt="X logo"
                onClick={this.props.closeModal}
              />
            </div>
          </div>
        </div>

        <div className="session-form-signUp">
          <h1 className="welcome-pin-login-signUp">Welcome to Pininit</h1>
          <h3 className="findNew-signUp">Find new ideas to try</h3>
          <form className="main-login-form" onSubmit={this.handelSubmit}>
            <input
              type="text"
              autoComplete="off"
              className={`${
                emailError ? "input-box-signUp-error" : "input-box-signUp"
              }`}
              placeholder="Email"
              value={this.state.email}
              onChange={this.onChange("email")}
            />
            {emailError && <div className="pwError-div">{emailError}</div>}
            <input
              type="password"
              autoComplete="off"
              className={`${
                pwError ? "input-box-signUp-error" : "input-box-signUp"
              }`}
              placeholder="Create a passowrd"
              value={this.state.password}
              onChange={this.onChange("password")}
            />
            {pwError && <div className="pwError-div">{pwError}</div>}
            <input
              type="number"
              autoComplete="off"
              className={`${
                ageError ? "input-box-signUp-error" : "input-box-signUp"
              }`}
              placeholder="Age"
              value={this.state.age}
              onChange={this.onChange("age")}
            />
            {ageError && <div className="pwError-div">{ageError}</div>}
            <input
              className="login-button-signUp-Modal"
              type="submit"
              value="Continue"
            />
            <h1 className="or-login-page">OR</h1>
            <h3 className="policy-text-signUp">
              By continuing, you agree to Pininit's{" "}
            </h3>
            <h3 className="dark-text-signUp">
              Terms of Service, Privacy policy.
            </h3>
            <div
              className="sign-up-small-btn"
              href="#0"
              onClick={() => this.props.openModal("login")}
            >
              Already a member? Log in
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;

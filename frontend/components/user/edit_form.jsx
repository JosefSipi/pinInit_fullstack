import React from 'react';


class Edit extends React.Component {
    constructor(props) {
        super(props);
        console.log("you made it to constructor in edit_form");
        this.state = {
            photoFile: null,
            f_name: "",
            l_name: "",
            username: "",
            bio: "",
        };
        this.handelSubmit = this.handelSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
        this.handelFile = this.handelFile.bind(this);
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

    // below this new
    onChange(field) {
        return (e) => {
            this.setState({ [field]: e.target.value });
        };
    }

    handelFile (e){
        this.setState({photoFile: e.target.files[0]});
    }

    handelSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append('user[profile_pic]', this.state.photoFile);
        formData.append('user[f_name]', this.state.f_name);
        formData.append('user[l_name]', this.state.l_name);
        formData.append('user[username]', this.state.username);
        formData.append('user[bio]', this.state.bio);
        // formData.append('user[websiteUrl]', this.state.websiteUrl);
        // formData.append('user[location]', this.state.location);
        this.props.
    }

    render() {
        return (

            <div>

                <form id="edit-form" >
                    <h1>Edit profile</h1>
                    <h2>People visiting your profile will see the following info</h2>

                <div>Photo
                    
                    <img src={this.props.user.photoUrl} alt="photo" />

                    <input 
                        type="file" 
                        onChange={this.handleFilel}
                    />
                    {/* needs a button that reads "change" */}
                </div>


                    <div>
                        <label>First name
                            <input 
                                type="text" 
                                value={this.state.f_name} 
                                onChange={this.onChange("f_name")}
                            />
                        </label>

                        <label>Last name
                            <input 
                                type="text" 
                                value={this.state.l_name}
                                onChange={this.onChange("l_name")}
                            />
                        </label>
                    </div>

                        <label>Username
                                <input
                                type="text"
                                value={this.state.username}
                                onChange={this.onChange("username")}
                            />
                            {/* {this will be the user's profile url} */}
                        </label>

                        <label>About your profile
                                <input
                                type="textare"
                                value={this.state.bio}
                                onChange={this.onChange("bio")}
                            />
                        </label>

                        {/* input for a link to a website link of user's choice */}
                            {/* this will be user's location */}
                        {/* <input 
                            type="text" 
                            value={this.state.location}
                        /> */}
                    <div className="errors">{this.renderErrors()}</div>
                </form>
                    <div>
                        <input type="button" value="Reset" />
                        <input form="edit-form" type="button" value="Save"/>
                    </div>
            </div>
            

        )
    }
}


export default Edit;
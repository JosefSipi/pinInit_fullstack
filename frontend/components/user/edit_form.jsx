import React from 'react';



class EditForm extends React.Component {
    constructor(props){
        super(props);
        this.state = this.props.user;
    }


    componentDidMount(){

        this.props.fetchUser(window.currentUser.id);
    }

    handleChange(field){
        return e => {
            this.setState({ [field]: e.currentTarget.value });
        };
    }



    render(){

        return (
            <div>

                <div className="side-bar-edit-form">
                        <ul>
                            <li>Edit profile</li>
                            <li>Account settings</li>
                            <li>Home feed tuner</li>
                            <li>Claim</li>
                            <li>Notifications</li>
                            <li>Privacy and data</li>
                            <li>Security</li>
                            <li>Apps</li>
                        </ul>
                </div>

                <form className="main-edit-form" onSubmit={this.handleSubmit}>

                    <div className="edit-profile-box1">
                        <h1>Edit profile</h1>
                        <h3>People visiting your profile will see the following info</h3>
                    </div>

                    <div className="phot-label-txt">
                        <h4>Photo</h4>
                    </div>

                    <div className="profile-pic-edit">

                        <div className="profile-div-edi-form">
                            <img className="profile-photo-edit-form" src={this.props.user.photoUrl} alt="profile photo" />
                        </div>

                        <button className="signup-btn" onClick={() => this.props.openModal('uploadPhoto')}>
                            Change
                        </button>

                    </div>

                    <div className="f-name-l-name-edit">
                        <div className="edit-f-name" >
                            <h4>First name</h4>
                            <input 
                                placeholder="Ex. Jo"
                                onChange={this.handleChange('f_name')}
                                type="text"
                                value={this.state.f_name}
                            />
                        </div>

                        <div className="edit-l-name" >
                            <h4>Last name</h4>
                            <input
                                placeholder="Ex. Smith"
                                onChange={this.handleChange('l_name')}
                                type="text"
                                value={this.state.l_name}
                            />
                        </div>

                    </div>

                    <div className="edit-username" >

                        <h4>Username</h4>

                        <input
                            onChange={this.handleChange('username')}
                            type="text"
                            value={this.state.username}
                        />

                        <h4>this will be user's profile URL</h4>

                    </div>

                    <div className="edit-bio">
                        <input 
                            placeholder="Write a little bit about yourself here"
                            onChange={this.handleChange('bio')}
                            type="textare"
                            value={this.state.bio}
                        />
                    </div>

                    <div className="edit-user-website-url" >
                        <h4>Website URL</h4>
                        <input
                            type="text"
                            // value={this.state.user_url}
                        />
                    </div>

                    <div>
                        <div className="edit-location" >
                            <h4>Location</h4>
                            <input
                                placeholder="Ex. San Francisco, CA"
                                type="text"
                                // value={this.state.location}
                            />
                        </div>
                    </div>

                </form>



                <div className="footer-bar">
                    <button>Reset</button>
                    <button>Save</button>
                </div>



            </div>
        );
    }
}


export default EditForm;
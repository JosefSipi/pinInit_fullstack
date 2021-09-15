import React from 'react';



class EditForm extends React.Component {
    constructor(props){
        super(props);
        // this.state = this.props.user;
        this.state = {
            editUser: undefined,
            ogEditUser: undefined
        }
    }


    componentDidMount(){

        this.props.fetchUser(this.props.currentUser.id).then(
            (data) => {
                let firstEditUser = {}

                debugger
                firstEditUser.f_name = (data.user.f_name === null ? '' : data.user.f_name)
                firstEditUser.l_name = (data.user.l_name === null ? '' : data.user.l_name)
                firstEditUser.bio = (data.user.bio === null ? '' : data.user.bio)
                firstEditUser.username = (data.user.username === null ? '' : data.user.username)
                this.setState({editUser: firstEditUser})
                debugger
                this.setState({ogEditUser: firstEditUser})
            }
        )
    }

    handleChange(field){
        debugger
        let prevEditUser = {...this.state.editUser}
        
        return e => {
            prevEditUser[field] = e.currentTarget.value
            // prevEditUser.field = e.currentTarget.value
            this.setState({ editUser: prevEditUser});
            debugger
        };
    }



    render(){
        debugger

        if(!!!this.state.editUser){
           return null
        }

        debugger

        let btnStat = false

        let a = this.state.ogEditUser
        let b = this.state.editUser
    if(a && b){
        if(a['bio'] === b['bio'] && a['f_name'] === b['f_name'] && a['l_name'] === b['l_name'] && a['username'] === b['username']){
            btnStat = true
        }
    }

        return (
        <div className='box-div-edit-user'>
            <div className='edit-profile-main-div'>

                {/* <div className="side-bar-edit-form">
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
                </div> */}
            <div>
                           
                <form className="main-edit-form" onSubmit={this.handleSubmit}>

                    <div className="edit-profile-box1">
                        <h1 className='large-txt-edit-profile' >Public Profile</h1>
                        <h3 className='sub-text-edit-profile' >People visiting your profile will see the following info</h3>
                    </div>

                    <div className="phot-label-txt">
                        <h4 className='photo-hfour-lab'>Photo</h4>
                    </div>

                    <div className="profile-pic-edit">

                        <div className="profile-div-edi-form">
                            <img className="profile-photo-edit-form" src={this.props.user.photoUrl} alt="profile photo" />
                        </div>

                        <button className="signup-btn edit-board-btn" onClick={() => this.props.openModal('uploadPhoto')}>
                            Change
                        </button>

                    </div>

                    <div className="f-name-l-name-edit">
                        <div className="edit-f-name" >
                            <h4>First name</h4>
                            <input 
                                className='input-txt-edit-profile'
                                placeholder="Ex. Jo"
                                onChange={this.handleChange('f_name')}
                                type="text"
                                // value={this.state.editUser.f_name}
                                value={!!this.state.editUser.f_name ? this.state.editUser.f_name : ''}
                            />
                        </div>

                        <div className="edit-l-name" >
                            <h4>Last name</h4>

                            <input
                                className='input-txt-edit-profile'
                                placeholder="Ex. Smith"
                                onChange={this.handleChange('l_name')}
                                type="text"
                                // value={this.state.l_name}
                                value={!!this.state.editUser.l_name ? this.state.editUser.l_name : ''}
                            />
                        </div>

                    </div>


                    <div className="edit-input-edit-user">
                        <h4 className='description-txt-edit-profile' >Short Bio</h4>
                        <input 
                            className='input-txt-edit-profile'
                            placeholder="Write a little bit about yourself here"
                            onChange={this.handleChange('bio')}
                            type="textare"
                            // value={this.state.bio}
                            value={!!this.state.editUser.bio ? this.state.editUser.bio : ''}
                        />
                    </div>

                    {/* <div className="edit-input-edit-user" >
                        <h4 className='description-txt-edit-profile' >Website</h4>
                        <input
                            className='input-txt-edit-profile'
                            type="text"
                            // value={this.state.user_url}
                        />
                    </div> */}

                    {/* <div className="edit-input-edit-user" >
                        <h4 className='description-txt-edit-profile' >Location</h4>
                        <input
                            className='input-txt-edit-profile'
                            placeholder="Ex. San Francisco, CA"
                            type="text"
                            // value={this.state.location}
                        />
                    </div> */}

                    <div className="edit-input-edit-user" >

                        <h4 className='description-txt-edit-profile' >Username</h4>

                        <input
                            className='input-txt-edit-profile'
                            onChange={this.handleChange('username')}
                            type="text"
                            // value={this.state.username}
                            value={!!this.state.editUser.username ? this.state.editUser.username : ''}
                        />

                        {/* <h4>this will be user's profile URL</h4> */}

                    </div>

                </form>

            </div> 




            </div>

                <div className="footer-bar">
                    <button className={btnStat ? 'normal-btn-edit-prof' : 'normal-btn-edit-prof buttons-edit-active-reset'}>Reset</button>
                    {/* <button className={{...this.state.editUser} === {...this.state.ogEditUser} ? 'normal-btn-edit-prof' : 'normal-btn-edit-prof buttons-edit-active-reset'}>Reset</button> */}
                    {/* <button className={'normal-btn-edit-prof buttons-edit-active-reset'}>Reset</button> */}
                    <button className={btnStat ? 'normal-btn-edit-prof' : 'normal-btn-edit-prof buttons-edit-active-save'}>Save</button>
                    {/* <button className={{...this.state.editUser} === {...this.state.ogEditUser} ? 'normal-btn-edit-prof' : 'normal-btn-edit-prof buttons-edit-active-save'}>Save</button> */}
                    {/* <button className={ 'normal-btn-edit-prof buttons-edit-active-save'}>Save</button> */}
                </div>
        </div>

        );
    }
}


export default EditForm;
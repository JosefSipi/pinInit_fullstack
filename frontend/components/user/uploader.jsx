import React from 'react';
import LoadingIcon from '../pin/loading';


class Uploader extends React.Component {
    constructor(props) {
        super(props);

        
        this.state = {
            profile_pic: null,
            id: window.currentUser.id,
            loading: false
        };
        
        this.handelSubmit = this.handelSubmit.bind(this);
        this.handelFile = this.handelFile.bind(this);
    }
    
    handelSubmit(theStateStuff) {

        const formData = new FormData();
        formData.append('user[profile_pic]', theStateStuff.profile_pic);
        formData.append('user[id]', theStateStuff.id);

        this.props.updateUser(formData, this.props.fetchUser)
            .then(() => {
                this.props.closeModal();
                window.location.reload();
            });
    }

    handelFile(e) {
        e.preventDefault();
        this.setState({loading: true})
        this.setState({ profile_pic: e.currentTarget.files[0] })
        
        let theStateStuff = {}
        theStateStuff.profile_pic = e.currentTarget.files[0]
        theStateStuff.id = this.state.id

        this.handelSubmit(theStateStuff)
    }

    render() {
        return(            
            <div className="the-outer-box-modal-editModal">
                <h1 className="change-pic-edit-modal">Change your picture</h1>

                {this.state.loading ? <div className='outside-div-loading-on-profile-edit'> <LoadingIcon/> </div> : <div className='form-uploader-pic' >
                    <div className="input-box-modal-file-div">
                        <label htmlFor="input-image-profile-pic-uploader" id="label-profile-pic-upload">
                            <div className="button-profile-script">Choose photo</div>
                            <input type="file" autoComplete="off" name="input-image-profile-pic-uploader" id="input-image-profile-pic-uploader"  onChange={this.handelFile}/>
                        </label>
                    </div>
                </div>}
            </div>
        );
    }

}

export default Uploader;
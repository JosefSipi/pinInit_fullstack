import React from 'react';



class Uploader extends React.Component {
    constructor(props) {
        super(props);

        debugger
        this.state = {
            profile_pic: null,
            id: window.currentUser.id
        };
        
        this.handelSubmit = this.handelSubmit.bind(this);
        this.handelFile = this.handelFile.bind(this);
        this.handelFileUploaded = this.handelFileUploaded.bind(this);
    }

    handelFileUploaded(e){
        debugger
        console.log(e.currentTarget.value)
    }
    
   
    handelSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('user[profile_pic]', this.state.profile_pic);
        formData.append('user[id]', this.props.currentUser.id);

        this.props.updateUser(formData)
            .then(() => {
                this.props.closeModal();
            });
    }

    

    // componentDidUpdate(prevProp){
    //     debugger
    //     if(prevProp.currentUser !== this.props.currentUser){
    //         this.setState({id: this.props.currentUser.id})
    //     }
    // }


    handelFile(e) {
        this.setState({ profile_pic: e.currentTarget.files[0] });

    }

    

    render() {

        debugger
        // if(!this.state.id){
        //     debugger
        //     return null
        // }

        // debugger
        return(            
            <div className="the-outer-box-modal-editModal">
                <h1 className="change-pic-edit-modal">Change your picture</h1>

                    <form className='form-uploader-pic' onSubmit={this.handelSubmit}>
                    <div className="input-box-modal-file-div">
                            {/* <label htmlFor="input-profile-pic" id='label-profile-pic-upload'>
                                <input id='input-profile-pic' name='input-profile-pic' type="file" className="input-box-modal-file" onChange={this.handelFile}/>
                                <div >Choose photo</div>
                            </label> */}
                            {/* <button>submit</button> */}

                            <label htmlFor="input-image-profile-pic-uploader" id="label-profile-pic-upload">
                                <div className="button-profile-script">
                                    Choose photo
                                </div>

                                <input name="input-image-profile-pic-uploader" id="input-image-profile-pic-uploader" type="file" onChange={this.handelFileUploaded} onLoadStart={() => console.log('image started uploading')} onLoadedData={() => console.log('the data uploaded')}/>
                                {/* <input name="input-image-profile-pic-uploader" id="input-image-profile-pic-uploader" type="file" onChange={this.handelFile} onLoadStart={() => console.log('image started uploading')} onLoadedData={() => console.log('the data uploaded')}/> */}

                            </label>
                        </div>
                    </form>


                
                    {/* <input onChange={console.log("isubmited")} className="login-btn-upload-modal" type="file" onChange={this.handelFile} id="fileUpload"/> */}
               
                {/* <button className="login-btn-upload-modal" onClick={}>Choose photo</button> */}
               
               
               
            </div>
            
            
        );
    }

}

export default Uploader;
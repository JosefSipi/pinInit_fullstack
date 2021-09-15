import React from 'react';
import LoadingIcon from '../pin/loading';


class Uploader extends React.Component {
    constructor(props) {
        super(props);

        debugger
        this.state = {
            profile_pic: null,
            id: window.currentUser.id,
            loading: false
        };
        
        this.handelSubmit = this.handelSubmit.bind(this);
        this.handelFile = this.handelFile.bind(this);
        // this.handelFileUploaded = this.handelFileUploaded.bind(this);
    }

    // handelFileUploaded(e){
    //     debugger
    //     console.log(e.currentTarget.value)
    // }
    
   
    handelSubmit(theStateStuff) {
        // e.preventDefault();
        debugger
        console.log('hit handelSubmit')
        const formData = new FormData();
        formData.append('user[profile_pic]', theStateStuff.profile_pic);
        formData.append('user[id]', theStateStuff.id);
        // formData.append('user[profile_pic]', this.state.profile_pic);
        // formData.append('user[id]', this.props.currentUser.id);

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
        e.preventDefault();
        this.setState({loading: true})
        this.setState({ profile_pic: e.currentTarget.files[0] })


        console.log(e.currentTarget.files[0])
        debugger
        console.log(e.currentTarget.files[0])
        console.log('hit handelFile')
        
        let theStateStuff = {}
        theStateStuff.profile_pic = e.currentTarget.files[0]
        theStateStuff.id = this.state.id


            
        this.handelSubmit(theStateStuff)
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

                    {this.state.loading ? <LoadingIcon/> : <div className='form-uploader-pic' >
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

                                <input name="input-image-profile-pic-uploader" id="input-image-profile-pic-uploader" type="file" onChange={this.handelFile}/>
                                {/* <input name="input-image-profile-pic-uploader" id="input-image-profile-pic-uploader" type="file" onChange={this.handelFile} onLoadStart={() => console.log('image started uploading')} onLoadedData={() => console.log('the data uploaded')}/> */}

                            </label>
                        </div>
                    </div>}


                
                    {/* <input onChange={console.log("isubmited")} className="login-btn-upload-modal" type="file" onChange={this.handelFile} id="fileUpload"/> */}
               
                {/* <button className="login-btn-upload-modal" onClick={}>Choose photo</button> */}
               
               
               
            </div>
            
            
        );
    }

}

export default Uploader;
import React from 'react';



class Uploader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profile_pic: null,
            id: window.currentUser.id
        };
        
        this.handelSubmit = this.handelSubmit.bind(this);
        this.handelFile = this.handelFile.bind(this);
    }

    
   
    handelSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('user[profile_pic]', this.state.profile_pic);
        formData.append('user[id]', window.currentUser.id);

        this.props.updateUser(formData)
            .then(() => {
                this.props.closeModal();
            });
    }

    // componentDidMount(){
    //     this.props.fetchUser(window.currentUser.id);
    // }

    handelFile(e) {
        this.setState({ profile_pic: e.currentTarget.files[0] });
    }

    render() {

        return(            
            <div className="the-outer-box-modal-editModal">
                <h1 className="Change-pic-edit-modal">Change your picture</h1>

                    <form onSubmit={this.handelSubmit}>
                        <input type="file" className="input-box" onChange={this.handelFile}/>
                        <button>submit</button>
                    </form>


                
                    {/* <input onChange={console.log("isubmited")} className="login-btn-upload-modal" type="file" onChange={this.handelFile} id="fileUpload"/> */}
               
                {/* <button className="login-btn-upload-modal" onClick={}>Choose photo</button> */}
               
               
               
            </div>
            
            
        );
    }

}

export default Uploader;
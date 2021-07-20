import React from 'react';

class CreatePin extends React.Component {
    constructor(props) {
        super(props);
        debugger

        this.handelAddText = this.handelAddText.bind(this);
    }


    componentDidMount(){
        if (!window.currentUser) {
        } else {
            this.props.fetchUser(window.currentUser.id);
        }
    }

    handelAddText(e){
        e.preventDefault();
        let textarea = document.getElementById('alt-text-area');
        let button = document.getElementById('alt-text-area-button');
        textarea.style.display = 'block';
        button.style.display = 'none';

    }



    render() {
        if (!this.props.user){
            return null
        }
        debugger
        return (
            <div className="create-pin-main-div">

                <div className="top-bar-create-pin">
                    <div className="board-dropdown-create-pin">
                        this will be board dropdown
                    </div>
                </div>



                <div className="bottom-create-pin">
                    <div className="left-side-create-pin">
                        <input type="file" name="" id="" />
                    </div>

                    <div className="right-side-create-pin">

                        <input type="text" placeholder="Add your title"/>
                        <div>
                            <div className="profile-div-small">
                                <img className="profile-photo-icon" src={this.props.user.photoUrl} alt="logo" />
                            </div>

                            <div>{this.props.user.f_name} {this.props.user.l_name}</div>

                        </div>

                        <textarea name="" id="" cols="40" rows="1" placeholder="Tell everyone what your Pin is about">
                        </textarea>

                        <textarea name="" id="alt-text-area" cols="40" rows="1" placeholder="Explain what people can see in the Pin" style={{display: 'none'}}>
                        </textarea>
                        <div onClick={this.handelAddText} id="alt-text-area-button">Add alt text</div>

                        <input type="text" placeholder="Add a destination link"/>
                    </div>
                </div>

            </div>
        )
    }
}

export default CreatePin;
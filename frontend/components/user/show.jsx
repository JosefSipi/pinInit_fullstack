import React from 'react';
// import { render } from 'react-dom';

class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = {photoUrl: []};
        // this.fetchUser = this.fetchUser.bind(this);
    }

    componentDidMount(){
        debugger
        this.props.fetchUser(window.currentUser.id);
    }


    render() {
        debugger
        return(
            <div>

                <ul>
                    <div>{/* image logo */}</div>
                    
                    <div>email: {this.props.user.email}</div>
                    <img src={this.props.user.photoUrl} alt="" />

                </ul>

            </div>
        )
    }
}

export default User;
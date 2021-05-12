import React from 'react';
import { Link } from 'react-router-dom';



// export default (props) => {
//     debugger
//     const inUpBtn = currentUser ? (
//         <div>
//             <div>Account opt. dropdown
//                 <button onClick={props.logout}>Log out</button>
//             </div>
//             <div>UserShowPage</div>
//             <div>DM dropdown</div>
//             <div>Updates dropdown</div>
//             <div>search bar</div>
//             <Link className="home-btn" to="/feed">Home</Link>
//             <Link className="P-avatar" to="/feed"> P </Link>
//         </div>
//     ) : (
//         <div>
//             <Link className="LoginBt" to="/login">Log in</Link>
//             <p>

//             </p>
//             <Link className="SignBtn" to="/signup">Sign up</Link>
//         </div>
//     )
//     debugger
//     return (
//         <header className="nav-bar">
//             <div>github - Joseph S.</div>
            
//             <div>Linked I</div>
//             <div>
//                 {inUpBtn}
//             </div>



//         </header>
//     )
// };




class NavBar extends React.Component {

    constructor(props) {
        super(props);
debugger
       

}
render(){
        if (this.props.currentUser) {this.bar = (
            <div>
                <div>Account opt. dropdown
                <button onClick={this.props.logout}>Log out</button>
                </div>
                <div>UserShowPage</div>
                <div>DM dropdown</div>
                <div>Updates dropdown</div>
                <div>search bar</div>
                <Link className="home-btn" to="/feed">Home</Link>
                <Link className="P-avatar" to="/feed"> P </Link>
            </div>
        ) } else {this.bar = (
                <div>
                    <Link className="LoginBt" to="/login">Log in</Link>
                    <p>
        
                    </p>
                    <Link className="SignBtn" to="/signup">Sign up</Link>
                </div>
            )
        
        }
debugger
        return (
            <header className="nav-bar">
                <div>github - Joseph S.</div>
    
                <div>Linked I</div>
                <div>
                    {this.bar}
                </div>
            </header>
        )
    }
           
}


export default NavBar;
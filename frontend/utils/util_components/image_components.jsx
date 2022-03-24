import React from 'react';

function ProfileAvatar(props) {


    let returnTextIcon = () => {
        return (
            <div className="profile-div-small-pin">
                <p className={props.textClass} >{props.usersName[0].toUpperCase()}</p>
            </div>
        )
    }

    let returnImgIcon = () => {
        return(
            <div className="profile-div-small-pin">
                <img className={props.imgClass} src={props.photoUrl} alt="profile photo" />
            </div>
        )
    }

    debugger

    if (!(props.photoUrl === 'false')) {
        return returnImgIcon();
    } else {
        return returnTextIcon();
    }
}

export {
    ProfileAvatar
}
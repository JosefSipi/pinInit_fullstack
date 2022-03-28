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
            <div className={props.divImgClass || 'default-div-avatar'}>
                <img className={props.imgClass || 'default-img-avatar'} src={props.photoUrl} alt="profile photo" />
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
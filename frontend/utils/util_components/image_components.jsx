import React from 'react';

function ProfileAvatar(props) {

    let returnTextIcon = () => {
        if(props === undefined){
        }

        return (
            <div className={props.divTextClass || 'default-text-div-avatar'}>
                <p 
                    // if CSS is to be modified from default please use textId instead of textClass
                    // the default value is set using Class so it can be overriden using textId
                    id={props.textId || 'default-p-id'} 
                    className={props.textClass || 'default-p-class'}
                > {props.usersName[0].toUpperCase()}</p>
            </div>
        )
    }

    let returnImgIcon = () => {
        if(props === undefined){
        }
        return(
            <div className={props.divImgClass || 'default-div-avatar'}>
                <img className={props.imgClass || 'default-img-avatar'} src={props.photoUrl} alt="profile photo" />
            </div>
        )
    }

    if (!(props.photoUrl === 'false')) {
        return returnImgIcon();
    } else {
        return returnTextIcon();
    }
}

export {
    ProfileAvatar
}
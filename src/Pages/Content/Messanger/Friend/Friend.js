import React from 'react';
import AvatarMale from '../../../../Assets/svg/male-avatar.svg';


function Friend({ name }) {
    return (
        <div className="friend-body">
            <div className="friend-container">
                <div className="friend-img-container">
                    <img src={AvatarMale} alt="img-am" />
                    <div className="friend-online"></div>
                </div>
                <span>{name}</span>
            </div>
        </div>
    );
}

export default Friend;
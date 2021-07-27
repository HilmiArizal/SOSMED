import React from 'react';
import AvatarMale from '../../../../Assets/svg/male-avatar.svg';
import { format } from 'timeago.js';


export default function Message({ message, own }) {
    return (
        <div className={own ? "message-body own" : "message-body"}>
            <div className="message-top">
                <img src={AvatarMale} alt="img-am" />
                <p>{message.text}</p>
            </div>
            <div className="message-bottom">{format(message.createdAt)}</div>
        </div>
    );
}
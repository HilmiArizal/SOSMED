import React from 'react';
import AvatarMale from '../../../../Assets/svg/male-avatar.svg';


export default function Message({own}) {
    return (
        <div className={own ? "message-body own": "message-body"}>
            <div className="message-top">
                <img src={AvatarMale} alt="img-am" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem aut odio ipsam vel, eligendi et ipsa vitae laboriosam tempore incidunt iste ducimus fuga, porro praesentium soluta natus facere eum architecto corrupti in molestiae, qui ab. Necessitatibus modi laboriosam, omnis odio soluta eum corporis, sapiente voluptatibus fugit deserunt illum, nisi quos.</p>
            </div>
            <div className="message-bottom">1 hour ago</div>
        </div>
    );
}
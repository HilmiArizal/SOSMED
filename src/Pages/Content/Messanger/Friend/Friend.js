import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import config from '../../../../config.json';
import AvatarMale from '../../../../Assets/svg/male-avatar.svg';


function Friend({ conversation, currentUser }) {

    const [user, setUser] = useState(null);
    const [friendId, setFriendId] = useState(null);

    useEffect(() => {
        const friendId = conversation.members.find(item => item !== currentUser._id);
        const getUserById = async () => {
            try {
                const res = await Axios.get(config.API_URL + `user/${friendId}`);
                setUser(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getUserById();

    }, [conversation, currentUser._id]);

    return (
        <ul>
            <li onClick={() => setFriendId(user?._id)}>
                <div className="friend-container">
                    <div className="friend-img-container">
                    <img src={AvatarMale} alt="img-am" />
                        <div className="friend-online"></div>
                    </div>
                    <span>
                        {user?._id === friendId ? <div className="active-friend">{user?.username}</div> : <div className="inactive-friend">{user?.username}</div>}
                    </span>
                </div>
            </li>
        </ul>
        // <ul className="friend-body">
        //     <li className="friend-container">
        //         <div className="friend-img-container">
        //         </div>
        //         <span>{user?.username}</span>
        //     </li>
        // </ul>
    );
}

export default Friend;
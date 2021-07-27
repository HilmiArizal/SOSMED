import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import config from '../../../../config.json';
import AvatarMale from '../../../../Assets/svg/male-avatar.svg';


function Friend({ conversation, currentUser }) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const friendId = conversation.members.find(item => item !== currentUser._id);
        const getUserById = async () => {
            try{
                const res = await Axios.get(config.API_URL + `user/${friendId}`);
                setUser(res.data);
            }catch(err){
                console.log(err);
            }
        }
        getUserById();
    },[conversation, currentUser._id]);

    return (
        <div className="friend-body">
            <div className="friend-container">
                <div className="friend-img-container">
                    <img src={AvatarMale} alt="img-am" />
                    <div className="friend-online"></div>
                </div>
                <span>{user?.username}</span>
            </div>
        </div>
    );
}

export default Friend;
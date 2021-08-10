import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { format } from 'timeago.js';
import config from '../../../../config.json';
import AvatarMale from '../../../../Assets/svg/male-avatar.svg';
import { Dropdown, Icon } from 'semantic-ui-react';
import '../Home.css';



export default function GetPost({ currentUser, dataPost, setData }) {

    const [userPost, setUserPost] = useState([]);

    const optionsCurrentUser = [
        { key: 'edit', icon: 'edit', text: 'Ubah Post', value: 'aa' },
        { key: 'delete', icon: 'delete', text: 'Hapus Post', value: dataPost._id },
        { key: 'hide', icon: 'hide', text: 'Sembunyikan Post', value: 'aa' },
    ]

    const optionsOtherUser = [
        { key: 'hide', icon: 'sign in', text: 'Lihat Profile', value: 'hide' },
    ]

    useEffect(() => {
        const fetchUserPost = async () => {
            const res = await Axios.get(config.API_URL_LOCAL + `user/userPost/${dataPost.userId}`);
            setUserPost(res.data);
        }

        fetchUserPost();
    }, [dataPost]);

    const onActionPost = async (data) => {
        switch (data.key) {
            case "delete":
                await Axios.delete(config.API_URL_LOCAL + `post/deletePost?postId=${data.value}`)
                window.location.reload();
                break;
            default:
                return data.key;
        }
    }

    return (
        <div className="get-post-body">

            <div className="card mb-3">
                <div className="d-flex justify-content-between">
                    <div className="d-flex">
                        <img src={AvatarMale} alt="img" className="img-avatar" />
                        <div className="align-self-center top-post">
                            <div>{userPost.username}</div>
                            <span >{format(dataPost.createdAt)}</span>
                        </div>
                    </div>
                    <div className="align-self-center">
                        <Dropdown multiple icon='ellipsis vertical'>
                            <Dropdown.Menu>
                                {currentUser._id === dataPost.userId ?
                                    optionsCurrentUser.map((option) => (
                                        <Dropdown.Item key={option.value} {...option} onClick={() => onActionPost(option)} />
                                    ))
                                    :
                                    optionsOtherUser.map((option) => (
                                        <Dropdown.Item key={option.key} {...option} />
                                    ))
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div className="mt-3 mb-3">{dataPost.description}</div>
                <img src={config.API_URL_LOCAL + dataPost.file} alt="img" className="img-post" />
                <div className="d-flex justify-content-between mt-5">
                    <div className="d-flex">
                        <div className="like-post">
                            <Icon name="thumbs up" />
                        </div>
                        {/* <div className="like-post">
                            <Icon name="thumbs down"/>
                        </div> */}
                        <div className="love-post">
                            <Icon name="like" />
                        </div>
                        <div className="align-self-center">
                            0 people like it
                        </div>
                    </div>
                    <div className="align-self-center">
                        Comments
                    </div>
                </div>

            </div>

        </div >
    );
}
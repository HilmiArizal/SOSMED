import React, { useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import config from '../../../config.json';
import { AuthContext } from '../../../Contexts/Auth/AuthContext';
import AddPost from './Post/AddPost';
import GetPost from './Post/GetPost';
import './Home.css';


export default function Home() {

    const { user } = useContext(AuthContext);
    const [dataPost, setDataPost] = useState([]);

    useEffect(() => {
        const getPost = async () => {
            const res = await Axios.get(config.API_URL_LOCAL + 'post');
            setDataPost(res.data.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }));
        }

        getPost();
    }, []);

    return (
        <div className="home-body">
            <div className="home-post">
                <div className="add-post">
                    <AddPost currentUser={user} />
                </div>
                <div className="get-post">
                    {dataPost.map((item, index) => (
                        <GetPost currentUser={user} dataPost={item} key={index} setData={setDataPost}/>
                    ))}
                </div>
            </div>
            <div className="feed-post">

            </div>
        </div>
    );
};
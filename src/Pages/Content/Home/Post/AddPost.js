import React, { useState } from 'react';
import Axios from 'axios';
import config from '../../../../config.json';
import { Icon, Button } from 'semantic-ui-react';
import { Cancel } from '@material-ui/icons';
import AvatarMale from '../../../../Assets/svg/male-avatar.svg';
import '../Home.css';


export default function AddPost({ currentUser }) {

    const [description, setDescription] = useState('');
    const [urlFile, setUrlFile] = useState(null);
    const [file, setFile] = useState(null);


    const onChangeFile = (e) => {
        if (!file) {
        let fileName = e.target.files[0];
            setFile(fileName);
            setUrlFile(URL.createObjectURL(fileName));
        }else{
            setFile(null);
            window.location.reload();
        }
    }

    const onSubmitPost = async (e) => {
        e.preventDefault();

        let dataPost = {
            userId: currentUser._id,
            description: description
        }

        if (file) {
            try {
                let formData = new FormData();
                formData.append("data", JSON.stringify(dataPost));
                formData.append("file", (file));
                await Axios.post(config.API_URL_LOCAL + `post/addPost`, formData);
                window.location.reload();
            } catch (err) {
                console.log(err)
            }
        }else{
            alert("Foto tidak valid")
        }
    }

    return (
        <div className="post-body">

            <div className="card">
                <form onSubmit={onSubmitPost}>
                    <img src={AvatarMale} alt="img-am" className="img-avatar"/>
                    <input type="text" className="post-input" placeholder="what do u mind?" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <hr />
                    {file && (
                        <div>
                            <img src={urlFile} alt="img-uf" className="img-file"/>
                            <Cancel onClick={onChangeFile} />
                        </div>
                    )}
                    <div className="d-flex justify-content-between post-item">
                        <div className="d-flex align-self-center">
                            <label htmlFor="file" style={{ cursor: 'pointer' }}>
                                <Icon name="photo" color="red" />
                                <span>Photo Or Video</span>
                                <input type="file" id="file" accept=".png, .jpeg, .jpg" style={{ display: 'none' }} onChange={(e) => onChangeFile(e)} />
                            </label>
                        </div>
                        <div className="d-flex">
                            <Icon name="tag" color="blue" />
                            <span className="align-self-center">Tags</span>
                        </div>
                        <div className="d-flex align-self-center">
                            <Icon name="map marker" color="green" />
                            <span>Location</span>
                        </div>
                        <div className="d-flex align-self-center">
                            <Icon name="smile" color="yellow" />
                            <span>Feelings</span>
                        </div>
                    </div>
                    <br />
                    <div className="d-flex justify-content-end">
                        <Button color="blue" size="small" onClick={onSubmitPost}>Post</Button>
                    </div>
                </form>
            </div>

        </div>
    );
}
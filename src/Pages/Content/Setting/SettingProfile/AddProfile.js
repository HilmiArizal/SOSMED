import React, { useContext, useRef, useState } from 'react';
import Axios from 'axios';
import config from '../../../../config.json';
import { AuthContext } from '../../../../Contexts/Auth/AuthContext';
import { Button, Icon, Radio, Select } from 'semantic-ui-react';
import DatePicker from 'react-date-picker';
import AvatarMale from '../../../../Assets/svg/male-avatar.svg';
import '../Setting.css';
import { Cancel } from '@material-ui/icons';


export default function AddProfile() {

    const { user } = useContext(AuthContext);

    const firstNameValue = useRef(null);
    const lastNameValue = useRef(null);
    const [dateValue, setDateValue] = useState(new Date());
    const [gender, setGender] = useState();
    const [job, setJob] = useState();
    const [imageProfile, setImageProfile] = useState(null);
    const [urlImageProfile, setUrlImageProfile] = useState(null);

    const jobOptions = [
        { key: 1, value: 'FrontEnd Developer', text: 'FrontEnd Developer' },
        { key: 2, value: 'BackEnd Developer', text: 'BackEnd Developer' },
        { key: 3, value: 'UI/UX Developer', text: 'UI/UX Developer' },
        { key: 4, value: 'QA Engineer', text: 'QA Engineer' },
        { key: 5, value: 'Software Engineer', text: 'Software Engineer' },
        { key: 6, value: 'Accounting', text: 'Accounting' },
        { key: 7, value: 'Tax Office', text: 'Tax Office' },
        { key: 8, value: 'Other', text: 'Other' },
    ]

    const onHandleGender = (e, { value }) => {
        setGender(value);
    }

    const convertDate = (dateValue) => {
        let date = new Date(dateValue);
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        let finalDate = [date.getFullYear(), month, day].join("/");
        return finalDate;
    }

    const onChangeImage = (e) => {
        let imageName = e.target.files[0];
        setImageProfile(imageName);
        setUrlImageProfile(URL.createObjectURL(imageName));
    }

    const onSaveProfile = async (e) => {
        e.preventDefault();
        let dataProfile = {
            userId: user._id,
            firstname: firstNameValue.current.value,
            lastname: lastNameValue.current.value,
            birthdaydate: convertDate(dateValue),
            gender,
            job
        }
        try {
            const formData = new FormData();
            formData.append('data', JSON.stringify(dataProfile));
            formData.append('image', imageProfile);
            const res = await Axios.post(config.API_URL_LOCAL + 'profile/addProfile', formData);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div>
            <form onSubmit={onSaveProfile}>
                <div className="image">
                    <label htmlFor="profile-img">
                        {
                            imageProfile ?
                                <div className="img-preview">
                                    <img src={urlImageProfile} alt="img-am" />
                                    <Cancel onClick={() => setImageProfile(null)} />
                                </div>
                                :
                                <div>
                                    <img src={AvatarMale} alt="img-am" />
                                    <Icon name="camera" color="grey" />
                                    <input id="profile-img" type="file" style={{ display: 'none' }} onChange={(e) => onChangeImage(e)} />
                                </div>
                        }
                    </label>
                </div>
                <div className="mt-3 input-text">
                    <div>Name Depan</div>
                    <div className="ui input"><input type="text" placeholder="Ex. Hilmi" ref={firstNameValue} /></div>
                </div>
                <div className="mt-3 input-text">
                    <div>Name Belakang</div>
                    <div className="ui input"><input type="text" placeholder="Ex. Arizal" ref={lastNameValue} /></div>
                </div>
                <div className="mt-3">
                    <div className="mb-2" style={{ fontWeight: '500' }}>Tanggal Lahir</div>
                    <DatePicker value={dateValue} onChange={setDateValue} />
                </div>
                <div className="mt-3">
                    <div className="mb-2" style={{ fontWeight: '500' }}>Jenis Kelamin</div>
                    <div className="d-flex">
                        <div style={{ marginRight: '20px' }}>
                            <Radio
                                label='Pria'
                                name='radioGroup'
                                value='pria'
                                onChange={onHandleGender}
                                checked={gender === 'pria'}
                            />
                        </div>
                        <div style={{ marginLeft: '20px' }}>
                            <Radio
                                label='Wanita'
                                name='radioGroup'
                                value='wanita'
                                onChange={onHandleGender}
                                checked={gender === 'wanita'}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <Select onChange={(e, { value }) => setJob(value)} placeholder='Select your job' options={jobOptions} style={{ width: '100%' }} />
                </div>
                <div className="mt-3">
                    <Button color="blue">Simpan Profile</Button>
                </div>
            </form>
        </div>
    );
}
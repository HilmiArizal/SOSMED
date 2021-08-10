import React, { useEffect, useRef, useState } from 'react';
import Axios from 'axios';
import config from '../../../../config.json';
import { Button, Icon, Radio, Select } from 'semantic-ui-react';
import DatePicker from 'react-date-picker';
import AvatarMale from '../../../../Assets/svg/male-avatar.svg';
import '../Setting.css';
import { Cancel } from '@material-ui/icons';


export default function EditProfile({ dataProfile, dataUser }) {

    const [profileId, setProfileId] = useState(null);
    const firstNameValue = useRef(null);
    const lastNameValue = useRef(null);
    const [dateValue, setDateValue] = useState(new Date());
    const [gender, setGender] = useState(dataProfile[0].gender);
    const [job, setJob] = useState(dataProfile[0].job);
    const [imageProfile, setImageProfile] = useState(config.API_URL_LOCAL + dataProfile[0].imageprofile);
    const [urlImageProfile, setUrlImageProfile] = useState(config.API_URL_LOCAL + dataProfile[0].imageprofile);

    const jobOptions = [
        { key: 1, value: 'FrontEnd Developer', text: 'FrontEnd Developer' },
        { key: 2, value: 'BackEnd Developer', text: 'BackEnd Developer' },
        { key: 3, value: 'UI/UX Developer', text: 'UI/UX Developer' },
        { key: 4, value: 'QA Engineer', text: 'QA Engineer' },
        { key: 5, value: 'Software Engineer', text: 'Software Engineer' },
        { key: 6, value: 'Accounting', text: 'Accounting' },
        { key: 7, value: 'Tax Office', text: 'Tax Office' },
        { key: 8, value: 'Other', text: 'Other' },
    ];

    useEffect(() => {
        setProfileId(dataProfile[0]._id);
    }, [dataProfile])

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
            userId: dataUser._id,
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
            await Axios.put(config.API_URL_LOCAL + `profile/editProfile?id=${profileId}`, formData);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ubah Profile</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onSaveProfile}>
                                <div className="image-edit">
                                    <label htmlFor="profile-img">
                                        {
                                            imageProfile ?
                                                <div className="img-preview">
                                                    <img src={urlImageProfile} alt="img-am" className="img-edit" />
                                                    <Cancel onClick={() => setImageProfile(null)} />
                                                </div>
                                                :
                                                <div>
                                                    <img src={AvatarMale} alt="img-am" className="img-edit" />
                                                    <Icon name="camera" color="grey" />
                                                    <input id="profile-img" type="file" style={{ display: 'none' }} onChange={(e) => onChangeImage(e)} />
                                                </div>
                                        }
                                    </label>
                                </div>
                                <div className="mt-3 input-text">
                                    <div>Name Depan</div>
                                    <div className="ui input"><input type="text" placeholder="Ex. Hilmi" ref={firstNameValue} defaultValue={dataProfile[0].firstname} /></div>
                                </div>
                                <div className="mt-3 input-text">
                                    <div>Name Belakang</div>
                                    <div className="ui input"><input type="text" placeholder="Ex. Arizal" ref={lastNameValue} defaultValue={dataProfile[0].lastname} /></div>
                                </div>
                                <div className="mt-3">
                                    <div className="mb-2" style={{ fontWeight: '500' }}>Tanggal Lahir</div>
                                    <DatePicker value={dateValue} onChange={setDateValue} defaultValue={dataProfile[0].birthdaydate} />
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
                                    <Select onChange={(e, { value }) => setJob(value)} placeholder={dataProfile[0].job} options={jobOptions} style={{ width: '100%' }} />
                                </div>
                                <div className="mt-3">
                                    <Button color="blue">Simpan Profile</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
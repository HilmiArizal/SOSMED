import React, { useState, useContext, useEffect } from 'react';
import Axios from 'axios';
import config from '../../../config.json';
import { AuthContext } from '../../../Contexts/Auth/AuthContext';
import AddProfile from './SettingProfile/AddProfile';
import GetProfile from './SettingProfile/GetProfile';


export default function Setting() {

    const { user } = useContext(AuthContext);
    const [dataProfile, setDataProfile] = useState();
    const [availData, setAvailData] = useState(false);

    useEffect(() => {
        const fetchProfileUser = async () => {
            try {
                const res = await Axios.get(config.API_URL_LOCAL + `profile/getProfileUserById?userId=${user._id}`);
                setDataProfile(res.data);
                if (res.data.length > 0) {
                    setAvailData(true);
                } else {
                    setAvailData(false);
                }
            } catch (err) {
                console.log(err);
            }
        }

        fetchProfileUser();
    }, [user]);


    return (
        <div className="setting-body">
            <div className="setting-title">Pengaturan Profile</div>

            {
                !availData
                    ?
                    <AddProfile />
                    :
                    <GetProfile dataProfile={dataProfile} dataUser={user}/>
            }

        </div>
    );

}
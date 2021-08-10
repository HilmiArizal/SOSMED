import React from 'react';
import config from '../../../../config.json';
import '../Setting.css';
import EditProfile from './EditProfile';


export default function GetProfile({ dataProfile, dataUser }) {

    return (
        <div className="get-profile">

            <div className="image">
                <div className="img-preview">
                    <img src={config.API_URL_LOCAL + dataProfile[0].imageprofile} alt="img-am" />
                </div>
            </div>
            <div className="mt-4 list-profile">
                <div>Nama Lengkap</div>
                <div>{dataProfile[0].firstname} {dataProfile[0].lastname}</div>
            </div>
            <div className="mt-3 list-profile">
                <div>Tanggal Lahir</div>
                <div>{dataProfile[0].birthdaydate}</div>
            </div>
            <div className="mt-3 list-profile">
                <div>Jenis Kelamin</div>
                <div>{dataProfile[0].gender}</div>
            </div>
            <div className="mt-3 list-profile">
                <div>Pekerjaan</div>
                <div>{dataProfile[0].job}</div>
            </div>
            <div className="mt-3">
                <button className="ui primary button" data-bs-toggle="modal" data-bs-target="#exampleModal">Ubah Profile</button>
                {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Ubah Profile
                </button> */}

                <EditProfile dataUser={dataUser} dataProfile={dataProfile} />
            </div>

        </div>

    );
}
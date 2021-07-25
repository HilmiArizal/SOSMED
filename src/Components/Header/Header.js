import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Divider, Icon, Input } from 'semantic-ui-react';
import LogoHS from '../../Assets/img/logo-hs.png';
import AvatarMale from '../../Assets/svg/male-avatar.svg';
import { AuthContext } from '../../Contexts/Auth/AuthContext';
import './Header.css';


export const Header = () => {

    const { user } = useContext(AuthContext);

    const onBtnLogout = () => {
        localStorage.removeItem('user');
        window.location.reload();
        console.log(user);
    }

    return (
        <div className="header-body">
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <div className="container-fluid">
                    <div className="navbar-brand">
                        <img src={LogoHS} alt="img-logo" />
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <div className="navbar-nav me-auto mb-2 mb-lg-0">
                            <Input
                                icon={<Icon name='search' inverted circular link />}
                                placeholder='Cari teman...'
                            />
                        </div>
                        <div className="d-flex list-right">
                            <li>
                                <Link to="/messanger">
                                    <Icon circular name='chat' inverted size="large" />
                                </Link>
                            </li>
                            <li>
                                <Icon circular name='alarm' inverted size="large" />
                            </li>
                            <li>
                                <div className="btn-group">
                                    <div className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        <Icon circular name='user' inverted size="large" />
                                    </div>
                                    <div className="dropdown-menu dropdown-menu-end">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <img src={AvatarMale} alt="img-am" />
                                            </div>
                                            <div className="col-md-9 profile">
                                                <div>Hilmi Arizal</div>
                                                <div>Front End Developer</div>
                                            </div>
                                        </div>
                                        <Divider />
                                        <div className="menu">
                                            <ul>
                                                <li>
                                                    <Icon circular name='setting' inverted />
                                                    <span>
                                                        Pengaturan &amp; Privasi
                                                    </span>
                                                </li>
                                                <li>
                                                    <Icon circular name='question' inverted />
                                                    <span>
                                                        Bantuan &amp; Dukungan
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                        <Divider />
                                        <Link to="/">
                                            <div className="logout" onClick={onBtnLogout}>
                                                <Icon circular name='sign-out' inverted />
                                                <span>Keluar</span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};
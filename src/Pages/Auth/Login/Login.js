import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Input } from 'semantic-ui-react';
import SocialNetworking from '../../../Assets/svg/social-networking.svg';
import LogoHS from '../../../Assets/img/logo-hs.png';
import './Login.css';
import { LoginSuccess } from '../../../Contexts/Auth/AuthAction';
import { AuthContext } from '../../../Contexts/Auth/AuthContext';

export default function Login() {

    const [hidePass, setHidePass] = useState(false);


    const { dispatch } = useContext(AuthContext);
    const usernameValue = useRef();
    const passwordValue = useRef();

    const onChangePass = () => {
        setHidePass(!hidePass);
    }

    const onBtnLogin = (e) => {
        e.preventDefault();
        let username = usernameValue.current.value;
        let password = passwordValue.current.value;
        let dataLogin = { username, password };
        LoginSuccess(dataLogin, dispatch);
    }

    return (
        <div className="login-body">
            <div className="row">
                <div className="col-md-6 left">
                    <div className="title">
                        <div className="text">
                            <div>Hilmi SosMed, Bro!</div>
                        </div>
                        <div className="image">
                            <img src={SocialNetworking} alt="img-sn" />
                        </div>
                        <div className="text">
                            <p> Hallo bro, bergabung dengan kami sekarang! <br />
                                <span style={{ color: 'grey', fontSize: '12px' }}>Nikmati berbagai macam fitur yang menarik untuk menemani waktu luang kamu.</span>
                            </p>
                        </div>
                        <div className="button">
                            <Link to="/register">
                                <div className="btn btn-primary btn-sm">Gabung Sekarang</div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 right">
                    <div className="card">
                        <div className="title">
                            <img src={LogoHS} alt="img-hs" />
                        </div>
                        <form onSubmit={onBtnLogin}>
                            <Input icon placeholder='Username' size="small" className="input" >
                                <input ref={usernameValue} />
                            </Input>
                            <br />
                            <br />
                            <Input icon placeholder='Password' size="small" className="input">
                                <input ref={passwordValue} type={hidePass ? "text" : "password"} />
                                {
                                    hidePass ?
                                        <Icon name='eye slash' onClick={onChangePass} /> :
                                        <Icon name='eye' onClick={onChangePass} />
                                }
                                {/* <Icon name='eye slash' /> */}
                            </Input>
                            <br />
                            <br />
                            <div className="d-flex justify-content-end">
                                <Link to="/" className="link">
                                    Forgot Password ?
                                </Link>
                            </div>
                            <br />
                            <button className="btn btn-primary btn-sm">
                                Submit
                            </button>
                        </form>

                        <div className="mt-4 text-center">
                            Belum punya akun ? <Link to="/register">Daftar disini!</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
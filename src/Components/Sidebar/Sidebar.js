import React, { useContext } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import Home from '../../Pages/Content/Home/Home';
import AvatarMale from '../../Assets/svg/male-avatar.svg';
import './Sidebar.css';
import Messanger from '../../Pages/Content/Messanger/Messanger';
import NotFound from '../../Pages/Content/NotFound/NotFound';
import { AuthContext } from '../../Contexts/Auth/AuthContext';


export const Sider = () => {

    const { user } = useContext(AuthContext);

    return (
        <div className="sider-body">
            <Sidebar.Pushable as={Segment}>
                <Sidebar
                    as={Menu}
                    animation='push'
                    direction='left'
                    icon='labeled'
                    inverted
                    vertical
                    visible
                    width='thin'
                >
                    <div className="d-flex profile" >
                        <div className="image">
                            <img src={AvatarMale} alt="img-am" />
                        </div>
                        <div className="name-profile">
                            <div>{user.username}</div>
                            <div>Front End Developer</div>
                        </div>
                    </div>
                    <Link to="/" >
                        <Menu.Item>
                            <div className="d-flex list-menu">
                                <div><Icon name='home' /></div>
                                <div className="name-menu">Beranda</div>
                            </div>
                        </Menu.Item>
                    </Link>
                    <Menu.Item>
                        <div className="d-flex list-menu">
                            <div><Icon name='group' /></div>
                            <div className="name-menu">Teman</div>
                        </div>
                    </Menu.Item>
                    <Link to="/messanger">
                        <Menu.Item>
                            <div className="d-flex list-menu">
                                <div><Icon name='chat' /></div>
                                <div className="name-menu">Pesan</div>
                            </div>
                        </Menu.Item>
                    </Link>
                    <Menu.Item>
                        <div className="d-flex list-menu">
                            <div><Icon name='alarm' /></div>
                            <div className="name-menu">Notifikasi</div>
                        </div>
                    </Menu.Item>
                </Sidebar>

                <Sidebar.Pusher style={{ overflow: 'hidden' }}>
                    <Segment basic>
                        <Switch>
                            <Route path="/" exact><Home /></Route>
                            <Route path="/messanger" exact><Messanger /></Route>
                            <Route path="*" exact><NotFound /></Route>
                        </Switch>
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
    );
}
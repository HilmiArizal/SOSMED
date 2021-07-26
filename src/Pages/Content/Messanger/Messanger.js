import React, { useContext, useEffect, useRef, useState } from 'react';
import Friend from './Friend/Friend';
import Message from './Message/Message';
import { Divider } from 'semantic-ui-react';
import { io } from 'socket.io-client';
import { AuthContext } from '../../../Contexts/Auth/AuthContext';
import './Messanger.css';


export default function Messanger() {

    const { user } = useContext(AuthContext);

    const [newMessage, setNewMessage] = useState('');
    const socket = useRef(io("ws://localhost:8900"));

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", users => {
            console.log(users);
        })
    }, [user])

    const onSendMessage = (e) => {
        e.preventDefault();
        console.log(newMessage);

        setNewMessage('');
    }

    return (
        <div className="messanger-body">
            <div className="messanger-section">
                <div className="messanger-top">
                    <Message own={true} />
                    <Message />
                    <Message />
                    <Message own={true} />
                    <Message />
                </div>
                <form className="messanger-bottom" onSubmit={onSendMessage}>
                    <textarea
                        className="messanger-input"
                        placeholder="write something..."
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                    ></textarea>
                    <button className="btn btn-primary messanger-send">
                        Send
                    </button>
                </form>

            </div>
            <div className="friend-section">
                <div className="friend-title">Teman anda</div>
                <Divider />
                <Friend name="Hilmi Arizal" />
                <Friend name="Iqbal Nazib" />
                <Friend name="Fauzi Imam" />
            </div>
        </div>
    );
};
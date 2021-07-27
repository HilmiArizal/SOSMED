import React, { useContext, useEffect, useRef, useState } from 'react';
import Friend from './Friend/Friend';
import Message from './Message/Message';
import { Divider } from 'semantic-ui-react';
import { io } from 'socket.io-client';
import { AuthContext } from '../../../Contexts/Auth/AuthContext';
import Axios from 'axios';
import config from '../../../config.json';
import './Messanger.css';


export default function Messanger() {

    const { user } = useContext(AuthContext);

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();

    const socket = useRef();


    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            });
        })
    }, []);

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages((item, index) => [...item, arrivalMessage]);
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (item, index) => {
            // console.log(users);
        })
    }, [user]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await Axios.get(config.API_URL + `conversation/${user._id}`);
                setConversations(res.data);
            } catch (err) {
                // console.log(err);
            }
        }
        getConversations();
    }, [user._id]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await Axios.get(config.API_URL + `message/${currentChat?._id}`);
                setMessages(res.data);
            } catch (err) {
                // console.log(err);
            }
        }
        getMessages();
    }, [currentChat?._id]);

    const onSendMessage = async (e) => {
        e.preventDefault();
        const dataMessage = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        }

        // SEND TO SOCKET SERVER
        const receiverId = currentChat.members.find((item, index) => item !== user._id);
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage
        })

        try {
            const res = await Axios.post(config.API_URL + `message`, dataMessage);
            setMessages([...messages, res.data]);
            setNewMessage('');
        } catch (err) {
            // console.log(err);
        }
    }

    return (
        <div className="messanger-body">
            <div className="messanger-section">
                {
                    currentChat ? (
                        <div>
                            <div className="messanger-top">
                                {messages.map((item, index) => (
                                    <div ref={scrollRef} key={index}>
                                        <Message message={item} own={item.sender === user._id} key={index} />
                                    </div>
                                ))}
                            </div>
                            <form className="messanger-bottom" onSubmit={onSendMessage}>
                                <textarea
                                    className="messanger-input"
                                    placeholder="write something..."
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    value={newMessage}
                                ></textarea>
                                <button className="btn btn-primary messanger-send">Send</button>
                            </form>
                        </div>
                    ) : (
                            <div className="messanger-start">
                                Ayo kita mulai chat dengan teman anda.
                            </div>
                        )
                }
            </div>
            <div className="friend-section">
                <div className="friend-title">Teman anda</div>
                <Divider />
                {conversations.map((item, index) => (
                    <div onClick={() => setCurrentChat(item)} key={index}>
                        <Friend conversation={item} currentUser={user} key={index} />
                    </div>
                ))}

            </div>
        </div>
    );
};
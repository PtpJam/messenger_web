import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from './components/Login';
import { Message, User } from './util/connection/interface/chat.interface';
import { Home } from './components/Home';
import { Header } from './components/Header';
import { Messages } from './components/Messages';

const sessionStorageUserKey = 'user';
const sessionStorageTokenKey = 'accessToken';

function App() {
    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
    const [messages, setMessages] = useState<Message[]>([]);
    const [user, setUser] = useState<User>();
    const [isAuthed, setIsAuthed] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const currentUser = JSON.parse(sessionStorage.getItem('user') ?? '{}');
    //     if (currentUser.userUid) {
    //         setUser(currentUser);
    //     }

    //     socket.on('connect', () => {
    //         setIsConnected(true);
    //     });

    //     socket.on('disconnect', () => {
    //         setIsConnected(false);
    //     });

    //     socket.on('chat', (message: Message) => {
    //         setMessages(prevState => [message, ...prevState]);
    //     });

    //     return () => {
    //         socket.off('connect');
    //         socket.off('disconnect');
    //         socket.off('chat');
    //     };
    // }, []);

    useEffect(() => {
        axios.post('http://localhost:5001/auth/register', { test: "test" })
        .catch(err => console.log(err));
        // const token = sessionStorage.getItem(sessionStorageTokenKey);
        // const currentUser = sessionStorage.getItem(sessionStorageUserKey);
        // if (token && currentUser) {
        //     setUser(JSON.parse(currentUser));
        //     setIsAuthed(true);
        //     navigate('/home');
        // } else {
        //     setIsAuthed(false);
        //     navigate('/login');
        // }

        // socket.on('connect', () => {
        //     console.log('[INFO] Connected!')
        //     setIsConnected(true);
        // });

        // socket.on('disconnect', () => {
        //     setIsConnected(false);
        // });

        // return () => {
        //     socket.off('connect_error');
        //     socket.off('disconnect');
        //     socket.off('connect');
        //     socket.off('message');
        //     socket.off('joined');
        //     socket.off('chat');
        // };
    }, []);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);
        const payload = {
            username: formData.get('login') as string,
            password: formData.get('password') as string,
        };

        axios
            .post('http://localhost:5001/auth/login', payload, {
                withCredentials: true,
            })
            .then(res => {
                // set user
                sessionStorage.setItem(
                    sessionStorageUserKey,
                    JSON.stringify(res.data.user),
                );
                setUser(res.data.user);

                // save token
                const token = Cookies.get('access_token');
                if (!token) {
                    console.log("Can't find access_token in cookies!");
                    return;
                }
                console.log('access_token: ', token);
                sessionStorage.setItem(sessionStorageTokenKey, token);
                navigate('/home');
            })
            .catch(err => {
                setError(err.response.data.message);
                setInterval(() => setError(null), 5000);
            });
    };

    const handleNewMessage = (e: React.FormEvent<HTMLFormElement>) => {};

    return (
        <div className="mx-auto h-screen w-screen bg-gray-600">
            <Header isConnected={isConnected} user={user} error={error} />
            <Routes>
                <Route
                    path="/login"
                    element={<Login onLogin={handleLogin} />}
                />
                <Route path="/home" element={<Home />} />
                <Route path="/chat/:uuid" element={<Messages />} />
            </Routes>
        </div>
    );
}

export default App;

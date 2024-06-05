import { Link } from 'react-router-dom';
import './styles.css';
import { useEffect, useState } from 'react';
import { Room } from '../../util/connection/interface/chat.interface';
import axios from 'axios';

// TODO: make on server return chats with amount of users and render it here
export const Home = () => {
    const [chats, setChats] = useState<Room[]>([]);

    useEffect(() => {
        // load chats
        const token = sessionStorage.getItem('accessToken');
        if (!token) {
            console.log(
                "Can't load chats, because there is no accessToken in sessionStorage!",
            );
            return;
        }
        axios
            .get('http://localhost:5000/user/my-rooms', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(res => {
                console.log('Loaded Chats => ', res.data.chats);
                setChats(res.data.chats);
            });
    }, []);

    return (
        <div className="w-full flex justify-center">
            <div>
                <h1 className="text-2xl text-gray-200">Your chats</h1>
                <div className="px-5 py-3 bg-slate-700 rounded-md border-2 border-gray-950 grid col-1 gap-1">
                    {chats.map(chat => (
                        <Link
                            to={`/chat/${chat.uuid}`}
                            key={chat.uuid}
                            className="hover:bg-[rgba(255,255,255,0.1)] p-2 rounded-md"
                        >
                            <div className="flex flex-row gap-6">
                                <h1 className="text-white text-xl">
                                    {chat.name}
                                </h1>
                                <h1 className="text-white text-xl">
                                    👨‍💻 {chat.users.length}
                                </h1>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

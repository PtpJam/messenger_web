import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import socket from '../../util/connection/connection';
import {
    MessageFromDB,
    MessageFromWS,
    Room,
    User,
} from '../../util/connection/interface/chat.interface';
import { MessageForm } from '../MessageForm';

const determineMessageStyle = (user: User, messageFromId: number) => {
    if (user && messageFromId === user?.id) {
        return 'bg-slate-500 p-4 ml-24 mb-4 rounded w-fit justify-self-end';
    } else {
        return 'bg-slate-800 p-4 mr-24 mb-4 rounded w-fit justify-self-start';
    }
};

export const Messages = () => {
    const chatUid = useParams().uuid;
    const [user, setUser] = useState<User>(
        JSON.parse(sessionStorage.getItem('user') ?? '{}'),
    );
    const [error, setError] = useState<string | null>(null);
    const [chat, setChat] = useState<Room>();
    const [messages, setMesages] = useState<MessageFromDB[]>([]);

    useEffect(() => {
        // load messages
        axios
            .get(`http://localhost:5000/chat/load-messages/${chatUid}`)
            .then(res => setMesages(res.data))
            .catch(err => setError(err.response.data.message));

        // load chat info
        axios
            .get(`http://localhost:5000/chat/${chatUid}`)
            .then(res => setChat(res.data));

        if (user.uuid && chatUid) {
            socket.emit('join-room', { userUid: user.uuid, roomUid: chatUid });
        }

        socket.off('message').on('message', (message: MessageFromWS) => {
            console.log('New message! => ', message);
            setMesages(prevState => [...prevState, message]);
        });
    }, []);

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        const messageText = new FormData(e.currentTarget).get(
            'minput',
        ) as string;

        const file = new FormData(e.currentTarget).get('fileInput') as File;

        console.log('Text => ', messageText);
        console.log('file => ', file);

        if (messageText && user.uuid && chatUid) {
            socket.emit('message', {
                message: messageText,
                toRoomUid: chatUid,
                fromUid: user.uuid,
            });
        }

        if (file && user.uuid && chatUid) {
            const reader = new FileReader();
            reader.onload = () => {
                const fileBuffer = new Uint8Array(reader.result as ArrayBuffer);
                const buffer = new Uint8Array(fileBuffer);
                socket.emit('file', {
                    fileName: file.name,
                    fileBuffer,
                });
            };
            reader.readAsArrayBuffer(selectedFile);
        }
    };

    return error ? (
        <h1 className="text-red-500 text-3xl">Error: {error}</h1>
    ) : (
        <div className="w-ful grid h-4/6 flex-col-reverse overflow-y-scroll px-10">
            {messages?.map((message, index) => {
                return (
                    <div
                        key={index}
                        className={determineMessageStyle(user, message.from.id)}
                    >
                        <span className="text-sm text-gray-400">
                            {message.from.username}
                        </span>
                        <span className="text-sm text-gray-400">
                            {' ' + '•' + ' '}
                        </span>
                        <span className="text-sm text-gray-400">
                            {message.date.toLocaleString()}
                        </span>
                        <p className="text-white">{message.message}</p>
                    </div>
                );
            })}
            <MessageForm sendMessage={handleSendMessage} />
        </div>
    );
};

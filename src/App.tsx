import { useEffect, useState } from 'react';
import './App.css';
import { Header } from './components/Header';
// import socket from './util/connection/connection';
import { v4 as uuidv4 } from 'uuid';
import { ChatLayout } from './Layout/chat.layout';
import { Login } from './components/Login';
import { MessageForm } from './components/MessageForm';
import { Messages } from './components/Messages';
import { Message, User } from './util/connection/interface/chat.interface';
import socket from './util/connection/connection';

function App() {
    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
    const [messages, setMessages] = useState<Message[]>([]);
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const currentUser = JSON.parse(sessionStorage.getItem('user') ?? '{}');
        if (currentUser.userUid) {
            setUser(currentUser);
        }

        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('chat', (message: Message) => {
            setMessages(prevState => [message, ...prevState]);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('chat');
        };
    }, []);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);
        const newUser: User = {
            userName: formData.get('login') as string,
            userUid: uuidv4(),
        };

        sessionStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
    };

    const handleNewMessage = (e: React.FormEvent<HTMLFormElement>) => {
        if (user?.userUid) {
            const formData = new FormData(e.currentTarget);
            const newMessage: Message = {
                date: new Date(),
                user: user,
                message: formData.get('minput') as string,
                messageUid: uuidv4(),
            };

            socket.emit('chat', newMessage);
        }
    };

    return (
        <div className="mx-auto flex h-screen w-screen justify-center bg-gray-600">
            {user?.userUid ? (
                <ChatLayout>
                    <Header isConnected={isConnected} user={user} />
                    <Messages user={user} messages={messages} />
                    <MessageForm sendMessage={handleNewMessage} />
                </ChatLayout>
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </div>
    );
}

export default App;

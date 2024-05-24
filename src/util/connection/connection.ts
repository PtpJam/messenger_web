import { Socket, io } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from './interface/chat.interface';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    'http://localhost:5010',
);

export default socket;

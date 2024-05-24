export interface User {
    userUid: string;
    userName: string;
}

export interface Message {
    messageUid: string;
    message: string;
    date: Date;
    user: User;
}

export interface ServerToClientEvents {
    chat: (e: Message) => void;
}

export interface ClientToServerEvents {
    chat: (e: Message) => void;
}

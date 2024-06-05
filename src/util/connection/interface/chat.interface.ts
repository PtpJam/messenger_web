export interface DatabaseResponse {
    id: number;
    uuid: string;
    created_at: string;
    updated_at: string;
}

// **************************************
// ************** USER ******************
// **************************************
export interface User extends DatabaseResponse {
    username: string;
    password: string;
    profile_url: string;
    chats?: Room[];
}
export interface LoginDto {
    username: string;
    password: string;
}

// **************************************
// ************* MESSAGE ****************
// **************************************
export interface Message {
    message: string;
    date: Date;
    from: string;
    to: string;
}
export interface MessageFromWS extends DatabaseResponse {
    message: string;
    fromUid: string;
    toRoomUid: string;
    to: Room;
    from: User;
    date: string;
}
export interface MessageFromDB extends DatabaseResponse {
    message: string;
    date: string;
    from: User;
}

export interface MessagePayload {
    message: string;
    fromUid: string;
    toRoomUid: string;
}

export interface FilePayload {
    fileName: string;
    buffer: Buffer;
    toRoomUid: string;
}

// **************************************
// ************** ROOM ******************
// **************************************
export interface Room extends DatabaseResponse {
    name: string;
    owner: User;
    users: User[];
}
export interface JoinRoomPayload {
    roomUid: string;
    userUid: string;
}

// **************************************
// ************** EVENTS ******************
// **************************************
export interface ServerToClientEvents {
    chat: (e: MessageFromDB) => void;
    message: (e: MessageFromWS) => void;
    joined: (e: { newUser: string }) => void;
}

export interface ClientToServerEvents {
    chat: (e: Message) => void;
    message: (e: MessagePayload) => void;
    'join-room': (e: JoinRoomPayload) => void;
    file: (e: FilePayload) => void;
}

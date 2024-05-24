import React from 'react';
import { Message, User } from '../../util/connection/interface/chat.interface';

const determineMessageStyle = (user: User, messageUserUId: string) => {
  if (user && messageUserUId === user.userUid) {
    return 'bg-violet-900 p-4 ml-24 mb-4 rounded';
  } else {
    return 'bg-slate-700 p-4 mr-24 mb-4 rounded';
  }
};

export const Messages = ({
  user,
  messages,
}: {
  user: User;
  messages: Message[];
}) => {
  return (
    <div className="w-ful flex h-4/6 flex-col-reverse overflow-y-scroll">
      {messages?.map((message, index) => {
        return (
          <div
            key={index}
            className={determineMessageStyle(user, message.user.userUid)}
          >
            <span className="text-sm text-gray-400">
              {message.user.userName}
            </span>
            <span className="text-sm text-gray-400">{' ' + '•' + ' '}</span>
            <span className="text-sm text-gray-400">{message.date.toLocaleString()}</span>
            <p className="text-white">{message.message}</p>
          </div>
        );
      })}
    </div>
  );
};
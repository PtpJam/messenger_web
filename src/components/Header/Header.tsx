import './styles.css';
import { THeaderProps } from './types';

export const Header = ({ user, isConnected }: THeaderProps) => {
    return (
        <div className="flex h-1/6 items-center justify-between w-full">
            <h1 className="text-5xl font-black text-violet-500">
                Realtime Chat
            </h1>
            <div className="flex h-8 items-center rounded-xl bg-slate-800 px-4">
                <span className="mr-1 text-lg text-white">{user.userName}</span>
                <span className="ml-1">{isConnected ? '🟢' : '🔴'}</span>
            </div>
        </div>
    );
};

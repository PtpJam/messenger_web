import { useNavigate } from 'react-router-dom';
import './styles.css';
import { THeaderProps } from './types';

export const Header = ({ user, isConnected, error }: THeaderProps) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="flex h-1/6 items-center justify-between w-full shadow-lg bg-slate-700 px-10 rounded-lg ">
            <h1 className="text-5xl font-black text-violet-500">
                Realtime Chat
            </h1>
            {error && <h1>{error}</h1>}
            {user ? (
                <div
                    className="flex h-8 items-center rounded-xl bg-slate-800 px-4"
                    onClick={handleLogout}
                >
                    <span className="text-white">Logout</span>
                </div>
            ) : null}
            <div className="flex h-8 items-center rounded-xl bg-slate-800 px-4">
                {user ? (
                    <div>
                        <span className="mr-1 text-lg text-white">
                            {user.username}
                        </span>
                        <span className="ml-1">
                            {isConnected ? '🟢' : '🔴'}
                        </span>
                    </div>
                ) : (
                    <div>
                        <span className="mr-1 text-lg text-white">
                            Login first
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

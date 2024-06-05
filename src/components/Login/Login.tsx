import './styles.css';
import { TLoginProps } from './types';

export const Login = ({ onLogin }: TLoginProps) => {
    return (
        <div className="my-auto ">
            <form
                className="mx-auto flex h-screen w-screen items-center justify-center bg-gray-900"
                onSubmit={e => {
                    e.preventDefault();
                    onLogin(e);
                }}
            >
                <input
                    type="text"
                    id="login"
                    name="login"
                    placeholder="Nickname"
                    className="mx-2 h-12 rounded-md border border-slate-400 bg-gray-800 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                ></input>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="mx-2 h-12 rounded-md border border-slate-400 bg-gray-800 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                ></input>
                <button
                    type="submit"
                    className="mx-2 flex h-12 w-12 items-center justify-center rounded-full bg-violet-700 text-white"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                    </svg>
                </button>
            </form>
        </div>
    );
};

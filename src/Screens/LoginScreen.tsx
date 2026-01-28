import type { Dispatch, SetStateAction } from "react";
import type { Screen, Role } from "../App";
import { AuthLayout } from "../components/AuthLayout";

type Props = {
    setScreen: React.Dispatch<React.SetStateAction<Screen>>;
};


export function LoginScreen({ setScreen }: Props) {
    return (
        <AuthLayout title="Login">
            <div className="space-y-4">
                <input className="w-full p-3 border rounded" placeholder="Email" />
                <input
                    className="w-full p-3 border rounded"
                    type="password"
                    placeholder="Password"
                />

                <button className="w-full py-3 bg-slate-800 text-white rounded-lg">
                    Login
                </button>
                <div className="flex justify-between text-sm text-gray-500 mt-4">
                    <span
                        className="cursor-pointer hover:underline"
                        onClick={() => setScreen("forgot-password")}
                    >
                        Forgot Password?
                    </span>

                    <span
                        className="cursor-pointer hover:underline"
                        onClick={() => setScreen("role")}
                    >
                        Sign up
                    </span>
                </div>
            </div>
        </AuthLayout>
    );
}

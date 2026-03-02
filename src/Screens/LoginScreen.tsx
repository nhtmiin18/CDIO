import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Screen, Role } from "../App";
import { AuthLayout } from "../components/AuthLayout";

type Props = {
    setScreen: Dispatch<SetStateAction<Screen>>;
    setRole: Dispatch<SetStateAction<Role>>;
    setUserId: Dispatch<SetStateAction<string | null>>;
};

export function LoginScreen({ setScreen, setRole, setUserId }: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                alert("Login failed");
                return;
            }

            const data = await res.json();
            console.log("LOGIN RESPONSE:", data);

            const user = data.user;

            const userId = user?._id || user?.id;

            if (!user || !userId || !user.role) {
                alert("Invalid login response");
                return;
            }

            // lưu localStorage
            localStorage.setItem(
                "user",
                JSON.stringify({ ...user, id: userId })
            );

            setUserId(userId);
            setRole(user.role);

            if (user.role === "student") {
                setScreen("student-dashboard");
            } else if (user.role === "recruiter") {
                setScreen("recruiter-dashboard");
            } else if (user.role === "admin") {
                setScreen("admin-dashboard");
            }

        } catch (err) {
            console.error(err);
            alert("Login failed");
        }
    };

    return (
        <AuthLayout title="Login">
            <div className="space-y-4">
                <input
                    className="w-full p-3 border rounded"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="w-full p-3 border rounded"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="w-full py-3 bg-slate-800 text-white rounded-lg"
                >
                    Login
                </button>

                <div className="flex justify-between text-sm text-gray-500 mt-4">
                    <span onClick={() => setScreen("forgot-password")}>
                        Forgot Password?
                    </span>

                    <span onClick={() => setScreen("role")}>
                        Sign up
                    </span>
                </div>
            </div>
        </AuthLayout>
    );
}
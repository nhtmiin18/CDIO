import type { Dispatch, SetStateAction } from "react";
import type { Screen, Role } from "../App";
import { AuthLayout } from "../components/AuthLayout";
import { useState } from "react";


type Props = {
    setScreen: React.Dispatch<React.SetStateAction<Screen>>;
};


export function LoginScreen({ setScreen }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // ✅ lưu token (sau này dùng auth)
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // 🔥 ĐIỀU HƯỚNG THEO ROLE
      if (data.role === "student") {
        setScreen("student-dashboard");
      } else if (data.role === "recruiter") {
        setScreen("recruiter-dashboard");
      } else if (data.role === "admin") {
        setScreen("admin-dashboard");
      }
      else {
        alert("Unknown role");
      }
    } catch (error) {
      alert("Cannot connect to server");
    } finally {
      setLoading(false);
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
          className="w-full py-3 bg-slate-800 text-white rounded-lg"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
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
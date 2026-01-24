import { useState } from "react";
import type { Role } from "../App";
import { AuthLayout } from "../components/AuthLayout";

type Props = {
    role: Role;
    onBack: () => void;
};

export function RegisterScreen({ role, onBack }: Props) {
    const [form, setForm] = useState<any>({
        fullName: "",
        email: "",
        university: "",
        major: "",

        companyName: "",
        companyEmail: "",
        companyWebsite: "",
        hrName: "",

        password: "",
        confirmPassword: "",
    });

    const handleChange = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
    };
    const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isStrongPassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);


    const handleRegister = async () => {
    const email =
        role === "student" ? form.email : form.companyEmail;

    if (!email || !isValidEmail(email)) {
        alert("Invalid email format");
        return;
    }

    if (!isStrongPassword(form.password)) {
        alert(
            "Password must be at least 8 characters, include uppercase, lowercase, number and special character"
        );
        return;
    }

    if (form.password !== form.confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    let body: any = {
        role,
        password: form.password,
    };

    if (role === "student") {
        body = {
            ...body,
            fullName: form.fullName,
            email: form.email,
            university: form.university,
            major: form.major,
        };
    } else {
        body = {
            ...body,
            email: form.companyEmail,
            companyName: form.companyName,
            companyWebsite: form.companyWebsite,
            hrName: form.hrName,
        };
    }

    try {
        const res = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "Register failed");
            return;
        }

        alert("Register success");
        onBack();
    } catch {
        alert("Server error");
    }
};

    return (
        <AuthLayout
            width="500px"
            title={role === "student" ? "Student Registration" : "Recruiter Registration"}
        >
            <div className="space-y-4">
                {role === "student" ? (
                    <>
                        <Input label="Full Name" onChange={(v) => handleChange("fullName", v)} />
                        <Input label="Email" onChange={(v) => handleChange("email", v)} />
                        <Input label="University" onChange={(v) => handleChange("university", v)} />
                        <Input label="Major" onChange={(v) => handleChange("major", v)} />
                    </>
                ) : (
                    <>
                        <Input label="Company Name" onChange={(v) => handleChange("companyName", v)} />
                        <Input label="Company Email" onChange={(v) => handleChange("companyEmail", v)} />
                        <Input label="Company Website" onChange={(v) => handleChange("companyWebsite", v)} />
                        <Input label="HR Contact Name" onChange={(v) => handleChange("hrName", v)} />
                    </>
                )}

                <Input
                    label="Password"
                    type="password"
                    onChange={(v) => handleChange("password", v)}
                />
                <Input
                    label="Confirm Password"
                    type="password"
                    onChange={(v) => handleChange("confirmPassword", v)}
                />

                <button
                    onClick={handleRegister}
                    className="w-full mt-6 py-3 rounded-lg bg-slate-800 text-white"
                >
                    Register
                </button>
            </div>

            <div className="text-center mt-6 text-sm text-gray-500">
                <span className="cursor-pointer hover:underline" onClick={onBack}>
                    Back
                </span>
            </div>
        </AuthLayout>
    );
}

function Input({
    label,
    type = "text",
    onChange,
}: {
    label: string;
    type?: string;
    onChange: (value: string) => void;
}) {
    return (
        <div>
            <label className="text-sm font-semibold text-gray-600">{label}</label>
            <input
                type={type}
                onChange={(e) => onChange(e.target.value)}
                className="w-full mt-1 p-3 rounded-lg border border-gray-300"
            />
        </div>
    );
}

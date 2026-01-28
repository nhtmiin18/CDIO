import type { Role } from "../App";
import { AuthLayout } from "../components/AuthLayout";

type Props = {
    role: Role;
    onBack: () => void; 
};

export function RegisterScreen({ role, onBack }: Props) {
    return (
        <AuthLayout
            width="500px"
            title={
                role === "student"
                    ? "Student Registration"
                    : "Recruiter Registration"
            }
        >
            <div className="space-y-4">
                {role === "student" ? (
                    <>
                        <Input label="Full Name" />
                        <Input label="Email" />
                        <Input label="University" />
                        <Input label="Major" />
                    </>
                ) : (
                    <>
                        <Input label="Company Name" />
                        <Input label="Company Email" />
                        <Input label="Company Website" />
                        <Input label="HR Contact Name" />
                    </>
                )}

                <Input label="Password" type="password" />
                <Input label="Confirm Password" type="password" />

                <button className="w-full mt-6 py-3 rounded-lg bg-slate-800 text-white">
                    Register
                </button>
            </div>

            <div className="text-center mt-6 text-sm text-gray-500">
                <span
                    className="cursor-pointer hover:underline"
                    onClick={onBack}
                >
                    Back
                </span>
            </div>
        </AuthLayout>
    );
}

function Input({
    label,
    type = "text",
}: {
    label: string;
    type?: string;
}) {
    return (
        <div>
            <label className="text-sm font-semibold text-gray-600">{label}</label>
            <input
                type={type}
                className="w-full mt-1 p-3 rounded-lg border border-gray-300"
            />
        </div>
    );
}

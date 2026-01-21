import { AuthLayout } from "../components/AuthLayout";
import type { Screen, Role } from "../App";

type Props = {
    setScreen: React.Dispatch<React.SetStateAction<Screen>>;
    setRole: React.Dispatch<React.SetStateAction<Role>>;
};

export function RoleSelectScreen({ setScreen, setRole }: Props) {
    return (
        <AuthLayout width="520px">
            <h1 className="text-2xl font-bold text-center mb-2">
                Choose your role
            </h1>

            <p className="text-sm text-gray-500 text-center mb-8">
                Select how you want to use ISRS
            </p>

            <div className="grid grid-cols-2 gap-6">
                {/* Student */}
                <div
                    className="border rounded-xl p-6 cursor-pointer hover:bg-gray-100 transition"
                    onClick={() => {
                        setRole("student");
                        setScreen("register");
                    }}
                >
                    <div className="text-3xl mb-3 text-center">🎓</div>
                    <div className="text-lg font-bold text-center mb-2">
                        Student
                    </div>
                    <p className="text-sm text-gray-600 text-center">
                        Find internships, upload your CV, and get matched with recruiters
                        using AI recommendations.
                    </p>
                </div>

                {/* Recruiter */}
                <div
                    className="border rounded-xl p-6 cursor-pointer hover:bg-gray-100 transition"
                    onClick={() => {
                        setRole("recruiter");
                        setScreen("register");
                    }}
                >
                    <div className="text-3xl mb-3 text-center">🏢</div>
                    <div className="text-lg font-bold text-center mb-2">
                        Recruiter
                    </div>
                    <p className="text-sm text-gray-600 text-center">
                        Post internships, search student profiles, and find the best
                        candidates quickly and easily.
                    </p>
                </div>
            </div>

            {/* Back */}
            <div className="text-center mt-6">
                <button
                    className="text-sm text-gray-500 hover:underline"
                    onClick={() => setScreen("login")}
                >
                    ← Back to login
                </button>
            </div>
        </AuthLayout>
    );
}

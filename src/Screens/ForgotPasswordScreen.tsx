import { AuthLayout } from "../components/AuthLayout";

type Props = {
    onBack: () => void;
};

export function ForgotPasswordScreen({ onBack }: Props) {
    return (
        <AuthLayout title="Forgot Password" width="420px">
            <div className="space-y-4">
                <p className="text-sm text-gray-500">
                    Enter your email address and we’ll send you a link to reset your password.
                </p>

                <div>
                    <label className="text-sm font-semibold text-gray-600">
                        Email address
                    </label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full mt-1 p-3 rounded-lg border border-gray-300"
                    />
                </div>

                <button className="w-full mt-4 py-3 rounded-lg bg-slate-800 text-white">
                    Send reset link
                </button>

                <div className="text-center mt-4 text-sm text-gray-500">
                    <span
                        className="cursor-pointer hover:underline"
                        onClick={onBack}
                    >
                        Back to login
                    </span>
                </div>
            </div>
        </AuthLayout>
    );
}

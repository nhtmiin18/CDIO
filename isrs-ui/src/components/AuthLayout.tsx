type Props = {
    children: React.ReactNode;
    title?: string;
    width?: string;
};

export function AuthLayout({ children, title, width = "420px" }: Props) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div
                className="bg-white p-8 rounded-xl shadow"
                style={{ width }}
            >
                {title && (
                    <h1 className="text-2xl font-bold text-center mb-6">
                        {title}
                    </h1>
                )}
                {children}
            </div>
        </div>
    );
}

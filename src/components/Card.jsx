export default function Card({ children }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border p-6">
            {children}
        </div>
    );
}

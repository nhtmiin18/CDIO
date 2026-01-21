import Card from "./Card";

export default function QuickActions({ onUploadCV }) {
    return (
        <Card title="Quick Actions">
            <div className="space-y-3">
                <button
                    onClick={onUploadCV}
                    className="w-full border py-2 hover:bg-gray-100"
                >
                    Upload CV
                </button>

                <button className="w-full border py-2 hover:bg-gray-100">
                    View Recommendations
                </button>

                <button className="w-full border py-2 hover:bg-gray-100">
                    Edit Profile
                </button>
            </div>
        </Card>
    );
}

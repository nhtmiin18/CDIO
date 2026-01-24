import Card from "./Card";

export default function ProfileStatus() {
    return (
        <Card title="Quick Statistics">
            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span>CV Uploaded:</span>
                    <span className="border px-2">Yes</span>
                </div>
                <div className="flex justify-between">
                    <span>Profile Complete:</span>
                    <span className="border px-2">80%</span>
                </div>
                <div className="flex justify-between">
                    <span>Applications:</span>
                    <span className="border px-2">5</span>
                </div>
            </div>
        </Card>
    );
}

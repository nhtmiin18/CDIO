import Card from "./Card";

export default function InternshipMatches() {
    const data = [1, 2, 3];
    return (
        <Card title="Recent Recommendations">
            <div className="space-y-3">
                {data.map((i) => (
                    <div key={i} className="border p-3">
                        <div className="font-medium">Company Name {i}</div>
                        <div className="text-sm text-gray-500">Position Title</div>
                    </div>
                ))}
            </div>
        </Card>
    );
}

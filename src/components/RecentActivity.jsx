import Card from "./Card";

export default function RecentActivity() {
    const items = [
        "Applied for Internship A",
        "Updated profile information",
        "Uploaded CV",
    ];

    return (
        <Card title="Recent Activity">
            <ul className="divide-y text-sm">
                {items.map((item, i) => (
                    <li
                        key={i}
                        className="py-2 flex justify-between"
                    >
                        <span>{item}</span>
                        <span className="text-gray-400">
                            Date/Time
                        </span>
                    </li>
                ))}
            </ul>
        </Card>
    );
}

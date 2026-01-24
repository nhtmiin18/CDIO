import { useState } from "react";
import { AppHeader } from "../components/AppHeader";
import type { Notification } from "../components/notificationsHelper";
import { matches, system } from "../components/notificationsHelper";

type Tab = "all" | "matches" | "system";

type Props = {
    onBack: () => void;
    onLogout: () => void;
};


export function NotificationsScreen({ onBack, onLogout }: Props) {
    const [tab, setTab] = useState<Tab>("all");

    const all: Notification[] = [...matches, ...system];

    const data: Notification[] =
        tab === "matches" ? matches : tab === "system" ? system : all;

    const unreadCounts = {
        all: all.filter((n) => n.unread).length,
        matches: matches.filter((n) => n.unread).length,
        system: system.filter((n) => n.unread).length,
    };

    return (
        <div className="min-h-screen bg-gray-50 text-slate-800">
            <AppHeader
                title="ISRS – Notifications"
                showBack={true}
                onBack={onBack}
                onLogout={onLogout}
                notificationCount={unreadCounts.all}
            />

            <div className="bg-white border-b flex px-8">
                {(["all", "matches", "system"] as const).map((x) => (
                    <button
                        key={x}
                        onClick={() => setTab(x)}
                        className={`px-6 py-4 text-sm font-semibold capitalize ${tab === x
                                ? "border-b-2 border-slate-800 text-slate-900"
                                : "text-gray-500"
                            }`}
                    >
                        {x} ({unreadCounts[x]})
                    </button>
                ))}
            </div>

            <div className="max-w-4xl mx-auto p-8 space-y-4">
                {data.map((n, i) => (
                    <div
                        key={i}
                        className={`bg-white p-6 rounded-xl shadow flex justify-between items-center ${n.unread ? "ring-1 ring-indigo-300" : ""
                            }`}
                    >
                        <div>
                            <div className="font-bold">{n.title}</div>
                            <div className="text-sm text-gray-500 mt-1">{n.message}</div>
                        </div>
                        <div className="text-xs text-gray-400">{n.time}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default NotificationsScreen;

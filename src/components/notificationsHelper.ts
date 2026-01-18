export interface Notification {
    title: string;
    message: string;
    time: string; 
    unread?: boolean;
}

export const matches: Notification[] = [
    { title: "New Internship Match", message: "Frontend Intern at Google", time: "2h ago", unread: true },
    { title: "Recruiter Viewed Your CV", message: "Meta HR viewed your profile", time: "Yesterday", unread: true },
];

export const system: Notification[] = [
    { title: "CV Parsed Successfully", message: "Your CV processed", time: "2 days ago", unread: false },
    { title: "Profile Reminder", message: "Complete your profile", time: "2 days ago", unread: true },
];

export const getUnreadCount = () => {
    return [...matches, ...system].filter(n => n.unread).length;
};

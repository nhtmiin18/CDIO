import { useState } from "react";

/* ===== AUTH SCREENS ===== */
import { LoginScreen } from "./Screens/LoginScreen";
import { ForgotPasswordScreen } from "./Screens/ForgotPasswordScreen";
import { RoleSelectScreen } from "./Screens/RoleSelectScreen";
import { RegisterScreen } from "./Screens/RegisterScreen";

/* ===== STUDENT SCREENS ===== */
import StudentDashboard from "./Screens/StudentDashboard";
import StudentProfile from "./Screens/StudentProfile.jsx";
import UploadCVScreen from "./Screens/UploadCVScreen";
import InternshipPostDetail from "./Screens/InternshipPostDetail";
import NotificationsScreen from "./Screens/NotificationsScreen";
import CVParsingScreen from "./Screens/CVParsing";

/* ===== RECRUITER SCREENS ===== */
import RecruiterDashboard from "./Screens/RecruiterDashboard.jsx";
import CreateInternshipPost from "./Screens/CreateInternshipPost.jsx";
import RecommendedScreen from "./Screens/RecommendedScreen.jsx";
import StudentProfileView from "./Screens/StudentProfileView.jsx";
import MyInternshipPosts from "./Screens/MyInternshipPosts.jsx";

/* ===== ADMIN SCREENS ===== */
import AdminDashboard from "./Screens/AdminDashboard.jsx";
import UserManagementScreen from "./Screens/UserManagement.jsx";
import SystemReportScreen from "./Screens/SystemReportScreen.jsx";
import InternshipPostManagement from "./Screens/InternshipPostManagement.jsx";

/* ===== TYPES ===== */
export type Role = "student" | "recruiter" | "admin" | null;

export type Screen =
    | "login"
    | "forgot-password"
    | "role"
    | "register"
    | "student-dashboard"
    | "student-profile"
    | "upload-cv"
    | "internship-post-detail"
    | "student-cv-parsing"
    | "student-notifications"
    | "recruiter-dashboard"
    | "create-internship-post"
    | "recommended"
    | "recruiter-posts"
    | "student-profile-view"
    | "recruiter-notifications"
    | "admin-dashboard"
    | "admin-user-management"
    | "admin-internship-posts"
    | "admin-system-report"
    | "admin-notifications";

type Student = {
    id: number;
    name: string;
    major: string;
    skills: string[];
    experience: string;
    certificates: string;
};

function App() {
    const [screen, setScreen] = useState<Screen>("admin-dashboard");
    const [role, setRole] = useState<Role>(null);

    const [_id, setId] = useState<string | null>(null);

    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const logout = () => {
        setRole(null);
        setId(null);
        setScreen("login");
    };

    const studentNav = {
        onViewDashboard: () => setScreen("student-dashboard"),
        onViewProfile: () => setScreen("student-profile"),
        onUploadCV: () => setScreen("upload-cv"),
        onViewInternship: () => setScreen("internship-post-detail"),
        onClickNotification: () => setScreen("student-notifications"),
        onViewCVParsing: () => setScreen("student-cv-parsing"),
        onLogout: logout,
    };

    const recruiterNav = {
        onViewDashboard: () => setScreen("recruiter-dashboard"),
        onCreatePost: () => setScreen("create-internship-post"),
        onViewRecommended: () => setScreen("recommended"),
        onViewPosts: () => setScreen("recruiter-posts"),
        onBackDashboard: () => setScreen("recruiter-dashboard"),
        onClickNotification: () => setScreen("recruiter-notifications"),
        onLogout: logout,
    };

    const adminNav = {
        onViewDashboard: () => setScreen("admin-dashboard"),
        onViewUserManagement: () => setScreen("admin-user-management"),
        onViewInternshipPosts: () => setScreen("admin-internship-posts"),
        onViewSystemReport: () => setScreen("admin-system-report"),
        onClickNotification: () => setScreen("admin-notifications"),
        onLogout: logout,
    };

    switch (screen) {
        case "login":
            return (
                <LoginScreen
                    setScreen={setScreen}
                    setRole={setRole}
                    setUserId={setId}   
                />
            );

        case "forgot-password":
            return <ForgotPasswordScreen onBack={() => setScreen("login")} />;

        case "role":
            return <RoleSelectScreen setRole={setRole} setScreen={setScreen} />;

        case "register":
            if (!role) return null;
            return <RegisterScreen role={role} onBack={() => setScreen("role")} />;

        case "student-dashboard":
            return (
                <StudentDashboard
                    {...studentNav}
                    _id={_id}   
                />
            );

        case "student-cv-parsing":
            return (
                <CVParsingScreen
                    {...studentNav}
                    _id={_id}   
                />
            );

        case "student-profile":
            return <StudentProfile {...studentNav} />;

        case "upload-cv":
            return <UploadCVScreen {...studentNav} />;

        case "internship-post-detail":
            return <InternshipPostDetail {...studentNav} />;

        case "student-notifications":
            return (
                <NotificationsScreen
                    onBack={() => setScreen("student-dashboard")}
                    onLogout={logout}
                />
            );

        case "recruiter-dashboard":
            return <RecruiterDashboard {...recruiterNav} />;

        case "create-internship-post":
            return <CreateInternshipPost {...recruiterNav} />;

        case "recruiter-posts":
            return <MyInternshipPosts {...recruiterNav} />;

        case "recommended":
            return (
                <RecommendedScreen
                    {...recruiterNav}
                    onSelectStudent={(student: Student) => {
                        setSelectedStudent(student);
                        setScreen("student-profile-view");
                    }}
                />
            );

        case "student-profile-view":
            return (
                <StudentProfileView
                    student={selectedStudent}
                    onBack={() => setScreen("recommended")}
                    {...recruiterNav}
                />
            );

        case "recruiter-notifications":
            return (
                <NotificationsScreen
                    onBack={() => setScreen("recruiter-dashboard")}
                    onLogout={logout}
                />
            );

        case "admin-dashboard":
            return <AdminDashboard {...adminNav} />;

        case "admin-user-management":
            return <UserManagementScreen {...adminNav} />;

        case "admin-internship-posts":
            return <InternshipPostManagement {...adminNav} />;

        case "admin-system-report":
            return <SystemReportScreen {...adminNav} />;

        case "admin-notifications":
            return (
                <NotificationsScreen
                    onBack={() => setScreen("admin-dashboard")}
                    onLogout={logout}
                />
            );

        default:
            return null;
    }
}

export default App;
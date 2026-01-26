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

/* ===== RECRUITER SCREENS ===== */
import RecruiterDashboard from "./Screens/RecruiterDashboard.jsx";
import CreateInternshipPost from "./Screens/CreateInternshipPost.jsx";
import RecommendedScreen from "./Screens/RecommendedScreen.jsx";
import StudentProfileView from "./Screens/StudentProfileView.jsx";

/* ===== ADMIN SCREENS ===== */
import AdminDashboard from "./Screens/AdminDashboard.jsx";
import CVParsingScreen from "./Screens/CVParsing.jsx";
import UserManagementScreen from "./Screens/UserManagement.jsx";
import SystemReportScreen from "./Screens/SystemReportScreen.jsx";

/* ===== TYPES ===== */
export type Role = "student" | "recruiter" | "admin" | null;

export type Screen =
    /* auth */
    | "login"
    | "forgot-password"
    | "role"
    | "register"

    /* student */
    | "student-dashboard"
    | "student-profile"
    | "upload-cv"
    | "internship-post-detail"
    | "student-notifications"

    /* recruiter */
    | "recruiter-dashboard"
    | "create-internship-post"
    | "recommended"
    | "student-profile-view"
    | "recruiter-notifications"

    /* admin */
    | "admin-dashboard"
    | "admin-cv-parsing"
    | "admin-user-management"
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
    //thay Student: student-dashboard, Recruiter: recruiter-dashboard, Admin: admin-dashboard
    const [screen, setScreen] = useState<Screen>("admin-dashboard");
    const [role, setRole] = useState<Role>(null);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    /* ===== COMMON ===== */
    const logout = () => {
        setRole(null);
        setScreen("login");
    };

    /* ===== STUDENT NAV ===== */
    const studentNav = {
        onViewDashboard: () => setScreen("student-dashboard"),
        onViewProfile: () => setScreen("student-profile"),
        onUploadCV: () => setScreen("upload-cv"),
        onViewInternship: () => setScreen("internship-post-detail"),
        onClickNotification: () => setScreen("student-notifications"),
        onViewCVParsing: () => setScreen("admin-cv-parsing"),
        onLogout: logout,
    };

    /* ===== RECRUITER NAV ===== */
    const recruiterNav = {
        onViewDashboard: () => setScreen("recruiter-dashboard"),
        onCreatePost: () => setScreen("create-internship-post"),
        onViewRecommended: () => setScreen("recommended"),
        onBackDashboard: () => setScreen("recruiter-dashboard"),
        onClickNotification: () => setScreen("recruiter-notifications"),
        onLogout: logout,
    };

    /* ===== ADMIN NAV ===== */
    const adminNav = {
        onViewDashboard: () => setScreen("admin-dashboard"),
        onViewCVParsing: () => setScreen("admin-cv-parsing"),
        onViewUserManagement: () => setScreen("admin-user-management"),
        onViewSystemReport: () => setScreen("admin-system-report"),
        onClickNotification: () => setScreen("admin-notifications"),
        onLogout: logout,
    };

    /* ===== RENDER ===== */
    switch (screen) {
        /* ===== AUTH FLOW ===== */
        case "login":
            return <LoginScreen setScreen={setScreen} />;

        case "forgot-password":
            return <ForgotPasswordScreen onBack={() => setScreen("login")} />;

        case "role": return <RoleSelectScreen setRole={setRole} setScreen={setScreen} />;

        case "register":
            if (!role) return null;
            return <RegisterScreen role={role} onBack={() => setScreen("role")} />;

        /* ===== STUDENT FLOW ===== */
        case "student-dashboard":
            return <StudentDashboard {...studentNav} />;

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

        /* ===== RECRUITER FLOW ===== */
        case "recruiter-dashboard":
            return <RecruiterDashboard {...recruiterNav} />;

        case "create-internship-post":
            return <CreateInternshipPost {...recruiterNav} />;

        case "recommended":
            return (
                <RecommendedScreen
                    {...recruiterNav}
                    onSelectStudent={(student : Student) => {
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

        /* ===== ADMIN FLOW ===== */
        case "admin-dashboard":
            return <AdminDashboard {...adminNav} />;

        case "admin-cv-parsing":
            return <CVParsingScreen {...adminNav} />;

        case "admin-user-management":
            return <UserManagementScreen {...adminNav} />;

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

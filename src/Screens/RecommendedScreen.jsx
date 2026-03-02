import { studentsData } from "../data/studentsData";
import { AppHeader } from "../components/AppHeader";
import RecruiterTabBar from "../components/RecruiterTabBar";
import { getUnreadCount } from "../components/notificationsHelper";
import { useEffect, useState } from "react";
import axios from "../api/axios";
function RecommendedScreen({
    onSelectStudent,
    onLogout,
    onViewDashboard,
    onCreatePost,
    onViewRecommended,
    onClickNotification,
    postId, ...props
}) {
    const unreadCount = getUnreadCount();
    const [students, setStudents] = useState([]);
const [loading, setLoading] = useState(true);
// const location = useLocation();
const selectedPostId = location.state?.selectedPostId;

// useEffect(() => {
//   const fetchMatchedStudents = async () => {
//     try {
//     //   const postId = "69797dc030ba026328c8b670"; // thay bằng id thật
//       const res = await axios.get(`/matches/post/${postId}`);
//       setStudents(res.data);
//     } catch (error) {
//       console.error("Error fetching matches:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchMatchedStudents();
// }, []);

useEffect(() => {
    console.log("POST ID:", postId);  // 👈 thêm dòng này
  if (!postId) return;

  const fetchMatchedStudents = async () => {
    try {
      const res = await axios.get(`/matches/post/${postId}`);
      console.log("API DATA:", res.data);  // 👈 thêm dòng này
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching matches:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchMatchedStudents();
}, [postId]);

// useEffect(() => {
//   if (!selectedPostId) return;

//   console.log("FETCHING MATCH FOR:", selectedPostId);

//   axios
//     .get(`/matches/post/${selectedPostId}`)
//     .then((res) => {
//       console.log("API RETURNED:", res.data);
//       setStudents(res.data);
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// }, [selectedPostId]);



    return (
        <div className="min-h-screen bg-gray-50">
            {/* HEADER */}
            <AppHeader
                title="ISRS – Recommended Students"
                onClickNotification={onClickNotification}
                notificationCount={unreadCount}
                onLogout={onLogout}
            />

            {/* TAB BAR */}
            <RecruiterTabBar
                active="recommended"
                onViewDashboard={onViewDashboard}
                onCreatePost={onCreatePost}
                onViewRecommended={onViewRecommended}
            />

            {/* CONTENT */}
            <div className="p-8">
                <h2 className="text-xl font-semibold mb-6">
                    Matched Students
                </h2>

                {students.map((student) => (
                    <div
                        key={student.id}
                        className="border p-4 mb-3 cursor-pointer"
                        onClick={() => onSelectStudent(student)}
                    >
                        <h3 className="font-semibold">
  {student.user?.fullName}
</h3>

<p>Email: {student.user?.email}</p>

<p>Match score: {student.matchScore}%</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecommendedScreen;

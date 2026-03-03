import { AppHeader } from "../components/AppHeader";
import RecruiterTabBar from "../components/RecruiterTabBar";
// App.jsx
import React, { useEffect, useState } from "react";

import "./RecuiterDashboard.css";
import { getUnreadCount } from "../components/notificationsHelper";
// import React, { useEffect, useState } from "react";
import { getRecruiterPosts } from "../api/postApi";
import { getAllPosts } from "../api/postApi";
import { useNavigate } from "react-router-dom";
import { getRecruiterStats } from "../api/postApi";


function ReguiterDashboard({
  onViewDashboard,
  onCreatePost,
  onViewPost,
  onViewRecommended,
  onLogout,
  onClickNotification,
}) {
  const unreadCount = getUnreadCount();

  const [posts, setPosts] = useState([]);
  
  const [search, setSearch] = useState("");

  const [showAll, setShowAll] = useState(false);

  const navigate = useNavigate();



  // TODO: sau này lấy recruiterId từ token
  const user = JSON.parse(localStorage.getItem("user"));
const recruiterId = user.id;

const fetchPosts = async () => {
    try {
      const res = await getRecruiterPosts(recruiterId);
      setPosts(res.data);
    } catch (error) {
      console.error("Failed to fetch posts", error);
    }
  };

  useEffect(() => {
  if (recruiterId) {
    fetchPosts();
  }
}, [recruiterId]);

  
//   useEffect(() => {
//   const fetchPosts = async () => {
//     try {
//       const res = await getAllPosts();
//       setPosts(res.data);
//     } catch (err) {
//       console.error("Lỗi lấy posts:", err);
//     }
//   };

//   fetchPosts();
// }, []);


const [activePosts, setActivePosts] = useState(0);
useEffect(() => {
  const fetchCount = async () => {
    const res = await fetch("/api/posts/count", {
      credentials: "include",
    });
    const data = await res.json();
    setActivePosts(data.count);
  };

  fetchCount();
}, []);

const filteredPosts = posts.filter((post) =>
  post.title?.toLowerCase().includes(search.toLowerCase())
);
const visiblePosts = showAll
  ? filteredPosts
  : filteredPosts.slice(0, 1);

  const [stats, setStats] = useState({
  activePosts: 0,
  totalMatches: 0,
  shortlisted: 0,
  avgMatchScore: 0,
});

useEffect(() => {
  const fetchStats = async () => {
    try {
      const res = await getRecruiterStats(recruiterId);
      setStats(res.data);
    } catch (err) {
      console.error("Failed to fetch stats", err);
    }
  };

  if (recruiterId) fetchStats();
}, [recruiterId]);
   

  return (
    <div className="recruiter-dashboard">
      {/* ===== TOP HEADER ===== */}
      <div className="top-header">
        <div className="header-left">
          <div className="logo" onClick={onViewDashboard}>
            <span className="logo-text">RECRUITER DASHBOARD</span>
          </div>

          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search posts, students, messages..."
               value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="header-right">
          <button
            className="icon-btn notification-btn"
            onClick={onClickNotification}
          >
            🔔
            <span className="notification-badge">{unreadCount}</span>
          </button>

          <div className="user-profile">
            <div className="avatar">👤</div>
            <div className="user-info">
               <span className="user-name">
              {user?.companyName || "Loading..."}
            </span>
              <span className="user-role">Recruiter</span>
            </div>
            <span className="dropdown-icon" onClick={onLogout}>▼</span>
          </div>
        </div>
      </div>

      <div className="dashboard-container">
        {/* ===== SIDEBAR ===== */}
        <nav className="sidebar">
          <ul className="nav-menu">
            <li className="nav-item active" onClick={onViewDashboard}>
              📊 Dashboard
            </li>
            <li className="nav-item" onClick={onViewPost}>
              📝 My Posts
            </li>
            {/* <li className="nav-item" onClick={onViewRecommended}>
              👥 Matched Students
            </li> */}
            {/* <li className="nav-item">💬 Messages</li>
            <li className="nav-item">⚙️ Settings</li> */}
          </ul>
        </nav>

        {/* ===== MAIN CONTENT ===== */}
        <main className="main-content .recruiter-dashboard ">
          {/* ===== STATS ===== */}
          <div className="stats-grid">
  <StatCard value={stats.activePosts} label="Active Posts" />
  <StatCard value={stats.totalMatches} label="Total Matches" />
  {/* <StatCard value={stats.shortlisted} label="Shortlisted" /> */}
  <StatCard value={`${stats.avgMatchScore}%`} label="Avg Match Score" />
</div>

          <div className="content-grid">
            {/* ===== LEFT COLUMN ===== */}
            <div className="left-column">
              {/* Active Internship Posts */}
              <section className="section-card">
  <h2 className="section-title">Active Internship Posts</h2>

  {posts.length === 0 && <p>Chưa có bài đăng</p>}

  {visiblePosts.map((post) => (
    <PostItem
      key={post._id}
      post={post}
      // title={post.title}   // 🔥 TIÊU ĐỀ THẬT
      // meta={`${post.benefits.length} benefits • Posted ${new Date(
      //   post.createdAt
      // ).toLocaleDateString()}`}
      onViewPost={onViewPost}
      onViewMatches={onViewRecommended}
      onEdit={(id) => onCreatePost(id)}
    />
  ))}

  <div className="view-all-container">
    {/* <button className="btn-text" onClick={onViewPost}>
      VIEW ALL POSTS
    </button> */}
    <button
  className="btn-text"
  onClick={() => setShowAll(!showAll)}
>
  {showAll ? "SHOW LESS" : "VIEW ALL POSTS"}
</button>
  </div>
</section>

            </div>

            {/* ===== RIGHT COLUMN ===== */}
            <div className="right-column">
              {/* Quick Actions */}
              <section className="section-card quick-actions">
                <h2 className="section-title">Quick Actions</h2>

                <button
                  className="btn btn-large btn-create"
                  onClick={onCreatePost}
                >
                  CREATE NEW POST
                </button>

                {/* <button className="btn btn-action" onClick={onViewRecommended}>
                  VIEW ALL MATCHES
                </button> */}

                {/* <button className="btn btn-action">
                  SHORTLISTED STUDENTS
                </button> */}

                {/* <button className="btn btn-action">MESSAGES</button> */}
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ===== REUSABLE COMPONENTS ===== */

function StatCard({ value, label }) {
  return (
    <div className="stat-card">
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  );
}

function PostItem({ post, onViewPost, onViewMatches, onEdit }) {
  return (
    <div className="post-item">
      {/* Title */}
      <h3 className="post-title">{post.title || "No title"}</h3>
       <p><b>Company:</b> {post.companyName}</p>
      <p><b>Location:</b> {post.location}</p>
      <p><b>Work mode:</b> {post.workMode}</p>
      <p><b>Internship type:</b> {post.internshipType}</p>
      <p><b>Duration:</b> {post.duration}</p>
      
      {/* Skills */}
      <div className="post-section">
        <strong>Skills:</strong>
        <p>
          {[
            ...(post.skills?.programmingLanguages || []),
            ...(post.skills?.frameworks || []),
            ...(post.skills?.tools || []),
          ].join(", ")}
        </p>
      </div>

      {/* Benefits */}
      <div className="post-section">
        <strong>Benefits:</strong>
        <ul>
          {post.benefits?.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>

      {/* Certifications */}
      <div className="post-section">
        <strong>Certifications:</strong>
        <ul>
          {post.certifications?.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>
      
      {/* Additional Requirements */}
<div className="post-section">
  <strong>Minimum GPA:</strong> {post.minimumGPA}
</div>

<div className="post-section">
  <strong>Major:</strong> {post.major}
</div>

<div className="post-section">
  <strong>Language Requirements:</strong>
  <ul>
    {post.languageRequirements?.map((lang, i) => (
      <li key={i}>{lang}</li>
    ))}
  </ul>
</div>

<div className="post-section">
  <strong>Other Requirements:</strong> {post.otherRequirements}
</div>

{/* Experience */}
<div className="post-section">
  <strong>Experience Level:</strong> {post.experienceLevel}
</div>

<div className="post-section">
  <strong>Experience Description:</strong> {post.experienceDescription}
</div>




      {/* Date */}
      <p className="post-meta">
        Posted {new Date(post.createdAt).toLocaleDateString("vi-VN")}
      </p>

      {/* Actions */}
      <div className="post-actions">
        <button className="btn btn-primary" onClick={ () => onViewMatches(post._id)}>
          VIEW MATCHES
        </button>
        {/* <button className="btn btn-outline" onClick={() => onCreatePost(post._id)}>
          EDIT
        </button> */}
      </div>
    </div>
  );
}

export default ReguiterDashboard;

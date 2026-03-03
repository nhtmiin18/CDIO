import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


import { AppHeader } from "../components/AppHeader";
import RecruiterTabBar from "../components/RecruiterTabBar";
import { getUnreadCount } from "../components/notificationsHelper";
import './CreatShipPost.css';
import { createInternshipPost } from "../api/postApi";
import { getPostById, updatePost } from "../api/postApi";



function CreateInternshipPost({
  onBackDashboard,
  onLogout,
  onViewDashboard,
  onCreatePost,
  onViewRecommended,
  onClickNotification,
}) {
  const [languages, setLanguages] = useState([
  "JavaScript",
  "Python",
  "TypeScript"
]);

const [frameworks, setFrameworks] = useState([
  "React",
  "Node.js"
]);

const [tools, setTools] = useState([
  "Git",
  "Docker",
  "AWS"
]);

// TODO: sau này lấy recruiterId từ token
  const user = JSON.parse(localStorage.getItem("user"));
const recruiterId = user.id;

const [newLanguage, setNewLanguage] = useState("");
const [newFramework, setNewFramework] = useState("");
const [newTool, setNewTool] = useState("");

const [companyName, setCompanyName] = useState("");
const [location, setLocation] = useState("");
const [internshipType, setInternshipType] = useState("");
const [workMode, setWorkMode] = useState("");
const [duration, setDuration] = useState("");
const [stipend, setStipend] = useState("");
const [jobDescription, setJobDescription] = useState("");


  const [skills, setSkills] = useState(['React', 'JavaScript']);
  const [benefits, setBenefits] = useState(['Health Insurance', 'Flexible Hours']);
  const [newSkill, setNewSkill] = useState('');
  const [newBenefit, setNewBenefit] = useState('');
  const [certifications, setCertifications] = useState([
  "AWS Certified Cloud Practitioner"
]);
const [title, setTitle] = useState("");

const [minimumGPA, setMinimumGPA] = useState("");
const [major, setMajor] = useState("");
const [languageRequirements, setLanguageRequirements] = useState([]);
const [otherRequirements, setOtherRequirements] = useState("");

const [experienceLevel, setExperienceLevel] = useState("");
const [experienceDescription, setExperienceDescription] = useState("");

const [newCertification, setNewCertification] = useState("");

const { id: editingPostId } = useParams();

const navigate = useNavigate();

useEffect(() => {
  if (!editingPostId) return;

  const fetchPost = async () => {
    try {
      // const res = await getPostById(id);
      // const post = res.data;
      const post = await getPostById(editingPostId);

      setTitle(post.title || "");
      setCompanyName(post.companyName || "");
      setLocation(post.location || "");
      setInternshipType(post.internshipType || "");
      setWorkMode(post.workMode || "");
      setDuration(post.duration || "");
      setStipend(post.monthlyStipend || "");
      setJobDescription(post.description || "");

      setLanguages(post.skills?.programmingLanguages || []);
      setFrameworks(post.skills?.frameworks || []);
      setTools(post.skills?.tools || []);

      setBenefits(post.benefits || []);
      setCertifications(post.certifications || []);

      setMinimumGPA(post.minimumGPA || "");
      setMajor(post.major || "");
      setLanguageRequirements(post.languageRequirements || []);
      setOtherRequirements(post.otherRequirements || "");

      setExperienceLevel(post.experienceLevel || "");
      setExperienceDescription(post.experienceDescription || "");

    } catch (err) {
      console.error("Load post failed", err);
    }
  };

  fetchPost();
},  [editingPostId]);

const handleSaveDraft = async () => {
  try {
    const payload = {
      title,
      companyName,
      location,
      internshipType,
      workMode,
      duration,
      monthlyStipend: stipend,
      description: jobDescription,
      skills: {
        programmingLanguages: languages,
        frameworks: frameworks,
        tools: tools,
      },
      benefits,
      certifications,
      minimumGPA,
      major,
      languageRequirements,
      otherRequirements,
      experienceLevel,
      experienceDescription,
    };

    if (id) {
      await updatePost(id, payload);
      alert("Post updated!");
    } else {
      await createInternshipPost(payload);
      alert("Draft created!");
    }

    navigate("/dashboard");

  } catch (err) {
    console.error(err);
    alert("Save failed");
  }
};

// useEffect(() => {
//   if (editingPostId) {
//     loadPost(editingPostId);
//   }
// }, [editingPostId]);




  
  const addItem = (value, list, setList, setValue) => {
  if (value.trim() && !list.includes(value.trim())) {
    setList([...list, value.trim()]);
    setValue("");
  }
};

const removeItem = (index, list, setList) => {
  setList(list.filter((_, i) => i !== index));
};

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setBenefits([...benefits, newBenefit.trim()]);
      setNewBenefit('');
    }
  };

  const removeBenefit = (index) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  // 2️⃣ HÀM SUBMIT — GẮN Ở ĐÂY ⬇⬇⬇
  const handlePublish = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const payload = {
        recruiterId: user.id,
        // Basic Info
  title,
  companyName,
  location,
  internshipType,
  workMode,
  duration,
  monthlyStipend: stipend,   // ✅ ĐÚNG TÊN
  description: jobDescription,
        skills: {
          programmingLanguages: languages,
          frameworks: frameworks,
          tools: tools,
        },
        benefits: benefits,
        certifications: certifications,
        // Additional Requirements
  minimumGPA,
  major,
  languageRequirements,
  otherRequirements,

  // Experience
  experienceLevel,
  experienceDescription,
      };

      const res = await createInternshipPost(payload);
      console.log("SUCCESS:", res.data);
      alert("Đăng bài thành công!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Lỗi server");
    }
  };


   return (
    <div className="app-container create-internship-post">
      {/* Top Navigation */}
      <div className="top-nav">
        <div className="nav-left">
          <div className="logo">
            <h1>Create Intership Post</h1>
          </div>
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search posts, students, messages..." />
          </div>
        </div>
        <div className="nav-right">
          <div className="notification" onClick={onClickNotification}>
            <span className="bell-icon">🔔</span>
            <span className="notification-count">3</span>
          </div>
          <div className="user-profile">
            <div className="avatar">👤</div>
            <div className="user-info">
              <span className="user-name">
              {user?.companyName || "Loading..."}
            </span>
              <span className="user-role">Recruiter</span>
            </div>
            <span className="dropdown" onClick={onLogout}>▼</span>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="sidebar">
          <div className="sidebar-menu">
            <div className="menu-item" onClick={onViewDashboard}>
              <span className="menu-icon">📊</span>
              <span>Dashboard</span>
            </div>

            <div className="menu-item active" onClick={onCreatePost}>
              <span className="menu-icon">📝</span>
              <span>My Posts</span>
            </div>

            {/* <div className="menu-item" onClick={onViewRecommended}>
              <span className="menu-icon">👥</span>
              <span>Matched Students</span>
            </div> */}

            {/* <div className="menu-item">
              <span className="menu-icon">💬</span>
              <span>Messages</span>
            </div>

            <div className="menu-item">
              <span className="menu-icon">⚙️</span>
              <span>Settings</span>
            </div>

            <div className="menu-item download">
              <span className="menu-icon">📥</span>
              <span>Download</span>
            </div> */}
          </div>
        </div>

        {/* Main Form Content */}
        <div className="form-container">
          {/* <div className="form-header">
            <h1>CREATE INTERNSHIP POST SCREEN</h1>
            <p className="form-subtitle">https://catalog • URL - Create Internship Post</p>
          </div> */}

          <div className="form-content">
            {/* Header Section */}
            {/* <div className="section-header">
              <h2>CREATE INTERNSHIP POST</h2>
              <p>Fill in the details to create a new internship post.</p>
            </div> */}
            {/* Post Creation Progress */}
            <div className="progress-section">
              <div className="progress-header">
                <h3>Post Creation Progress</h3>
                <div className="progress-steps">
                  <span className="step active">Step 1 of 5</span>
                </div>
              </div>
              
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '20%' }}></div>
              </div>
              
              <div className="step-indicators">
                <div className="step-item active">
                  <div className="step-number">1</div>
                  <div className="step-label">Basic Info</div>
                </div>
                <div className="step-item">
                  <div className="step-number">2</div>
                  <div className="step-label">Skills</div>
                </div>
                <div className="step-item">
                  <div className="step-number">3</div>
                  <div className="step-label">Requirements</div>
                </div>
                <div className="step-item">
                  <div className="step-number">4</div>
                  <div className="step-label">Benefits</div>
                </div>
                <div className="step-item">
                  <div className="step-number">5</div>
                  <div className="step-label">Review</div>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="form-section">
              <h3 className="section-title">Basic Information *</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Internship Title *</label>
                 <input
  type="text"
  placeholder="e.g. Frontend Developer Intern"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>
                </div>
                <div className="form-group">
                  <label>Company Name *</label>
                  <input
  type="text"
  value={companyName}
  onChange={(e) => setCompanyName(e.target.value)}
  placeholder="Company name"
  required
/>
                </div>
                <div className="form-group">
                  <label>Location *</label>
                 <input
  value={location}
  onChange={(e) => setLocation(e.target.value)}
/>
                </div>
                <div className="form-group">
                  <label>Internship Type</label>
                  <select
  value={internshipType}
  onChange={(e) => setInternshipType(e.target.value)}
>
  <option value="">Select</option>
  <option value="Internship">Internship</option>
  <option value="Full-time">Full-time</option>
  <option value="Part-time">Part-time</option>
</select>
                </div>
                <div className="form-group">
                  <label>Work Mode</label>
                  <select
  value={workMode}
  onChange={(e) => setWorkMode(e.target.value)}
>
  <option value="">Select</option>
  <option value="Remote">Remote</option>
  <option value="Onsite">Onsite</option>
  <option value="Hybrid">Hybrid</option>
</select>

                </div>
                <div className="form-group">
                  <label>Duration (months)</label>
                 <select
  value={duration}
  onChange={(e) => setDuration(e.target.value)}
>
  <option value="">Select</option>
  <option value="3 months">3 months</option>
  <option value="6 months">6 months</option>
</select>
                </div>
                <div className="form-group">
                  <label>Monthly Stipend ($)</label>
                  <input
  type="number"
  placeholder="e.g. 1500"
  value={stipend}
  onChange={(e) => setStipend(e.target.value)}
/>
                </div>
              </div>

              <div className="form-group full-width">
                <label>Job Description *</label>
                <textarea
  rows="3"
  value={jobDescription}
  onChange={(e) => setJobDescription(e.target.value)}
  placeholder="Brief description..."
/>

              </div>
            </div>

           

{/* Required Skills */}
<div className="form-section">
  <h3 className="section-title">Required Skills *</h3>
  
  <div className="tip-box">
    <p>Tip: Add specific skills to get better student matches. The system will automatically match students based on these requirements.</p>
  </div>

  {/* Programming Languages */}
  <div className="skills-category">
    <h4 className="category-title">Programming Languages *</h4>
    <div className="skills-table">
      <div className="table-row">
  {languages.map((skill, index) => (
    <div className="skill-cell" key={index}>
      <span>{skill}</span>
      <button
        className="remove-skill"
        onClick={() => removeItem(index, languages, setLanguages)}
      >
        ×
      </button>
    </div>
  ))}
</div>

    </div>
    <div className="add-skill-row">
      <input
  type="text"
  value={newLanguage}
  onChange={(e) => setNewLanguage(e.target.value)}
  placeholder="Enter programming language"
/>

<button
  className="add-btn"
  onClick={() =>
    addItem(newLanguage, languages, setLanguages, setNewLanguage)
  }
>
  + ADD LANGUAGE
</button>
    </div>
  </div>

  {/* Frameworks & Libraries */}
  <div className="skills-category">
    <h4 className="category-title">Frameworks & Libraries</h4>
    <div className="skills-table">
     <div className="table-row">
  {frameworks.map((skill, index) => (
    <div className="skill-cell" key={index}>
      <span>{skill}</span>
      <button
        className="remove-skill"
        onClick={() => removeItem(index, frameworks, setFrameworks)}
      >
        ×
      </button>
    </div>
  ))}
</div>
    </div>
    <div className="add-skill-row">
      <input
  type="text"
  value={newFramework}
  onChange={(e) => setNewFramework(e.target.value)}
  placeholder="Enter framework/library"
/>

<button
  className="add-btn"
  onClick={() =>
    addItem(newFramework, frameworks, setFrameworks, setNewFramework)
  }
>
  + ADD FRAMEWORK
</button>
    </div>
  </div>

  {/* Tools & Technologies */}
  <div className="skills-category">
    <h4 className="category-title">Tools & Technologies</h4>
    <div className="skills-table">
      <div className="table-row">
  {tools.map((skill, index) => (
    <div className="skill-cell" key={index}>
      <span>{skill}</span>
      <button
        className="remove-skill"
        onClick={() => removeItem(index, tools, setTools)}
      >
        ×
      </button>
    </div>
  ))}
</div>
    </div>
    <div className="add-skill-row">
      <input
  type="text"
  value={newTool}
  onChange={(e) => setNewTool(e.target.value)}
  placeholder="Enter tool/technology"
/>

<button
  className="add-btn"
  onClick={() =>
    addItem(newTool, tools, setTools, setNewTool)
  }
>
  + ADD TOOL
</button>
    </div>
  </div>
</div>

            {/* Benefits & Perks */}
            <div className="form-section">
              <h3 className="section-title">Benefits & Perks *</h3>
              <div className="benefits-section">
                <div className="benefits-tags">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="tag">
                      {benefit}
                      <button onClick={() => removeBenefit(index)}>×</button>
                    </div>
                  ))}
                </div>
                <div className="add-benefit">
                  <input 
                    type="text" 
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    placeholder="Enter benefit" 
                  />
                  <button onClick={addBenefit}>ADD BENEFIT</button>
                </div>
              </div>
            </div>

            {/* Technical Certifications */}
            <div className="form-section">
              <h3 className="section-title">Technical Certifications *</h3>
              <div className="form-group">
                <textarea 
                  rows="2" 
                  placeholder="Additional requirements or preferences for certifications."
                />
              </div>
              <div className="certification-section">
                <div className="certification-tags">
  {certifications.map((cert, index) => (
    <div className="cert-tag" key={index}>
      <span>{cert}</span>
      <button
        onClick={() =>
          removeItem(index, certifications, setCertifications)
        }
      >
        ×
      </button>
    </div>
  ))}
</div>
                <div className="add-cert">
                  <input
  type="text"
  value={newCertification}
  onChange={(e) => setNewCertification(e.target.value)}
  placeholder="Enter certification"
/>

                 <button
  onClick={() =>
    addItem(
      newCertification,
      certifications,
      setCertifications,
      setNewCertification
    )
  }
>
  ADD CERTIFICATE
</button>

                </div>
              </div>
            </div>

            {/* Additional Requirements */}
            <div className="form-section">
              <h3 className="section-title">Additional Requirements</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Minimun GPA</label>
                  <input
  type="text"
  placeholder="Minimum GPA"
  value={minimumGPA}
  onChange={(e) => setMinimumGPA(e.target.value)}
/>
                  {/* <select>
                    <option>Select level</option>
                    <option>Freshman</option>
                    <option>Sophomore</option>
                    <option>Junior</option>
                    <option>Senior</option>
                  </select> */}
                </div>
                <div className="form-group">
                  <label>Major/Field</label>
                  <input
  type="text"
  placeholder="Major"
  value={major}
  onChange={(e) => setMajor(e.target.value)}
/>
                </div>
                <div className="form-group">
                  <label>Language Requirements</label>
                  <input
  type="text"
  placeholder="Languages (comma separated)"
  onChange={(e) =>
    setLanguageRequirements(e.target.value.split(","))
  }
/>
                </div>
              </div>
              <div className="form-group full-width">
                <label>Other Requirements</label>
                <textarea 
                  rows="2" 
                  placeholder="Any additional requirements or preferences"
                />
              </div>
            </div>

            {/* Experience Requirements */}
            <div className="form-section">
              <h3 className="section-title">Experience Requirements</h3>
              <div className="experience-options">
                <label className="radio-option">
    <input
      type="radio"
      name="experience"
      value="NO_EXPERIENCE"
      checked={experienceLevel === "NO_EXPERIENCE"}
      onChange={(e) => setExperienceLevel(e.target.value)}
    />
    <span>No experience required</span>
  </label>
                
  <label className="radio-option">
    <input
      type="radio"
      name="experience"
      value="SOME_EXPERIENCE"
      checked={experienceLevel === "SOME_EXPERIENCE"}
      onChange={(e) => setExperienceLevel(e.target.value)}
    />
    <span>Some relevant experience</span>
  </label>
                <label className="radio-option">
    <input
      type="radio"
      name="experience"
      value="SPECIFIC_EXPERIENCE"
      checked={experienceLevel === "SPECIFIC_EXPERIENCE"}
      onChange={(e) => setExperienceLevel(e.target.value)}
    />
    <span>Specific experience in area</span>
  </label>
              </div>
              <div className="form-group">
                <label>If specific, please specify:</label>
                <textarea
  placeholder="Experience Description"
  value={experienceDescription}
  onChange={(e) => setExperienceDescription(e.target.value)}
/>
              </div>
            </div>

  
            {/* Form Buttons */}
            <div className="form-buttons">
              <button className="btn-cancel" onClick={onBackDashboard}>
                CANCEL
              </button>
              <div className="right-buttons">
                <button className="btn-draft" onClick={handleSaveDraft}>
  SAVE AS DRAFT
</button>
                <button className="btn-preview">PREVIEW</button>
                <button className="publish-btn" onClick={handlePublish}>
  Publish
</button>

              </div>
            </div>

          </div>
        </div>
      </div>
     </div>
  );
}

export default CreateInternshipPost;

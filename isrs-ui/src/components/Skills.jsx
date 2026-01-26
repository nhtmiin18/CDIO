import { useState } from "react";

const Skills = () => {
    const [languages, setLanguages] = useState([
        "JavaScript",
        "Python",
        "Java",
        "C++",
        "TypeScript",
    ]);
    const [frameworks, setFrameworks] = useState([
        "React",
        "Angular",
        "Spring",
    ]);

    const [newSkill, setNewSkill] = useState("");
    const [skillType, setSkillType] = useState("language");

    const addSkill = () => {
        if (!newSkill.trim()) return;

        if (skillType === "language") {
            setLanguages([...languages, newSkill.trim()]);
        } else {
            setFrameworks([...frameworks, newSkill.trim()]);
        }

        setNewSkill("");
    };

    const removeSkill = (index, type) => {
        if (type === "language") {
            setLanguages(languages.filter((_, i) => i !== index));
        } else {
            setFrameworks(frameworks.filter((_, i) => i !== index));
        }
    };

    return (
        <div className="skills-section">
            <h3>Skills</h3>

            <div className="skills-container">
                {/* Languages */}
                <div className="skill-category">
                    <h4>Programming Languages</h4>
                    <div className="skills-list">
                        {languages.map((skill, index) => (
                            <div key={index} className="skill-item">
                                <span className="skill-name">{skill}</span>
                                <button
                                    className="remove-skill"
                                    onClick={() => removeSkill(index, "language")}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Frameworks */}
                <div className="skill-category">
                    <h4>Frameworks & Libraries</h4>
                    <div className="skills-list">
                        {frameworks.map((skill, index) => (
                            <div key={index} className="skill-item">
                                <span className="skill-name">{skill}</span>
                                <button
                                    className="remove-skill"
                                    onClick={() => removeSkill(index, "framework")}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add skill */}
                <div className="add-skill-form">
                    <select
                        className="skill-type-select"
                        value={skillType}
                        onChange={(e) => setSkillType(e.target.value)}
                    >
                        <option value="language">Programming Language</option>
                        <option value="framework">Framework / Library</option>
                    </select>

                    <input
                        type="text"
                        className="skill-input"
                        placeholder="Enter new skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                    />

                    <button className="add-skill-btn" onClick={addSkill}>
                        + Add Skill
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Skills;

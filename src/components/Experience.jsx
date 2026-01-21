import { useState } from "react";

const Experience = () => {
    const [experiences, setExperiences] = useState([
        {
            id: 1,
            title: "Frontend Developer Intern",
            company: "Tech Company XYZ",
            period: "June 2020 - Aug 2023",
            description:
                "Developed responsive web applications and collaborated with ML team",
        },
    ]);

    const [newExp, setNewExp] = useState({
        title: "",
        company: "",
        period: "",
        description: "",
    });

    const handleAdd = () => {
        if (!newExp.title || !newExp.company || !newExp.period) return;

        setExperiences([
            ...experiences,
            { id: Date.now(), ...newExp },
        ]);

        setNewExp({
            title: "",
            company: "",
            period: "",
            description: "",
        });
    };

    const handleDelete = (id) => {
        setExperiences((list) => list.filter((e) => e.id !== id));
    };

    return (
        <div className="experience-section">
            <h3>Experience</h3>

            {experiences.map((exp) => (
                <div key={exp.id} className="experience-item">
                    <h4>{exp.title}</h4>
                    <p>{exp.company} – {exp.period}</p>
                    <p>{exp.description}</p>
                    <button onClick={() => handleDelete(exp.id)}>Delete</button>
                </div>
            ))}

            <div className="add-experience-form">
                <input
                    placeholder="Job title"
                    value={newExp.title}
                    onChange={(e) =>
                        setNewExp({ ...newExp, title: e.target.value })
                    }
                />
                <input
                    placeholder="Company"
                    value={newExp.company}
                    onChange={(e) =>
                        setNewExp({ ...newExp, company: e.target.value })
                    }
                />
                <input
                    placeholder="Period"
                    value={newExp.period}
                    onChange={(e) =>
                        setNewExp({ ...newExp, period: e.target.value })
                    }
                />
                <textarea
                    rows="3"
                    placeholder="Description"
                    value={newExp.description}
                    onChange={(e) =>
                        setNewExp({ ...newExp, description: e.target.value })
                    }
                />
                <button onClick={handleAdd}>+ Add Experience</button>
            </div>
        </div>
    );
};

export default Experience;

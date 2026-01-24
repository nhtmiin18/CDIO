import { useState } from "react";

const Certificates = () => {
    const [certificates, setCertificates] = useState([
        {
            id: 1,
            title: "AWS Certified Cloud Practitioner",
            issuer: "Amazon Web Services",
            date: "June 2023",
            isEditing: false,
        },
        {
            id: 2,
            title: "Google IT Support Professional",
            issuer: "Google",
            date: "March 2020",
            isEditing: false,
        },
    ]);

    const [newCert, setNewCert] = useState({
        title: "",
        issuer: "",
        date: "",
    });

    const handleEdit = (id) => {
        setCertificates((list) =>
            list.map((c) =>
                c.id === id ? { ...c, isEditing: true } : c
            )
        );
    };

    const handleSave = (id) => {
        setCertificates((list) =>
            list.map((c) =>
                c.id === id ? { ...c, isEditing: false } : c
            )
        );
    };

    const handleDelete = (id) => {
        setCertificates((list) => list.filter((c) => c.id !== id));
    };

    const handleAdd = () => {
        if (!newCert.title || !newCert.issuer || !newCert.date) return;

        setCertificates([
            ...certificates,
            {
                id: Date.now(),
                ...newCert,
                isEditing: false,
            },
        ]);

        setNewCert({ title: "", issuer: "", date: "" });
    };

    return (
        <div className="certificates-section">
            <h3>Certificates</h3>

            <div className="certificates-list">
                {certificates.map((cert) => (
                    <div key={cert.id} className="certificate-item">
                        <div className="certificate-content">
                            {cert.isEditing ? (
                                <>
                                    <input
                                        value={cert.title}
                                        onChange={(e) =>
                                            setCertificates((list) =>
                                                list.map((c) =>
                                                    c.id === cert.id
                                                        ? { ...c, title: e.target.value }
                                                        : c
                                                )
                                            )
                                        }
                                    />
                                    <input
                                        value={cert.issuer}
                                        onChange={(e) =>
                                            setCertificates((list) =>
                                                list.map((c) =>
                                                    c.id === cert.id
                                                        ? { ...c, issuer: e.target.value }
                                                        : c
                                                )
                                            )
                                        }
                                    />
                                    <input
                                        value={cert.date}
                                        onChange={(e) =>
                                            setCertificates((list) =>
                                                list.map((c) =>
                                                    c.id === cert.id
                                                        ? { ...c, date: e.target.value }
                                                        : c
                                                )
                                            )
                                        }
                                    />
                                </>
                            ) : (
                                <>
                                    <h4>{cert.title}</h4>
                                    <p>{cert.issuer} – {cert.date}</p>
                                </>
                            )}
                        </div>

                        <div className="certificate-actions">
                            {cert.isEditing ? (
                                <button onClick={() => handleSave(cert.id)}>Save</button>
                            ) : (
                                <button onClick={() => handleEdit(cert.id)}>Edit</button>
                            )}
                            <button onClick={() => handleDelete(cert.id)}>Delete</button>
                        </div>
                    </div>
                ))}

                <div className="add-certificate-form">
                    <input
                        placeholder="Certificate title"
                        value={newCert.title}
                        onChange={(e) =>
                            setNewCert({ ...newCert, title: e.target.value })
                        }
                    />
                    <input
                        placeholder="Issuer"
                        value={newCert.issuer}
                        onChange={(e) =>
                            setNewCert({ ...newCert, issuer: e.target.value })
                        }
                    />
                    <input
                        placeholder="Month Year"
                        value={newCert.date}
                        onChange={(e) =>
                            setNewCert({ ...newCert, date: e.target.value })
                        }
                    />
                    <button onClick={handleAdd}>+ Add Certificate</button>
                </div>
            </div>
        </div>
    );
};

export default Certificates;

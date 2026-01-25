import React, { useState } from 'react';
import './Certificates.css';

const Certificates = () => {
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: 'June 2023',
      isEditing: false
    },
    {
      id: 2,
      title: 'Google IT Support Professional',
      issuer: 'Google',
      date: 'March 2020',
      isEditing: false
    }
  ]);

  const [newCert, setNewCert] = useState({ title: '', issuer: '', date: '' });

  const handleEdit = (id) => {
    setCertificates(certs =>
      certs.map(cert =>
        cert.id === id ? { ...cert, isEditing: true } : cert
      )
    );
  };

  const handleSave = (id) => {
    setCertificates(certs =>
      certs.map(cert =>
        cert.id === id ? { ...cert, isEditing: false } : cert
      )
    );
  };

  const handleDelete = (id) => {
    setCertificates(certs => certs.filter(cert => cert.id !== id));
  };

  const handleAdd = () => {
    if (newCert.title && newCert.issuer && newCert.date) {
      const newCertificate = {
        id: Date.now(),
        ...newCert,
        isEditing: false
      };
      setCertificates([...certificates, newCertificate]);
      setNewCert({ title: '', issuer: '', date: '' });
    }
  };

  const handleInputChange = (id, field, value) => {
    setCertificates(certs =>
      certs.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    );
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
                    type="text"
                    value={cert.title}
                    onChange={(e) => handleInputChange(cert.id, 'title', e.target.value)}
                    className="edit-input"
                  />
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => handleInputChange(cert.id, 'issuer', e.target.value)}
                    className="edit-input"
                  />
                  <input
                    type="text"
                    value={cert.date}
                    onChange={(e) => handleInputChange(cert.id, 'date', e.target.value)}
                    className="edit-input"
                    placeholder="Month Year"
                  />
                </>
              ) : (
                <>
                  <h4>{cert.title}</h4>
                  <p className="certificate-details">{cert.issuer} - {cert.date}</p>
                </>
              )}
            </div>
            
            <div className="certificate-actions">
              {cert.isEditing ? (
                <button className="action-btn save" onClick={() => handleSave(cert.id)}>
                  Save
                </button>
              ) : (
                <button className="action-btn edit" onClick={() => handleEdit(cert.id)}>
                  Edit
                </button>
              )}
              <button className="action-btn delete" onClick={() => handleDelete(cert.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
        
        <div className="add-certificate-form">
          <input
            type="text"
            value={newCert.title}
            onChange={(e) => setNewCert({...newCert, title: e.target.value})}
            placeholder="Certificate Title"
            className="new-cert-input"
          />
          <input
            type="text"
            value={newCert.issuer}
            onChange={(e) => setNewCert({...newCert, issuer: e.target.value})}
            placeholder="Issuing Organization"
            className="new-cert-input"
          />
          <input
            type="text"
            value={newCert.date}
            onChange={(e) => setNewCert({...newCert, date: e.target.value})}
            placeholder="Month Year"
            className="new-cert-input"
          />
          <button onClick={handleAdd} className="add-cert-btn">
            + Add Certificate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Certificates;
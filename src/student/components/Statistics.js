import React from 'react';
import './Statistics.css';
import { FaBriefcase, FaEye, FaFileAlt, FaChartLine } from 'react-icons/fa';

const Statistics = () => {
  const stats = [
    {
      icon: <FaBriefcase />,
      label: 'Total Matches',
      value: '12',
      color: '#3498db',
      change: '+2 this week'
    },
    {
      icon: <FaEye />,
      label: 'Profile Views',
      value: '48',
      color: '#9b59b6',
      change: '+5 today'
    },
    {
      icon: <FaFileAlt />,
      label: 'Applications',
      value: '5',
      color: '#27ae60',
      change: '3 pending'
    },
    {
      icon: <FaChartLine />,
      label: 'Avg. Match Score',
      value: '84%',
      color: '#e74c3c',
      change: '+2% increase'
    },
  ];

  return (
    <div className="statistics-card">
      <div className="card-header">
        <h3>Your Statistics</h3>
      </div>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <div 
              className="stat-icon"
              style={{ background: stat.color }}
            >
              {stat.icon}
            </div>
            
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-change">{stat.change}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
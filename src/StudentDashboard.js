import React from 'react';
import './StudentDashboard.css';
import StudentHeader from './components/StudentHeader';
import Sidebar from './components/Sidebar';
import ProfileStatus from './components/ProfileStatus';
import InternshipMatches from './components/InternshipMatches';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';
import NotificationsPanel from './components/NotificationsPanel';
import Statistics from './components/Statistics';

const StudentDashboard = () => {
  return (
    <div className="student-dashboard">
      <StudentHeader />
      
      <div className="dashboard-container">
        <Sidebar />
        
        <main className="dashboard-main">
          <div className="dashboard-grid">
            <div className="left-column">
              <ProfileStatus />
              <InternshipMatches />
              <RecentActivity />
            </div>
            
            <div className="right-column">
              <QuickActions />
              <NotificationsPanel />
              <Statistics />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
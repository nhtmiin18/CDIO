import React, { useState } from 'react';
import './App.css';
import StudentDashboard from './student/StudentDashboard';

// Hoặc import cả hai dashboard nếu muốn switch
// import CVParsingDashboard from './components/CVParsingDashboard';

function App() {
  // State để switch giữa 2 dashboard nếu cần
  const [isStudentView, setIsStudentView] = useState(true);

  return (
    <div className="App">
      {/* Nếu muốn switch giữa 2 dashboard */}
      {/* <div className="dashboard-switcher">
        <button onClick={() => setIsStudentView(true)}>Student Dashboard</button>
        <button onClick={() => setIsStudentView(false)}>CV Parsing Dashboard</button>
      </div> */}
      
      {isStudentView ? (
        <StudentDashboard />
      ) : (
        // <CVParsingDashboard />
        <div>CV Parsing Dashboard</div>
      )}
    </div>
  );
}

export default App;
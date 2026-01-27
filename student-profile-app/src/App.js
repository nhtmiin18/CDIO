import React from 'react';
import Navbar from './components/Navbar/Navbar';
import ProfileHeader from './components/ProfileHeader/ProfileHeader';
import ProfilePhoto from './components/ProfilePhoto/ProfilePhoto';
import ProfileStats from './components/ProfileStats/ProfileStats';
import BasicInfo from './components/BasicInfo/BasicInfo';
import AboutMe from './components/AboutMe/AboutMe';
import Skills from './components/Skills/Skills';
import Certificates from './components/Certificates/Certificates';
import Experience from './components/Experience/Experience';
import LinksPortfolio from './components/LinksPortfolio/LinksPortfolio';
import ActionButtons from './components/ActionButtons/ActionButtons';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      
      <div className="main-content">
        <div className="content-wrapper">
          {/* ĐÃ XÓA Student Info Header */}
          
          <ProfileHeader />
          
          <div className="content-grid">
            {/* Left Column */}
            <div className="left-column">
              <ProfilePhoto />
              <ProfileStats />
            </div>
            
            {/* Right Column */}
            <div className="right-column">
              <BasicInfo />
              <AboutMe />
              <Skills />
              <Certificates />
              <Experience />
              <LinksPortfolio />
              
              {/* Action Buttons */}
              <ActionButtons />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
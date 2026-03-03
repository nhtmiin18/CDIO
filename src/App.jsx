import React from 'react';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import InternshipPostManagement from './pages/InternshipPostManagement';

function App() {
    return (
        <div>
            {/* Muốn hiện cái nào thì bật cái đó, cái kia comment lại */}
            <InternshipPostManagement /> 
            {/*<UserManagement />*/}
            {/*<Dashboard />*/}
        </div>
    )
}

export default App;
// components/Header.tsx

import React from 'react';
// Assuming you are using react-router-dom for navigation
import { Link } from 'react-router-dom';

/**
 * Props for the Header component.
 * We can include simple props like the application name.
 */
interface HeaderProps {
    appName?: string;
}

const Header: React.FC<HeaderProps> = ({ appName = 'HealthRecordPro' }) => {
    return (
        <header className="app-header">
            {/* Application Logo/Title */}
            <div className="logo-container">
                {/* Use Link to navigate to the home page */}
                <Link to="/" className="app-logo">
                    ⚕️ {appName}
                </Link>
            </div>

            {/* Navigation Links */}
            <nav className="main-nav">
                <ul>
                    <li>
                        <Link to="/patients">Patients</Link>
                    </li>
                    <li>
                        <Link to="/appointments">Appointments</Link>
                    </li>
                    <li>
                        <Link to="/settings">Settings</Link>
                    </li>
                    {/* Add more links as needed */}
                </ul>
            </nav>

            {/* User/Auth Section (e.g., login status or profile link) */}
            <div className="user-section">
                <button onClick={() => console.log('User clicked logout/profile')}>
                    Profile/Logout
                </button>
            </div>

            {/* Example basic styling for a professional header */}
            <style jsx>{`
                .app-header {
                    background-color: #007bff; /* Primary blue color */
                    color: white;
                    padding: 10px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .app-logo {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: white;
                    text-decoration: none;
                }
                .main-nav ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    gap: 25px;
                }
                .main-nav a {
                    color: white;
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.2s ease-in-out;
                }
                .main-nav a:hover {
                    color: #e0f0ff; /* Lighten text on hover */
                }
                .user-section button {
                    background: none;
                    border: 1px solid white;
                    color: white;
                    padding: 8px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                .user-section button:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                }
            `}</style>
        </header>
    );
};

export default Header;
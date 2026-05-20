import { NavLink, Link } from 'react-router-dom';
import { Container } from 'lucide-react';
import '../styles/Navbar.css';

export default function Navbar() {
    return (
        <nav className="master-nav">
            <Link to="/" className="nav-left">
                <Container className="nav-logo" size={28} />
                <span className="nav-brand">Docker MasterHub</span>
            </Link>
            <div className="nav-center">
                <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
                <NavLink to="/masterclass" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Masterclass</NavLink>
                <NavLink to="/lab" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Visual Lab</NavLink>
                <NavLink to="/advanced" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Advanced</NavLink>
                <NavLink to="/explorer" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Explorer</NavLink>
                <NavLink to="/installation" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Installation</NavLink>
                <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>About & Feedback</NavLink>
            </div>
            <div className="nav-right"></div>
        </nav>
    );
}

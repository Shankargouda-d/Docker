import { useNavigate } from 'react-router-dom';
import { GraduationCap, Layers, Rocket, Terminal } from 'lucide-react';
import '../styles/Home.css';

export default function Home() {
    const navigate = useNavigate();

    const cards = [
        { icon: <GraduationCap size={32} />, title: 'Masterclass', desc: 'CS44 Syllabus-aligned modules.', path: '/masterclass' },
        { icon: <Layers size={32} />, title: 'Visual Lab', desc: '10 Core Docker feature simulations.', path: '/lab' },
        { icon: <Rocket size={32} />, title: 'Advanced Features', desc: 'Dockerfile Builder, Security Scanner, K8s & more.', path: '/advanced' },
        { icon: <Terminal size={32} />, title: 'CLI Explorer', desc: 'Smart command detection & analysis.', path: '/explorer' },
    ];

    return (
        <div className="page-view">
            <div className="hero-container">
                <h1 className="glow-title">DockerVerse</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: 600, margin: '0 auto 3rem' }}>
                    The premium interactive hub for mastering container orchestration.
                </p>
                <div className="hero-grid">
                    {cards.map((c) => (
                        <div key={c.path} className="glowing-card" onClick={() => navigate(c.path)}>
                            {c.icon}
                            <h3>{c.title}</h3>
                            <p>{c.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

import { useState, useRef, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { featureData } from '../data/features';
import { ensureLucideGlobal } from '../utils/lucideShim';
import '../styles/globals.css';

const featureKeys = Object.keys(featureData);

export default function VisualLab() {
    const [searchParams] = useSearchParams();
    const featureParam = searchParams.get('feature');
    const initialKey = (featureParam && featureKeys.includes(featureParam)) ? featureParam : featureKeys[0];
    
    const [activeKey, setActiveKey] = useState(initialKey);
    const visualRef = useRef(null);
    const feature = featureData[activeKey];

    const renderVisual = useCallback(async () => {
        await ensureLucideGlobal();
        if (visualRef.current && feature?.render) {
            visualRef.current.innerHTML = '';
            feature.render(visualRef.current);
            if (window.lucide) window.lucide.createIcons();
        }
    }, [feature]);

    useEffect(() => { renderVisual(); }, [renderVisual]);

    // Expose simulation runner globally for onclick handlers in HTML strings
    useEffect(() => {
        window.runSimulation = (type) => {
            if (visualRef.current && feature?.simulate) {
                feature.simulate(visualRef.current, type);
            }
        };
        return () => { delete window.runSimulation; };
    }, [feature]);

    return (
        <div className="page-view">
            <div className="split-layout">
                <aside className="side-panel">
                    <div className="panel-header">10 Core Features</div>
                    {featureKeys.map((key) => (
                        <div
                            key={key}
                            className={`m-item ${key === activeKey ? 'active' : ''}`}
                            onClick={() => setActiveKey(key)}
                        >
                            {featureData[key].title}
                        </div>
                    ))}
                </aside>
                <main className="main-display">
                    <div className="display-header">
                        <h2>{feature.title}</h2>
                        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>{feature.desc}</p>
                    </div>
                    <div className="display-body scrollable-content">
                        <div className="visual-area" ref={visualRef}></div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div className="info-card"><strong>When to use:</strong><p>{feature.use}</p></div>
                            <div className="info-card"><strong>Example:</strong><p>{feature.example}</p></div>
                        </div>
                        <div className="deep-dive-box">
                            <strong><BookOpen size={16} /> Deep Dive</strong>
                            <p style={{ lineHeight: 1.7, color: 'var(--text-muted)' }}>{feature.deepDive}</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

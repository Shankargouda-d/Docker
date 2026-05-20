import { useState, useRef, useEffect, useCallback } from 'react';
import { Cpu } from 'lucide-react';
import { advancedData } from '../data/advanced';
import { ensureLucideGlobal } from '../utils/lucideShim';
import '../styles/globals.css';

const advKeys = Object.keys(advancedData);

export default function Advanced() {
    const [activeKey, setActiveKey] = useState(advKeys[0]);
    const visualRef = useRef(null);
    const feature = advancedData[activeKey];

    const renderVisual = useCallback(async () => {
        if (window._logInterval) clearInterval(window._logInterval);
        await ensureLucideGlobal();
        if (visualRef.current && feature?.render) {
            visualRef.current.innerHTML = '';
            feature.render(visualRef.current);
            if (window.lucide) window.lucide.createIcons();
        }
    }, [feature]);

    useEffect(() => { renderVisual(); }, [renderVisual]);

    useEffect(() => {
        window.advSim = (type) => {
            if (visualRef.current && feature?.simulate) {
                feature.simulate(visualRef.current, type);
            }
        };
        return () => {
            if (window._logInterval) clearInterval(window._logInterval);
            delete window.advSim;
        };
    }, [feature]);

    return (
        <div className="page-view">
            <div className="split-layout">
                <aside className="side-panel">
                    <div className="panel-header">Advanced Tools</div>
                    {advKeys.map((key) => (
                        <div
                            key={key}
                            className={`m-item ${key === activeKey ? 'active' : ''}`}
                            onClick={() => setActiveKey(key)}
                        >
                            {advancedData[key].title}
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
                        <div className="deep-dive-box">
                            <strong><Cpu size={16} /> Technical Details</strong>
                            <p style={{ lineHeight: 1.7, color: 'var(--text-muted)' }}>{feature.deepDive}</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

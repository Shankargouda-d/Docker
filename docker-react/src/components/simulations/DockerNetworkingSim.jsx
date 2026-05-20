import React, { useState, useRef, useEffect } from 'react';
import { Play, Globe, Shield, Activity, ArrowRight, Laptop, Server, Send } from 'lucide-react';

export default function DockerNetworkingSim() {
    const [status, setStatus] = useState('idle'); // idle, request-sent, port-mapping, reached
    const [logs, setLogs] = useState([]);
    const logContainerRef = useRef(null);

    const addLog = (msg) => setLogs(prev => [...prev, `[${new Date().toLocaleTimeString([], { hour12: false })}] ${msg}`]);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    const runSimulation = () => {
        if (status !== 'idle') return;
        
        setStatus('request-sent');
        addLog("EXTERNAL REQUEST: GET http://localhost:8080");
        
        setTimeout(() => {
            setStatus('port-mapping');
            addLog("HOST: Received on Port 8080. Mapping to Container Port 80...");
        }, 1500);

        setTimeout(() => {
            setStatus('reached');
            addLog("BRIDGE: Traversing docker0 bridge network...");
        }, 3000);

        setTimeout(() => {
            setStatus('success');
            addLog("CONTAINER: Port 80 reached. Nginx responding with 200 OK.");
            addLog("✓ SUCCESS: Website content served to Host:8080");
        }, 4500);

        setTimeout(() => {
            setStatus('idle');
        }, 7000);
    };

    const boxStyle = (active) => ({
        padding: '1.5rem',
        borderRadius: '1rem',
        background: active ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255,255,255,0.03)',
        border: `2px solid ${active ? 'var(--accent, #3b82f6)' : 'var(--border, #334155)'}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: active ? '0 0 25px rgba(59, 130, 246, 0.25)' : 'none',
        flex: 1,
        minWidth: '150px',
        position: 'relative'
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', padding: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                    onClick={runSimulation} 
                    disabled={status !== 'idle'} 
                    className="btn-primary" 
                    style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.75rem 1.25rem' }}
                >
                    <Send size={16} /> 
                    {status === 'idle' ? 'Send Request (Port 8080)' : 'Simulating...'}
                </button>
            </div>

            <div style={{ 
                display: 'flex', gap: '1rem', background: 'rgba(15, 23, 42, 0.6)', padding: '2.5rem', 
                borderRadius: '1.25rem', border: '1px solid var(--border)', flexWrap: 'wrap', 
                justifyContent: 'center', alignItems: 'center', position: 'relative'
            }}>
                {/* External World */}
                <div style={boxStyle(status === 'request-sent')}>
                    <Globe size={32} color={status === 'request-sent' ? "var(--accent)" : "var(--text-muted)"} />
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)' }}>INTERNET</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>User:8080</div>
                    {status === 'request-sent' && <Activity size={16} className="pulse" style={{ position: 'absolute', top: '10px', right: '10px' }} color="var(--accent)" />}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowRight size={24} color={status === 'port-mapping' ? "var(--accent)" : "var(--border)"} className={status === 'port-mapping' ? "pulse" : ""} />
                    <span style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--accent)' }}>Mapping</span>
                </div>

                {/* Host Machine */}
                <div style={boxStyle(status === 'port-mapping' || status === 'reached')}>
                    <Laptop size={32} color={(status === 'port-mapping' || status === 'reached') ? "var(--accent)" : "var(--text-muted)"} />
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)' }}>DOCKER HOST</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,0,0,0.3)', padding: '0.4rem 0.8rem', borderRadius: '0.5rem' }}>
                        <Shield size={14} color="var(--warning)" />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Port 8080</span>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowRight size={24} color={status === 'reached' || status === 'success' ? "var(--success)" : "var(--border)"} className={status === 'reached' ? "pulse" : ""} />
                    <span style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--success)' }}>Isolated Network</span>
                </div>

                {/* Docker Container */}
                <div style={boxStyle(status === 'success')}>
                    <Server size={32} color={status === 'success' ? "var(--success)" : "var(--text-muted)"} />
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)' }}>CONTAINER</div>
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '0.4rem 0.8rem', borderRadius: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--success)' }}>Port 80 (Nginx)</span>
                    </div>
                </div>
            </div>

            {/* Terminal Logs */}
            <div 
                ref={logContainerRef}
                style={{ 
                    background: '#0a0e1a', padding: '1.25rem', borderRadius: '1rem', 
                    border: '1px solid var(--border)', fontFamily: 'JetBrains Mono, monospace', 
                    fontSize: '0.75rem', minHeight: '180px', maxHeight: '250px', overflowY: 'auto', 
                    display: 'flex', flexDirection: 'column', gap: '0.6rem', boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.5)'
                }}
            >
                <div style={{ color: 'var(--accent)', fontWeight: 800, fontSize: '0.65rem', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: status === 'idle' ? 'var(--text-muted)' : 'var(--accent)' }}></div>
                    Live Network Traffic Log
                </div>
                {logs.length === 0 && <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Ready for simulation... Click 'Send Request' to start.</span>}
                {logs.map((log, i) => (
                    <div key={i} className="animate-pop" style={{ 
                        color: log.includes('✓') ? 'var(--success)' : (log.includes('CONTAINER') ? '#34d399' : (log.includes('HOST') ? '#60a5fa' : '#94a3b8')),
                        borderLeft: `2px solid ${log.includes('✓') ? 'var(--success)' : (log.includes('CONTAINER') ? '#34d399' : (log.includes('HOST') ? '#60a5fa' : '#334155'))}`,
                        paddingLeft: '0.75rem'
                    }}>
                        {log}
                    </div>
                ))}
            </div>
        </div>
    );
}

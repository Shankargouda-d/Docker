import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Server, Database, Package, Box, ArrowRight, Play } from 'lucide-react';

export default function DockerArchSim() {
    const [step, setStep] = useState(0);
    const [logs, setLogs] = useState([]);
    const logContainerRef = useRef(null);

    const addLog = (msg) => setLogs(prev => [...prev, msg]);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    const runSimulation = () => {
        if (step > 0) return; // prevent multiple clicks
        
        setStep(1);
        addLog("> docker run nginx");
        
        setTimeout(() => {
            setStep(2);
            addLog("Client sends REST API request to Docker Daemon...");
        }, 1000);

        setTimeout(() => {
            setStep(3);
            addLog("Daemon checks local images. Nginx not found locally.");
        }, 3000);

        setTimeout(() => {
            setStep(4);
            addLog("Daemon contacts Docker Registry (Docker Hub)...");
        }, 5000);

        setTimeout(() => {
            setStep(5);
            addLog("Pulling image 'nginx:latest' from Registry...");
        }, 7000);

        setTimeout(() => {
            setStep(6);
            addLog("Image successfully stored in local host.");
        }, 9000);

        setTimeout(() => {
            setStep(7);
            addLog("Daemon creates and starts the container!");
        }, 11000);
        
        setTimeout(() => {
            setStep(8);
            addLog("✓ Container is now running.");
        }, 12500);
    };

    const reset = () => {
        setStep(0);
        setLogs([]);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', fontFamily: 'Inter, sans-serif' }}>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <button 
                    onClick={runSimulation} 
                    disabled={step > 0 && step < 8}
                    className="btn-primary" 
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}
                >
                    <Play size={14} /> Simulate "docker run nginx"
                </button>
                {step === 8 && (
                    <button onClick={reset} className="btn-primary" style={{ background: 'var(--sidebar-bg)', border: '1px solid var(--border)' }}>
                        Reset
                    </button>
                )}
            </div>

            <div style={{ 
                display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '1.5rem', 
                background: 'rgba(15, 23, 42, 0.4)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)',
                position: 'relative'
            }}>
                
                {/* 1. Docker Client */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent)', letterSpacing: '0.1em' }}>DOCKER CLIENT</div>
                    <div style={{
                        width: '100%', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', 
                        border: `2px solid ${step === 1 ? 'var(--accent)' : 'var(--border)'}`, 
                        borderRadius: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center',
                        transition: '0.3s',
                        boxShadow: step === 1 ? '0 0 20px rgba(139, 92, 246, 0.4)' : 'none'
                    }}>
                        <Terminal size={40} color="var(--text-muted)" />
                        <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>CLI / REST API</div>
                    </div>
                </div>

                {/* 2. Docker Host */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--success)', letterSpacing: '0.1em' }}>DOCKER HOST</div>
                    <div style={{
                        width: '100%', padding: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', 
                        border: `2px solid ${step >= 2 && step <= 7 ? 'var(--success)' : 'rgba(16, 185, 129, 0.3)'}`, 
                        borderRadius: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem',
                        transition: '0.3s'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--success)' }}>
                            <Server size={20} /> <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Docker Daemon (dockerd)</span>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '0.5rem', border: '1px dashed var(--border)' }}>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textAlign: 'center' }}>IMAGES</div>
                                <div style={{ display: 'flex', justifyContent: 'center', minHeight: '40px' }}>
                                    {step >= 6 && (
                                        <div className="animate-pop" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'var(--accent)', padding: '0.3rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.7rem' }}>
                                            <Package size={14} /> nginx
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '0.5rem', border: '1px dashed var(--border)' }}>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textAlign: 'center' }}>CONTAINERS</div>
                                <div style={{ display: 'flex', justifyContent: 'center', minHeight: '40px' }}>
                                    {step >= 7 && (
                                        <div className="animate-pop" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'var(--success)', padding: '0.3rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.7rem', color: '#000', fontWeight: 'bold' }}>
                                            <Box size={14} /> web-1
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Docker Registry */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--warning)', letterSpacing: '0.1em' }}>REGISTRY</div>
                    <div style={{
                        width: '100%', padding: '1.5rem', background: 'rgba(255, 255, 255, 0.03)', 
                        border: `2px solid ${step >= 4 && step <= 5 ? 'var(--warning)' : 'var(--border)'}`, 
                        borderRadius: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
                        transition: '0.3s'
                    }}>
                        <Database size={40} color="var(--warning)" />
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Docker Hub</div>
                        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.4rem', borderRadius: '0.3rem', fontSize: '0.6rem' }}>ubuntu</div>
                            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.4rem', borderRadius: '0.3rem', fontSize: '0.6rem' }}>redis</div>
                            <div style={{ background: step === 5 ? 'var(--warning)' : 'rgba(255,255,255,0.1)', color: step === 5 ? '#000' : 'inherit', padding: '0.2rem 0.4rem', borderRadius: '0.3rem', fontSize: '0.6rem', transition: '0.3s' }}>nginx</div>
                        </div>
                    </div>
                </div>

                {/* Animated Connections */}
                {step >= 2 && step <= 3 && (
                    <div style={{ position: 'absolute', top: '45%', left: '28%', color: 'var(--accent)', animation: 'fadeIn 0.3s' }}>
                        <ArrowRight size={24} className="pulse" />
                    </div>
                )}
                {step >= 4 && step <= 5 && (
                    <div style={{ position: 'absolute', top: '45%', right: '28%', color: 'var(--warning)', animation: 'fadeIn 0.3s' }}>
                        <ArrowRight size={24} className="pulse" />
                    </div>
                )}

            </div>

            {/* Logs Area */}
            <div 
                ref={logContainerRef}
                style={{ 
                    background: '#000', padding: '1rem', borderRadius: '0.8rem', 
                    border: '1px solid var(--border)', fontFamily: 'JetBrains Mono, monospace', 
                    fontSize: '0.75rem', minHeight: '120px', maxHeight: '180px', overflowY: 'auto', 
                    display: 'flex', flexDirection: 'column', gap: '0.4rem' 
                }}
            >
                {logs.length === 0 && <span style={{ color: 'var(--text-muted)' }}>Waiting for simulation to start...</span>}
                {logs.map((log, i) => (
                    <div key={i} className="animate-pop" style={{ 
                        color: log.startsWith('>') ? 'var(--accent)' : (log.startsWith('✓') ? 'var(--success)' : 'var(--text-muted)'),
                        fontWeight: log.startsWith('>') ? 700 : 400
                    }}>
                        {log}
                    </div>
                ))}
            </div>

        </div>
    );
}

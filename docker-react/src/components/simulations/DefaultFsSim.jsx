import React, { useState, useEffect, useRef } from 'react';
import { Box, FileText, Trash2, ArrowRight, RefreshCcw, Terminal } from 'lucide-react';

export default function DefaultFsSim() {
    const [step, setStep] = useState(0);
    const [logs, setLogs] = useState([]);
    const logContainerRef = useRef(null);

    const steps = [
        { label: "1. Run Container", icon: <Box size={20} />, activeColor: "var(--accent)" },
        { label: "2. Create File", icon: <FileText size={20} />, activeColor: "var(--success)" },
        { label: "3. Delete Container", icon: <Trash2 size={20} />, activeColor: "var(--danger)" },
        { label: "4. Run New Container", icon: <RefreshCcw size={20} />, activeColor: "var(--warning)" }
    ];

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    const advanceStep = () => {
        const nextStep = step < steps.length ? step + 1 : 0;
        
        let newLog = '';
        if (nextStep === 1) newLog = "> docker run -it ubuntu bash\nContainer started. The writable layer is now active.";
        if (nextStep === 2) newLog = "> touch sample.txt\nFile 'sample.txt' created INSIDE the container's writable layer.";
        if (nextStep === 3) newLog = "> docker rm -f <container_id>\nContainer deleted. Writable layer DESTROYED. Data is lost permanently.";
        if (nextStep === 4) newLog = "> docker run -it ubuntu bash\nNew container started. File 'sample.txt' is NOT found. The default file system is temporary.";
        if (nextStep === 0) {
            setLogs([]);
            setStep(0);
            return;
        }

        setLogs(prev => [...prev, newLog]);
        setStep(nextStep);
    };

    return (
        <div style={{ padding: '1.5rem', background: '#0a0e1a', borderRadius: '1rem', border: '1px solid var(--border)' }}>
            <h4 style={{ margin: '0 0 1rem 0', color: 'var(--text)', fontSize: '1rem' }}>Default Storage Data Loss Simulation</h4>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                {steps.map((s, i) => (
                    <div key={i} style={{ 
                        flex: 1, padding: '0.75rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
                        background: step === i + 1 ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.2)',
                        border: `1px solid ${step >= i + 1 ? s.activeColor : 'var(--border)'}`,
                        color: step >= i + 1 ? s.activeColor : 'var(--text-muted)',
                        opacity: step >= i + 1 ? 1 : 0.4,
                        transition: 'all 0.3s'
                    }}>
                        {s.icon} <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{s.label}</span>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', minHeight: '150px', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: '1px dashed var(--border)' }}>
                    {step === 0 && <span style={{ color: 'var(--text-muted)' }}>Click 'Next' to start simulation.</span>}
                    {step === 1 && <div className="animate-pop" style={{ textAlign: 'center' }}><Box size={60} color="var(--accent)" /><p>Container Running</p></div>}
                    
                    {step === 2 && (
                        <div className="animate-pop" style={{ textAlign: 'center', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Box size={60} color="var(--accent)" />
                            <ArrowRight />
                            <div style={{ background: 'var(--success)', padding: '0.5rem', borderRadius: '0.5rem', color: '#000' }}>
                                <FileText size={30} />
                                <div>sample.txt</div>
                            </div>
                        </div>
                    )}
                    
                    {step === 3 && (
                        <div className="animate-pop" style={{ textAlign: 'center', color: 'var(--danger)' }}>
                            <Trash2 size={60} />
                            <p>Container Deleted!</p>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>sample.txt is destroyed.</p>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="animate-pop" style={{ textAlign: 'center', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Box size={60} color="var(--accent)" />
                            <ArrowRight />
                            <div style={{ border: '2px dashed var(--danger)', padding: '0.5rem', borderRadius: '0.5rem', color: 'var(--danger)' }}>
                                <FileText size={30} style={{ opacity: 0.3 }} />
                                <div>sample.txt missing</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Terminal Logs */}
                <div style={{ 
                    background: '#05080f', borderRadius: '0.75rem', border: '1px solid var(--border)', overflow: 'hidden'
                }}>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border)' }}>
                        <Terminal size={14} color="var(--text-muted)" />
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Terminal Output</span>
                    </div>
                    <div 
                        ref={logContainerRef}
                        style={{ 
                            padding: '1rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', 
                            minHeight: '120px', maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem'
                        }}
                    >
                        {logs.length === 0 && <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Waiting for commands...</span>}
                        {logs.map((log, i) => {
                            const lines = log.split('\n');
                            return (
                                <div key={i} className="animate-pop" style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '0.75rem' }}>
                                    <div style={{ color: '#cbd5e1', fontWeight: 600 }}>{lines[0]}</div>
                                    <div style={{ color: lines[1].includes('DESTROYED') || lines[1].includes('NOT found') ? 'var(--danger)' : 'var(--text-muted)', marginTop: '0.2rem' }}>
                                        {lines[1]}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                <button className="btn-primary" onClick={advanceStep}>
                    {step < steps.length ? `Next: ${steps[step]?.label || 'Start'}` : 'Reset Simulation'}
                </button>
            </div>
        </div>
    );
}


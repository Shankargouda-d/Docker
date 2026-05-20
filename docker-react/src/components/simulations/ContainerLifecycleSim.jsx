import React, { useState, useRef, useEffect } from 'react';
import { Play, Package, ArrowRight, Box, CirclePause, StopCircle, Trash2 } from 'lucide-react';

export default function ContainerLifecycleSim() {
    const [step, setStep] = useState(0);
    const [logs, setLogs] = useState([]);
    const [status, setStatus] = useState('Image');
    const logContainerRef = useRef(null);

    const addLog = (msg) => setLogs(prev => [...prev, msg]);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    const runSimulation = () => {
        if (step > 0) return;
        
        setStep(1);
        addLog("> docker create my-app");
        
        setTimeout(() => {
            setStep(2);
            setStatus('Created');
            addLog("1. Create: Container created from image but not yet running.");
        }, 1500);

        setTimeout(() => {
            setStep(3);
            addLog("> docker start my-app");
        }, 3500);

        setTimeout(() => {
            setStep(4);
            setStatus('Running');
            addLog("2. Start: Container started. Executing main process.");
        }, 5000);

        setTimeout(() => {
            setStep(5);
            addLog("> docker run -it -d my-app");
        }, 7000);

        setTimeout(() => {
            setStep(6);
            setStatus('Running');
            addLog("3. Running: This is the active state where container performs tasks.");
        }, 8500);

        setTimeout(() => {
            setStep(7);
            addLog("> docker pause my-app");
        }, 10500);

        setTimeout(() => {
            setStep(8);
            setStatus('Paused');
            addLog("4. Pause: Processes suspended. Remains in memory.");
        }, 12000);

        setTimeout(() => {
            setStep(9);
            addLog("> docker unpause my-app");
        }, 14000);
        
        setTimeout(() => {
            setStep(10);
            setStatus('Running');
            addLog("5. Unpause: Returns to the running state.");
        }, 15500);

        setTimeout(() => {
            setStep(11);
            addLog("> docker stop my-app");
        }, 17500);

        setTimeout(() => {
            setStep(12);
            setStatus('Stopped');
            addLog("6. Stop: Main process is terminated.");
        }, 19000);

        setTimeout(() => {
            setStep(13);
            addLog("> docker restart my-app");
        }, 21000);

        setTimeout(() => {
            setStep(14);
            setStatus('Running');
            addLog("7. Restart: Stops and then starts the container again.");
        }, 22500);

        setTimeout(() => {
            setStep(15);
            addLog("> docker kill my-app");
        }, 24500);

        setTimeout(() => {
            setStep(16);
            setStatus('Stopped');
            addLog("8. Kill: Forcefully terminated. Immediately stops main process.");
        }, 26000);

        setTimeout(() => {
            setStep(17);
            addLog("> docker rm my-app");
        }, 28000);

        setTimeout(() => {
            setStep(18);
            setStatus('Removed');
            addLog("9. Remove: Deletes the container from the Docker host.");
            addLog("✓ Lifecycle Simulation Complete.");
        }, 29500);
    };

    const reset = () => {
        setStep(0);
        setStatus('Image');
        setLogs([]);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', fontFamily: 'Inter, sans-serif' }}>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <button 
                    onClick={runSimulation} 
                    disabled={step > 0 && step < 18}
                    className="btn-primary" 
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}
                >
                    <Play size={14} /> Simulate Container Lifecycle
                </button>
                {step === 18 && (
                    <button onClick={reset} className="btn-primary" style={{ background: 'var(--sidebar-bg)', border: '1px solid var(--border)' }}>
                        Reset
                    </button>
                )}
            </div>

            <div style={{ 
                display: 'flex', flexDirection: 'column', gap: '2rem', 
                background: 'rgba(15, 23, 42, 0.4)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)',
                alignItems: 'center'
            }}>
                
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '-1rem' }}>
                    CONTAINER STATE MACHINE
                </div>
                
                <div style={{ 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', width: '100%' 
                }}>
                    {/* Image */}
                    <div style={{
                        padding: '1rem', borderRadius: '0.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                        background: status === 'Image' ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                        border: `2px solid ${status === 'Image' ? 'var(--accent)' : 'var(--border)'}`,
                        transition: '0.3s'
                    }}>
                        <Package size={24} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Image</span>
                    </div>

                    <ArrowRight size={20} color={step >= 1 && step <= 2 ? 'var(--accent)' : 'var(--border)'} className={step >= 1 && step <= 2 ? 'pulse' : ''} />

                    {/* Created */}
                    <div style={{
                        padding: '1rem', borderRadius: '0.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                        background: status === 'Created' ? 'var(--warning)' : 'rgba(255,255,255,0.05)',
                        border: `2px solid ${status === 'Created' ? 'var(--warning)' : 'var(--border)'}`,
                        color: status === 'Created' ? '#000' : 'inherit',
                        transition: '0.3s'
                    }}>
                        <Box size={24} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Created</span>
                    </div>

                    <ArrowRight size={20} color={step >= 3 && step <= 4 ? 'var(--success)' : 'var(--border)'} className={step >= 3 && step <= 4 ? 'pulse' : ''} />

                    {/* Running */}
                    <div style={{
                        padding: '1rem', borderRadius: '0.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                        background: status === 'Running' ? 'var(--success)' : 'rgba(255,255,255,0.05)',
                        border: `2px solid ${status === 'Running' ? 'var(--success)' : 'var(--border)'}`,
                        color: status === 'Running' ? '#000' : 'inherit',
                        transition: '0.3s'
                    }}>
                        <Play size={24} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Running</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <ArrowRight size={20} color={step >= 5 && step <= 6 ? 'var(--warning)' : 'var(--border)'} className={step >= 5 && step <= 6 ? 'pulse' : ''} />
                        <ArrowRight size={20} color={step >= 7 && step <= 8 ? 'var(--success)' : 'var(--border)'} className={step >= 7 && step <= 8 ? 'pulse' : ''} style={{ transform: 'rotate(180deg)' }} />
                    </div>

                    {/* Paused */}
                    <div style={{
                        padding: '1rem', borderRadius: '0.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                        background: status === 'Paused' ? '#f59e0b' : 'rgba(255,255,255,0.05)',
                        border: `2px solid ${status === 'Paused' ? '#f59e0b' : 'var(--border)'}`,
                        color: status === 'Paused' ? '#000' : 'inherit',
                        transition: '0.3s'
                    }}>
                        <CirclePause size={24} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Paused</span>
                    </div>

                    <ArrowRight size={20} color={step >= 9 && step <= 10 ? '#ef4444' : 'var(--border)'} className={step >= 9 && step <= 10 ? 'pulse' : ''} />

                    {/* Stopped */}
                    <div style={{
                        padding: '1rem', borderRadius: '0.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                        background: status === 'Stopped' ? '#ef4444' : 'rgba(255,255,255,0.05)',
                        border: `2px solid ${status === 'Stopped' ? '#ef4444' : 'var(--border)'}`,
                        transition: '0.3s'
                    }}>
                        <StopCircle size={24} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Stopped</span>
                    </div>

                    <ArrowRight size={20} color={step >= 11 && step <= 12 ? 'var(--text-muted)' : 'var(--border)'} className={step >= 11 && step <= 12 ? 'pulse' : ''} />

                    {/* Removed */}
                    <div style={{
                        padding: '1rem', borderRadius: '0.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                        background: status === 'Removed' ? 'var(--text-muted)' : 'rgba(255,255,255,0.05)',
                        border: `2px solid ${status === 'Removed' ? 'var(--text-muted)' : 'var(--border)'}`,
                        transition: '0.3s'
                    }}>
                        <Trash2 size={24} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Removed</span>
                    </div>
                </div>
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

import React, { useState, useRef, useEffect } from 'react';
import { Play, Code, Box, GitBranch, UploadCloud, Server, Activity, RefreshCw, Database, ArrowRight, Laptop, Trash2, Square } from 'lucide-react';

export default function DockerWorkflowSim() {
    const [step, setStep] = useState(0);
    const [logs, setLogs] = useState([]);
    const [activeEnv, setActiveEnv] = useState('Local');

    const logContainerRef = useRef(null);

    const addLog = (cmd, desc, isSuccess = false) =>
        setLogs(prev => [...prev, { cmd, desc, isSuccess }]);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    const runSimulation = () => {
        if (step > 0) return;

        // Step 1: Edit Code
        setStep(1);
        setActiveEnv('Local');
        addLog(
            'nano src/pages/Explorer.jsx',
            'Step 1 — DEVELOP: You edit Explorer.jsx to add a new command feature. Changes are only on your local computer. No Docker command yet.'
        );

        // Step 2: Build
        setTimeout(() => {
            setStep(2);
            addLog(
                '$ docker build -t myrepo/dockerdemo-react:v2 .',
                'Step 2 — BUILD: Docker reads the Dockerfile → installs dependencies → copies React code → creates image. Think: Code + Dependencies = Docker Image.'
            );
        }, 3000);

        // Step 3: Test locally (docker run)
        setTimeout(() => {
            setStep(3);
            setActiveEnv('CI');
            addLog(
                '$ docker run -d -p 3000:3000 myrepo/dockerdemo-react:v2',
                'Step 3 — TEST: The image is now a living container! -d = run in background, -p 3000:3000 = your PC port 3000 maps to container port 3000. Open localhost:3000 to test.'
            );
        }, 6000);

        // Step 4: Push to Docker Hub
        setTimeout(() => {
            setStep(4);
            setActiveEnv('Registry');
            addLog(
                '$ docker push myrepo/dockerdemo-react:v2',
                'Step 4 — PUSH: Uploading your tested image to Docker Hub (like GitHub but for Docker images). Before: only on your PC. After: available online for anyone.'
            );
        }, 9000);

        // Step 5: Pull on production server
        setTimeout(() => {
            setStep(5);
            setActiveEnv('Production');
            addLog(
                '$ docker pull myrepo/dockerdemo-react:v2',
                'Step 5 — PULL: Production server downloads the latest v2 image from Docker Hub.'
            );
        }, 12000);

        // Step 6: Stop old container
        setTimeout(() => {
            setStep(6);
            addLog(
                '$ docker stop abc123',
                'Step 6 — STOP: Gracefully stopping the old v1 container that is currently running on production. Found container ID using: docker ps.'
            );
        }, 14500);

        // Step 7: Remove old container
        setTimeout(() => {
            setStep(7);
            addLog(
                '$ docker rm abc123',
                'Step 7 — REMOVE: Deleting the old container completely. Why? Because it still uses old v1 code and we dont need it anymore.'
            );
        }, 17000);

        // Step 8: Run new container
        setTimeout(() => {
            setStep(8);
            addLog(
                '$ docker run -d -p 3000:3000 myrepo/dockerdemo-react:v2',
                'Step 8 — REDEPLOY: Starting a brand new container with the updated v2 image! Production now serves the latest version of your app.'
            );
        }, 19500);

        // Done
        setTimeout(() => {
            setStep(9);
            addLog('', '✓ Workflow Complete! Your app went from code edit → live in production.', true);
        }, 22000);
    };

    const reset = () => {
        setStep(0);
        setActiveEnv('Local');
        setLogs([]);
    };

    const envStyle = (envName) => ({
        padding: '1.2rem 0.8rem',
        borderRadius: '1rem',
        background: activeEnv === envName ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255,255,255,0.03)',
        border: `2px solid ${activeEnv === envName ? 'var(--accent, #3b82f6)' : 'var(--border, #334155)'}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.6rem',
        transition: 'all 0.4s ease',
        boxShadow: activeEnv === envName ? '0 0 20px rgba(59, 130, 246, 0.2)' : 'none',
        flex: 1,
        minWidth: '110px'
    });

    const stepLabel = (envName) => {
        if (envName === 'Local') {
            if (step === 1) return 'Editing code...';
            if (step === 2) return 'Building image...';
            return '';
        }
        if (envName === 'CI') {
            if (step === 3) return 'Testing locally...';
            return '';
        }
        if (envName === 'Registry') {
            if (step === 4) return 'Pushing image...';
            return '';
        }
        if (envName === 'Production') {
            if (step === 5) return 'Pulling v2...';
            if (step === 6) return 'Stopping old...';
            if (step === 7) return 'Removing old...';
            if (step === 8) return 'Starting v2!';
            if (step === 9) return 'v2 LIVE ✓';
            return '';
        }
        return '';
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', fontFamily: 'Inter, sans-serif' }}>
            {/* Controls */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                <button onClick={runSimulation} disabled={step > 0 && step < 9} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                    <Play size={14} /> Simulate Full Workflow (8 Steps)
                </button>
                {step === 9 && (
                    <button onClick={reset} className="btn-primary" style={{ background: 'var(--sidebar-bg)', border: '1px solid var(--border)' }}>Reset</button>
                )}
                {step > 0 && step < 9 && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600 }}>
                        Step {Math.min(step, 8)} of 8
                    </span>
                )}
            </div>

            {/* Visual Pipeline */}
            <div style={{
                display: 'flex', gap: '0.75rem', background: 'rgba(15, 23, 42, 0.4)', padding: '1.5rem',
                borderRadius: '1rem', border: '1px solid var(--border)', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'stretch'
            }}>
                {/* Local Dev */}
                <div style={envStyle('Local')}>
                    <Laptop size={28} color={activeEnv === 'Local' ? "var(--accent)" : "var(--text-muted)"} />
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.05em' }}>LOCAL DEV</div>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center', minHeight: '24px' }}>
                        {step === 1 && <Code size={16} className="pulse" color="var(--accent)" />}
                        {step === 2 && <Box size={16} className="pulse" color="var(--success)" />}
                    </div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--accent)', minHeight: '14px', textAlign: 'center' }}>{stepLabel('Local')}</div>
                </div>

                <ArrowRight size={20} color="var(--border)" style={{ alignSelf: 'center', flexShrink: 0 }} />

                {/* Testing */}
                <div style={envStyle('CI')}>
                    <GitBranch size={28} color={activeEnv === 'CI' ? "var(--accent)" : "var(--text-muted)"} />
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.05em' }}>TESTING</div>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center', minHeight: '24px' }}>
                        {step === 3 && <Activity size={16} className="pulse" color="var(--warning)" />}
                    </div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--accent)', minHeight: '14px', textAlign: 'center' }}>{stepLabel('CI')}</div>
                </div>

                <ArrowRight size={20} color="var(--border)" style={{ alignSelf: 'center', flexShrink: 0 }} />

                {/* Registry */}
                <div style={envStyle('Registry')}>
                    <Database size={28} color={activeEnv === 'Registry' ? "var(--accent)" : "var(--text-muted)"} />
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.05em' }}>DOCKER HUB</div>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center', minHeight: '24px' }}>
                        {step === 4 && <UploadCloud size={16} className="pulse" color="var(--accent)" />}
                    </div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--accent)', minHeight: '14px', textAlign: 'center' }}>{stepLabel('Registry')}</div>
                </div>

                <ArrowRight size={20} color="var(--border)" style={{ alignSelf: 'center', flexShrink: 0 }} />

                {/* Production */}
                <div style={envStyle('Production')}>
                    <Server size={28} color={activeEnv === 'Production' ? "var(--accent)" : "var(--text-muted)"} />
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.05em' }}>PRODUCTION</div>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center', minHeight: '24px' }}>
                        {step === 5 && <Box size={16} className="pulse" color="var(--accent)" />}
                        {step === 6 && <Square size={16} className="pulse" color="var(--warning)" />}
                        {step === 7 && <Trash2 size={16} className="pulse" color="var(--error)" />}
                        {step === 8 && <Box size={16} className="pulse" color="var(--success)" />}
                        {step === 9 && <RefreshCw size={16} className="pulse" color="var(--success)" />}
                    </div>
                    <div style={{ fontSize: '0.6rem', color: step === 9 ? 'var(--success)' : 'var(--accent)', fontWeight: step === 9 ? 700 : 400, minHeight: '14px', textAlign: 'center' }}>{stepLabel('Production')}</div>
                </div>
            </div>

            {/* Terminal Log */}
            <div
                ref={logContainerRef}
                style={{
                    background: '#0a0e17', padding: '1rem', borderRadius: '0.8rem',
                    border: '1px solid var(--border)', fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.72rem', minHeight: '180px', maxHeight: '300px', overflowY: 'auto',
                    display: 'flex', flexDirection: 'column', gap: '0.8rem'
                }}
            >
                {logs.length === 0 && (
                    <span style={{ color: 'var(--text-muted)' }}>
                        ➜ Click "Simulate Full Workflow" to watch each Docker command run step by step...
                    </span>
                )}
                {logs.map((log, i) => (
                    <div key={i} className="animate-pop" style={{
                        borderLeft: log.isSuccess ? '3px solid var(--success)' : (log.cmd ? '3px solid var(--accent)' : 'none'),
                        paddingLeft: '0.75rem',
                        marginBottom: '0.2rem'
                    }}>
                        {log.cmd && (
                            <div style={{
                                color: 'var(--accent)',
                                marginBottom: '4px',
                                fontWeight: 600,
                                background: 'rgba(59, 130, 246, 0.08)',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                display: 'inline-block'
                            }}>
                                <code>{log.cmd}</code>
                            </div>
                        )}
                        <div style={{
                            color: log.isSuccess ? 'var(--success)' : '#94a3b8',
                            fontWeight: log.isSuccess ? 700 : 400,
                            lineHeight: 1.5,
                            fontSize: '0.7rem',
                            marginTop: log.cmd ? '4px' : '0'
                        }}>
                            {log.desc}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

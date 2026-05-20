import React, { useState } from 'react';
import { Search, Terminal, Info, Network, Box, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function IdentifyNetworkSim() {
    const [activeStep, setActiveStep] = useState(0);
    const [command, setCommand] = useState('');
    const [output, setOutput] = useState(null);

    const steps = [
        {
            title: "List Networks",
            cmd: "docker network ls",
            desc: "Showing all available roads (networks) for containers.",
            data: [
                { id: 'abc123', name: 'bridge', driver: 'bridge' },
                { id: 'xyz456', name: 'host', driver: 'host' },
                { id: 'pqr789', name: 'none', driver: 'null' }
            ]
        },
        {
            title: "Inspect Container",
            cmd: "docker inspect my_app",
            desc: "Checking the container's network identity card.",
            data: {
                "NetworkSettings": {
                    "Networks": {
                        "bridge": {
                            "IPAddress": "172.17.0.2",
                            "Gateway": "172.17.0.1"
                        }
                    }
                }
            }
        },
        {
            title: "Inspect Network",
            cmd: "docker network inspect bridge",
            desc: "Checking details of one particular road.",
            data: {
                "Name": "bridge",
                "Id": "abc123...",
                "Containers": {
                    "container_id_1": { "Name": "my_app", "IPv4Address": "172.17.0.2/16" }
                }
            }
        }
    ];

    const runCommand = (index) => {
        setCommand(steps[index].cmd);
        setOutput(null);
        setTimeout(() => {
            setOutput(steps[index].data);
            setActiveStep(index);
        }, 600);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
            {/* Steps Navigation */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {steps.map((step, i) => (
                    <button
                        key={i}
                        onClick={() => runCommand(i)}
                        style={{
                            flex: 1,
                            padding: '1rem',
                            borderRadius: '0.75rem',
                            background: activeStep === i ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${activeStep === i ? 'var(--accent)' : 'var(--border)'}`,
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <div style={{ 
                            background: activeStep === i ? 'var(--accent)' : 'var(--border)', 
                            color: 'white', width: '24px', height: '24px', borderRadius: '50%', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 
                        }}>
                            {i + 1}
                        </div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: activeStep === i ? 'var(--text)' : 'var(--text-muted)' }}>
                            {step.title}
                        </span>
                    </button>
                ))}
            </div>

            {/* Terminal Interface */}
            <div style={{ 
                background: '#0a0e1a', borderRadius: '1rem', border: '1px solid var(--border)', 
                overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.4)' 
            }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></div>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></div>
                    </div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Identify Network Terminal</span>
                </div>
                
                <div style={{ padding: '1.5rem', minHeight: '300px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--success)' }}>$</span>
                        <span style={{ color: 'var(--text)' }}>{command || 'Select a step above to run command...'}</span>
                        {!output && command && <span className="pulse" style={{ width: '8px', height: '15px', background: 'var(--accent)' }}></span>}
                    </div>

                    {output && (
                        <div className="animate-pop">
                            <pre style={{ color: '#cbd5e1', lineHeight: '1.5' }}>
                                {Array.isArray(output) ? (
                                    <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ color: 'var(--accent)' }}>
                                                <th style={{ paddingBottom: '0.5rem' }}>NETWORK ID</th>
                                                <th style={{ paddingBottom: '0.5rem' }}>NAME</th>
                                                <th style={{ paddingBottom: '0.5rem' }}>DRIVER</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {output.map((row, i) => (
                                                <tr key={i}>
                                                    <td>{row.id}</td>
                                                    <td>{row.name}</td>
                                                    <td>{row.driver}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    JSON.stringify(output, null, 2)
                                )}
                            </pre>
                            
                            <div style={{ 
                                marginTop: '1.5rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.05)', 
                                borderLeft: '3px solid var(--accent)', borderRadius: '0.5rem', display: 'flex', gap: '0.75rem' 
                            }}>
                                <Info size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
                                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                                    <strong>Understanding:</strong> {steps[activeStep].desc}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Visual Representation */}
            <div style={{ 
                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', 
                padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: '1px dashed var(--border)' 
            }}>
                <div style={{ textAlign: 'center', opacity: activeStep >= 1 ? 1 : 0.3 }}>
                    <Box size={40} color="var(--accent)" />
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, marginTop: '0.5rem' }}>my_app</div>
                </div>
                <ArrowRight size={24} color="var(--border)" />
                <div style={{ textAlign: 'center', opacity: activeStep === 0 || activeStep === 2 ? 1 : 0.3 }}>
                    <Network size={40} color="var(--success)" />
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, marginTop: '0.5rem' }}>bridge</div>
                </div>
            </div>
        </div>
    );
}

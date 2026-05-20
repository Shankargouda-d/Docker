import React, { useState } from 'react';
import { Box, FileText, Trash2, ArrowRight, Database } from 'lucide-react';

export default function DockerVolumeSim() {
    const [step, setStep] = useState(0);

    const steps = [
        { label: "1. Create Volume", icon: <Database size={16} /> },
        { label: "2. Attach to Container", icon: <Box size={16} /> },
        { label: "3. Delete Container", icon: <Trash2 size={16} /> },
        { label: "4. Attach to New Container", icon: <Box size={16} /> }
    ];

    const nextStep = () => setStep(prev => (prev < 3 ? prev + 1 : 0));

    return (
        <div style={{ padding: '1.5rem', background: '#0a0e1a', borderRadius: '1rem', border: '1px solid var(--border)' }}>
            <h4 style={{ margin: '0 0 1.5rem 0', color: 'var(--text)' }}>Volume Persistence Simulation</h4>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', alignItems: 'center', minHeight: '150px' }}>
                {/* Host Storage Area */}
                <div style={{ padding: '1rem', border: '2px dashed var(--accent)', borderRadius: '0.5rem', textAlign: 'center', width: '150px' }}>
                    <Database size={40} color="var(--accent)" />
                    <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Docker Volume</div>
                    {step > 0 && (
                        <div className="animate-pop" style={{ marginTop: '0.5rem', background: 'var(--success)', padding: '0.2rem', borderRadius: '0.3rem', color: '#000', fontSize: '0.7rem', fontWeight: 700 }}>
                            <FileText size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                            data.txt
                        </div>
                    )}
                </div>

                <ArrowRight size={30} color={step === 1 || step === 3 ? "var(--success)" : "var(--border)"} className={step === 1 || step === 3 ? "pulse" : ""} />

                {/* Container Area */}
                <div style={{ width: '150px', height: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    {step === 0 && <span style={{ color: 'var(--text-muted)' }}>Waiting for container...</span>}
                    {step === 1 && (
                        <div className="animate-pop" style={{ textAlign: 'center' }}>
                            <Box size={50} color="var(--text)" />
                            <div style={{ fontSize: '0.8rem' }}>Container A</div>
                            <div style={{ color: 'var(--success)', fontSize: '0.7rem' }}>Writing data.txt...</div>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="animate-pop" style={{ textAlign: 'center', color: 'var(--danger)' }}>
                            <Trash2 size={50} />
                            <div style={{ fontSize: '0.8rem' }}>Container Deleted</div>
                        </div>
                    )}
                    {step === 3 && (
                        <div className="animate-pop" style={{ textAlign: 'center' }}>
                            <Box size={50} color="var(--warning)" />
                            <div style={{ fontSize: '0.8rem' }}>Container B</div>
                            <div style={{ color: 'var(--success)', fontSize: '0.7rem' }}>Reading data.txt!</div>
                        </div>
                    )}
                </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <button className="btn-primary" onClick={nextStep}>
                    {step < 3 ? steps[step+1].label : "Reset Simulation"}
                </button>
            </div>
        </div>
    );
}

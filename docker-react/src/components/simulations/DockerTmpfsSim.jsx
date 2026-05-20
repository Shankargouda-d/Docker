import React, { useState } from 'react';
import { MemoryStick, Box, FileKey, Power, Trash2 } from 'lucide-react';

export default function DockerTmpfsSim() {
    const [step, setStep] = useState(0);

    const nextStep = () => setStep(prev => (prev < 2 ? prev + 1 : 0));

    return (
        <div style={{ padding: '1.5rem', background: '#0a0e1a', borderRadius: '1rem', border: '1px solid var(--border)' }}>
            <h4 style={{ margin: '0 0 1.5rem 0', color: 'var(--text)' }}>Tmpfs Temporary Storage Simulation</h4>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', alignItems: 'center', minHeight: '150px' }}>
                
                {/* Host RAM */}
                <div style={{ padding: '1rem', border: '2px dotted var(--warning)', borderRadius: '0.5rem', textAlign: 'center', width: '160px' }}>
                    <MemoryStick size={40} color="var(--warning)" />
                    <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Host RAM (Volatile)</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--warning)' }}>/tmp/secure</div>
                </div>

                <div style={{ height: '40px', width: '2px', background: 'var(--warning)', transform: 'rotate(90deg)' }}></div>

                {/* Container Area */}
                <div style={{ width: '160px', textAlign: 'center' }}>
                    {step === 0 && (
                        <div className="animate-pop" style={{ border: '1px solid var(--border)', padding: '1rem', borderRadius: '0.5rem' }}>
                            <Box size={40} color="var(--text)" />
                            <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Container Running</div>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Waiting for data...</span>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="animate-pop" style={{ border: '1px solid var(--accent)', background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '0.5rem' }}>
                            <Box size={40} color="var(--accent)" />
                            <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Container Running</div>
                            <div style={{ background: 'var(--danger)', color: '#fff', padding: '0.3rem', borderRadius: '0.3rem', fontSize: '0.75rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                <FileKey size={14} /> secret_key.pem
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-pop" style={{ border: '1px dashed var(--danger)', padding: '1rem', borderRadius: '0.5rem', color: 'var(--danger)' }}>
                            <Power size={40} />
                            <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Container Stopped</div>
                            <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: 'var(--danger)', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                <Trash2 size={14} /> RAM Cleared
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
                <button className="btn-primary" onClick={nextStep}>
                    {step === 0 ? "Generate Secret Data" : step === 1 ? "Stop Container" : "Restart (Reset)"}
                </button>
            </div>
        </div>
    );
}

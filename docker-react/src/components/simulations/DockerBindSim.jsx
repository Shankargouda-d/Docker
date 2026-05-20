import React, { useState } from 'react';
import { Laptop, Box, ArrowRightLeft, FileCode2 } from 'lucide-react';

export default function DockerBindSim() {
    const [fileEdited, setFileEdited] = useState(false);

    return (
        <div style={{ padding: '1.5rem', background: '#0a0e1a', borderRadius: '1rem', border: '1px solid var(--border)' }}>
            <h4 style={{ margin: '0 0 1.5rem 0', color: 'var(--text)' }}>Bind Mount Sync Simulation</h4>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', alignItems: 'center', minHeight: '150px' }}>
                
                {/* Host System */}
                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', textAlign: 'center', width: '160px' }}>
                    <Laptop size={40} color="var(--text-muted)" />
                    <div style={{ fontSize: '0.8rem', marginTop: '0.5rem', fontWeight: 600 }}>Host Machine</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>/Documents/project</div>
                    <div className="animate-pop" style={{ 
                        marginTop: '0.5rem', padding: '0.5rem', borderRadius: '0.3rem', fontSize: '0.75rem',
                        background: fileEdited ? 'var(--success)' : 'var(--border)', color: fileEdited ? '#000' : 'var(--text)'
                    }}>
                        <FileCode2 size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                        {fileEdited ? "app.js (Modified)" : "app.js (Original)"}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--success)', fontWeight: 700, marginBottom: '0.2rem' }}>INSTANT SYNC</span>
                    <ArrowRightLeft size={30} color="var(--success)" className={fileEdited ? "pulse" : ""} />
                </div>

                {/* Container */}
                <div style={{ padding: '1rem', border: '1px solid var(--accent)', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '0.5rem', textAlign: 'center', width: '160px' }}>
                    <Box size={40} color="var(--accent)" />
                    <div style={{ fontSize: '0.8rem', marginTop: '0.5rem', fontWeight: 600 }}>Docker Container</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--accent)' }}>/app</div>
                    <div className="animate-pop" style={{ 
                        marginTop: '0.5rem', padding: '0.5rem', borderRadius: '0.3rem', fontSize: '0.75rem',
                        background: fileEdited ? 'var(--success)' : 'var(--border)', color: fileEdited ? '#000' : 'var(--text)'
                    }}>
                        <FileCode2 size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                        {fileEdited ? "app.js (Modified)" : "app.js (Original)"}
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
                <button className="btn-primary" onClick={() => setFileEdited(!fileEdited)}>
                    {fileEdited ? "Reset File" : "Edit File on Host"}
                </button>
            </div>
        </div>
    );
}

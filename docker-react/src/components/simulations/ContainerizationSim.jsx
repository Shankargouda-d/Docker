import React, { useState } from 'react';
import { Layers, Server, Cpu, Monitor } from 'lucide-react';

export default function ContainerizationSim() {
    const [activeTab, setActiveTab] = useState('vm');

    const styles = {
        container: {
            background: 'var(--surface-light)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '24px',
            fontFamily: 'system-ui, sans-serif'
        },
        header: {
            marginBottom: '20px',
            textAlign: 'center'
        },
        tabs: {
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '24px'
        },
        tabBtn: (isActive) => ({
            padding: '10px 20px',
            background: isActive ? 'var(--accent)' : 'var(--surface-dark)',
            color: isActive ? 'white' : 'var(--text-primary)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s'
        }),
        diagram: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxWidth: '600px',
            margin: '0 auto'
        },
        layer: (bgColor) => ({
            background: bgColor,
            padding: '16px',
            borderRadius: '8px',
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }),
        appLayer: {
            display: 'flex',
            gap: '12px',
            justifyContent: 'space-between'
        },
        appBox: {
            flex: 1,
            background: '#3b82f6',
            padding: '12px',
            borderRadius: '8px',
            color: 'white',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            fontSize: '14px'
        },
        guestOs: {
            background: '#f59e0b',
            padding: '8px',
            borderRadius: '4px',
            fontSize: '12px',
            marginTop: 'auto'
        },
        explanation: {
            marginTop: '24px',
            padding: '16px',
            background: 'var(--surface-dark)',
            borderRadius: '8px',
            fontSize: '15px',
            lineHeight: '1.5',
            color: 'var(--text-secondary)'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.5rem', color: 'var(--text-primary)' }}>Architecture Comparison</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>See how Virtual Machines differ from Containers</p>
            </div>

            <div style={styles.tabs}>
                <button style={styles.tabBtn(activeTab === 'vm')} onClick={() => setActiveTab('vm')}>
                    Virtual Machines
                </button>
                <button style={styles.tabBtn(activeTab === 'container')} onClick={() => setActiveTab('container')}>
                    Containers
                </button>
            </div>

            <div style={styles.diagram}>
                <div style={styles.appLayer}>
                    {[1, 2, 3].map(num => (
                        <div key={num} style={styles.appBox}>
                            <Monitor size={20} style={{ margin: '0 auto' }} />
                            <span>App {num}</span>
                            <span style={{ fontSize: '12px', opacity: 0.9 }}>Bins / Libs</span>
                            {activeTab === 'vm' && (
                                <div style={styles.guestOs}>Guest OS</div>
                            )}
                        </div>
                    ))}
                </div>
                
                {activeTab === 'vm' ? (
                    <div style={styles.layer('#8b5cf6')}>
                        <Layers size={20} />
                        Hypervisor
                    </div>
                ) : (
                    <div style={styles.layer('#10b981')}>
                        <Layers size={20} />
                        Container Engine (Docker)
                    </div>
                )}

                <div style={styles.layer('#64748b')}>
                    <Server size={20} />
                    Host Operating System
                </div>
                
                <div style={styles.layer('#475569')}>
                    <Cpu size={20} />
                    Hardware Infrastructure
                </div>
            </div>

            <div style={styles.explanation}>
                {activeTab === 'vm' ? (
                    <p style={{ margin: 0 }}><strong>Virtual Machines</strong> are heavy because they require a complete, independent Guest OS for every single application. The Hypervisor intercepts and translates hardware calls, which adds overhead and slows down boot times.</p>
                ) : (
                    <p style={{ margin: 0 }}><strong>Containers</strong> are extremely lightweight because they share the Host OS kernel. The Container Engine simply isolates the applications into separate processes, allowing them to boot instantly and consume minimal resources.</p>
                )}
            </div>
        </div>
    );
}

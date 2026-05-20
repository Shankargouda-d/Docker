import { Info, Lightbulb, AlertTriangle, PlayCircle } from 'lucide-react';
import DockerArchSim from './simulations/DockerArchSim';
import ContainerizationSim from './simulations/ContainerizationSim';
import ContainerLifecycleSim from './simulations/ContainerLifecycleSim';
import DockerWorkflowSim from './simulations/DockerWorkflowSim';
import DockerNetworkingSim from './simulations/DockerNetworkingSim';
import IdentifyNetworkSim from './simulations/IdentifyNetworkSim';
import DefaultFsSim from './simulations/DefaultFsSim';
import DockerVolumeSim from './simulations/DockerVolumeSim';
import DockerBindSim from './simulations/DockerBindSim';
import DockerTmpfsSim from './simulations/DockerTmpfsSim';

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

const noteIcons = {
    info: <Info size={18} />,
    tip: <Lightbulb size={18} />,
    warning: <AlertTriangle size={18} />,
};

export default function ContentRenderer({ blocks }) {
    if (!blocks || blocks.length === 0) {
        return <p className="mc-placeholder-text">Content coming soon...</p>;
    }

    return (
        <>
            {blocks.map((block, i) => {
                switch (block.type) {
                    case 'text':
                        return <p key={i} className="mc-text" dangerouslySetInnerHTML={{ __html: block.value }}></p>;

                    case 'heading':
                        const Tag = `h${block.level || 2}`;
                        return <Tag key={i} className={`mc-heading mc-heading-${block.level || 2}`} dangerouslySetInnerHTML={{ __html: block.value }}></Tag>;

                    case 'subheading':
                        return <h3 key={i} className="mc-subheading" dangerouslySetInnerHTML={{ __html: block.value }}></h3>;

                    case 'image':
                        return (
                            <figure key={i} className="mc-figure">
                                <img src={block.src} alt={block.caption || ''} className="mc-image" loading="lazy" />
                                {block.caption && <figcaption className="mc-caption">{block.caption}</figcaption>}
                            </figure>
                        );

                    case 'code':
                        return (
                            <div key={i} className="mc-code-block">
                                {block.label && <div className="mc-code-label">{block.label}</div>}
                                <pre className="mc-code"><code dangerouslySetInnerHTML={{ __html: escapeHtml(block.value) }} /></pre>
                            </div>
                        );

                    case 'list':
                        const ListTag = block.ordered ? 'ol' : 'ul';
                        return (
                            <ListTag key={i} className={`mc-list ${block.ordered ? 'mc-list-ordered' : ''}`}>
                                {block.items.map((item, j) => <li key={j} dangerouslySetInnerHTML={{ __html: item }}></li>)}
                            </ListTag>
                        );

                    case 'note':
                        const variant = block.variant || 'info';
                        return (
                            <div key={i} className={`mc-note mc-note-${variant}`}>
                                {noteIcons[variant] || noteIcons.info}
                                <div dangerouslySetInnerHTML={{ __html: block.value }}></div>
                            </div>
                        );

                    case 'table':
                        return (
                            <div key={i} className="mc-table-wrapper">
                                <table className="mc-table">
                                    <thead><tr>{block.headers.map((h, j) => <th key={j}>{h}</th>)}</tr></thead>
                                    <tbody>{block.rows.map((row, j) => (
                                        <tr key={j}>{row.map((cell, k) => <td key={k}>{cell}</td>)}</tr>
                                    ))}</tbody>
                                </table>
                            </div>
                        );

                    case 'divider':
                        return <hr key={i} className="mc-divider" />;

                    case 'simulation':
                        if (block.id === 'docker-arch') {
                            return (
                                <div key={i} style={{ margin: '2rem 0' }}>
                                    <DockerArchSim />
                                </div>
                            );
                        }
                        if (block.id === 'containerization-sim') {
                            return (
                                <div key={i} style={{ margin: '2rem 0' }}>
                                    <ContainerizationSim />
                                </div>
                            );
                        }
                        if (block.id === 'container-lifecycle') {
                            return (
                                <div key={i} style={{ margin: '2rem 0' }}>
                                    <ContainerLifecycleSim />
                                </div>
                            );
                        }
                        if (block.id === 'docker-workflow') {
                            return (
                                <div key={i} style={{ margin: '2rem 0' }}>
                                    <DockerWorkflowSim />
                                </div>
                            );
                        }
                        if (block.id === 'docker-networking-sim') {
                            return (
                                <div key={i} style={{ margin: '2rem 0' }}>
                                    <DockerNetworkingSim />
                                </div>
                            );
                        }
                        if (block.id === 'identify-network-sim') {
                            return (
                                <div key={i} style={{ margin: '2rem 0' }}>
                                    <IdentifyNetworkSim />
                                </div>
                            );
                        }
                        if (block.id === 'docker-fs-sim') {
                            return <div key={i} style={{ margin: '2rem 0' }}><DefaultFsSim /></div>;
                        }
                        if (block.id === 'docker-volume-sim') {
                            return <div key={i} style={{ margin: '2rem 0' }}><DockerVolumeSim /></div>;
                        }
                        if (block.id === 'docker-bind-sim') {
                            return <div key={i} style={{ margin: '2rem 0' }}><DockerBindSim /></div>;
                        }
                        if (block.id === 'docker-tmpfs-sim') {
                            return <div key={i} style={{ margin: '2rem 0' }}><DockerTmpfsSim /></div>;
                        }
                        
                        return (
                            <div key={i} className="mc-simulation">
                                <div className="mc-sim-header">
                                    <PlayCircle size={20} style={{ color: 'var(--accent)' }} />
                                    <span>{block.label || 'Interactive Simulation'}</span>
                                </div>
                                <div className="mc-sim-canvas" id={`sim-canvas-${block.id}`}></div>
                                {block.btnText && <button className="btn-primary mc-sim-btn">{block.btnText}</button>}
                            </div>
                        );

                    case 'pdf':
                        return (
                            <div key={i} style={{ margin: '2rem 0', height: '600px', width: '100%', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
                                <iframe src={block.url} width="100%" height="100%" style={{ border: 'none' }} title={block.label || "PDF Document"}></iframe>
                            </div>
                        );

                    case 'download':
                        return (
                            <div key={i} style={{ margin: '2rem 0', textAlign: 'center' }}>
                                <a href={block.url} download={block.filename || true} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                    {block.label || "Download File"}
                                </a>
                            </div>
                        );

                    case 'accordion':
                        return (
                            <details key={i} className="mc-accordion">
                                <summary className="mc-accordion-summary">
                                    {block.icon === 'star' && <span style={{ color: 'var(--warning)', marginRight: '8px', fontSize: '1.2em' }}>★</span>}
                                    {block.icon === 'double-star' && <span style={{ color: 'var(--warning)', marginRight: '8px', fontSize: '1.2em' }}>★★</span>}
                                    <span dangerouslySetInnerHTML={{ __html: block.title }}></span>
                                </summary>
                                <div className="mc-accordion-content">
                                    <ContentRenderer blocks={block.contentBlocks} />
                                </div>
                            </details>
                        );

                    default:
                        return null;
                }
            })}
        </>
    );
}

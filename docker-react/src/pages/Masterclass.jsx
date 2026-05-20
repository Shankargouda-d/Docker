import { useState, useEffect, useCallback } from 'react';
import { GraduationCap, ChevronRight, ChevronLeft, BookOpen, Menu, X } from 'lucide-react';
import { syllabus, getAllTopics } from '../data/syllabus';
import ContentRenderer from '../components/ContentRenderer';
import '../styles/Masterclass.css';

export default function Masterclass() {
    const [expandedModules, setExpandedModules] = useState(new Set());
    const [activeTopicId, setActiveTopicId] = useState(null);
    const [topicContent, setTopicContent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);

    const allTopics = getAllTopics();
    const activeTopic = allTopics.find(t => t.id === activeTopicId);
    const activeIndex = allTopics.findIndex(t => t.id === activeTopicId);

    const toggleModule = (moduleId) => {
        setExpandedModules(prev => {
            const next = new Set(prev);
            if (next.has(moduleId)) next.delete(moduleId);
            else next.add(moduleId);
            return next;
        });
    };

    const selectTopic = useCallback(async (topicId) => {
        setActiveTopicId(topicId);
        setShowMobileSidebar(false); // Close sidebar on mobile after selection
        const topic = getAllTopics().find(t => t.id === topicId);
        if (!topic) return;

        // Auto-expand parent
        setExpandedModules(prev => {
            const next = new Set(prev);
            syllabus.forEach(mod => {
                if (mod.subtopics.some(s => s.id === topicId)) next.add(mod.id);
            });
            return next;
        });

        // Fetch content
        setLoading(true);
        try {
            const res = await fetch(`/masterclass/content/${topic.folder}/${topic.file}`);
            if (res.ok) {
                const data = await res.json();
                setTopicContent(data);
            } else {
                setTopicContent(null);
            }
        } catch {
            setTopicContent(null);
        }
        setLoading(false);
    }, []);

    const navigateTopic = (dir) => {
        const newIndex = activeIndex + dir;
        if (newIndex >= 0 && newIndex < allTopics.length) {
            selectTopic(allTopics[newIndex].id);
        }
    };

    return (
        <div className={`mc-page ${showMobileSidebar ? 'sidebar-open' : ''}`}>
            {/* Mobile Menu Button */}
            <button className="mc-mobile-toggle" onClick={() => setShowMobileSidebar(!showMobileSidebar)}>
                {showMobileSidebar ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar Overlay */}
            {showMobileSidebar && <div className="mc-sidebar-overlay" onClick={() => setShowMobileSidebar(false)}></div>}

            {/* Sidebar */}
            <aside className={`mc-sidebar ${showMobileSidebar ? 'mobile-show' : ''}`}>
                <div className="mc-sidebar-header">
                    <GraduationCap size={18} style={{ color: 'var(--accent)' }} />
                    <span>CS44 Curriculum</span>
                </div>
                <div className="mc-module-list">
                    {syllabus.map((mod, modIndex) => {
                        const isExpanded = expandedModules.has(mod.id);
                        return (
                            <div key={mod.id} className="mc-module">
                                <div
                                    className={`mc-module-header ${isExpanded ? 'expanded' : ''}`}
                                    onClick={() => toggleModule(mod.id)}
                                >
                                    <div className="mc-module-number">{modIndex + 1}</div>
                                    <div className="mc-module-title">{mod.title}</div>
                                    <ChevronRight size={16} className="mc-module-chevron" />
                                </div>
                                <div className={`mc-subtopics ${isExpanded ? 'open' : ''}`}>
                                    <div className="mc-subtopic-list">
                                        {mod.subtopics.map(sub => (
                                            <div
                                                key={sub.id}
                                                className={`mc-subtopic ${sub.id === activeTopicId ? 'active' : ''}`}
                                                onClick={() => selectTopic(sub.id)}
                                            >
                                                <div className="mc-subtopic-dot"></div>
                                                <span className="mc-subtopic-name">{sub.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </aside>

            {/* Content */}
            <main className="mc-content">
                {!activeTopicId ? (
                    <div className="mc-welcome">
                        <div className="mc-welcome-icon"><GraduationCap size={36} /></div>
                        <h1>Docker Masterclass</h1>
                        <p>Select a topic from the sidebar to begin your journey into Docker.</p>
                        <div className="mc-welcome-stats">
                            <div className="mc-stat-card"><span className="mc-stat-number">3</span><span className="mc-stat-label">Modules</span></div>
                            <div className="mc-stat-card"><span className="mc-stat-number">13</span><span className="mc-stat-label">Topics</span></div>
                            <div className="mc-stat-card"><span className="mc-stat-number">∞</span><span className="mc-stat-label">Knowledge</span></div>
                        </div>
                    </div>
                ) : (
                    <div className="mc-topic-view" key={activeTopicId}>
                        <div className="mc-topic-breadcrumb">
                            <span className="mc-breadcrumb-module">{activeTopic?.moduleTitle}</span>
                            <span className="mc-breadcrumb-sep">/</span>
                            <span>{activeTopic?.title}</span>
                        </div>
                        <h1 className="mc-topic-title">{activeTopic?.title}</h1>
                        <div className="mc-topic-body">
                            {loading ? (
                                <p className="mc-placeholder-text">Loading...</p>
                            ) : topicContent?.content ? (
                                <ContentRenderer blocks={topicContent.content} />
                            ) : (
                                <p className="mc-placeholder-text">Content for "<strong>{activeTopic?.title}</strong>" will be added soon.</p>
                            )}
                        </div>
                        <div className="mc-topic-nav">
                            <button className="mc-nav-btn" disabled={activeIndex <= 0} onClick={() => navigateTopic(-1)}>
                                <ChevronLeft size={16} /> Previous
                            </button>
                            <button className="mc-nav-btn mc-nav-btn-next" disabled={activeIndex >= allTopics.length - 1} onClick={() => navigateTopic(1)}>
                                Next <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

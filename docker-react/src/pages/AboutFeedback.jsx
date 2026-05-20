import { useState } from 'react';
import { Info, Send, Star, CheckCircle, Award, Target, BookOpen, Users } from 'lucide-react';
import '../styles/AboutFeedback.css';

export default function AboutFeedback() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [type, setType] = useState('Suggestion');
    const [rating, setRating] = useState(5);
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const feedbackTypes = [
        { label: '💡 Suggestion', value: 'Suggestion' },
        { label: '🐛 Bug Report', value: 'Bug' },
        { label: '📚 Content Issue', value: 'Content' },
        { label: '💖 Love It!', value: 'Love' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !message) return;

        setIsSubmitting(true);
        // Simulate a sleek submission transition
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
        }, 1200);
    };

    const handleReset = () => {
        setName('');
        setEmail('');
        setType('Suggestion');
        setRating(5);
        setMessage('');
        setSubmitted(false);
    };

    return (
        <div className="page-view about-feedback-view">
            <div className="af-container">
                <div className="af-header">
                    <h1 className="glow-title af-title">About & Feedback</h1>
                    <p className="af-subtitle">Learn more about Docker MasterHub and share your valuable thoughts to make it even better.</p>
                </div>

                <div className="af-grid">
                    {/* Left Column: About Section */}
                    <div className="af-card about-card animate-pop">
                        <div className="card-header">
                            <Info className="card-icon accent-icon" size={24} />
                            <h2>About Docker MasterHub</h2>
                        </div>
                        
                        <div className="about-content">
                            <p className="lead-text">
                                Docker MasterHub is a premium, state-of-the-art interactive platform designed specifically for students, educators, and developers to master container orchestration effortlessly.
                            </p>
                            
                            <p>
                                By combining comprehensive, syllabus-aligned curriculum materials (CS44 syllabus) with real-world interactive visual simulations, our platform transforms dry Docker commands and abstract networking theories into vivid, live playground experiences.
                            </p>

                            <div className="pillars-grid">
                                <div className="pillar-item">
                                    <Target className="pillar-icon" size={20} />
                                    <div>
                                        <h3>Visual Learning</h3>
                                        <p>Watch container lifecycles, networks, and mount flows execute live inside styled virtual diagrams.</p>
                                    </div>
                                </div>
                                <div className="pillar-item">
                                    <BookOpen className="pillar-icon" size={20} />
                                    <div>
                                        <h3>Syllabus-Aligned</h3>
                                        <p>Organized strictly into academic-grade educational modules including practice exam resources.</p>
                                    </div>
                                </div>
                                <div className="pillar-item">
                                    <Award className="pillar-icon" size={20} />
                                    <div>
                                        <h3>Interactive CLI</h3>
                                        <p>An intelligent Command Explorer with real-time feedback, sample outputs, and direct simulation matching.</p>
                                    </div>
                                </div>
                                <div className="pillar-item">
                                    <Users className="pillar-icon" size={20} />
                                    <div>
                                        <h3>Community Built</h3>
                                        <p>Continuously refined and updated using feedback from learners and instructors around the globe.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Feedback Form */}
                    <div className="af-card feedback-card animate-pop" style={{ animationDelay: '0.1s' }}>
                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="feedback-form">
                                <div className="card-header">
                                    <Send className="card-icon success-icon" size={24} />
                                    <h2>Share Your Feedback</h2>
                                </div>
                                <p className="form-desc">Found a bug? Have a killer feature idea? Or simply loving the visuals? Drop us a line below!</p>

                                <div className="input-group-row">
                                    <div className="input-field">
                                        <label htmlFor="af-name">Your Name</label>
                                        <input 
                                            type="text" 
                                            id="af-name" 
                                            placeholder="John Doe" 
                                            value={name} 
                                            onChange={(e) => setName(e.target.value)} 
                                            required 
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="af-email">Email Address</label>
                                        <input 
                                            type="email" 
                                            id="af-email" 
                                            placeholder="john@example.com" 
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)} 
                                            required 
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>

                                <div className="input-field">
                                    <label>What kind of feedback is this?</label>
                                    <div className="type-chips">
                                        {feedbackTypes.map((item) => (
                                            <button
                                                key={item.value}
                                                type="button"
                                                className={`type-chip ${type === item.value ? 'active' : ''}`}
                                                onClick={() => setType(item.value)}
                                            >
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="input-field">
                                    <label>Rate your overall experience</label>
                                    <div className="rating-container">
                                        <div className="stars">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    className={`star-btn ${star <= rating ? 'active' : ''}`}
                                                    onClick={() => setRating(star)}
                                                >
                                                    <Star fill={star <= rating ? "var(--warning)" : "none"} size={28} />
                                                </button>
                                            ))}
                                        </div>
                                        <span className="rating-label">
                                            {rating === 5 && '😍 Outstanding! Keep it up.'}
                                            {rating === 4 && '😊 Very Good, loved it!'}
                                            {rating === 3 && '😐 Decent, but could improve.'}
                                            {rating === 2 && '🙁 Needs significant work.'}
                                            {rating === 1 && '😡 Extremely frustrating.'}
                                        </span>
                                    </div>
                                </div>

                                <div className="input-field">
                                    <label htmlFor="af-message">Your Message</label>
                                    <textarea 
                                        id="af-message" 
                                        rows="4" 
                                        placeholder="Tell us what you think..." 
                                        value={message} 
                                        onChange={(e) => setMessage(e.target.value)} 
                                        required
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit" 
                                    className={`btn-primary submit-btn ${isSubmitting ? 'submitting' : ''}`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="spinner"></span> Sending...
                                        </>
                                    ) : (
                                        <>
                                            Submit Feedback <Send size={16} />
                                        </>
                                    )}
                                </button>
                            </form>
                        ) : (
                            <div className="submission-success animate-pop">
                                <CheckCircle className="success-check-icon" size={64} />
                                <h2>Thank you, {name}!</h2>
                                <p className="success-msg">
                                    Your feedback has been successfully broadcast to our dev pipeline. We read every single review to polish Docker MasterHub and craft an absolute masterpiece.
                                </p>
                                
                                <div className="submitted-details">
                                    <div className="detail-row">
                                        <span className="label">Category</span>
                                        <span className="value">{feedbackTypes.find(t => t.value === type)?.label}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="label">Rating Given</span>
                                        <span className="value text-warning">
                                            {'★'.repeat(rating)}{'☆'.repeat(5 - rating)} ({rating}/5)
                                        </span>
                                    </div>
                                </div>

                                <button onClick={handleReset} className="btn-primary reset-btn">
                                    Send Another Feedback
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

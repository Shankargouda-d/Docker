import { useState, useCallback } from 'react';
import {
    Monitor, Apple, CheckCircle, Download, Terminal,
    Settings, RefreshCw, Shield, Play, HardDrive,
    ExternalLink, Cpu, Layers, Command, Box
} from 'lucide-react';
import '../styles/Installation.css';

/* ─── Command Block with Copy ─── */
function CmdBlock({ cmd }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(cmd);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }, [cmd]);

    return (
        <div className="cmd-block">
            <code>{cmd}</code>
            <button className={`cmd-copy ${copied ? 'copied' : ''}`} onClick={handleCopy}>
                {copied ? '✓ Copied' : 'Copy'}
            </button>
        </div>
    );
}

/* ─── Windows Installation Steps ─── */
const windowsSteps = [
    {
        title: 'Check System Requirements',
        icon: <Cpu size={20} />,
        content: (
            <>
                <p className="step-desc">Ensure your system meets the following requirements before installing Docker Desktop:</p>
                <div className="step-desc">
                    <ul>
                        <li>Windows 10 (Build 19041+) or Windows 11 — 64-bit</li>
                        <li>Hardware virtualization enabled in BIOS/UEFI</li>
                        <li>At least 4 GB RAM (8 GB recommended)</li>
                        <li>WSL 2 feature enabled</li>
                    </ul>
                </div>
                <div className="tip-box">
                    <div className="tip-label">💡 Tip</div>
                    <p>To check if virtualization is enabled, open <strong>Task Manager → Performance → CPU</strong> and look for <strong>"Virtualization: Enabled"</strong>.</p>
                </div>
            </>
        ),
    },
    {
        title: 'Install WSL 2 (Windows Subsystem for Linux)',
        icon: <Terminal size={20} />,
        content: (
            <>
                <p className="step-desc">Open <strong>PowerShell as Administrator</strong> and run the following command to install WSL with Ubuntu:</p>
                <CmdBlock cmd="wsl --install" />
                <p className="step-desc">If WSL is already installed, verify the version:</p>
                <CmdBlock cmd="wsl --list --verbose" />
                <p className="step-desc">If your distro shows version 1, convert it to version 2:</p>
                <CmdBlock cmd="wsl --set-version Ubuntu 2" />
                <p className="step-desc">Set WSL 2 as the default version for all future distros:</p>
                <CmdBlock cmd="wsl --set-default-version 2" />
                <p className="step-desc">Update WSL to the latest version:</p>
                <CmdBlock cmd="wsl --update" />
                <div className="tip-box">
                    <div className="tip-label">⚠️ Important</div>
                    <p>After installing or updating WSL, <strong>restart your PC</strong> before proceeding to the next step.</p>
                </div>
            </>
        ),
    },
    {
        title: 'Download Docker Desktop',
        icon: <Download size={20} />,
        content: (
            <>
                <p className="step-desc">Download Docker Desktop for Windows from the official website:</p>
                <a
                    href="https://www.docker.com/products/docker-desktop/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="download-btn"
                >
                    <Download size={18} /> Download Docker Desktop for Windows
                    <ExternalLink size={14} />
                </a>
                <p className="step-desc" style={{ marginTop: '1rem' }}>Choose the correct installer for your architecture:</p>
                <div className="check-item">
                    <span className="check-icon">✓</span>
                    <span><strong>Windows – AMD64</strong> (most common, for Intel/AMD processors)</span>
                </div>
                <div className="check-item">
                    <span className="check-icon">✓</span>
                    <span><strong>Windows – ARM64</strong> (for ARM-based devices like Surface Pro X)</span>
                </div>
            </>
        ),
    },
    {
        title: 'Install Docker Desktop',
        icon: <HardDrive size={20} />,
        content: (
            <>
                <p className="step-desc">Run the downloaded installer:</p>
                <div className="step-desc">
                    <ul>
                        <li>Locate the downloaded <strong>Docker Desktop Installer.exe</strong> file</li>
                        <li>Right-click the installer → <strong>Run as Administrator</strong></li>
                    </ul>
                </div>
                <p className="step-desc">During installation, ensure these options are <strong>checked</strong>:</p>
                <div className="check-item">
                    <span className="check-icon">✓</span>
                    <span><strong>Use WSL 2 instead of Hyper-V</strong> (recommended)</span>
                </div>
                <div className="check-item">
                    <span className="check-icon">✓</span>
                    <span><strong>Add shortcut to desktop</strong></span>
                </div>
                <p className="step-desc" style={{ marginTop: '0.75rem' }}>Click <strong>OK / Install</strong> and wait for the installation to complete.</p>
            </>
        ),
    },
    {
        title: 'Restart Your System',
        icon: <RefreshCw size={20} />,
        content: (
            <>
                <p className="step-desc">
                    After the installation finishes, <strong>restart your computer</strong> to ensure all Docker services and WSL 2 integration are properly initialized.
                </p>
                <div className="tip-box">
                    <div className="tip-label">💡 Note</div>
                    <p>If you skip the restart, Docker Desktop may not start correctly or may show WSL-related errors.</p>
                </div>
            </>
        ),
    },
    {
        title: 'Launch Docker Desktop',
        icon: <Play size={20} />,
        content: (
            <>
                <p className="step-desc">Open Docker Desktop from your Start Menu or desktop shortcut:</p>
                <div className="step-desc">
                    <ul>
                        <li>Accept the Docker Subscription Service Agreement</li>
                        <li>Wait for the Docker Engine to initialize (may take a minute on first launch)</li>
                        <li>Look for the green indicator — <strong>"Docker Desktop is running"</strong></li>
                    </ul>
                </div>
                <div className="expected-output">Docker Desktop is running ✔</div>
            </>
        ),
    },
    {
        title: 'Enable WSL Integration',
        icon: <Settings size={20} />,
        content: (
            <>
                <p className="step-desc">Configure Docker to work with your WSL 2 Linux distribution:</p>
                <div className="nav-path-box">
                    <Settings size={16} />
                    <span>Settings</span> → <span>Resources</span> → <span>WSL Integration</span>
                </div>
                <p className="step-desc" style={{ marginTop: '0.75rem' }}>In the WSL Integration panel:</p>
                <div className="check-item">
                    <span className="check-icon">✓</span>
                    <span>Toggle <strong>ON</strong> your installed Linux distro (e.g., Ubuntu)</span>
                </div>
                <p className="step-desc" style={{ marginTop: '0.5rem' }}>
                    Click <strong>Apply & Restart</strong> to save the changes.
                </p>
                <div className="tip-box">
                    <div className="tip-label">💡 Why?</div>
                    <p>This allows you to use Docker commands directly from your WSL 2 terminal (e.g., Ubuntu) without any extra configuration.</p>
                </div>
            </>
        ),
    },
    {
        title: 'Verify Installation',
        icon: <Shield size={20} />,
        content: (
            <>
                <p className="step-desc">Open <strong>PowerShell</strong> or <strong>Command Prompt</strong> and run:</p>
                <CmdBlock cmd="docker --version" />
                <div className="expected-output">Docker version 27.x.x, build xxxxxxx</div>
                <p className="step-desc">Check the full Docker system information:</p>
                <CmdBlock cmd="docker info" />
                <p className="step-desc">This should display details about your Docker Engine, including server version, storage driver, and runtime.</p>
            </>
        ),
    },
    {
        title: 'Run Your First Container! 🎉',
        icon: <CheckCircle size={20} />,
        content: (
            <>
                <p className="step-desc">Test your Docker installation by running the official hello-world container:</p>
                <CmdBlock cmd="docker run hello-world" />
                <div className="expected-output">
                    Hello from Docker!{'\n'}
                    This message shows that your installation appears to be working correctly.
                </div>
                <div className="tip-box">
                    <div className="tip-label">🎉 Congratulations!</div>
                    <p>Docker is successfully installed and running on your Windows machine. You're ready to start containerizing applications!</p>
                </div>
            </>
        ),
    },
];

/* ─── macOS Installation Steps ─── */
const macSteps = [
    {
        title: 'Check System Requirements',
        icon: <Cpu size={20} />,
        content: (
            <>
                <p className="step-desc">Ensure your Mac meets the minimum requirements:</p>
                <div className="step-desc">
                    <ul>
                        <li>macOS 12 (Monterey) or later</li>
                        <li>Apple Silicon (M1/M2/M3) or Intel chip</li>
                        <li>At least 4 GB RAM (8 GB recommended)</li>
                    </ul>
                </div>
                <div className="tip-box">
                    <div className="tip-label">💡 Tip</div>
                    <p>Check your chip: Click <strong>Apple Menu → About This Mac</strong>. Look for <strong>"Chip"</strong> (Apple Silicon) or <strong>"Processor"</strong> (Intel).</p>
                </div>
            </>
        ),
    },
    {
        title: 'Download Docker Desktop for Mac',
        icon: <Download size={20} />,
        content: (
            <>
                <p className="step-desc">Download Docker Desktop from the official website:</p>
                <a
                    href="https://www.docker.com/products/docker-desktop/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="download-btn"
                >
                    <Download size={18} /> Download Docker Desktop for Mac
                    <ExternalLink size={14} />
                </a>
                <p className="step-desc" style={{ marginTop: '1rem' }}>Choose the correct installer:</p>
                <div className="check-item">
                    <span className="check-icon">✓</span>
                    <span><strong>Mac with Apple Silicon</strong> — for M1, M2, M3, M4 chips</span>
                </div>
                <div className="check-item">
                    <span className="check-icon">✓</span>
                    <span><strong>Mac with Intel Chip</strong> — for older Intel-based Macs</span>
                </div>
            </>
        ),
    },
    {
        title: 'Install Docker Desktop',
        icon: <HardDrive size={20} />,
        content: (
            <>
                <p className="step-desc">Install Docker Desktop on your Mac:</p>
                <div className="step-desc">
                    <ul>
                        <li>Open the downloaded <strong>Docker.dmg</strong> file</li>
                        <li>Drag the <strong>Docker icon</strong> to the <strong>Applications</strong> folder</li>
                        <li>Wait for the copy to complete</li>
                    </ul>
                </div>
                <div className="tip-box">
                    <div className="tip-label">💡 Tip</div>
                    <p>If macOS asks for permission, click <strong>Open</strong> to allow the app from an identified developer.</p>
                </div>
            </>
        ),
    },
    {
        title: 'Launch Docker Desktop',
        icon: <Play size={20} />,
        content: (
            <>
                <p className="step-desc">Open Docker Desktop from Applications:</p>
                <div className="step-desc">
                    <ul>
                        <li>Open <strong>Finder → Applications → Docker</strong></li>
                        <li>Accept the Docker Subscription Service Agreement</li>
                        <li>Grant any system permissions Docker requests (network, file access)</li>
                        <li>Wait for the Docker Engine to start — look for the whale icon in the menu bar</li>
                    </ul>
                </div>
                <div className="expected-output">Docker Desktop is running ✔ (whale icon in menu bar is steady)</div>
            </>
        ),
    },
    {
        title: 'Install Rosetta 2 (Apple Silicon Only)',
        icon: <Layers size={20} />,
        content: (
            <>
                <p className="step-desc">If you have an Apple Silicon Mac (M1/M2/M3), install Rosetta 2 for compatibility with x86 containers:</p>
                <CmdBlock cmd="softwareupdate --install-rosetta" />
                <div className="tip-box">
                    <div className="tip-label">💡 Note</div>
                    <p>This is only needed for Apple Silicon Macs. Intel Macs can skip this step. Rosetta 2 allows running containers built for Intel architecture.</p>
                </div>
            </>
        ),
    },
    {
        title: 'Verify Installation',
        icon: <Shield size={20} />,
        content: (
            <>
                <p className="step-desc">Open <strong>Terminal</strong> and verify Docker is installed:</p>
                <CmdBlock cmd="docker --version" />
                <div className="expected-output">Docker version 27.x.x, build xxxxxxx</div>
                <p className="step-desc">Check Docker system information:</p>
                <CmdBlock cmd="docker info" />
            </>
        ),
    },
    {
        title: 'Run Your First Container! 🎉',
        icon: <CheckCircle size={20} />,
        content: (
            <>
                <p className="step-desc">Test Docker by running the official hello-world container:</p>
                <CmdBlock cmd="docker run hello-world" />
                <div className="expected-output">
                    Hello from Docker!{'\n'}
                    This message shows that your installation appears to be working correctly.
                </div>
                <div className="tip-box">
                    <div className="tip-label">🎉 Congratulations!</div>
                    <p>Docker is successfully installed and running on your Mac. You're ready to start containerizing applications!</p>
                </div>
            </>
        ),
    },
];

/* ─── Main Component ─── */
export default function Installation() {
    const [os, setOs] = useState('windows');
    const steps = os === 'windows' ? windowsSteps : macSteps;

    return (
        <div className="install-page">
            <div className="install-container">
                {/* Hero */}
                <div className="install-hero">
                    <h1>Docker Desktop Installation</h1>
                    <p>Step-by-step guide to install Docker Desktop on your machine — follow along and get Docker running in minutes.</p>
                </div>

                {/* OS Tabs */}
                <div className="os-tabs">
                    <button
                        className={`os-tab ${os === 'windows' ? 'active' : ''}`}
                        onClick={() => setOs('windows')}
                    >
                        <Monitor size={20} />
                        Windows
                    </button>
                    <button
                        className={`os-tab ${os === 'mac' ? 'active' : ''}`}
                        onClick={() => setOs('mac')}
                    >
                        <Command size={20} />
                        macOS
                    </button>
                </div>

                {/* Steps */}
                <div className="steps-container" key={os}>
                    {steps.map((step, i) => (
                        <div className="step-card" key={i}>
                            <div className="step-number">{i + 1}</div>
                            <div className="step-content">
                                <div className="step-title">
                                    {step.icon}
                                    {step.title}
                                </div>
                                {step.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

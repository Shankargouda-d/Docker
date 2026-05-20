import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { featureData } from '../data/features';
import { Terminal } from 'lucide-react';
import '../styles/globals.css';

const commandMap = [
    { keywords: ['compose', 'up', 'yml', 'yaml'], feature: 'compose',
      explanation: 'Docker Compose handles multi-container orchestration. By typing compose-related commands, you are instructing Docker to read your compose file and manage your entire application stack.',
      sampleCmd: '$ docker compose up -d',
      sampleOutput: `[+] Running 3/3
 ✔ Network myapp_default    Created    0.1s
 ✔ Container myapp-db-1     Started    1.2s
 ✔ Container myapp-web-1    Started    1.5s
 ✔ Container myapp-redis-1  Started    1.3s

All services are up and running!` },

    { keywords: ['env', 'variable', '-e', 'secret'], feature: 'env',
      explanation: 'You are passing environment variables. This allows you to inject configuration and secrets into your container at runtime without hardcoding them in your code.',
      sampleCmd: '$ docker run -e DB_HOST=localhost -e DB_PORT=5432 myapp',
      sampleOutput: `Environment variables injected:
  DB_HOST=localhost
  DB_PORT=5432

Container started with ID: a3f8d2e1b4c9
Connecting to database at localhost:5432... OK` },

    { keywords: ['volume', '-v', 'mount', 'persist'], feature: 'volumes',
      explanation: 'Volume commands are used for persistent data. You are mapping a host directory to a container directory so your data survives container restarts and deletions.',
      sampleCmd: '$ docker volume create mydata && docker run -v mydata:/app/data nginx',
      sampleOutput: `mydata
DRIVER    VOLUME NAME
local     mydata

Container started with volume mount:
  mydata → /app/data
Data will persist across container restarts.` },

    { keywords: ['build', 'dockerfile', 'image', '-t'], feature: 'dockerfile',
      explanation: 'The build command takes your Dockerfile and context, and creates a custom Docker image layer by layer according to your instructions.',
      sampleCmd: '$ docker build -t myapp:v1 .',
      sampleOutput: `[+] Building 12.3s (8/8) FINISHED
 => [1/6] FROM node:18-alpine          2.1s
 => [2/6] WORKDIR /app                 0.0s
 => [3/6] COPY package*.json ./        0.1s
 => [4/6] RUN npm ci --production      8.2s
 => [5/6] COPY . .                     0.3s
 => [6/6] EXPOSE 3000                  0.0s
 => exporting to image                 1.4s
 => => naming to docker.io/library/myapp:v1` },

    { keywords: ['run', 'ps', 'exec', 'pause', 'stop', 'kill', 'rm', 'unpause'], feature: 'lifecycle',
      explanation: 'Lifecycle commands manage the actual running instances of your images (containers). You can start, stop, pause, and interact with running containers.',
      sampleCmd: '$ docker ps',
      sampleOutput: `CONTAINER ID   IMAGE     STATUS          PORTS                  NAMES
a3f8d2e1b4c9   nginx     Up 2 hours      0.0.0.0:80->80/tcp     web-1
b7c9e3f2a1d8   redis     Up 2 hours      0.0.0.0:6379->6379     cache-1
d4e5f6a7b8c9   postgres  Up 45 minutes   0.0.0.0:5432->5432     db-1` },

    { keywords: ['restart', 'policy', 'always', 'crash'], feature: 'restart',
      explanation: 'Restart policies define the container\'s self-healing capabilities. You are instructing the daemon to automatically restart the container under certain failure conditions.',
      sampleCmd: '$ docker run --restart=always nginx',
      sampleOutput: `Container started with restart policy: always
ID: e5f6a7b8c9d0

Policy behavior:
  ✔ Restart on crash      → YES
  ✔ Restart on reboot     → YES
  ✔ Restart on stop       → NO (manual stop)
  Max retries: unlimited` },

    { keywords: ['network', 'bridge', 'ip', 'connect'], feature: 'networking',
      explanation: 'Network commands allow you to isolate containers or connect them so they can communicate seamlessly using internal Docker DNS.',
      sampleCmd: '$ docker network ls',
      sampleOutput: `NETWORK ID     NAME        DRIVER    SCOPE
a1b2c3d4e5f6   bridge      bridge    local
f6e5d4c3b2a1   host        host      local
1a2b3c4d5e6f   none        null      local
9f8e7d6c5b4a   myapp_net   bridge    local` },

    { keywords: ['scale', 'replica', 'instanc'], feature: 'scaling',
      explanation: 'Scaling commands multiply your container instances, allowing you to load balance traffic across multiple replicas to handle high load.',
      sampleCmd: '$ docker compose up --scale web=3',
      sampleOutput: `[+] Running 4/4
 ✔ Container myapp-web-1  Started    0.8s
 ✔ Container myapp-web-2  Started    0.9s
 ✔ Container myapp-web-3  Started    1.0s
 ✔ Container myapp-db-1   Running

Scaled 'web' service to 3 replicas.
Load balancing active across all instances.` },

    { keywords: ['ci', 'cd', 'deploy', 'github', 'push'], feature: 'cicd',
      explanation: 'CI/CD commands and concepts automate the pipeline of building, testing, and deploying your Docker images smoothly to production.',
      sampleCmd: '$ docker push myregistry.io/myapp:v1',
      sampleOutput: `The push refers to repository [myregistry.io/myapp]
5f70bf18a086: Pushed
a3ed95caeb02: Pushed
e5f6a7b8c9d0: Pushed
v1: digest: sha256:abc123...def456 size: 1362

Image successfully pushed to registry!
CI/CD pipeline can now pull this image for deployment.` },

    { keywords: ['tag', 'rollback', 'v1', 'v2', 'latest'], feature: 'versioning',
      explanation: 'Tagging gives aliases and version numbers to your images, which is crucial for instant rollbacks and safe deployments.',
      sampleCmd: '$ docker tag myapp:v1 myapp:latest',
      sampleOutput: `Tagged: myapp:v1 → myapp:latest

REPOSITORY   TAG       IMAGE ID       SIZE
myapp        latest    a3f8d2e1b4c9   145MB
myapp        v1        a3f8d2e1b4c9   145MB
myapp        v0.9     b7c9e3f2a1d8   142MB

Rollback: docker run myapp:v0.9` },

    { keywords: ['health', 'check', 'status', 'monitor'], feature: 'health',
      explanation: 'Health checks tell Docker how to test if your application is actually working, not just if the process inside the container is running.',
      sampleCmd: '$ docker inspect --format="{{.State.Health.Status}}" web-1',
      sampleOutput: `healthy

Health Check Details:
  Test:     ["CMD", "curl", "-f", "http://localhost/health"]
  Interval: 30s
  Timeout:  10s
  Retries:  3
  Status:   healthy (5 consecutive successes)` },

    { keywords: ['version', '--version', 'pull', 'images'], feature: 'basics',
      explanation: 'Basic commands help you check your Docker installation and manage local images pulled from registries like Docker Hub.',
      sampleCmd: '$ docker --version',
      sampleOutput: `Docker version 27.4.1, build b9d17ea

Client: Docker Engine - Community
  Version:    27.4.1
  API version: 1.47
  Go version:  go1.22.10
  OS/Arch:     linux/amd64` },

    { keywords: ['login', 'logout'], feature: 'basics',
      explanation: 'Docker login/logout manages your authentication with Docker registries like Docker Hub. You need to login before pushing private images.',
      sampleCmd: '$ docker login',
      sampleOutput: `Login with your Docker ID to push and pull images from Docker Hub.

Username: myuser
Password: ********
WARNING! Your password will be stored unencrypted.

Login Succeeded` },

    { keywords: ['logs'], feature: 'lifecycle',
      explanation: 'The docker logs command fetches the stdout/stderr output of a running or stopped container. Useful for debugging application issues inside containers.',
      sampleCmd: '$ docker logs web-1 --tail 5',
      sampleOutput: `2026-05-20T10:30:01Z  [info]  GET /api/users 200 12ms
2026-05-20T10:30:05Z  [info]  POST /api/login 200 45ms
2026-05-20T10:30:12Z  [warn]  GET /api/data 304 8ms
2026-05-20T10:30:15Z  [info]  GET /health 200 2ms
2026-05-20T10:30:20Z  [info]  Server running on port 3000` },

    { keywords: ['inspect'], feature: 'lifecycle',
      explanation: 'Docker inspect returns detailed low-level information about containers, images, volumes, or networks in JSON format. Essential for debugging configurations.',
      sampleCmd: '$ docker inspect web-1 --format="{{.NetworkSettings.IPAddress}}"',
      sampleOutput: `172.17.0.2

Full inspect output includes:
  • Container ID, Name, State
  • Network settings & IP addresses
  • Mount points & volumes
  • Environment variables
  • Resource limits (CPU, Memory)` },

    { keywords: ['info', 'system'], feature: 'basics',
      explanation: 'Docker info/system displays system-wide information including the number of containers, images, storage driver, and Docker root directory.',
      sampleCmd: '$ docker system info',
      sampleOutput: `Containers: 5
 Running: 3
 Paused: 0
 Stopped: 2
Images: 12
Server Version: 27.4.1
Storage Driver: overlay2
Docker Root Dir: /var/lib/docker
CPUs: 4
Total Memory: 7.77GiB` },

    { keywords: ['stats', 'top'], feature: 'lifecycle',
      explanation: 'Docker stats shows a live stream of resource usage (CPU, memory, network I/O) for running containers. Docker top shows processes inside a container.',
      sampleCmd: '$ docker stats --no-stream',
      sampleOutput: `CONTAINER ID   NAME     CPU %   MEM USAGE / LIMIT     NET I/O         BLOCK I/O
a3f8d2e1b4c9   web-1    2.35%   45.2MiB / 512MiB      1.2kB / 850B    8.1MB / 0B
b7c9e3f2a1d8   cache-1  0.85%   12.8MiB / 256MiB      520B / 340B     4.2MB / 0B
d4e5f6a7b8c9   db-1     1.50%   128MiB / 1GiB         2.1kB / 1.5kB   25MB / 12MB` },

    { keywords: ['cp'], feature: 'volumes',
      explanation: 'Docker cp copies files or directories between a container and the local filesystem. Useful for extracting logs, configs, or injecting files into running containers.',
      sampleCmd: '$ docker cp web-1:/app/logs/error.log ./error.log',
      sampleOutput: `Successfully copied 2.56kB to /home/user/error.log

Usage patterns:
  Host → Container: docker cp ./config.json web-1:/app/
  Container → Host: docker cp web-1:/app/data ./backup/` },

    { keywords: ['prune', 'cleanup', 'clean'], feature: 'basics',
      explanation: 'Docker prune commands remove unused data — stopped containers, dangling images, unused networks, and build cache to reclaim disk space.',
      sampleCmd: '$ docker system prune -a',
      sampleOutput: `WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all images without at least one container
  - all build cache

Total reclaimed space: 3.42GB` },

    { keywords: ['swarm', 'service', 'node'], feature: 'scaling',
      explanation: 'Docker Swarm is Docker\'s native clustering and orchestration tool. It turns a pool of Docker hosts into a single virtual host for deploying services at scale.',
      sampleCmd: '$ docker swarm init',
      sampleOutput: `Swarm initialized: current node (abc123def456) is now a manager.

To add a worker to this swarm, run:
  docker swarm join --token SWMTKN-1-xyz789...
    192.168.1.100:2377

To add a manager, run:
  docker swarm join-token manager` }
];

// Helper: match command words exactly (prevents typos like "buildd" matching "build")
function matchCommand(cmd, keywords) {
    const words = cmd.split(/[\s=/:]+/);
    return keywords.some(kw => {
        if (kw.startsWith('-')) return cmd.includes(kw); // flags like -e, -v, -t
        return words.some(word => word === kw);
    });
}

export default function Explorer() {
    const [logs, setLogs] = useState([{ text: "Type 'help' or any Docker command...", isError: false }]);
    const [matchedFeature, setMatchedFeature] = useState(null);
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    const logRef = useRef(null);
    const panelRef = useRef(null);

    const processCommand = (cmd) => {
        const newLogs = [...logs, { text: `$ ${cmd}`, isError: false }];
        let matched = null;
        let explanation = '';
        let sampleOutput = '';
        let sampleCmd = '';
        for (const entry of commandMap) {
            if (matchCommand(cmd, entry.keywords)) {
                matched = entry.feature;
                explanation = entry.explanation;
                sampleOutput = entry.sampleOutput;
                sampleCmd = entry.sampleCmd;
                break;
            }
        }
        if (matched) {
            setMatchedFeature({ id: matched, data: featureData[matched], cmd, explanation, sampleOutput, sampleCmd });
            newLogs.push({ text: `✓ Recognized! See explanation & sample output →`, isSuccess: true });
        } else {
            newLogs.push({ text: "Unknown command. Try valid Docker commands like 'docker build', 'docker ps', 'docker login'.", isError: true });
            setMatchedFeature(null);
        }
        setLogs(newLogs);
        setTimeout(() => {
            if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
            if (panelRef.current) panelRef.current.scrollTop = 0;
        }, 50);
    };

    const handleKey = (e) => {
        if (e.key === 'Enter' && input.trim()) {
            processCommand(input.trim().toLowerCase());
            setInput('');
        }
    };

    return (
        <div className="page-view">
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 2rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 900 }}>CLI Command Explorer</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Master Docker commands through intelligent detection.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: matchedFeature ? '1fr 420px' : '1fr', gap: '2rem', flex: 1, minHeight: 0 }}>
                    {/* Terminal */}
                    <div style={{ background: '#000', border: '1px solid var(--border)', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)', display: 'flex', gap: '0.5rem' }}>
                            <span style={{ width: 12, height: 12, background: '#ef4444', borderRadius: '50%', display: 'inline-block' }}></span>
                            <span style={{ width: 12, height: 12, background: '#f59e0b', borderRadius: '50%', display: 'inline-block' }}></span>
                            <span style={{ width: 12, height: 12, background: '#10b981', borderRadius: '50%', display: 'inline-block' }}></span>
                        </div>
                        <div style={{ flex: 1, padding: '2rem', fontFamily: "'JetBrains Mono', monospace", display: 'flex', flexDirection: 'column' }}>
                            <div ref={logRef} style={{ flex: 1, overflowY: 'auto', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                {logs.map((log, i) => (
                                    <div key={i} style={
                                        log.isError ? { color: 'var(--error)' } :
                                        log.isSuccess ? { color: 'var(--success)', fontWeight: 600 } : {}
                                    }>{log.text}</div>
                                ))}
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem', alignItems: 'center' }}>
                                <span style={{ color: 'var(--success)', fontWeight: 800 }}>$</span>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKey}
                                    placeholder="docker run nginx..."
                                    style={{ background: 'none', border: 'none', color: '#fff', outline: 'none', flex: 1, fontFamily: 'inherit', fontSize: '1rem' }}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Explanation + Sample Output */}
                    {matchedFeature && (
                        <div ref={panelRef} style={{
                            background: 'var(--card-bg)', border: '1px solid var(--accent)', borderRadius: '1.5rem',
                            padding: '1.5rem', overflowY: 'auto',
                            animation: 'fadeIn 0.3s ease-out', backdropFilter: 'blur(12px)'
                        }}>
                            {/* Command Header */}
                            <h3 style={{ color: 'var(--accent)', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1rem', fontSize: '1.1rem' }}>
                                Command: <code style={{ color: '#fff', background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{matchedFeature.cmd}</code>
                            </h3>

                            {/* Explanation */}
                            <div style={{ marginBottom: '1rem' }}>
                                <h4 style={{ color: 'var(--text)', marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Explanation</h4>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.5', fontSize: '0.9rem', margin: 0 }}>{matchedFeature.explanation}</p>
                            </div>

                            {/* Sample Output */}
                            <div style={{ borderRadius: '0.85rem', border: '1px solid rgba(16, 185, 129, 0.25)', background: '#05080f', marginBottom: '1rem', overflow: 'visible' }}>
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                                    padding: '0.6rem 1rem', background: 'rgba(16, 185, 129, 0.08)',
                                    borderBottom: '1px solid rgba(16, 185, 129, 0.15)'
                                }}>
                                    <Terminal size={14} style={{ color: 'var(--success)' }} />
                                    <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--success)' }}>
                                        Sample Output
                                    </span>
                                </div>
                                <div style={{ padding: '1rem' }}>
                                    <div style={{ color: 'var(--accent)', fontWeight: 700, marginBottom: '0.5rem', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem' }}>{matchedFeature.sampleCmd}</div>
                                    <pre style={{ margin: 0, color: '#cbd5e1', whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', lineHeight: 1.7 }}>{matchedFeature.sampleOutput}</pre>
                                </div>
                            </div>

                            {/* Feature Link */}
                            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.85rem', borderRadius: '0.75rem', borderLeft: '3px solid var(--accent)', marginBottom: '1rem' }}>
                                <h4 style={{ color: 'var(--accent)', marginBottom: '0.35rem', fontSize: '0.9rem' }}>Feature: {matchedFeature.data.title}</h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4', margin: 0 }}>{matchedFeature.data.desc}</p>
                            </div>

                            <button
                                className="btn-primary"
                                style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '0.85rem' }}
                                onClick={() => navigate(`/lab?feature=${matchedFeature.id}`)}
                            >
                                View Live Simulation <span style={{ fontSize: '1.2rem' }}>→</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

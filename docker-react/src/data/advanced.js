/**
 * Advanced Docker Features Module
 * 7 Enterprise-Grade Interactive Simulations
 */

export const advancedData = {
    builder: {
        title: "Dockerfile Live Builder",
        desc: "Write Dockerfile instructions and watch layers build in real-time.",
        deepDive: "Every line in a Dockerfile creates a new layer in the image. Docker caches these layers — if a layer hasn't changed, Docker reuses the cached version. This is why you should put frequently-changing instructions (like COPY) at the bottom.",
        render: function(canvas) {
            canvas.innerHTML = '<div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:1rem; width:95%; height:100%; padding:1rem; overflow:hidden;">' +
                '<div style="display:flex; flex-direction:column; gap:0.5rem; overflow:hidden;">' +
                    '<p style="font-size:0.7rem; color:var(--accent); font-weight:700;">EDITOR</p>' +
                    '<textarea id="df-editor" spellcheck="false" style="flex:1; min-height:0; background:#000; color:#10b981; border:1px solid var(--border); border-radius:0.5rem; padding:1rem; font-family:JetBrains Mono,monospace; font-size:0.75rem; resize:none; outline:none;">FROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE 3000\nCMD ["node", "app.js"]</textarea>' +
                    '<button class="btn-primary" onclick="window.advSim(\'build_layers\')">Build Image</button>' +
                '</div>' +
                '<div style="display:flex; flex-direction:column; gap:0.5rem; overflow:hidden;">' +
                    '<p style="font-size:0.7rem; color:var(--accent); font-weight:700;">IMAGE LAYERS</p>' +
                    '<div id="df-layers" style="flex:1; min-height:0; display:flex; flex-direction:column; gap:4px; overflow-y:auto;"></div>' +
                '</div>' +
                '<div style="display:flex; flex-direction:column; gap:0.5rem; overflow:hidden;">' +
                    '<p style="font-size:0.7rem; color:var(--success); font-weight:700;">BUILD LOG</p>' +
                    '<div id="df-log" style="flex:1; min-height:0; background:#000; border-radius:0.5rem; padding:0.75rem; font-family:monospace; font-size:0.6rem; overflow-y:auto; color:var(--text-muted);"></div>' +
                '</div>' +
            '</div>';
        },
        simulate: function(canvas) {
            var editor = canvas.querySelector('#df-editor');
            var layerBox = canvas.querySelector('#df-layers');
            var logBox = canvas.querySelector('#df-log');
            var lines = editor.value.split('\n').filter(function(l) { return l.trim(); });
            layerBox.innerHTML = '';
            logBox.innerHTML = '';
            var colors = ['#1e293b','#334155','#475569','#6366f1','#8b5cf6','#a78bfa','#c4b5fd'];
            var explanations = {
                'FROM': 'Pulling base image from Docker Hub registry. This becomes the foundation layer of your image.',
                'WORKDIR': 'Setting the working directory inside the container. All future commands run from this path.',
                'COPY': 'Copying files from your local machine into the container filesystem.',
                'RUN': 'Executing a shell command inside the container. This creates a new cached layer.',
                'EXPOSE': 'Documenting which port the app listens on. This does NOT actually publish the port.',
                'CMD': 'Setting the default command that runs when the container starts. Only the last CMD takes effect.',
                'ENV': 'Setting an environment variable available inside the container at runtime.',
                'ADD': 'Similar to COPY but also supports URLs and auto-extracts tar archives.',
                'ENTRYPOINT': 'Like CMD but cannot be overridden by docker run arguments.',
                'VOLUME': 'Creating a mount point for persistent data that survives container restarts.',
                'LABEL': 'Adding metadata (author, version) to the image for documentation.',
                'ARG': 'Defining a build-time variable. Unlike ENV, it is NOT available at runtime.',
                'USER': 'Switching to a non-root user for security. Always recommended for production.'
            };

            // Show initial build start
            var startDiv = document.createElement('div');
            startDiv.style.color = '#8b5cf6';
            startDiv.innerHTML = '> docker build -t my-app .<br>Sending build context to Docker daemon...';
            logBox.appendChild(startDiv);

            lines.forEach(function(line, i) {
                setTimeout(function() {
                    // Build the layer
                    var div = document.createElement('div');
                    div.className = 'animate-pop';
                    div.style.cssText = 'background:' + colors[i % colors.length] + '; padding:8px 12px; border-radius:6px; font-size:0.65rem; font-family:monospace;';
                    div.innerText = 'Layer ' + (i+1) + ': ' + line.trim();
                    layerBox.appendChild(div);

                    // Write the explanation
                    var keyword = line.trim().split(' ')[0].toUpperCase();
                    var explanation = explanations[keyword] || 'Processing instruction...';
                    var logEntry = document.createElement('div');
                    logEntry.style.cssText = 'margin-top:6px; padding:4px 0; border-bottom:1px solid rgba(255,255,255,0.05);';
                    logEntry.innerHTML = '<span style="color:#8b5cf6;">Step ' + (i+1) + '/' + lines.length + ':</span> ' + line.trim() +
                        '<br><span style="color:#10b981;">→ ' + explanation + '</span>';
                    logBox.appendChild(logEntry);
                    logBox.scrollTop = logBox.scrollHeight;
                }, (i + 1) * 600);
            });

            // Final success message
            setTimeout(function() {
                var done = document.createElement('div');
                done.style.cssText = 'margin-top:8px; padding:6px; background:rgba(16,185,129,0.1); border-radius:4px; color:#10b981; font-weight:700;';
                done.innerHTML = '✓ Successfully built image: my-app:latest<br>✓ Total layers: ' + lines.length;
                logBox.appendChild(done);
                logBox.scrollTop = logBox.scrollHeight;
            }, (lines.length + 1) * 600);
        }
    },

    dashboard: {
        title: "Container Dashboard",
        desc: "Simulated live view of running containers with status indicators.",
        deepDive: "In production, you monitor containers using 'docker ps' or tools like Portainer, Prometheus, and Grafana. Key metrics include CPU usage, memory consumption, network I/O, and restart count. An 'unhealthy' container is still running but failing its health checks.",
        render: function(canvas) {
            canvas.innerHTML = '<div style="display:grid; grid-template-columns:1.5fr 1fr; gap:1rem; width:95%; height:100%; padding:1rem; overflow:hidden;">' +
                '<div style="display:flex; flex-direction:column; gap:0.5rem; overflow:hidden;">' +
                    '<div style="display:flex; justify-content:space-between; align-items:center;">' +
                        '<p style="font-size:0.7rem; color:var(--accent); font-weight:700;">LIVE CONTAINERS</p>' +
                        '<button class="btn-primary" style="font-size:0.65rem; padding:0.3rem 0.6rem;" onclick="window.advSim(\'refresh_dash\')">Refresh</button>' +
                    '</div>' +
                    '<div id="dash-table" style="flex:1; min-height:0; display:flex; flex-direction:column; gap:4px; overflow-y:auto; font-family:monospace; font-size:0.65rem;"></div>' +
                '</div>' +
                '<div style="display:flex; flex-direction:column; gap:0.5rem; overflow:hidden;">' +
                    '<p style="font-size:0.7rem; color:var(--success); font-weight:700;">SYSTEM LOG</p>' +
                    '<div id="dash-log" style="flex:1; min-height:0; background:#000; border-radius:0.5rem; padding:0.75rem; font-family:monospace; font-size:0.6rem; overflow-y:auto; color:var(--text-muted);"></div>' +
                '</div>' +
            '</div>';
            window.advSim('refresh_dash');
        },
        simulate: function(canvas) {
            var table = canvas.querySelector('#dash-table');
            var logBox = canvas.querySelector('#dash-log');
            var roles = {
                'web-frontend': 'Serves the React UI to browser clients on port 80.',
                'api-server': 'Handles REST API requests, connects to DB and cache.',
                'mongo-db': 'Primary data store. Persists user data via volumes.',
                'redis-cache': 'In-memory cache for session tokens and hot data.',
                'nginx-proxy': 'Reverse proxy and load balancer. Routes traffic to API.'
            };
            var containers = [
                { name: 'web-frontend', image: 'react:18', status: 'Up 2 hours', cpu: '2.1%', mem: '128MB', health: 'healthy' },
                { name: 'api-server', image: 'node:18', status: 'Up 2 hours', cpu: '5.4%', mem: '256MB', health: 'healthy' },
                { name: 'mongo-db', image: 'mongo:7', status: 'Up 2 hours', cpu: '3.2%', mem: '512MB', health: 'healthy' },
                { name: 'redis-cache', image: 'redis:alpine', status: 'Up 45 min', cpu: '0.8%', mem: '64MB', health: 'healthy' },
                { name: 'nginx-proxy', image: 'nginx:latest', status: 'Up 2 hours', cpu: '0.3%', mem: '32MB', health: 'healthy' }
            ];
            var badIdx = Math.floor(Math.random() * containers.length);
            containers[badIdx].health = 'unhealthy';
            containers[badIdx].cpu = '98.2%';
            table.innerHTML = '<div style="display:grid; grid-template-columns:2fr 2fr 1.5fr 1fr 1fr 1fr; gap:4px; padding:4px; background:rgba(255,255,255,0.05); border-radius:4px; font-weight:700;">' +
                '<span>NAME</span><span>IMAGE</span><span>STATUS</span><span>CPU</span><span>MEM</span><span>HEALTH</span></div>';
            logBox.innerHTML = '<div style="color:#8b5cf6;">> docker ps --format table</div>';
            containers.forEach(function(c, i) {
                setTimeout(function() {
                    var row = document.createElement('div');
                    row.className = 'animate-pop';
                    row.style.cssText = 'display:grid; grid-template-columns:2fr 2fr 1.5fr 1fr 1fr 1fr; gap:4px; padding:4px; border-bottom:1px solid var(--border);';
                    var hColor = c.health === 'healthy' ? 'var(--success)' : 'var(--error)';
                    row.innerHTML = '<span>' + c.name + '</span><span style="color:var(--text-muted)">' + c.image + '</span><span style="color:var(--success)">' + c.status + '</span><span>' + c.cpu + '</span><span>' + c.mem + '</span><span style="color:' + hColor + '">● ' + c.health + '</span>';
                    table.appendChild(row);
                    var entry = document.createElement('div');
                    entry.style.cssText = 'margin-top:6px; padding:4px 0; border-bottom:1px solid rgba(255,255,255,0.05);';
                    var statusColor = c.health === 'healthy' ? '#10b981' : '#ef4444';
                    var statusMsg = c.health === 'healthy' ? '→ ' + roles[c.name] : '⚠ ALERT: CPU at ' + c.cpu + '! Container failing health checks. Consider restarting.';
                    entry.innerHTML = '<span style="color:#8b5cf6;">' + c.name + '</span><br><span style="color:' + statusColor + ';">' + statusMsg + '</span>';
                    logBox.appendChild(entry);
                    logBox.scrollTop = logBox.scrollHeight;
                }, i * 300);
            });
        }
    },

    architect: {
        title: "Network Topology Visualizer",
        desc: "See how containers connect across different Docker network types.",
        deepDive: "Docker networks provide isolation and DNS-based service discovery. Bridge networks are for single-host communication. Overlay networks span multiple Docker hosts (Swarm). Custom networks let you control which containers can talk to each other.",
        render: function(canvas) {
            canvas.innerHTML = '<div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; width:95%; height:100%; padding:1rem; overflow:hidden;">' +
                '<div style="display:flex; flex-direction:column; gap:0.5rem; overflow:hidden;">' +
                    '<div style="display:flex; gap:0.5rem;">' +
                        '<button class="btn-primary" style="font-size:0.65rem; padding:0.3rem 0.6rem;" onclick="window.advSim(\'net_bridge\')">Bridge</button>' +
                        '<button class="btn-primary" style="font-size:0.65rem; padding:0.3rem 0.6rem; background:var(--success);" onclick="window.advSim(\'net_host\')">Host</button>' +
                        '<button class="btn-primary" style="font-size:0.65rem; padding:0.3rem 0.6rem; background:var(--warning);" onclick="window.advSim(\'net_overlay\')">Overlay</button>' +
                    '</div>' +
                    '<div id="net-canvas" style="flex:1; min-height:0; border:1px dashed var(--border); border-radius:0.5rem; display:flex; align-items:center; justify-content:center;"></div>' +
                '</div>' +
                '<div style="display:flex; flex-direction:column; gap:0.5rem; overflow:hidden;">' +
                    '<p style="font-size:0.7rem; color:var(--success); font-weight:700;">NETWORK DETAILS</p>' +
                    '<div id="net-log" style="flex:1; min-height:0; background:#000; border-radius:0.5rem; padding:0.75rem; font-family:monospace; font-size:0.6rem; overflow-y:auto; color:var(--text-muted);"></div>' +
                '</div>' +
            '</div>';
            window.advSim('net_bridge');
        },
        simulate: function(canvas, type) {
            var nc = canvas.querySelector('#net-canvas');
            var log = canvas.querySelector('#net-log');
            if (type === 'net_bridge') {
                nc.innerHTML = '<div style="display:flex; flex-direction:column; align-items:center; gap:1rem;">' +
                    '<div style="display:flex; gap:2rem;">' +
                        '<div class="node animate-pop" style="width:60px; height:60px;"><p style="font-size:0.55rem;">App A</p></div>' +
                        '<div class="node animate-pop" style="width:60px; height:60px;"><p style="font-size:0.55rem;">App B</p></div>' +
                    '</div>' +
                    '<div style="width:180px; height:3px; background:var(--accent);"></div>' +
                    '<p style="font-size:0.55rem; color:var(--accent);">docker0 (172.17.0.0/16)</p>' +
                    '<div style="width:180px; height:3px; background:var(--text-muted);"></div>' +
                    '<p style="font-size:0.55rem;">Host Network</p>' +
                '</div>';
                log.innerHTML = '<div style="color:#8b5cf6;">> docker network inspect bridge</div>' +
                    '<div style="margin-top:6px;"><span style="color:#8b5cf6;">Type:</span> Bridge (default)</div>' +
                    '<div style="margin-top:4px;"><span style="color:#10b981;">→ Created automatically when Docker starts.</span></div>' +
                    '<div style="margin-top:4px;"><span style="color:#10b981;">→ Containers get IPs in 172.17.0.x range.</span></div>' +
                    '<div style="margin-top:4px;"><span style="color:#10b981;">→ Containers on same bridge can talk via IP.</span></div>' +
                    '<div style="margin-top:4px;"><span style="color:#10b981;">→ Cannot resolve names (use custom network for DNS).</span></div>' +
                    '<div style="margin-top:4px;"><span style="color:#f59e0b;">⚠ Not recommended for production — use custom bridge.</span></div>';
            } else if (type === 'net_host') {
                nc.innerHTML = '<div style="display:flex; flex-direction:column; align-items:center; gap:1rem;">' +
                    '<div class="node animate-pop" style="width:60px; height:60px; border-color:var(--success);"><p style="font-size:0.55rem;">App</p></div>' +
                    '<div style="width:180px; height:3px; background:var(--success);"></div>' +
                    '<p style="font-size:0.55rem;">Host (192.168.x.x)</p>' +
                '</div>';
                log.innerHTML = '<div style="color:#8b5cf6;">> docker run --network host myapp</div>' +
                    '<div style="margin-top:6px;"><span style="color:#8b5cf6;">Type:</span> Host</div>' +
                    '<div style="margin-top:4px;"><span style="color:#10b981;">→ No network isolation — container uses host IP directly.</span></div>' +
                    '<div style="margin-top:4px;"><span style="color:#10b981;">→ Best performance (no NAT overhead).</span></div>' +
                    '<div style="margin-top:4px;"><span style="color:#10b981;">→ Port conflicts possible with host services.</span></div>' +
                    '<div style="margin-top:4px;"><span style="color:#ef4444;">⚠ Security risk — container has full network access.</span></div>';
            } else if (type === 'net_overlay') {
                nc.innerHTML = '<div style="display:flex; gap:2rem; align-items:center;">' +
                    '<div style="border:1px dashed var(--warning); padding:0.5rem; border-radius:0.5rem; text-align:center;">' +
                        '<p style="font-size:0.5rem; color:var(--warning);">Host 1</p>' +
                        '<div class="node animate-pop" style="width:45px; height:45px; margin-top:0.3rem;"></div>' +
                    '</div>' +
                    '<div style="width:40px; height:2px; background:var(--warning);"></div>' +
                    '<div style="border:1px dashed var(--warning); padding:0.5rem; border-radius:0.5rem; text-align:center;">' +
                        '<p style="font-size:0.5rem; color:var(--warning);">Host 2</p>' +
                        '<div class="node animate-pop" style="width:45px; height:45px; margin-top:0.3rem;"></div>' +
                    '</div>' +
                '</div>';
                log.innerHTML = '<div style="color:#8b5cf6;">> docker network create -d overlay my-swarm</div>' +
                    '<div style="margin-top:6px;"><span style="color:#8b5cf6;">Type:</span> Overlay</div>' +
                    '<div style="margin-top:4px;"><span style="color:#10b981;">→ Connects containers across multiple Docker hosts.</span></div>' +
                    '<div style="margin-top:4px;"><span style="color:#10b981;">→ Uses VXLAN tunneling for encrypted communication.</span></div>' +
                    '<div style="margin-top:4px;"><span style="color:#10b981;">→ Required for Docker Swarm services.</span></div>' +
                    '<div style="margin-top:4px;"><span style="color:#10b981;">→ Built-in DNS for service discovery across hosts.</span></div>';
            }
        }
    },

    security: {
        title: "Security Audit Scanner",
        desc: "Paste a Dockerfile and find security risks instantly.",
        deepDive: "Security is critical in containerized environments. Common mistakes include running as root, using latest tag, exposing unnecessary ports, and including secrets. A secure Dockerfile follows the principle of least privilege.",
        render: function(canvas) {
            canvas.innerHTML = '<div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:1rem; width:95%; height:100%; padding:1rem; overflow:hidden;">' +
                '<div style="display:flex; flex-direction:column; gap:0.5rem; overflow:hidden;">' +
                    '<p style="font-size:0.7rem; color:var(--accent); font-weight:700;">DOCKERFILE</p>' +
                    '<textarea id="sec-input" spellcheck="false" style="flex:1; min-height:0; background:#000; color:#fff; border:1px solid var(--border); border-radius:0.5rem; padding:0.75rem; font-family:monospace; font-size:0.7rem; resize:none; outline:none;">FROM node:latest\nCOPY . .\nRUN npm install\nENV DB_PASSWORD=admin123\nEXPOSE 22\nCMD ["node", "app.js"]</textarea>' +
                    '<button class="btn-primary" onclick="window.advSim(\'scan\')">Scan</button>' +
                '</div>' +
                '<div style="display:flex; flex-direction:column; gap:0.5rem; overflow:hidden;">' +
                    '<p style="font-size:0.7rem; color:var(--error); font-weight:700;">VULNERABILITIES</p>' +
                    '<div id="sec-results" style="flex:1; min-height:0; overflow-y:auto; display:flex; flex-direction:column; gap:4px;"></div>' +
                '</div>' +
                '<div style="display:flex; flex-direction:column; gap:0.5rem; overflow:hidden;">' +
                    '<p style="font-size:0.7rem; color:var(--success); font-weight:700;">HOW TO FIX</p>' +
                    '<div id="sec-fixes" style="flex:1; min-height:0; background:#000; border-radius:0.5rem; padding:0.75rem; font-family:monospace; font-size:0.6rem; overflow-y:auto; color:var(--text-muted);"></div>' +
                '</div>' +
            '</div>';
        },
        simulate: function(canvas) {
            var input = canvas.querySelector('#sec-input').value;
            var results = canvas.querySelector('#sec-results');
            var fixes = canvas.querySelector('#sec-fixes');
            results.innerHTML = '';
            fixes.innerHTML = '<div style="color:#8b5cf6;">> Running security audit...</div>';
            var checks = [
                { test: 'latest', severity: 'CRITICAL', msg: 'Using :latest tag', fix: 'Change FROM node:latest to FROM node:18-alpine — always pin exact versions.', invert: false },
                { test: 'PASSWORD', severity: 'CRITICAL', msg: 'Secret in ENV', fix: 'Remove ENV DB_PASSWORD. Use docker run --env-file .env or Docker secrets.', invert: false },
                { test: 'EXPOSE 22', severity: 'HIGH', msg: 'SSH port exposed', fix: 'Remove EXPOSE 22. SSH into containers is an anti-pattern. Use docker exec.', invert: false },
                { test: 'USER', severity: 'MEDIUM', msg: 'Running as root', fix: 'Add USER node after RUN npm install to drop root privileges.', invert: true },
                { test: '.dockerignore', severity: 'LOW', msg: 'No .dockerignore', fix: 'Create .dockerignore with: node_modules, .git, .env, *.log', invert: true }
            ];
            var count = 0;
            checks.forEach(function(check, i) {
                var found = check.invert ? !input.includes(check.test) : input.includes(check.test);
                if (found) {
                    count++;
                    setTimeout(function() {
                        var div = document.createElement('div');
                        div.className = 'animate-pop';
                        var color = check.severity === 'CRITICAL' ? '#ef4444' : (check.severity === 'HIGH' ? '#f59e0b' : '#94a3b8');
                        div.style.cssText = 'padding:6px; border-radius:4px; font-size:0.6rem; border-left:3px solid ' + color + '; background:rgba(0,0,0,0.3);';
                        div.innerHTML = '<span style="color:' + color + '; font-weight:800;">[' + check.severity + ']</span> ' + check.msg;
                        results.appendChild(div);
                        var entry = document.createElement('div');
                        entry.style.cssText = 'margin-top:6px; padding:4px 0; border-bottom:1px solid rgba(255,255,255,0.05);';
                        entry.innerHTML = '<span style="color:' + color + ';">[' + check.severity + ']</span><br><span style="color:#10b981;">Fix: ' + check.fix + '</span>';
                        fixes.appendChild(entry);
                        fixes.scrollTop = fixes.scrollHeight;
                    }, i * 400);
                }
            });
        }
    },

    k8s: {
        title: "Docker to Kubernetes Bridge",
        desc: "See how Docker containers evolve into Kubernetes Pods and Deployments.",
        deepDive: "Kubernetes (K8s) takes Docker containers to the next level. A Pod wraps one or more containers. A Deployment manages multiple Pods with scaling and rollback. A Service exposes Pods to the network.",
        render: function(canvas) {
            canvas.innerHTML = '<div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; width:95%; height:100%; padding:1rem; overflow:hidden;">' +
                '<div style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1rem;">' +
                    '<div id="k8s-viz" style="display:flex; flex-direction:column; gap:0.5rem; align-items:center;">' +
                        '<div class="node"><i data-lucide="box"></i><p>Container</p></div>' +
                    '</div>' +
                    '<button class="btn-primary" onclick="window.advSim(\'evolve\')">Evolve to K8s</button>' +
                '</div>' +
                '<div style="display:flex; flex-direction:column; gap:0.5rem; overflow:hidden;">' +
                    '<p style="font-size:0.7rem; color:var(--success); font-weight:700;">EVOLUTION LOG</p>' +
                    '<div id="k8s-log" style="flex:1; min-height:0; background:#000; border-radius:0.5rem; padding:0.75rem; font-family:monospace; font-size:0.6rem; overflow-y:auto; color:var(--text-muted);"></div>' +
                '</div>' +
            '</div>';
            lucide.createIcons();
        },
        simulate: function(canvas) {
            var viz = canvas.querySelector('#k8s-viz');
            var log = canvas.querySelector('#k8s-log');
            log.innerHTML = '<div style="color:#8b5cf6;">> kubectl apply -f deployment.yaml</div>';
            setTimeout(function() {
                viz.innerHTML = '<div style="border:2px dashed var(--accent); padding:0.75rem; border-radius:0.75rem; text-align:center;">' +
                    '<p style="font-size:0.55rem; color:var(--accent);">POD</p>' +
                    '<div class="node animate-pop" style="width:50px; height:50px;"><i data-lucide="box"></i></div>' +
                '</div>';
                lucide.createIcons();
                log.innerHTML += '<div style="margin-top:6px;"><span style="color:#8b5cf6;">Step 1:</span> Container wrapped in a Pod</div>' +
                    '<div><span style="color:#10b981;">→ A Pod is the smallest deployable unit in K8s. It wraps your container with networking and storage.</span></div>';
            }, 800);
            setTimeout(function() {
                viz.innerHTML = '<div style="border:2px solid var(--success); padding:0.75rem; border-radius:0.75rem; text-align:center;">' +
                    '<p style="font-size:0.55rem; color:var(--success);">DEPLOYMENT (replicas: 3)</p>' +
                    '<div style="display:flex; gap:0.4rem;">' +
                        '<div style="border:1px dashed var(--accent); padding:0.3rem; border-radius:6px;"><div class="node animate-pop" style="width:35px; height:35px;"></div></div>' +
                        '<div style="border:1px dashed var(--accent); padding:0.3rem; border-radius:6px;"><div class="node animate-pop" style="width:35px; height:35px;"></div></div>' +
                        '<div style="border:1px dashed var(--accent); padding:0.3rem; border-radius:6px;"><div class="node animate-pop" style="width:35px; height:35px;"></div></div>' +
                    '</div>' +
                '</div>';
                log.innerHTML += '<div style="margin-top:6px;"><span style="color:#8b5cf6;">Step 2:</span> Pod scaled to 3 replicas via Deployment</div>' +
                    '<div><span style="color:#10b981;">→ A Deployment ensures the desired number of Pods are always running. If one crashes, K8s auto-creates a new one.</span></div>';
                log.scrollTop = log.scrollHeight;
            }, 2500);
            setTimeout(function() {
                viz.innerHTML += '<div class="animate-pop" style="border:2px solid var(--warning); padding:0.5rem; border-radius:0.75rem; text-align:center; margin-top:0.5rem;">' +
                    '<p style="font-size:0.55rem; color:var(--warning);">SERVICE (LoadBalancer)</p>' +
                    '<p style="font-size:0.45rem; color:var(--text-muted);">:80 → Pod:3000</p>' +
                '</div>';
                log.innerHTML += '<div style="margin-top:6px;"><span style="color:#8b5cf6;">Step 3:</span> Service exposes Pods externally</div>' +
                    '<div><span style="color:#10b981;">→ A Service provides a stable IP and DNS name. LoadBalancer distributes traffic across all 3 Pods.</span></div>' +
                    '<div style="margin-top:6px; color:#10b981; font-weight:700;">✓ Full K8s stack deployed!</div>';
                log.scrollTop = log.scrollHeight;
            }, 4200);
        }
    },

    quiz: {
        title: "Docker Challenge Quiz",
        desc: "Test your knowledge with interactive multiple-choice questions.",
        deepDive: "This quiz covers the most frequently asked Docker interview questions and viva topics from the CS44 syllabus.",
        render: function(canvas) {
            window._quizData = [
                { q: "What is the default network driver in Docker?", opts: ["host", "bridge", "overlay", "none"], ans: 1, why: "Bridge is the default. It creates an internal network (docker0) and assigns IPs to containers automatically." },
                { q: "Which file defines multi-container apps?", opts: ["Dockerfile", "package.json", "docker-compose.yml", ".dockerignore"], ans: 2, why: "docker-compose.yml defines services, networks, and volumes for multi-container orchestration." },
                { q: "What happens to container data when deleted?", opts: ["It persists", "It is lost", "It moves to host", "It compresses"], ans: 1, why: "Containers use a writable layer that is deleted with the container. Use volumes for persistence." },
                { q: "Which command builds an image?", opts: ["docker run", "docker pull", "docker build", "docker push"], ans: 2, why: "docker build reads the Dockerfile and creates an image layer by layer. -t flags it with a name." },
                { q: "What does restart: always do?", opts: ["Deletes container", "Auto-restarts on crash", "Pauses container", "Rebuilds image"], ans: 1, why: "restart: always tells Docker daemon to restart the container whenever it stops, even after a reboot." }
            ];
            window._quizIdx = 0;
            window._quizScore = 0;
            canvas.innerHTML = '<div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; width:95%; height:100%; padding:1rem; overflow:hidden;">' +
                '<div id="quiz-area" style="display:flex; align-items:center; justify-content:center;"></div>' +
                '<div style="display:flex; flex-direction:column; gap:0.5rem; overflow:hidden;">' +
                    '<p style="font-size:0.7rem; color:var(--success); font-weight:700;">ANSWER LOG</p>' +
                    '<div id="quiz-log" style="flex:1; min-height:0; background:#000; border-radius:0.5rem; padding:0.75rem; font-family:monospace; font-size:0.6rem; overflow-y:auto; color:var(--text-muted);"></div>' +
                '</div>' +
            '</div>';
            window.advSim('show_question');
        },
        simulate: function(canvas, type) {
            var data = window._quizData;
            var area = canvas.querySelector('#quiz-area');
            var log = canvas.querySelector('#quiz-log');
            if (type === 'show_question') {
                if (window._quizIdx >= data.length) {
                    var grade = window._quizScore >= 4 ? 'Docker Captain!' : (window._quizScore >= 3 ? 'Good Job!' : 'Keep Learning!');
                    area.innerHTML = '<div style="text-align:center;">' +
                        '<h2 style="color:var(--accent); font-size:2.5rem;">' + window._quizScore + '/' + data.length + '</h2>' +
                        '<p style="margin:0.5rem 0;">' + grade + '</p>' +
                        '<button class="btn-primary" onclick="window._quizIdx=0; window._quizScore=0; document.getElementById(\'quiz-log\').innerHTML=\'\'; window.advSim(\'show_question\');">Retry</button>' +
                    '</div>';
                    return;
                }
                var item = data[window._quizIdx];
                var btnsHtml = '';
                item.opts.forEach(function(o, i) {
                    btnsHtml += '<button class="btn-primary" style="background:var(--sidebar-bg); border:1px solid var(--border); font-size:0.75rem;" onclick="window.advSim(\'answer_' + i + '\')">' + o + '</button>';
                });
                area.innerHTML = '<div style="width:90%; text-align:center;">' +
                    '<p style="font-size:0.65rem; color:var(--text-muted); margin-bottom:0.5rem;">Q' + (window._quizIdx + 1) + '/' + data.length + '</p>' +
                    '<h3 style="margin-bottom:1.5rem; font-size:1rem;">' + item.q + '</h3>' +
                    '<div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">' + btnsHtml + '</div>' +
                '</div>';
            } else if (type.startsWith('answer_')) {
                var chosen = parseInt(type.split('_')[1]);
                var correct = data[window._quizIdx].ans;
                var isRight = chosen === correct;
                if (isRight) window._quizScore++;
                var btns = area.querySelectorAll('.btn-primary');
                btns[correct].style.background = 'var(--success)';
                if (!isRight) btns[chosen].style.background = 'var(--error)';
                btns.forEach(function(b) { b.disabled = true; });
                var entry = document.createElement('div');
                entry.style.cssText = 'margin-top:6px; padding:4px 0; border-bottom:1px solid rgba(255,255,255,0.05);';
                var icon = isRight ? '<span style="color:#10b981;">✓ Correct!</span>' : '<span style="color:#ef4444;">✗ Wrong</span>';
                entry.innerHTML = '<span style="color:#8b5cf6;">Q' + (window._quizIdx + 1) + ':</span> ' + icon + '<br><span style="color:#10b981;">→ ' + data[window._quizIdx].why + '</span>';
                log.appendChild(entry);
                log.scrollTop = log.scrollHeight;
                setTimeout(function() {
                    window._quizIdx++;
                    window.advSim('show_question');
                }, 1500);
            }
        }
    },

    logs: {
        title: "Real-time Log Streamer",
        desc: "Watch simulated container logs streaming live with color-coded severity.",
        deepDive: "Docker captures stdout/stderr from your container. Use 'docker logs -f container' to follow in real-time. In production, use ELK Stack or Grafana Loki for centralized logging.",
        render: function(canvas) {
            canvas.innerHTML = '<div style="display:grid; grid-template-columns:1.5fr 1fr; gap:1rem; width:95%; height:100%; padding:1rem; overflow:hidden;">' +
                '<div style="display:flex; flex-direction:column; gap:0.5rem; overflow:hidden;">' +
                    '<div style="display:flex; justify-content:space-between; align-items:center;">' +
                        '<p style="font-size:0.7rem; color:var(--accent); font-weight:700;">CONTAINER: api-server</p>' +
                        '<div style="display:flex; gap:0.5rem;">' +
                            '<button class="btn-primary" style="font-size:0.6rem; padding:0.25rem 0.5rem;" onclick="window.advSim(\'start_logs\')">Stream</button>' +
                            '<button class="btn-primary" style="font-size:0.6rem; padding:0.25rem 0.5rem; background:var(--error);" onclick="window.advSim(\'stop_logs\')">Stop</button>' +
                        '</div>' +
                    '</div>' +
                    '<div id="log-stream" style="flex:1; min-height:0; background:#000; border-radius:0.5rem; padding:0.75rem; font-family:monospace; font-size:0.55rem; overflow-y:auto;"></div>' +
                '</div>' +
                '<div style="display:flex; flex-direction:column; gap:0.5rem; overflow:hidden;">' +
                    '<p style="font-size:0.7rem; color:var(--success); font-weight:700;">LOG ANALYSIS</p>' +
                    '<div id="log-stats" style="flex:1; min-height:0; background:#000; border-radius:0.5rem; padding:0.75rem; font-family:monospace; font-size:0.6rem; overflow-y:auto; color:var(--text-muted);"></div>' +
                '</div>' +
            '</div>';
            window._logCounts = { INFO: 0, DEBUG: 0, WARN: 0, ERROR: 0 };
        },
        simulate: function(canvas, type) {
            if (type === 'start_logs') {
                var stream = canvas.querySelector('#log-stream');
                var stats = canvas.querySelector('#log-stats');
                var logLines = [
                    { level: 'INFO', msg: 'Server listening on port 3000', color: '#10b981' },
                    { level: 'INFO', msg: 'Connected to MongoDB at db:27017', color: '#10b981' },
                    { level: 'DEBUG', msg: 'GET /api/users 200 OK (12ms)', color: '#94a3b8' },
                    { level: 'DEBUG', msg: 'GET /api/health 200 OK (2ms)', color: '#94a3b8' },
                    { level: 'WARN', msg: 'High memory usage detected: 87%', color: '#f59e0b' },
                    { level: 'INFO', msg: 'POST /api/login 200 OK (45ms)', color: '#10b981' },
                    { level: 'ERROR', msg: 'Connection timeout to redis:6379', color: '#ef4444' },
                    { level: 'INFO', msg: 'Retrying redis connection (attempt 2)', color: '#10b981' },
                    { level: 'INFO', msg: 'Redis reconnected successfully', color: '#10b981' },
                    { level: 'DEBUG', msg: 'GET /api/products 200 OK (8ms)', color: '#94a3b8' }
                ];
                var i = 0;
                var counts = window._logCounts;
                window._logInterval = setInterval(function() {
                    var log = logLines[i % logLines.length];
                    var ts = new Date().toISOString().substr(11, 8);
                    var div = document.createElement('div');
                    div.innerHTML = '<span style="color:var(--text-muted)">' + ts + '</span> <span style="color:' + log.color + '">[' + log.level + ']</span> ' + log.msg;
                    stream.appendChild(div);
                    stream.scrollTop = stream.scrollHeight;
                    counts[log.level]++;
                    var total = counts.INFO + counts.DEBUG + counts.WARN + counts.ERROR;
                    stats.innerHTML = '<div style="color:#8b5cf6; margin-bottom:6px;">> Log Statistics (live)</div>' +
                        '<div style="margin-top:4px;"><span style="color:#10b981;">INFO:  </span>' + counts.INFO + ' (' + Math.round(counts.INFO/total*100) + '%)</div>' +
                        '<div style="margin-top:4px;"><span style="color:#94a3b8;">DEBUG: </span>' + counts.DEBUG + ' (' + Math.round(counts.DEBUG/total*100) + '%)</div>' +
                        '<div style="margin-top:4px;"><span style="color:#f59e0b;">WARN:  </span>' + counts.WARN + ' (' + Math.round(counts.WARN/total*100) + '%)</div>' +
                        '<div style="margin-top:4px;"><span style="color:#ef4444;">ERROR: </span>' + counts.ERROR + ' (' + Math.round(counts.ERROR/total*100) + '%)</div>' +
                        '<div style="margin-top:8px; border-top:1px solid rgba(255,255,255,0.05); padding-top:6px;">' +
                            '<div style="color:#8b5cf6;">Total: ' + total + ' entries</div>' +
                            (counts.ERROR > 0 ? '<div style="color:#ef4444; margin-top:4px;">⚠ ' + counts.ERROR + ' error(s) detected — check redis connection</div>' : '') +
                            (counts.WARN > 0 ? '<div style="color:#f59e0b; margin-top:4px;">⚠ ' + counts.WARN + ' warning(s) — monitor memory usage</div>' : '') +
                        '</div>';
                    i++;
                }, 800);
            } else if (type === 'stop_logs') {
                clearInterval(window._logInterval);
            }
        }
    }
};

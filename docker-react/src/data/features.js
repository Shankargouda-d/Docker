/**
 * Docker Features Lab - 10 Core High-Fidelity Simulations
 */

export const featureData = {
    compose: {
        title: "Multi-Container Application (Docker Compose)",
        desc: "Orchestrate complex stacks with a single command.",
        use: "Build a full-stack app",
        example: "React + Node + MongoDB in one command",
        deepDive: "Docker Compose allows you to define and run multi-container applications. Using a YAML file, you can configure your application's services, networks, and volumes. When you run 'docker-compose up', Docker starts all containers in the correct order (e.g., Database starts before Backend) and connects them automatically.",
        render: (canvas) => {
            canvas.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; gap:2rem;">
                    <div id="compose-viz" style="display:flex; gap:1.5rem; align-items:center;">
                        <div class="node-ghost">Frontend</div>
                        <div class="node-ghost">Backend</div>
                        <div class="node-ghost">Database</div>
                    </div>
                    <div id="compose-status" style="font-size:0.8rem; color:var(--text-muted);">Ready to deploy stack...</div>
                    <button class="btn-primary" onclick="window.runSimulation('compose')">Deploy Multi-Container App</button>
                </div>
            `;
            lucide.createIcons();
        },
        simulate: (canvas) => {
            const status = canvas.querySelector('#compose-status');
            const nodes = canvas.querySelectorAll('.node-ghost');
            status.innerText = "⏳ Reading docker-compose.yml...";
            status.style.color = "var(--warning)";
            
            setTimeout(() => {
                status.innerText = "⚙️ Creating network 'app_default'...";
                nodes[0].className = "node animate-pop";
                nodes[0].innerHTML = '<i data-lucide="monitor"></i><p>UI</p>';
                lucide.createIcons();
            }, 1000);

            setTimeout(() => {
                status.innerText = "⚙️ Starting services...";
                nodes[1].className = "node animate-pop";
                nodes[1].innerHTML = '<i data-lucide="server"></i><p>API</p>';
                nodes[2].className = "node animate-pop";
                nodes[2].innerHTML = '<i data-lucide="database"></i><p>DB</p>';
                lucide.createIcons();
            }, 2000);

            setTimeout(() => {
                status.innerText = "🚀 Stack is running at localhost:3000";
                status.style.color = "var(--success)";
            }, 3000);
        }
    },
    env: {
        title: "Environment Configuration",
        desc: "Inject secrets and configurations into containers at runtime.",
        use: "Store API keys, DB URLs securely",
        example: ".env file for different environments (dev/prod)",
        deepDive: "Environment variables allow you to keep your code 'clean' and separate from your configuration. Instead of hardcoding a database password, you pass it as an environment variable. This means the same container image can run in 'Development' with one password and 'Production' with another, without changing a single line of code.",
        render: (canvas) => {
            canvas.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; gap:1.5rem;">
                    <div style="display:flex; gap:2rem;">
                        <div id="env-file" style="padding:1rem; border:1px dashed var(--border); border-radius:8px; font-family:monospace; font-size:0.7rem;">
                            # .env file<br>API_KEY=12345
                        </div>
                        <i data-lucide="arrow-right" style="margin-top:1.5rem;"></i>
                        <div id="env-container" class="node"><i data-lucide="box"></i><p>Container</p></div>
                    </div>
                    <button class="btn-primary" onclick="window.runSimulation('env')">Inject Production Secrets</button>
                </div>
            `;
            lucide.createIcons();
        },
        simulate: (canvas) => {
            const file = canvas.querySelector('#env-file');
            const cont = canvas.querySelector('#env-container');
            file.innerHTML = "# .env file<br>API_KEY=PROD_SECRET_XYZ";
            file.style.borderColor = "var(--success)";
            cont.style.boxShadow = "0 0 20px var(--success)";
            setTimeout(() => { cont.style.boxShadow = "none"; }, 1000);
        }
    },
    volumes: {
        title: "Volume Management (Persistent Storage)",
        desc: "Save your data outside the container lifecycle.",
        use: "Save database data even if container stops",
        example: "MongoDB data stays safe after restart",
        deepDive: "By default, files inside a container are 'ephemeral'—they disappear when the container is deleted. Docker Volumes map a folder on your Host Machine (your PC) to a folder inside the container. This way, even if the container crashes or is upgraded, the data remains safe on your hard drive.",
        render: (canvas) => {
            canvas.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; gap:2rem;">
                    <div style="display:flex; gap:3rem; align-items:center; position:relative;">
                        <div class="node" id="vol-container"><i data-lucide="database"></i><p>DB</p></div>
                        <div id="vol-data" class="hidden"></div>
                        <div class="node" style="border-color:var(--success); border-style:dashed;" id="vol-host"><i data-lucide="hard-drive"></i><p>Host Drive</p></div>
                    </div>
                    <div id="vol-log" style="font-size:0.85rem; color:var(--text-muted); background:rgba(0,0,0,0.3); padding:0.5rem 1rem; border-radius:4px;">Waiting to save data...</div>
                    <button class="btn-primary" onclick="window.runSimulation('volume')">Save to Volume</button>
                </div>
            `;
            lucide.createIcons();
        },
        simulate: (canvas) => {
            const packet = canvas.querySelector('#vol-data');
            const log = canvas.querySelector('#vol-log');
            const cont = canvas.querySelector('#vol-container');
            const host = canvas.querySelector('#vol-host');
            
            cont.style.boxShadow = "0 0 15px var(--accent)";
            log.innerText = "Container writes data internally...";
            log.style.color = "var(--text)";
            
            setTimeout(() => {
                packet.className = 'packet-travel';
                cont.style.boxShadow = "none";
            }, 500);

            setTimeout(() => { 
                packet.className = 'hidden'; 
                host.style.boxShadow = "0 0 15px var(--success)";
                log.innerText = "Data safely persisted on Host Drive!";
                log.style.color = "var(--success)";
            }, 1700);
            
            setTimeout(() => {
                host.style.boxShadow = "none";
                log.style.color = "var(--text-muted)";
                log.innerText = "Ready for next write.";
            }, 3500);
        }
    },
    dockerfile: {
        title: "Custom Docker Images (Dockerfile)",
        desc: "Build your own specialized environment.",
        use: "Package your app with dependencies",
        example: "Node app with all npm packages included",
        deepDive: "A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image. It starts with a base image (FROM), adds your code (COPY), installs dependencies (RUN), and defines what command to run (CMD). This ensures everyone on your team has the exact same environment.",
        render: (canvas) => {
            canvas.innerHTML = `
                <div style="display:flex; gap:2rem; align-items:center;">
                    <div style="width:200px; padding:1rem; background:#000; border-radius:8px; font-family:monospace; font-size:0.65rem;">
                        <span style="color:#f59e0b">FROM</span> node:18<br>
                        <span style="color:#f59e0b">COPY</span> . .<br>
                        <span style="color:#f59e0b">RUN</span> npm install<br>
                        <span style="color:#f59e0b">CMD</span> ["node", "app.js"]
                    </div>
                    <div id="build-stack" style="display:flex; flex-direction:column-reverse; gap:4px; width:100px;">
                        <div class="layer-ghost">Layer 3</div>
                        <div class="layer-ghost">Layer 2</div>
                        <div class="layer-ghost">Layer 1</div>
                    </div>
                    <button class="btn-primary" onclick="window.runSimulation('build')">Build</button>
                </div>
            `;
        },
        simulate: (canvas) => {
            const layers = canvas.querySelectorAll('#build-stack div');
            layers.forEach((l, i) => {
                setTimeout(() => {
                    l.className = "layer animate-pop";
                    l.style.background = i === 0 ? "#475569" : (i === 1 ? "#64748b" : "var(--accent)");
                    l.innerText = i === 0 ? "OS" : (i === 1 ? "Code" : "App");
                }, i * 600);
            });
        }
    },
    restart: {
        title: "Auto Restart Policies",
        desc: "Self-healing infrastructure for 100% uptime.",
        use: "Keep your app always running",
        example: "restart: always",
        deepDive: "Modern systems are expected to be 'Self-Healing'. Docker's restart policies allow you to define what happens when a container exits. With 'restart: always', if your app crashes due to a memory leak or a bug, Docker will immediately notice and start a fresh instance, minimizing downtime.",
        render: (canvas) => {
            canvas.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; gap:2rem;">
                    <div id="restart-viz" class="node" style="border-color:var(--success);"><i data-lucide="zap"></i><p>Running</p></div>
                    <button class="btn-primary" style="background:var(--error)" onclick="window.runSimulation('crash')">Cause System Failure</button>
                </div>
            `;
            lucide.createIcons();
        },
        simulate: (canvas) => {
            const node = canvas.querySelector('#restart-viz');
            node.style.borderColor = "var(--error)";
            node.innerHTML = '<i data-lucide="zap-off"></i><p>CRASHED</p>';
            lucide.createIcons();
            
            setTimeout(() => {
                node.style.borderColor = "var(--warning)";
                node.innerHTML = '<i data-lucide="refresh-cw" class="pulse"></i><p>Restarting...</p>';
                lucide.createIcons();
            }, 1500);

            setTimeout(() => {
                node.style.borderColor = "var(--success)";
                node.innerHTML = '<i data-lucide="zap"></i><p>Recovered</p>';
                lucide.createIcons();
            }, 3500);
        }
    },
    networking: {
        title: "Networking Between Containers",
        desc: "Isolated networks for microservices communication.",
        use: "Backend connects to DB container",
        example: "API talks to MongoDB using service name",
        deepDive: "Docker creates virtual networks so containers can communicate. Instead of using IP addresses (which change), containers can use 'Service Discovery'. If you name your database container 'db', your backend can simply connect to 'http://db:27017'. Docker's internal DNS handles the rest.",
        render: (canvas) => {
            canvas.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; gap:3rem; width:100%;">
                    <div style="display:flex; justify-content:space-around; width:100%; position:relative; align-items:center;">
                        <div class="node" id="backend-node"><i data-lucide="server"></i><p>Backend</p></div>
                        <div id="net-packet" class="hidden"></div>
                        <div class="node" id="db-node"><i data-lucide="database"></i><p>db_prod</p></div>
                    </div>
                    <div id="dns-log" style="font-size:0.85rem; color:var(--text-muted); background:rgba(0,0,0,0.3); padding:0.5rem 1rem; border-radius:4px;">Ready to communicate...</div>
                    <button class="btn-primary" onclick="window.runSimulation('network')">Send DNS Query</button>
                </div>
            `;
            lucide.createIcons();
        },
        simulate: (canvas) => {
            const packet = canvas.querySelector('#net-packet');
            const log = canvas.querySelector('#dns-log');
            const backend = canvas.querySelector('#backend-node');
            const db = canvas.querySelector('#db-node');
            
            log.innerText = "1. Backend asks Docker DNS: 'Where is db_prod?'";
            log.style.color = "var(--text)";
            backend.style.boxShadow = "0 0 15px var(--accent)";
            
            setTimeout(() => {
                log.innerText = "2. Docker DNS resolves db_prod ➜ 172.18.0.3";
                backend.style.boxShadow = "none";
                packet.className = 'packet-travel';
            }, 1000);
            
            setTimeout(() => { 
                packet.className = 'hidden'; 
                db.style.boxShadow = "0 0 15px var(--success)";
                log.innerText = "3. Connection established to db_prod!";
                log.style.color = "var(--success)";
            }, 2200);
            
            setTimeout(() => {
                db.style.boxShadow = "none";
                log.style.color = "var(--text-muted)";
                log.innerText = "Ready for next query.";
            }, 4000);
        }
    },
    scaling: {
        title: "Scaling Services",
        desc: "Handle infinite load by multiplying containers.",
        use: "Handle more users/load",
        example: "3 backend containers for load balancing",
        deepDive: "Scaling is the ability to run multiple identical copies (replicas) of a container. A Load Balancer (like Nginx or Docker Swarm) distributes incoming traffic across these replicas. If one container is busy, the next user is sent to a different one. This is how platforms like Netflix handle millions of users.",
        render: (canvas) => {
            canvas.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; gap:2rem;">
                    <div id="scale-pool" style="display:flex; flex-wrap:wrap; gap:1rem; justify-content:center; max-height:150px; overflow-y:auto; padding:1rem;">
                        <div class="node" style="width:50px; height:50px;"></div>
                    </div>
                    <div style="display:flex; gap:1rem;">
                        <button class="btn-primary" onclick="window.runSimulation('scale_up')">Scale Up (+)</button>
                        <button class="btn-primary" style="background:var(--sidebar-bg);" onclick="window.runSimulation('scale_down')">Scale Down (-)</button>
                    </div>
                </div>
            `;
        },
        simulate: (canvas, type) => {
            const pool = canvas.querySelector('#scale-pool');
            if (type === 'scale_up' && pool.children.length < 15) {
                const n = document.createElement('div');
                n.className = 'node animate-pop';
                n.style.width = '50px'; n.style.height = '50px';
                pool.appendChild(n);
            } else if (type === 'scale_down' && pool.children.length > 1) {
                pool.removeChild(pool.lastChild);
            }
        }
    },
    cicd: {
        title: "CI/CD Integration",
        desc: "The automated pipeline from code to production.",
        use: "Auto deploy when code changes",
        example: "GitHub push → Docker build → deploy",
        deepDive: "Continuous Integration and Continuous Deployment (CI/CD) is the heart of DevOps. When you push code to GitHub, an automated script (like GitHub Actions) builds a new Docker Image, pushes it to a Registry (Docker Hub), and updates your server. Your app is updated automatically in minutes.",
        render: (canvas) => {
            canvas.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; gap:2rem;">
                    <div style="display:flex; gap:1.5rem; align-items:center;">
                        <i data-lucide="code" style="color:var(--accent);"></i>
                        <i data-lucide="arrow-right"></i>
                        <i data-lucide="settings" class="pulse"></i>
                        <i data-lucide="arrow-right"></i>
                        <i data-lucide="rocket" style="color:var(--success);"></i>
                    </div>
                    <div id="cicd-log" style="font-family:monospace; font-size:0.6rem; color:var(--text-muted); background:rgba(0,0,0,0.3); padding:0.5rem; border-radius:4px; width:250px;">Waiting for push...</div>
                    <button class="btn-primary" onclick="window.runSimulation('cicd')">Simulate Git Push</button>
                </div>
            `;
            lucide.createIcons();
        },
        simulate: (canvas) => {
            const log = canvas.querySelector('#cicd-log');
            log.innerHTML = "➜ git push origin main<br>➜ building image...<br>➜ pushing to registry...<br>➜ deployed successfully!";
            log.style.color = "var(--success)";
        }
    },
    versioning: {
        title: "Image Versioning & Tags",
        desc: "Safe releases with instant rollbacks.",
        use: "Rollback if something breaks",
        example: "app:v1, app:v2",
        deepDive: "Tags are like version numbers for your images. Instead of just having 'app', you have 'app:v1', 'app:v2', and 'app:latest'. This allows you to precisely control which version of your code is running. If you deploy 'v2' and it has a bug, you can 'Rollback' to 'v1' in seconds by changing the tag.",
        render: (canvas) => {
            canvas.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; gap:2rem;">
                    <div style="display:flex; gap:1.5rem;">
                        <div class="node" style="opacity:0.4;">v1.0.0</div>
                        <div id="v-tag" class="node" style="border-color:var(--success);">v2.0.0 (Live)</div>
                    </div>
                    <button class="btn-primary" onclick="window.runSimulation('rollback')">Emergency Rollback</button>
                </div>
            `;
        },
        simulate: (canvas) => {
            const v = canvas.querySelector('#v-tag');
            v.style.borderColor = "var(--error)";
            v.innerText = "Rollback to v1.0.0";
            setTimeout(() => { v.innerText = "v1.0.0 (Stable)"; v.style.borderColor = "var(--success)"; }, 1500);
        }
    },
    health: {
        title: "Health Checks",
        desc: "Proactive monitoring of application status.",
        use: "Detect failures early",
        example: "API endpoint /health monitored by Docker",
        deepDive: "A container might be 'running' (process exists) but the application inside might be 'dead' (locked or crashed). Health Checks allow you to define a command (like 'curl localhost:3000/health') that Docker runs every 30 seconds. If it fails 3 times, Docker marks the container as 'unhealthy' and can restart it.",
        render: (canvas) => {
            canvas.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; gap:2rem;">
                    <div id="health-viz" class="node" style="border-color:var(--success);">
                        <i data-lucide="heart" class="pulse"></i>
                        <p id="h-text">Status: 200 OK</p>
                    </div>
                    <button class="btn-primary" onclick="window.runSimulation('health')">Perform Health Check</button>
                </div>
            `;
            lucide.createIcons();
        },
        simulate: (canvas) => {
            const text = canvas.querySelector('#h-text');
            text.innerText = "Checking...";
            setTimeout(() => { text.innerText = "Status: 200 OK"; }, 800);
        }
    },
    basics: {
        title: "Docker Basics & Images",
        desc: "Core commands to manage your Docker environment and pull images.",
        use: "Checking versions and downloading container images from Docker Hub.",
        example: "docker pull nginx",
        deepDive: "Before running containers, you need images. 'docker pull' downloads a template (image) from a registry like Docker Hub to your local machine. 'docker images' lists all local templates available to be run.",
        render: (canvas) => {
            canvas.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; gap:2rem;">
                    <div style="display:flex; gap:3rem; align-items:center; position:relative;">
                        <div class="node" style="border-color:var(--accent); border-style:dashed;" id="hub-node"><i data-lucide="cloud"></i><p>Docker Hub</p></div>
                        <div id="pull-packet" class="hidden"><i data-lucide="download"></i></div>
                        <div class="node" id="local-node"><i data-lucide="hard-drive"></i><p>Local Machine</p></div>
                    </div>
                    <div id="basics-log" style="font-size:0.85rem; color:var(--text-muted); background:rgba(0,0,0,0.3); padding:0.5rem 1rem; border-radius:4px;">No images locally.</div>
                    <div style="display:flex; gap:1rem;">
                        <button class="btn-primary" onclick="window.runSimulation('pull')">docker pull</button>
                        <button class="btn-primary" style="background:var(--sidebar-bg);" onclick="window.runSimulation('images')">docker images</button>
                    </div>
                </div>
            `;
            lucide.createIcons();
        },
        simulate: (canvas, type) => {
            const packet = canvas.querySelector('#pull-packet');
            const log = canvas.querySelector('#basics-log');
            const hub = canvas.querySelector('#hub-node');
            const local = canvas.querySelector('#local-node');
            
            if (type === 'pull') {
                log.innerText = "Pulling image from registry...";
                log.style.color = "var(--text)";
                hub.style.boxShadow = "0 0 15px var(--accent)";
                
                setTimeout(() => {
                    packet.className = 'packet-travel';
                }, 500);
                
                setTimeout(() => { 
                    packet.className = 'hidden'; 
                    hub.style.boxShadow = "none";
                    local.style.boxShadow = "0 0 15px var(--success)";
                    log.innerText = "Downloaded newer image for nginx:latest";
                    log.style.color = "var(--success)";
                }, 1700);
                
                setTimeout(() => {
                    local.style.boxShadow = "none";
                }, 3000);
            } else if (type === 'images') {
                log.style.color = "var(--success)";
                log.innerHTML = "<strong>REPOSITORY  TAG       IMAGE ID</strong><br/>nginx       latest    a1b2c3d4e5f6";
                local.style.boxShadow = "0 0 15px var(--accent)";
                setTimeout(() => { local.style.boxShadow = "none"; }, 1500);
            }
        }
    },
    lifecycle: {
        title: "Container Lifecycle",
        desc: "Run, pause, stop, and execute commands inside containers.",
        use: "Managing running instances of your images.",
        example: "docker run -d nginx",
        deepDive: "A container has a distinct lifecycle. It is created from an image ('run'), runs as an active process, can be temporarily 'paused' to save CPU, gracefully 'stopped', or forcefully 'killed'. Once stopped, 'rm' deletes the container.",
        render: (canvas) => {
            canvas.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; gap:2rem;">
                    <div id="container-viz" class="node" style="border-color:var(--text-muted); width:120px; height:120px; border-radius:50%; justify-content:center;">
                        <i id="c-icon" data-lucide="box" style="width:40px; height:40px; margin-bottom:10px;"></i>
                        <p id="c-state" style="font-weight:bold;">STOPPED</p>
                    </div>
                    <div id="lc-log" style="font-size:0.85rem; color:var(--text-muted); background:rgba(0,0,0,0.3); padding:0.5rem 1rem; border-radius:4px; min-height:30px; display:flex; align-items:center;">Container is not running.</div>
                    <div style="display:flex; flex-wrap:wrap; gap:0.5rem; justify-content:center; max-width:400px;">
                        <button class="btn-primary" onclick="window.runSimulation('run')">run</button>
                        <button class="btn-primary" style="background:#f59e0b;" onclick="window.runSimulation('pause')">pause</button>
                        <button class="btn-primary" style="background:#f59e0b;" onclick="window.runSimulation('unpause')">unpause</button>
                        <button class="btn-primary" style="background:#10b981;" onclick="window.runSimulation('exec')">exec</button>
                        <button class="btn-primary" style="background:var(--error);" onclick="window.runSimulation('stop')">stop</button>
                    </div>
                </div>
            `;
            lucide.createIcons();
        },
        simulate: (canvas, type) => {
            const viz = canvas.querySelector('#container-viz');
            const icon = canvas.querySelector('#c-icon');
            const stateText = canvas.querySelector('#c-state');
            const log = canvas.querySelector('#lc-log');
            
            const setState = (color, text, iconName, logMsg, pulse=false) => {
                viz.style.borderColor = color;
                viz.style.boxShadow = `0 0 20px ${color}40`;
                stateText.innerText = text;
                stateText.style.color = color;
                viz.innerHTML = `<i data-lucide="${iconName}" style="width:40px; height:40px; margin-bottom:10px; color:${color};" class="${pulse ? 'pulse' : ''}"></i><p id="c-state" style="font-weight:bold; color:${color};">${text}</p>`;
                log.innerHTML = logMsg;
                log.style.color = color;
                lucide.createIcons();
            };

            if (type === 'run') {
                setState('var(--success)', 'RUNNING', 'play-circle', '➜ docker run -d <br/>Container started successfully.', true);
            } else if (type === 'pause') {
                setState('#f59e0b', 'PAUSED', 'pause-circle', '➜ docker pause <br/>Processes suspended.', false);
            } else if (type === 'unpause') {
                setState('var(--success)', 'RUNNING', 'play-circle', '➜ docker unpause <br/>Processes resumed.', true);
            } else if (type === 'exec') {
                setState('var(--accent)', 'EXEC', 'terminal', '➜ docker exec -it sh <br/>Opened interactive terminal inside container.', false);
                setTimeout(() => {
                    if (stateText.innerText === 'EXEC') {
                        setState('var(--success)', 'RUNNING', 'play-circle', 'Terminal session closed.', true);
                    }
                }, 2000);
            } else if (type === 'stop') {
                setState('var(--error)', 'STOPPED', 'square', '➜ docker stop <br/>Gracefully stopped the container.', false);
                viz.style.boxShadow = 'none';
            }
        }
    }
};

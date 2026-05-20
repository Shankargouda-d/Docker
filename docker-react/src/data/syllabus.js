export const syllabus = [
    {
        id: 'docker-basics',
        title: 'Dockers – Docker Basics and Architecture',
        folder: '1-docker-basics',
        subtopics: [
            { id: 'docker-basics-intro', title: 'Docker Basics', file: '1.1-docker-basics.json' },
            { id: 'docker-architecture', title: 'Docker Architecture', file: '1.2-docker-architecture.json' },
            { id: 'what-is-containerization', title: 'What is Containerization', file: '1.3-containerization.json' },
            { id: 'containers-vs-vms', title: 'Containers, Physical Machines and VMs', file: '1.4-containers-vs-vms.json' },
            { id: 'docker-evolution', title: 'Docker Evolution and Architecture', file: '1.5-docker-evolution.json' },
            { id: 'docker-developments', title: 'Developments in Docker World', file: '1.6-docker-developments.json' },
            { id: 'docker-tooling', title: 'Docker Tooling', file: '1.7-docker-tooling.json' },
            { id: 'basic-commands', title: 'Basic Docker Commands', file: '1.8-basic-commands.json' },
            { id: 'docker-basics-review', title: 'Review & Summary (Section 1)', file: '1.9-review.json' },
        ]
    },
    {
        id: 'docker-networking',
        title: 'Docker Networking',
        folder: '2-docker-networking',
        subtopics: [
            { id: 'networking-intro', title: 'Introduction to Docker Networking', file: '2.1-networking-intro.json' },
            { id: 'network-types', title: 'Types of Docker Networks', file: '2.2-network-types.json' },
            { id: 'using-networks', title: 'Using Networks', file: '2.3-using-networks.json' },
            { id: 'identifying-networks', title: 'Identifying Container Networks', file: '2.4-identifying-networks.json' },
        ]
    },
    {
        id: 'docker-volumes',
        title: 'Docker Volumes',
        folder: '3-docker-volumes',
        subtopics: [
            { id: 'storage-basics', title: 'Introduction to Docker Storage', file: '3.1-storage-basics.json' },
            { id: 'default-fs', title: 'Default Docker File System', file: '3.2-default-fs.json' },
            { id: 'docker-mount-types', title: 'Types of Docker Mounts', file: '3.3-mount-types.json' },
            { id: 'volumes-hands-on', title: 'Hands-on Practices', file: '3.4-hands-on.json' },

        ]
    },
    {
        id: 'exam-prep',
        title: 'Exam Resources',
        folder: '4-resources',
        subtopics: [
            { id: 'question-bank', title: 'Question Bank', file: '4.1-question-bank.json' },
        ]
    }
];

export function getAllTopics() {
    const topics = [];
    syllabus.forEach(mod => {
        mod.subtopics.forEach(sub => {
            topics.push({ ...sub, moduleId: mod.id, moduleTitle: mod.title, folder: mod.folder });
        });
    });
    return topics;
}

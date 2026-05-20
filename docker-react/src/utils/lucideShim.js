/**
 * Shim for lucide icons used in DOM-rendered simulations.
 * Since the data files use lucide.createIcons() for DOM-manipulated HTML,
 * we load the CDN version as a fallback for those contexts.
 */
let lucideLoaded = false;

export function ensureLucideGlobal() {
    if (lucideLoaded || window.lucide) return Promise.resolve();
    lucideLoaded = true;
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/lucide@latest';
        script.onload = () => {
            if (window.lucide) window.lucide.createIcons();
            resolve();
        };
        document.head.appendChild(script);
    });
}

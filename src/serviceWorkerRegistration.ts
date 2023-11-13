export function register() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            const swFileName = import.meta.env.MODE === 'production'
                            ? 'service-worker.js'
                            : 'dev-sw.js?dev-sw';
            navigator.serviceWorker
                .register(import.meta.env.BASE_URL + swFileName)
                .catch(err => console.log(err));
        });
    }
}
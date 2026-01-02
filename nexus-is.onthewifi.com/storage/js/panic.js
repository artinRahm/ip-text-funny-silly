let panicInjected = false;

const interval = setInterval(function () {
    if (panicInjected) return; // Stop if already tried

    const iframe = document.querySelector('.tab-iframe.active');

    if (iframe && iframe.contentWindow) {
        try {
            const iframeDoc = iframe.contentWindow.document;

            if (!iframeDoc.querySelector('script[src="/storage/js/injected-panic.js"]')) {
                const script = iframeDoc.createElement('script');
                script.type = 'text/javascript';
                script.src = '/storage/js/injected-panic.js';
                iframeDoc.head.appendChild(script);
            }

            // Mark as injected successfully
            panicInjected = true;
            clearInterval(interval); // Stop checking
        } catch (err) {
            // Likely a CORS or cross-origin access error
            console.error('Injection failed:', err);
            panicInjected = true; // Prevent repeated errors
            clearInterval(interval); //  Stop trying again
        }
    }
}, 500);

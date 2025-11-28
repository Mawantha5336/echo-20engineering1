// Smooth scrolling polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    (function() {
        const element = document.documentElement;
        const originalScrollTo = element.scrollTo;
        
        element.scrollTo = function(options) {
            if (options && options.behavior === 'smooth') {
                const start = window.pageYOffset;
                const end = options.top || 0;
                const duration = 800;
                const startTime = performance.now();
                
                function scrollStep(timestamp) {
                    const elapsed = timestamp - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeInOutCubic = progress < 0.5 
                        ? 4 * progress * progress * progress 
                        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                    
                    window.scroll(0, start + (end - start) * easeInOutCubic);
                    
                    if (progress < 1) {
                        window.requestAnimationFrame(scrollStep);
                    }
                }
                
                window.requestAnimationFrame(scrollStep);
            } else {
                originalScrollTo.call(this, options);
            }
        };
    })();
}
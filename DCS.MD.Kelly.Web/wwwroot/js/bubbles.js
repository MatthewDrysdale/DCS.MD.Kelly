window.bubblesInterop = {
    bubbles: [],
    animationId: null,
    container: null,

    init: function () {
        this.container = document.querySelector('.bubbles-container');
        if (!this.container) return;

        const items = document.querySelectorAll('.bubble');
        const containerRect = this.container.getBoundingClientRect();

        this.bubbles = Array.from(items).map(el => {
            const size = el.offsetWidth;
            return {
                el,
                x: Math.random() * (containerRect.width - size),
                y: Math.random() * (containerRect.height - size),
                vx: (Math.random() - 0.5) * 1.2,
                vy: (Math.random() - 0.5) * 1.2,
                hovered: false
            };
        });

        items.forEach((el, i) => {
            el.addEventListener('mouseenter', () => {
                this.bubbles[i].hovered = true;
            });
            el.addEventListener('mouseleave', () => {
                this.bubbles[i].hovered = false;
            });
            el.addEventListener('touchstart', (e) => {
                this.bubbles[i].hovered = true;
                setTimeout(() => {
                    this.bubbles[i].hovered = false;
                }, 1500);
            }, { passive: true });
        });

        this.animate();
    },

    animate: function () {
        if (!this.container) return;
        const containerRect = this.container.getBoundingClientRect();

        this.bubbles.forEach(b => {
            if (b.hovered) return;

            b.x += b.vx;
            b.y += b.vy;

            const size = b.el.offsetWidth;

            if (b.x <= 0) { b.x = 0; b.vx = Math.abs(b.vx); }
            if (b.x >= containerRect.width - size) { b.x = containerRect.width - size; b.vx = -Math.abs(b.vx); }
            if (b.y <= 0) { b.y = 0; b.vy = Math.abs(b.vy); }
            if (b.y >= containerRect.height - size) { b.y = containerRect.height - size; b.vy = -Math.abs(b.vy); }

            b.el.style.transform = `translate(${b.x}px, ${b.y}px)`;
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    },

    destroy: function () {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.bubbles = [];
        this.container = null;
    }
};
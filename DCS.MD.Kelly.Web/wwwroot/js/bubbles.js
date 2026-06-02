window.bubblesInterop = {
    bubbles: [],
    animationId: null,
    container: null,

    init: function () {
        this.container = document.querySelector('.bubbles-container');
        if (!this.container) return;

        const items = document.querySelectorAll('.bubble');
        const containerRect = this.container.getBoundingClientRect();
        const size = 150;
        const spawnedPositions = [];

        this.bubbles = Array.from(items).map((el) => {
            let x, y, attempts = 0, overlapping;

            do {
                overlapping = false;
                x = Math.random() * (containerRect.width - size);
                y = Math.random() * (containerRect.height - size);

                for (let j = 0; j < spawnedPositions.length; j++) {
                    const dx = x - spawnedPositions[j].x;
                    const dy = y - spawnedPositions[j].y;
                    if (Math.sqrt(dx * dx + dy * dy) < size + 10) {
                        overlapping = true;
                        break;
                    }
                }
                attempts++;
            } while (overlapping && attempts < 100);

            spawnedPositions.push({ x, y });

            const angle = Math.random() * Math.PI * 2;
            const speed = 0.8 + Math.random() * 0.5;

            return {
                el, x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size,
                hovered: false
            };
        });

        Array.from(items).forEach((el, i) => {
            el.addEventListener('mouseenter', () => this.bubbles[i].hovered = true);
            el.addEventListener('mouseleave', () => this.bubbles[i].hovered = false);
        });

        this.animate();
    },

    resolveCollisions: function () {
        const b = this.bubbles;
        for (let i = 0; i < b.length; i++) {
            for (let j = i + 1; j < b.length; j++) {
                const dx = b[j].x - b[i].x;
                const dy = b[j].y - b[i].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < b[i].size && dist > 0) {
                    const nx = dx / dist;
                    const ny = dy / dist;

                    // Push them apart completely
                    const push = (b[i].size - dist) + 2;
                    b[i].x -= nx * push * 0.5;
                    b[i].y -= ny * push * 0.5;
                    b[j].x += nx * push * 0.5;
                    b[j].y += ny * push * 0.5;

                    // Simple bounce — swap velocity components along collision axis
                    const tempVx = b[i].vx;
                    const tempVy = b[i].vy;
                    b[i].vx = b[j].vx;
                    b[i].vy = b[j].vy;
                    b[j].vx = tempVx;
                    b[j].vy = tempVy;
                }
            }
        }
    },

    animate: function () {
        if (!this.container) return;
        const containerRect = this.container.getBoundingClientRect();

        this.bubbles.forEach(b => {
            if (!b.hovered) {
                b.x += b.vx;
                b.y += b.vy;
            }

            if (b.x <= 0) { b.x = 0; b.vx = Math.abs(b.vx); }
            if (b.x >= containerRect.width - b.size) { b.x = containerRect.width - b.size; b.vx = -Math.abs(b.vx); }
            if (b.y <= 0) { b.y = 0; b.vy = Math.abs(b.vy); }
            if (b.y >= containerRect.height - b.size) { b.y = containerRect.height - b.size; b.vy = -Math.abs(b.vy); }

            b.el.style.transform = `translate(${b.x}px, ${b.y}px)`;
        });

        this.resolveCollisions();

        this.bubbles.forEach(b => {
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
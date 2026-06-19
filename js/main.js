document.addEventListener('DOMContentLoaded', () => {
    // Page Transition Sequence
    const blocks = document.querySelectorAll('.transition-block');
    const body = document.body;

    // Total duration logic
    // 1. Blocks descend (0.2s stagger per block)
    // 2. Pause
    // 3. Blocks ascend
    // 4. Content fade in

    blocks.forEach((block, index) => {
        // Staggered delay for each block
        const delay = index * 0.2;

        // Apply animation
        // 2s duration for the whole slide down/pause/slide up sequence
        block.style.animation = `curtinDrop 2.0s cubic-bezier(0.77, 0, 0.175, 1) ${delay}s forwards`;
    });

    // Show content after the blocks cover the screen and start leaving
    // Timing: 2s (anim) + 0.4s (max delay) = ~2.4s total end
    // We want content to fade in as blocks are leaving (around 1.5s mark)
    setTimeout(() => {
        body.classList.add('is-loaded');
    }, 1600);

    // Header Scroll Effect
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    });

    // Mobile Menu Toggle (Simple Implementation)
    const menuBtn = document.querySelector('.header__menu-btn');
    const nav = document.querySelector('.header__nav');

    menuBtn.addEventListener('click', () => {
        // In a real implementation with more time, I would animate this properly.
        // For now, simple display shift for functionality.
        const isVisible = nav.style.display === 'flex';

        if (isVisible) {
            nav.style.display = 'none';
        } else {
            nav.style.display = 'flex';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.width = '100%';
            nav.style.background = 'rgba(26,26,26,0.98)';
            nav.style.flexDirection = 'column';
            nav.style.padding = '2rem 0';
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    nav.style.display = 'none';
                }
            }
        });
    });

    // Intersection Observer for Fade-in Animations (Optional polish)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animatedElements = document.querySelectorAll('.section__title, .concept__text p, .room-card, .feature-item, .pricing__table');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

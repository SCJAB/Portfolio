// ============================================
// 1. PRELOADER MANAGER
// ============================================
const PreloaderManager = {
    init() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.add('loaded');
            }, 2500);
        });
    }
};

// ============================================
// 2. BURGER MENU MANAGER
// ============================================

const BurgerMenuManager = {
    burgerBtn: document.getElementById('burger-menu'),
    mobileMenu: document.getElementById('mobile-menu'),
    navLinks: document.querySelectorAll('.mobile-menu__links a'),

    init() {
        this.setupBurgerToggle();
        this.setupLinkClicks();
        this.setupOutsideClick();
    },

    setupBurgerToggle() {
        this.burgerBtn.addEventListener('click', () => {
            this.burgerBtn.classList.toggle('active');
            this.mobileMenu.classList.toggle('active');
        });
    },

    setupLinkClicks() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
    },

    setupOutsideClick() {
        document.addEventListener('click', (e) => {
            const isClickInside = this.burgerBtn.contains(e.target) || this.mobileMenu.contains(e.target);
            if (!isClickInside && this.mobileMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    },

    closeMobileMenu() {
        this.burgerBtn.classList.remove('active');
        this.mobileMenu.classList.remove('active');
    }
};

// ============================================
// 3. NAVIGATION & SCROLL SPY MANAGER
// ============================================

const NavigationManager = {
    init() {
        this.setupSmoothScroll();
        this.setupScrollSpy();
    },

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    setupScrollSpy() {
        const sections = document.querySelectorAll('section, footer');
        const navLinks = document.querySelectorAll('.nav-link');

        const observerOptions = {
            root: null,
            rootMargin: '-30% 0px -30% 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    const id = entry.target.getAttribute('id');
                    const activeLinks = document.querySelectorAll(`.nav-link[href="#${id}"]`);
                    activeLinks.forEach(link => link.classList.add('active'));
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }
};

// ============================================
// 4. THEME TOGGLE MANAGER
// ============================================

const ThemeManager = {
    themeBtn: document.getElementById('theme-toggle'),
    body: document.body,

    init() {
        this.loadTheme();
        this.setupThemeToggle();
    },

    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            this.applyDarkTheme();
        }
    },

    setupThemeToggle() {
        this.themeBtn.addEventListener('click', () => {
            this.body.classList.toggle('dark-theme');
            if (this.body.classList.contains('dark-theme')) {
                this.applyDarkTheme();
            } else {
                this.applyLightTheme();
            }
        });
    },

    applyDarkTheme() {
        this.body.classList.add('dark-theme');
        const icon = this.themeBtn.querySelector('i');
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    },

    applyLightTheme() {
        this.body.classList.remove('dark-theme');
        const icon = this.themeBtn.querySelector('i');
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
};

// ============================================
// 5. PROJECT CARD MANAGER
// ============================================

const ProjectManager = {
    init() {
        this.setupProjectCards();
    },

    setupProjectCards() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                const repoUrl = card.getAttribute('data-repo');
                if (repoUrl) {
                    window.open(repoUrl, '_blank', 'noopener,noreferrer');
                }
            });
        });
    }
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    PreloaderManager.init();
    BurgerMenuManager.init();
    NavigationManager.init();
    ThemeManager.init();
    ProjectManager.init();
});
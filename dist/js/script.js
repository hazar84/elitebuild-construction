// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.nav__hamburger');
    const navMenu = document.querySelector('.nav__menu');
    const menuClose = document.querySelector('.menu-close');
    const body = document.body;

    // Функция закрытия меню
    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('no-scroll');
    }

    // Функция открытия меню
    function openMenu() {
        hamburger.classList.add('active');
        navMenu.classList.add('active');
        body.classList.add('no-scroll');
    }

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            if (navMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu when clicking on close button
        if (menuClose) {
            menuClose.addEventListener('click', function(e) {
                e.stopPropagation();
                closeMenu();
            });
        }

        // Close menu when clicking on links
        document.querySelectorAll('.nav__menu a').forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                closeMenu();
            }
        });

        // Prevent menu close when clicking inside menu
        navMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    // Header scroll effect
    let lastScrollY = window.scrollY;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (header) {
            const currentScrollY = window.scrollY;
            
            // Показываем/скрываем header при скролле
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            // Эффект тени и прозрачности
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }

            lastScrollY = currentScrollY;
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                // Close mobile menu if open
                if (window.innerWidth <= 960) {
                    closeMenu();
                }
                
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Сбор данных формы
            const formData = new FormData(this);
            const data = {
                name: this.querySelector('input[type="text"]').value,
                phone: this.querySelector('input[type="tel"]').value,
                email: this.querySelector('input[type="email"]').value,
                message: this.querySelector('textarea').value
            };
            
            // Валидация
            if (!data.name || !data.phone) {
                showNotification('Пожалуйста, заполните обязательные поля: Имя и Телефон', 'error');
                return;
            }

            if (!isValidPhone(data.phone)) {
                showNotification('Пожалуйста, введите корректный номер телефона', 'error');
                return;
            }

            if (data.email && !isValidEmail(data.email)) {
                showNotification('Пожалуйста, введите корректный email', 'error');
                return;
            }
            
            // Симуляция отправки
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            
            // Имитация задержки отправки
            setTimeout(() => {
                showNotification('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
            }, 2000);
        });
    }

    // Валидация телефона
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    // Валидация email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Уведомления
    function showNotification(message, type = 'info') {
        // Удаляем существующие уведомления
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <span class="notification__message">${message}</span>
                <button class="notification__close">&times;</button>
            </div>
        `;

        // Стили для уведомления
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'error' ? '#f8d7da' : type === 'success' ? '#d1edff' : '#fff3cd'};
            border: 1px solid ${type === 'error' ? '#f5c6cb' : type === 'success' ? '#b8daff' : '#ffeaa7'};
            color: ${type === 'error' ? '#721c24' : type === 'success' ? '#004085' : '#856404'};
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 10000;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Кнопка закрытия
        const closeBtn = notification.querySelector('.notification__close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: 1rem;
            color: inherit;
        `;

        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });

        // Автоматическое закрытие
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Добавляем стили для анимаций уведомлений
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification__content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .notification__message {
            flex: 1;
        }
    `;
    document.head.appendChild(style);

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .about-feature, .feature');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Counter animation for features
    const features = document.querySelectorAll('.feature h3');
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                if (target.dataset.animated) return;
                
                target.dataset.animated = 'true';
                const finalValue = parseInt(target.textContent);
                let currentValue = 0;
                const duration = 2000;
                const increment = finalValue / (duration / 16);
                
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        target.textContent = finalValue + '+';
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(currentValue) + '+';
                    }
                }, 16);
            }
        });
    }, { threshold: 0.5 });

    features.forEach(feature => {
        featureObserver.observe(feature);
    });

    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Если номер пустой или слишком короткий, очищаем поле
            if (value.length === 0) {
                e.target.value = '';
                return;
            }
            
            // Убираем код страны 7 или 8 если есть
            if (value.startsWith('7') || value.startsWith('8')) {
                value = value.substring(1);
            }
            
            let formattedValue = '';
            
            // Добавляем +7 только если есть цифры
            if (value.length > 0) {
                formattedValue = '+7 ';
            }
            
            // Форматируем оставшиеся цифры
            if (value.length > 0) {
                formattedValue += value;
            }
            
            // Добавляем пробелы в нужных местах
            if (formattedValue.length > 6) {
                formattedValue = formattedValue.substring(0, 6) + ' ' + formattedValue.substring(6);
            }
            if (formattedValue.length > 10) {
                formattedValue = formattedValue.substring(0, 10) + ' ' + formattedValue.substring(10);
            }
            if (formattedValue.length > 13) {
                formattedValue = formattedValue.substring(0, 13) + ' ' + formattedValue.substring(13);
            }
            if (formattedValue.length > 16) {
                formattedValue = formattedValue.substring(0, 16);
            }
            
            e.target.value = formattedValue;
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__menu a[href^="#"]');

    function highlightNavLink() {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // Add active class styles
    const activeStyle = document.createElement('style');
    activeStyle.textContent = `
        .nav__menu a.active {
            color: var(--secondary-color);
        }
        
        @media (max-width: 960px) {
            .nav__menu.active a.active {
                color: var(--secondary-color);
            }
        }
    `;
    document.head.appendChild(activeStyle);

    // Portfolio image hover effect enhancement
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = 'var(--shadow)';
        });
    });

    // Back to top button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--secondary-color);
        color: var(--primary-color);
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
    });

    backToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(backToTop);

    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });

    console.log('🏗️ EliteBuild - Construction company website loaded successfully');
});
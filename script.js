document.addEventListener('DOMContentLoaded', () => {
    const nameText = "Talal Ismail Yaghi";
    const jobTitleText = "Web Developer";
    const shortSentenceText = "A passionate student building interactive web experiences.";

    const nameElement = document.getElementById('name-text');
    const jobTitleElement = document.getElementById('job-title-text');
    const shortSentenceElement = document.getElementById('short-sentence-text');
    const avatarImage = document.getElementById('avatar-image');

    const typingSpeed = 70;
    const sentenceTypingSpeed = 40;
    const delayBetweenTexts = 500;

    function typeWriter(text, element, speed, callback) {
        let i = 0;
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            } else if (callback) {
                callback();
            }
        }
        typing();
    }

    typeWriter(nameText, nameElement, typingSpeed, () => {
        setTimeout(() => {
            typeWriter(jobTitleText, jobTitleElement, typingSpeed, () => {
                setTimeout(() => {
                    typeWriter(shortSentenceText, shortSentenceElement, sentenceTypingSpeed);
                }, delayBetweenTexts);
            });
        }, delayBetweenTexts);
    });

    avatarImage.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = avatarImage.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const offsetX = (e.clientX - centerX) / (width / 2);
        const offsetY = (e.clientY - centerY) / (height / 2);

        const tiltX = -offsetY * 15;
        const tiltY = offsetX * 15;
        const translateX = offsetX * 8;
        const translateY = offsetY * 8;

        avatarImage.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateX(${translateX}px) translateY(${translateY}px) scale(1.02)`;
    });

    avatarImage.addEventListener('mouseleave', () => {
        avatarImage.style.transition = 'transform 0.5s ease-out';
        avatarImage.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px) scale(1)';
        setTimeout(() => {
            avatarImage.style.transition = 'transform 0.1s linear';
        }, 500);
    });

    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.navbar-right a');
    const scrollProgressBar = document.getElementById('scroll-progress-bar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbar.offsetHeight - 10;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });

        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        scrollProgressBar.style.width = scrolled + '%';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - navbar.offsetHeight;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const downloadResumeBtn = document.getElementById('download-resume-btn');
    downloadResumeBtn.addEventListener('click', () => {
        alert("Opening CV");
         window.open('CV Talal.pdf', '_blank');
    });

    const skillBars = document.querySelectorAll('.progress-fill');

    function animateSkillBars() {
        skillBars.forEach(bar => {
            const skillClass = bar.classList[1];
            let percentage = 0;
            if (skillClass === 'html-css') percentage = 90;
            else if (skillClass === 'javascript') percentage = 75;
            else if (skillClass === 'reactjs') percentage = 60;
            else if (skillClass === 'problem-solving') percentage = 85;
            bar.style.width = percentage + '%';
        });
    }

    const contactMeBtn = document.getElementById('contact-me-btn');
    contactMeBtn.addEventListener('click', () => {
        window.location.href = 'mailto:talalyaghi2005@gmail.com?subject=Inquiry from your Portfolio';
    });

    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const messageCharCount = document.getElementById('message-char-count');
    const maxMessageLength = 500;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
    }

    function hideError(element) {
        element.textContent = '';
        element.style.display = 'none';
    }

    messageInput.addEventListener('input', () => {
        const currentLength = messageInput.value.length;
        messageCharCount.textContent = `${currentLength}/${maxMessageLength}`;
        if (currentLength > maxMessageLength) {
            messageCharCount.style.color = 'red';
            showError(messageError, `Message exceeds maximum length of ${maxMessageLength} characters.`);
        } else {
            messageCharCount.style.color = '#777';
            hideError(messageError);
        }
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        if (nameInput.value.trim() === '') {
            showError(nameError, 'Name is required.');
            isValid = false;
        } else {
            hideError(nameError);
        }

        if (emailInput.value.trim() === '') {
            showError(emailError, 'Email is required.');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailError, 'Please enter a valid email address.');
            isValid = false;
        } else {
            hideError(emailError);
        }

        if (messageInput.value.trim() === '') {
            showError(messageError, 'Message cannot be empty.');
            isValid = false;
        } else if (messageInput.value.length > maxMessageLength) {
            isValid = false;
        } else {
            hideError(messageError);
        }

        if (isValid) {
            alert('Form submitted successfully!');
            contactForm.reset();
            messageCharCount.textContent = `0/${maxMessageLength}`;
            messageCharCount.style.color = '#777';
        }
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (section.id !== 'header') {
            sectionObserver.observe(section);
        }
    });

    const projectCardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const projectCards = entry.target.querySelectorAll('.project-card');
                projectCards.forEach((card, index) => {
                    card.style.transitionDelay = `${index * 0.1}s`;
                    card.classList.add('visible');
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        projectCardObserver.observe(projectsSection);
    }

    const currentYear = new Date().getFullYear();
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = currentYear;
    }

    const scrollToTopBtn = document.getElementById('scroll-to-top-btn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});
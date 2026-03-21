// ============================================
// DWEL Investor Relations Website - JavaScript
// ============================================

// ============================================
// Navigation Functionality
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Active Navigation on Scroll
    const sections = document.querySelectorAll('section[id]');
    
    function scrollActive() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.add('active');
            } else {
                document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', scrollActive);
    
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // ============================================
    // Smooth Scrolling for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // Scroll Animations
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Trigger percentage circle animation
                if (entry.target.classList.contains('market-stat')) {
                    animatePercentageCircle(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // ============================================
    // Percentage Circle Animation
    // ============================================
    function animatePercentageCircle(element) {
        const circle = element.querySelector('.percentage-circle');
        if (!circle) return;
        
        const percentage = parseInt(circle.getAttribute('data-percentage'));
        const progressCircle = circle.querySelector('.progress');
        
        if (progressCircle) {
            const circumference = 2 * Math.PI * 90; // radius = 90
            const offset = circumference - (percentage / 100) * circumference;
            progressCircle.style.strokeDashoffset = offset;
        }
    }
    
    // ============================================
    // Back to Top Button
    // ============================================
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ============================================
    // Contact Form Handling
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                company: document.getElementById('company').value || 'Not provided',
                inquiry: document.getElementById('inquiry').value,
                message: document.getElementById('message').value,
                submitted_at: new Date().toISOString(),
                status: 'new'
            };
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Save to database using RESTful Table API
            try {
                // Send POST request to create new record
                const response = await fetch('tables/contact_inquiries', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                if (!response.ok) {
                    throw new Error('Failed to submit form');
                }
                
                const result = await response.json();
                console.log('Form submitted successfully:', result);
                
                // Show success message
                formMessage.textContent = 'Thank you for contacting us! We will get back to you within 24 hours.';
                formMessage.className = 'form-message success';
                
                // Reset form
                contactForm.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                    formMessage.className = 'form-message';
                }, 5000);
                
            } catch (error) {
                // Show error message
                formMessage.textContent = 'Sorry, there was an error sending your message. Please try again or contact us directly.';
                formMessage.className = 'form-message error';
                
                console.error('Form submission error:', error);
            } finally {
                // Reset button state
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }
    
    // ============================================
    // Population Growth Chart
    // ============================================
    const populationChart = document.getElementById('populationChart');
    
    if (populationChart) {
        const ctx = populationChart.getContext('2d');
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2020', '2025', '2030', '2035', '2040', '2045', '2050'],
                datasets: [
                    {
                        label: 'Population 65+ (Millions)',
                        data: [54.1, 67, 82, 95, 120, 140, 161],
                        borderColor: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        pointBackgroundColor: '#2563eb',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    },
                    {
                        label: 'Caregiving Employees (Millions)',
                        data: [39.5, 49, 60, 69, 88, 102, 117],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        pointBackgroundColor: '#10b981',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            font: {
                                size: 14,
                                family: 'Inter',
                                weight: '600'
                            },
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleFont: {
                            size: 14,
                            family: 'Inter'
                        },
                        bodyFont: {
                            size: 13,
                            family: 'Inter'
                        },
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + 'M';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            font: {
                                size: 12,
                                family: 'Inter'
                            },
                            callback: function(value) {
                                return value + 'M';
                            }
                        },
                        title: {
                            display: true,
                            text: 'Population (Millions)',
                            font: {
                                size: 13,
                                family: 'Inter',
                                weight: '600'
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 12,
                                family: 'Inter'
                            }
                        },
                        title: {
                            display: true,
                            text: 'Year',
                            font: {
                                size: 13,
                                family: 'Inter',
                                weight: '600'
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }
    
    // ============================================
    // Counter Animation for Stats
    // ============================================
    function animateCounter(element, target, suffix = '') {
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    }
    
    // Observe stat numbers for counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                
                const text = entry.target.textContent;
                const value = parseFloat(text.replace(/[^0-9.]/g, ''));
                
                if (!isNaN(value)) {
                    entry.target.textContent = '0';
                    animateCounter(entry.target, value, text.replace(/[0-9.]/g, ''));
                }
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
    
    // ============================================
    // Initialize Percentage Circles
    // ============================================
    const percentageCircles = document.querySelectorAll('.percentage-circle');
    percentageCircles.forEach(circle => {
        const percentage = parseInt(circle.getAttribute('data-percentage'));
        const circumference = 2 * Math.PI * 90;
        const progressCircle = circle.querySelector('.progress');
        
        if (progressCircle) {
            progressCircle.style.strokeDasharray = circumference;
            progressCircle.style.strokeDashoffset = circumference;
        }
    });
    
    // ============================================
    // Performance: Reduce animations on slower devices
    // ============================================
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.scrollBehavior = 'auto';
    }
    
    // ============================================
    // Console Welcome Message
    // ============================================
    console.log('%c DWEL Platform ', 'background: #2563eb; color: white; font-size: 20px; padding: 10px;');
    console.log('%c Balancing Work & Caregiving ', 'font-size: 14px; color: #2563eb;');
    console.log('%c For more information: info@dwel.com ', 'font-size: 12px; color: #6b7280;');
    
});
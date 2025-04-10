// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Check initial scroll position
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Process node interaction
    const processNodes = document.querySelectorAll('.process-node');
    processNodes.forEach(node => {
        node.addEventListener('click', function() {
            // If this node is already active, deactivate it
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                return;
            }
            
            // Deactivate all nodes first
            processNodes.forEach(n => n.classList.remove('active'));
            
            // Activate the clicked node
            this.classList.add('active');
        });
    });

    // Case study modal functionality
    const viewButtons = document.querySelectorAll('.view-case-study');
    const modalContainer = document.querySelector('.modal-container');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    // Open modal when "View Case Study" is clicked
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from bubbling to parent
            const projectId = this.getAttribute('data-project');
            const targetModal = document.getElementById(projectId);
            
            // Hide all modals first
            modals.forEach(modal => modal.classList.remove('active'));
            
            // Show the modal container and the target modal
            modalContainer.classList.add('active');
            targetModal.classList.add('active');
            
            // Prevent scrolling on the body
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal when X is clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            modalContainer.classList.remove('active');
            modals.forEach(modal => modal.classList.remove('active'));
            
            // Re-enable scrolling on the body
            document.body.style.overflow = 'auto';
        });
    });

    // Close modal when clicking outside the modal content
    modalContainer.addEventListener('click', function(e) {
        if (e.target === modalContainer) {
            modalContainer.classList.remove('active');
            modals.forEach(modal => modal.classList.remove('active'));
            
            // Re-enable scrolling on the body
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalContainer.classList.contains('active')) {
            modalContainer.classList.remove('active');
            modals.forEach(modal => modal.classList.remove('active'));
            
            // Re-enable scrolling on the body
            document.body.style.overflow = 'auto';
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements when they come into view with staggered animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.process-node, .about-content, .contact-info, .skills li, .tools li, .project-card');
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // Add staggered animation delay based on element index
            if (elementPosition < windowHeight - 100) {
                // Add different animation classes based on element type
                if (element.classList.contains('process-node')) {
                    element.style.animationDelay = `${index * 0.1}s`;
                    element.classList.add('slide-in-left');
                } else if (element.classList.contains('project-card')) {
                    element.style.animationDelay = `${index * 0.1}s`;
                    element.classList.add('zoom-in');
                } else if (element.parentElement && (element.parentElement.classList.contains('skills') || element.parentElement.classList.contains('tools'))) {
                    element.style.animationDelay = `${index * 0.05}s`;
                    element.classList.add('pop-in');
                } else {
                    element.style.animationDelay = `${index * 0.1}s`;
                    element.classList.add('fade-in');
                }
            }
        });
    };

    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();
    
    // Scroll to top button functionality
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.classList.add('scroll-top-btn');
    scrollTopBtn.innerHTML = '&uarr;';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    })
});
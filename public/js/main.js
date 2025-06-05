// public/js/main.js
console.log('Client-side JavaScript loaded for ITB Information Technology Co., Ltd. Website!');

document.addEventListener('DOMContentLoaded', function() {
    // Active navigation link highlighting
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        // Handle a special case for the homepage '/'
        if (link.getAttribute('href') === '/' && currentLocation === '/') {
            link.classList.add('active');
        }
        // For other links, check if the currentLocation starts with the link's href
        // This helps with nested paths like /services/service-name
        else if (link.getAttribute('href') !== '/' && currentLocation.startsWith(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });

    // Example: Smooth scroll for any anchor links (if you add them later)
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function (e) {
    //         e.preventDefault();
    //         const targetElement = document.querySelector(this.getAttribute('href'));
    //         if (targetElement) {
    //             targetElement.scrollIntoView({
    //                 behavior: 'smooth'
    //             });
    //         }
    //     });
    // });
});

// app.js
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const host = '0.0.0.0'; // Listen on all network interfaces

// EJS template engine configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, client-side JavaScript) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// --- Centralized Service Data ---
const securityConsultingData = {
    id: 'security-consulting',
    name: 'Security Consulting',
    shortDescription: 'Vulnerability analysis and mitigation strategies.',
    image: '//itb-img.s3.ap-southeast-1.amazonaws.com/public/images/security-consulting.jpg',
    details: { /* ... existing details ... */ } // Truncated for brevity, ensure your full details are here
};

const servicesData = [
    {
        id: 'system-integrator',
        name: 'System Integrator',
        shortDescription: 'Seamlessly connecting disparate IT systems into a cohesive and efficient infrastructure.',
        image: '//itb-img.s3.ap-southeast-1.amazonaws.com/public/images/system-integrator.jpg',
        details: { /* ... existing details ... */ } // Truncated for brevity
    },
    {
        id: 'penetration-testing',
        name: 'Penetration Testing',
        shortDescription: 'Attack simulations to identify weaknesses.',
        image: '//itb-img.s3.ap-southeast-1.amazonaws.com/public/images/penetration-testing.jpg',
        details: { /* ... existing details ... */ } // Truncated for brevity
    },
    {
        id: 'cloud-security',
        name: 'Cloud Security',
        shortDescription: 'Protecting data and applications in the cloud.',
        image: '//itb-img.s3.ap-southeast-1.amazonaws.com/public/images/cloud-security.jpg',
        details: { /* ... existing details ... */ } // Truncated for brevity
    },
    {
        id: 'security-training',
        name: 'Security Training',
        shortDescription: 'Customized courses for your team.',
        image: '//itb-img.s3.ap-southeast-1.amazonaws.com/public/images/security-training.jpg',
        details: { /* ... existing details ... */ } // Truncated for brevity
    },
    {
        id: 'data-recovery',
        name: 'Data Recovery',
        shortDescription: 'Professional services for lost or corrupted data recovery.',
        image: '//itb-img.s3.ap-southeast-1.amazonaws.com/public/images/data-recovery.jpg',
        details: { /* ... existing details ... */ } // Truncated for brevity
    },
    securityConsultingData
];


// Main Routes
app.get('/', (req, res) => {
    res.render('index', {
        pageTitle: 'Home - ITB Information Technology Co., Ltd.',
        heroHeading: 'Innovative Solutions for Digital Security',
        heroSubheading: 'Protecting Your Future in the Digital World'
    });
});

app.get('/services', (req, res) => {
    res.render('services', {
        pageTitle: 'Services - ITB Information Technology Co., Ltd.',
        servicesList: servicesData
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About Us - ITB Information Technology Co., Ltd.',
        companyDescription: 'We are a team of expert IT and security professionals, dedicated to providing cutting-edge solutions to protect our clients\' infrastructure and data.'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        pageTitle: 'Contact Us - ITB Information Technology Co., Ltd.',
        contactEmail: 'info@itbcons.com'
    });
});

app.get('/services/:id', (req, res) => {
    const serviceId = req.params.id;
    const service = servicesData.find(s => s.id === serviceId);

    if (service) {
        res.render('service-detail', {
            pageTitle: `${service.name} - ITB Information Technology Co., Ltd.`,
            service: service
        });
    } else {
        res.status(404).render('404', { pageTitle: 'Page Not Found - ITB Information Technology' });
    }
});

// --- NEW DEDICATED PAGE ROUTES ---
app.get('/expertise', (req, res) => {
    res.render('expertise', {
        pageTitle: 'In-depth Expertise - ITB Information Technology Co., Ltd.'
    });
});

app.get('/tailored-solutions', (req, res) => {
    res.render('tailored-solutions', {
        pageTitle: 'Tailored Solutions - ITB Information Technology Co., Ltd.'
    });
});

app.get('/cutting-edge-technologies', (req, res) => {
    res.render('cutting-edge-technologies', {
        pageTitle: 'Cutting-Edge Technologies - ITB Information Technology Co., Ltd.'
    });
});

// Catch-all for 404 errors (must be after all other routes)
app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found - ITB Information Technology' });
});


// Start the server
app.listen(port, host, () => {
    console.log(`Server started on http://${host}:${port}`);
    console.log(`Accessible from your local network at your machine's local IP on port ${port}`);
});

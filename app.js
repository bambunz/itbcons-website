// app.js
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const host = '127.0.0.1'; // Listen on localhost only

// EJS template engine configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, client-side JavaScript) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// --- Centralized Data ---
const securityConsultingData = {
    id: 'security-consulting',
    name: 'Security Consulting',
    shortDescription: 'Vulnerability analysis and mitigation strategies.',
    image: '//itb-img.s3.ap-southeast-1.amazonaws.com/public/images/security-consulting.jpg',
    details: {
        heading1: 'Strategic Security Guidance',
        paragraph1: 'Our consulting service provides high-level guidance to build a resilient and proactive security framework that aligns with your business objectives.',
        heading2: 'Comprehensive Risk Assessment',
        paragraph2: 'We employ industry-standard frameworks to conduct thorough evaluations of your infrastructure, applications, and processes to identify and prioritize risks.',
        heading3: 'Governance and Compliance',
        paragraph3: 'We assist in navigating complex regulatory standards like GDPR, HIPAA, or PCI-DSS to ensure you meet your compliance obligations.'
    }
};

const servicesData = [
    {
        id: 'system-integrator',
        name: 'System Integrator',
        shortDescription: 'Seamlessly connecting disparate IT systems into a cohesive infrastructure.',
        image: '//itb-img.s3.ap-southeast-1.amazonaws.com/public/images/system-integrator.jpg',
        details: {
            heading1: 'Unified Digital Ecosystem',
            paragraph1: 'Our System Integration service is dedicated to breaking down digital silos and architecting a cohesive, unified IT ecosystem for your organization.',
            heading2: 'Custom API Development',
            paragraph2: 'We specialize in building secure and reliable Application Programming Interfaces (APIs) and middleware solutions to bridge gaps between different platforms.',
            heading3: 'End-to-End Project Management',
            paragraph3: 'We manage the entire integration lifecycle from concept to completion, ensuring a smooth transition with minimal operational disruption.'
        }
    },
    {
        id: 'penetration-testing',
        name: 'Penetration Testing',
        shortDescription: 'Attack simulations to identify weaknesses.',
        image: '//itb-img.s3.ap-southeast-1.amazonaws.com/public/images/penetration-testing.jpg',
        details: {
            heading1: 'Proactive Defense Through Ethical Hacking',
            paragraph1: 'Our Penetration Testing service provides the ultimate stress test for your digital defenses by simulating the actions of a real-world attacker.',
            heading2: 'Comprehensive Methodologies',
            paragraph2: 'Our testing methodologies are aligned with industry-best-practice frameworks such as the OWASP Top 10 and the Penetration Testing Execution Standard (PTES).',
            heading3: 'Actionable Reporting',
            paragraph3: 'Upon completion, we provide a comprehensive report that clearly outlines all findings, their potential impact, and clear, actionable recommendations for remediation.'
        }
    },
    {
        id: 'cloud-security',
        name: 'Cloud Security',
        shortDescription: 'Protecting data and applications in the cloud.',
        image: '//itb-img.s3.ap-southeast-1.amazonaws.com/public/images/cloud-security.jpg',
        details: {
            heading1: 'End-to-End Cloud Protection',
            paragraph1: 'Our Cloud Security service is designed to ensure your organization can harness the full power of the cloud with confidence and security.',
            heading2: 'Cloud Security Posture Management (CSPM)',
            paragraph2: 'We provide a continuous process of discovery, assessment, and remediation of cloud risks and misconfigurations.',
            heading3: 'Advanced Threat Detection',
            paragraph3: 'We focus on protecting your actual cloud workloads—the virtual machines, containers, and serverless functions that run your applications.'
        }
    },
    {
        id: 'security-training',
        name: 'Security Training',
        shortDescription: 'Customized courses for your team.',
        image: '//itb-img.s3.ap-southeast-1.amazonaws.com/public/images/security-training.jpg',
        details: {
            heading1: 'Building Your Human Firewall',
            paragraph1: 'Our training is designed to transform your employees from a potential liability into your most powerful security asset: a vigilant and educated "human firewall."',
            heading2: 'Engaging, Role-Based Programs',
            paragraph2: 'Our training programs are highly customized to your organization and the different roles within it, ensuring the education is relevant and effective.',
            heading3: 'Continuous Reinforcement',
            paragraph3: 'Security awareness is an ongoing process. Our program includes continuous reinforcement and practical testing through controlled phishing simulations.'
        }
    },
    {
        id: 'data-recovery',
        name: 'Data Recovery',
        shortDescription: 'Professional services for lost or corrupted data recovery.',
        image: '//itb-img.s3.ap-southeast-1.amazonaws.com/public/images/data-recovery.jpg',
        details: {
            heading1: 'Rapid Response for Data Loss Incidents',
            paragraph1: 'ITB\'s Data Recovery service is your lifeline in critical situations, specializing in recovering lost, corrupted, or inaccessible data.',
            heading2: 'Advanced Techniques Across All Media',
            paragraph2: 'Our capabilities span a comprehensive range of storage devices, from traditional Hard Disk Drives (HDDs) to complex RAID arrays and virtualized systems.',
            heading3: 'Proactive Prevention and Forensics',
            paragraph3: 'Beyond recovery, we provide a detailed analysis of the root cause of the data loss to help you prevent similar incidents in the future.'
        }
    },
    securityConsultingData
];

const featureButtonsData = [
    {
        title: 'In-depth Expertise',
        image: '//itb-img.s3.ap-southeast-1.amazonaws.com/public/images/feature-advantage-1.jpg',
        link: '/expertise'
    },
    {
        title: 'Tailored Solutions',
        image: '//itb-img.s3.ap-southeast-1.amazonaws.com/public/images/feature-advantage-2.jpg',
        link: '/tailored-solutions'
    },
    {
        title: 'Cutting-Edge Technologies',
        image: '//itb-img.s3.ap-southeast-1.amazonaws.com/public/images/feature-advantage-3.jpg',
        link: '/cutting-edge-technologies'
    }
];

const bannerImage = '//itb-img.s3.ap-southeast-1.amazonaws.com/public/images/hero.png';

// --- Main Routes ---
app.get('/', (req, res) => {
    res.render('index', {
        pageTitle: 'Home - ITB',
        servicesData: servicesData,
        featureButtons: featureButtonsData,
        banner: {
            title: 'Innovative Solutions for Digital Security',
            imageUrl: bannerImage
        }
    });
});

app.get('/services', (req, res) => {
    res.render('services', {
        pageTitle: 'Services - ITB',
        servicesList: servicesData,
        banner: {
            title: 'Comprehensive IT & Security Services',
            imageUrl: bannerImage
        }
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About Us - ITB',
        companyDescription: 'We are a team of expert IT and security professionals, dedicated to providing cutting-edge solutions to protect our clients\' infrastructure and data.',
        banner: {
            title: 'Your Dedicated Partner in Digital Defense',
            imageUrl: bannerImage
        }
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        pageTitle: 'Contact Us - ITB',
        contactEmail: 'info@itbcons.com',
        banner: {
            title: 'Get In Touch With Our Experts',
            imageUrl: bannerImage
        }
    });
});

app.get('/expertise', (req, res) => {
    res.render('expertise', {
        pageTitle: 'In-depth Expertise - ITB',
        banner: {
            title: 'A Foundation of Deep Expertise',
            imageUrl: bannerImage
        }
    });
});

app.get('/tailored-solutions', (req, res) => {
    res.render('tailored-solutions', {
        pageTitle: 'Tailored Solutions - ITB',
        banner: {
            title: 'Solutions, Precisely Tailored to You',
            imageUrl: bannerImage
        }
    });
});

app.get('/cutting-edge-technologies', (req, res) => {
    res.render('cutting-edge-technologies', {
        pageTitle: 'Cutting-Edge Technologies - ITB',
        banner: {
            title: 'Harnessing the Power of Innovation',
            imageUrl: bannerImage
        }
    });
});


app.get('/services/:id', (req, res) => {
    const serviceId = req.params.id;
    const currentServiceIndex = servicesData.findIndex(s => s.id === serviceId);
    if (currentServiceIndex === -1) {
        return res.status(404).render('404', {
            pageTitle: 'Page Not Found - ITB',
            banner: {
                title: 'The Page Was Not Found',
                imageUrl: bannerImage
            }
         });
    }

    const service = servicesData[currentServiceIndex];
    const prevService = currentServiceIndex > 0 ? servicesData[currentServiceIndex - 1] : null;
    const nextService = currentServiceIndex < servicesData.length - 1 ? servicesData[currentServiceIndex + 1] : null;

    res.render('service-detail', {
        pageTitle: `${service.name} - ITB`,
        service: service,
        prevService: prevService,
        nextService: nextService,
        banner: {
            title: service.name,
            imageUrl: bannerImage
        }
    });
});

// Catch-all for 404 errors
app.use((req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Page Not Found - ITB',
        banner: {
            title: 'The Page Was Not Found',
            imageUrl: bannerImage
        }
    });
});

// Start the server
app.listen(port, host, () => {
    console.log(`Server started on http://${host}:${port}`);
});

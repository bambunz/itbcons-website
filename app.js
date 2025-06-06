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

// --- Centralized Service Data ---
const securityConsultingData = {
    id: 'security-consulting',
    name: 'Security Consulting',
    shortDescription: 'Vulnerability analysis and mitigation strategies.',
    image: '//itb-img.s3.ap-southeast-1.amazonaws.com/public/images/security-consulting.jpg',
    details: {
        heading1: 'Comprehensive Security Assessments',
        paragraph1: `In today\'s interconnected digital landscape, proactive security is not just an option, but a necessity. Our Security Consulting service begins with comprehensive assessments of your existing IT infrastructure, applications, and operational processes. We delve deep to identify potential vulnerabilities, assess your current security posture, and understand the unique risks your organization faces. This includes evaluating network architecture, reviewing access controls, and analyzing data handling procedures. Our expert consultants leverage industry best practices and cutting-edge tools to provide a holistic view of your security landscape, pinpointing weaknesses before they can be exploited.`,
        heading2: 'Strategic Risk Mitigation and Policy Development',
        paragraph2: `Beyond identifying threats, our goal is to empower your organization with robust defenses. Based on our assessments, we develop tailored risk mitigation strategies designed to address your most critical vulnerabilities effectively. This involves crafting custom security policies, implementing robust security controls, and guiding your team through the adoption of secure practices. We work closely with your stakeholders to ensure that proposed solutions align with your business objectives and regulatory compliance requirements. Our consultants provide actionable recommendations for improving incident response, disaster recovery, and data protection, transforming your security from a reactive measure into a resilient, integrated business function.`,
        heading3: 'Continuous Improvement and Expert Guidance',
        paragraph3: `The threat landscape is constantly evolving, and so should your security. Our Security Consulting is an ongoing partnership aimed at fostering a culture of continuous security improvement. We offer guidance on selecting and implementing advanced security technologies, provide insights into emerging threats, and help you navigate complex compliance frameworks like GDPR, HIPAA, or PCI DSS. Our experts can assist with security awareness training for your employees, ensuring that human factors, often the weakest link, become a strong line of defense. With ITB as your security partner, you gain access to unparalleled expertise and strategic advice that secures your digital assets and preserves your business continuity.`
    }
};

const servicesData = [
    {
        id: 'system-integrator',
        name: 'System Integrator',
        shortDescription: 'Seamlessly connecting disparate IT systems into a cohesive and efficient infrastructure.',
        image: '//itb-img.s3.ap-southeast-1.amazonaws.com/public/images/system-integrator.jpg',
        details: {
            heading1: 'Holistic IT Ecosystem Integration',
            paragraph1: `In a complex technological world, disparate systems often hinder productivity and growth. Our System Integrator service focuses on creating a unified and synergistic IT ecosystem for your organization. We begin with a thorough analysis of your existing hardware, software, cloud services, and on-premise infrastructure to understand your current capabilities and identify integration challenges. By mapping out your business processes and future goals, we design a tailored integration architecture that ensures all components work together harmoniously, maximizing efficiency and data flow across your enterprise.`,
            heading2: 'Custom Solutions and Workflow Automation',
            paragraph2: `We specialize in developing custom interfaces, APIs, and middleware solutions to bridge gaps between different platforms and applications, whether they are legacy systems or modern cloud-based services. Our expertise extends to automating complex workflows, which reduces manual intervention, minimizes errors, and accelerates your operational speed. From integrating CRM and ERP systems to connecting IoT devices and data analytics platforms, we deliver solutions that are robust, scalable, and perfectly aligned with your unique operational requirements, fostering innovation and agility.`,
            heading3: 'End-to-End Project Management and Ongoing Support',
            paragraph3: `ITB provides comprehensive project management for all system integration endeavors. Our process covers meticulous planning, agile execution, rigorous testing, and seamless deployment, ensuring minimal disruption to your ongoing operations. Post-integration, we offer dedicated support and optimization services to ensure the integrated system continues to perform optimally and adapt to your evolving business needs. We are committed to being your long-term partner, helping you leverage a fully integrated technological environment for sustained competitive advantage and operational excellence.`
        }
    },
    {
        id: 'penetration-testing',
        name: 'Penetration Testing',
        shortDescription: 'Attack simulations to identify weaknesses.',
        image: '//itb-img.s3.ap-southeast-1.amazonaws.com/public/images/penetration-testing.jpg',
        details: {
            heading1: 'Simulating Real-World Cyber Attacks',
            paragraph1: `Penetration Testing, often referred to as "ethical hacking," is a crucial service designed to rigorously test the resilience of your systems, applications, and networks against real-world cyber threats. At ITB, our certified penetration testers meticulously simulate attacks that mirror tactics, techniques, and procedures (TTPs) used by malicious actors. This proactive approach allows us to uncover exploitable vulnerabilities and configuration weaknesses before they can be leveraged by attackers. We employ a blend of automated tools and manual expertise, ensuring a thorough examination that goes beyond what automated scanners can detect, mimicking the ingenuity of human attackers.`,
            heading2: 'Comprehensive Scope and Methodologies',
            paragraph2: `Our penetration testing services cover a wide array of scopes, including network penetration testing (internal and external), web application penetration testing, mobile application penetration testing, and cloud security penetration testing. Each engagement begins with a detailed scope definition, aligned with your specific concerns and compliance needs. We adhere to industry-recognized methodologies such as OWASP Top 10 for web applications and NIST SP 800-115 for technical assessments, ensuring a structured and comprehensive evaluation. Our testers carefully document each step, from reconnaissance and vulnerability identification to exploitation and post-exploitation, providing a clear audit trail of our findings.`,
            heading3: 'Actionable Insights and Remediation Support',
            paragraph3: `The ultimate value of penetration testing lies in the actionable insights it provides. Upon completion of the testing phase, we deliver a detailed report outlining all identified vulnerabilities, their potential impact, and clear, prioritized recommendations for remediation. Our reports are designed to be understandable for both technical and non-technical stakeholders, facilitating effective communication and decision-making. We also offer remediation support, working with your development and IT teams to ensure vulnerabilities are correctly addressed and security posture is significantly improved. Regular penetration testing is not just a compliance checkbox but a vital component of a robust, continuous security improvement program that protects your critical assets.`
        }
    },
    {
        id: 'cloud-security',
        name: 'Cloud Security',
        shortDescription: 'Protecting data and applications in the cloud.',
        image: '//itb-img.s3.ap-southeast-1.amazonaws.com/public/images/cloud-security.jpg',
        details: {
            heading1: 'Securing Your Cloud Environment from End-to-End',
            paragraph1: `As businesses increasingly migrate their operations to cloud platforms like AWS, Azure, and Google Cloud, securing these dynamic environments becomes paramount. Our Cloud Security service at ITB provides end-to-end protection for your cloud infrastructure, applications, and data. We begin by assessing your current cloud configuration, identifying misconfigurations, access control weaknesses, and compliance gaps that could expose your assets to risk. Our experts are well-versed in the shared responsibility model of cloud security, ensuring that both your responsibilities and those of your cloud provider are clearly understood and adequately addressed.`,
            heading2: 'Cloud Security Architecture and Compliance',
            paragraph2: `We assist in designing and implementing secure cloud architectures that integrate security from the ground up, rather than as an afterthought. This includes setting up robust Identity and Access Management (IAM) policies, configuring secure network segmentation, implementing data encryption strategies, and deploying cloud-native security tools. Our team ensures that your cloud environment adheres to relevant industry standards and regulatory compliance frameworks such as ISO 27001, GDPR, HIPAA, and PCI DSS. We help establish continuous monitoring and logging mechanisms to detect and respond to security incidents in real-time, providing visibility into your cloud security posture.`,
            heading3: 'Continuous Monitoring and Threat Detection',
            paragraph3: `The ephemeral nature of cloud resources demands continuous vigilance. Our Cloud Security service includes the implementation of advanced threat detection and response capabilities tailored for cloud environments. We leverage Security Information and Event Management (SIEM) systems and Cloud Security Posture Management (CSPM) tools to provide automated insights and alerts on potential security breaches or policy violations. Our expertise extends to securing serverless architectures, containerized applications, and DevOps pipelines within the cloud. Partnering with ITB ensures that your cloud journey is secure, compliant, and optimized for both performance and protection, allowing you to fully harness the power of cloud computing with confidence.`
        }
    },
    {
        id: 'security-training',
        name: 'Security Training',
        shortDescription: 'Customized courses for your team.',
        image: '//itb-img.s3.ap-southeast-1.amazonaws.com/public/images/security-training.jpg',
        details: {
            heading1: 'Empowering Your Employees: The Human Firewall',
            paragraph1: `In the realm of cybersecurity, technology alone is not enough. Human error remains one of the most significant attack vectors for cybercriminals. Our Security Training service at ITB is designed to transform your employees into your strongest defense mechanism – a "human firewall." We offer comprehensive and engaging training programs that go beyond basic awareness, educating your staff on the latest cybersecurity threats, best practices, and their crucial role in protecting organizational assets. Our courses are tailored to different roles within your company, from general employees to IT professionals and executives, ensuring relevance and maximum impact.`,
            heading2: 'Customized Programs for Real-World Scenarios',
            paragraph2: `We understand that every organization has unique needs. Our security training programs are not one-size-fits-all; instead, they are customized to address the specific risks and challenges faced by your industry and company. Topics covered include phishing attack recognition, social engineering tactics, password hygiene, secure Browse habits, data privacy best practices, and mobile device security. We incorporate real-world examples and interactive exercises to make the learning experience engaging and memorable. Our trainers are experienced cybersecurity professionals who can translate complex technical concepts into clear, actionable advice that resonates with your team.`,
            heading3: 'Phishing Simulations and Continuous Education',
            paragraph3: `To reinforce learning and test your team\'s preparedness, we can integrate regular simulated phishing campaigns. These controlled exercises help identify susceptible employees and areas where further training is needed, providing valuable insights into your organization\'s human risk factor. Our training programs are part of a continuous education model, with periodic refreshers and updates on emerging threats to keep your team vigilant. Investing in security awareness training with ITB significantly reduces the likelihood of successful cyberattacks, fosters a security-conscious culture, and ultimately strengthens your overall cybersecurity posture by empowering your most valuable asset: your people.`
        }
    },
    {
        id: 'data-recovery',
        name: 'Data Recovery',
        shortDescription: 'Professional services for lost or corrupted data recovery.',
        image: '//itb-img.s3.ap-southeast-1.amazonaws.com/public/images/data-recovery.jpg',
        details: {
            heading1: 'Recovering Your Critical Data from Catastrophe',
            paragraph1: `Data loss can be catastrophic for any business, leading to significant downtime, financial losses, and reputational damage. At ITB, our Data Recovery service is designed to help you retrieve lost, corrupted, or inaccessible data from a wide range of storage devices. Whether it\'s due to hardware failure, accidental deletion, virus attacks, natural disasters, or logical errors, our expert technicians employ advanced techniques and state-of-the-art tools to recover your critical information. We understand the urgency of data loss scenarios and prioritize rapid, secure recovery to minimize impact on your operations.`,
            heading2: 'Advanced Recovery Techniques Across All Media',
            paragraph2: `Our data recovery specialists are proficient in handling various storage media and data loss scenarios. This includes recovery from traditional Hard Disk Drives (HDDs), Solid State Drives (SSDs), RAID arrays, USB drives, memory cards, and virtualized environments. We utilize forensic-level software and, when necessary, work in cleanroom environments for physical damage cases to ensure the highest possible success rates without compromising data integrity. Our methodologies adhere to strict data privacy protocols, ensuring your recovered information remains confidential and secure throughout the process. Each recovery case is treated with the utmost care and precision.`,
            heading3: 'Beyond Recovery: Prevention and Business Continuity',
            paragraph3: `While data recovery is crucial, our service extends beyond just retrieving lost files. We also provide invaluable insights and recommendations to help prevent future data loss incidents. This includes advising on robust backup strategies, implementing disaster recovery plans, and enhancing data protection measures within your organization. Our goal is to not only recover your data but also to strengthen your overall data resilience and business continuity planning. Partner with ITB for reliable data recovery services that get you back on track quickly, and for expert advice that safeguards your information against future threats.`
        }
    },
    securityConsultingData
];


// Main Routes
app.get('/', (req, res) => {
    res.render('index', {
        pageTitle: 'Home - ITB',
        heroHeading: 'Innovative Solutions for Digital Security',
        heroSubheading: 'Protecting Your Future in the Digital World',
        servicesData: servicesData
    });
});

app.get('/services', (req, res) => {
    res.render('services', {
        pageTitle: 'Services - ITB',
        servicesList: servicesData
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About Us - ITB',
        companyDescription: 'We are a team of expert IT and security professionals, dedicated to providing cutting-edge solutions to protect our clients\' infrastructure and data.'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        pageTitle: 'Contact Us - ITB',
        contactEmail: 'info@itbcons.com'
    });
});

// Route for Service Detail Pages
app.get('/services/:id', (req, res) => {
    const serviceId = req.params.id;
    const service = servicesData.find(s => s.id === serviceId);
    if (service) {
        res.render('service-detail', {
            pageTitle: `${service.name} - ITB`,
            service: service
        });
    } else {
        res.status(404).render('404', { pageTitle: 'Page Not Found - ITB' });
    }
});

// Catch-all for 404 errors
app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found - ITB' });
});

// Start the server
app.listen(port, host, () => {
    console.log(`Server started on http://${host}:${port} (listening on localhost only)`);
});

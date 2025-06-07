// ===============================================
// --- IMPORTS AND INITIALIZATION ---
// ===============================================
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const config = require('../itbcons-website-config/config.json'); // Load the SMTP configuration

const app = express();
const port = process.env.PORT || 3000;
const host = '127.0.0.1'; // Listen on localhost only


// ===============================================
// --- MIDDLEWARE SETUP (CORRECT ORDER) ---
// ===============================================

// 1. EJS template engine configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 2. Serve static files (CSS, client-side JavaScript) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// 3. Parse URL-encoded bodies (as sent by HTML forms)
//    This middleware MUST come before any routes that need to access req.body.
app.use(express.urlencoded({ extended: true }));


// ===============================================
// --- ROUTE HANDLERS ---
// ===============================================

// POST route for sending email (Handles the contact form)
app.post('/send-email', async (req, res) => {
    // req.body now correctly holds the form data thanks to the middleware above.
    const { name, email, subject, message } = req.body;

    // Create a Nodemailer "transporter" using the data from config.json
    const transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: {
            user: config.user,
            pass: config.pass
        }
    });

    // Define the email options
    const mailOptions = {
        from: `"${name}" <${config.from}>`, // Use the authorized "from" address from your config
        replyTo: email,                      // Set the user's email as the reply-to address
        to: config.recipient,                // The address that receives the form submissions
        subject: `New Contact Form Submission: ${subject}`,
        text: `You have a new message from:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `<p>You have a new message from:</p>
               <ul>
                 <li><strong>Name:</strong> ${name}</li>
                 <li><strong>Email:</strong> ${email}</li>
               </ul>
               <p><strong>Message:</strong></p>
               <p>${message}</p>`
    };

    // Send the email and handle success/failure
    try {
        await transporter.sendMail(mailOptions);
        // On success, render the success page
        res.render('contact-success', {
            pageTitle: 'Message Sent - ITB',
            banner: {
                title: 'Thank You!',
                imageUrl: bannerImage // Assumes bannerImage constant is available
            }
        });
    } catch (error) {
        console.error('Error sending email:', error);
        // On error, render the error page
        res.render('contact-error', {
            pageTitle: 'Submission Error - ITB',
            banner: {
                title: 'Something Went Wrong',
                imageUrl: bannerImage // Assumes bannerImage constant is available
            }
        });
    }
});


// ===============================================
// --- SITE DATA (for templates) ---
// ===============================================
const securityConsultingData = {
    id: 'security-consulting',
    name: 'Security Consulting',
    shortDescription: 'Vulnerability analysis and mitigation strategies.',
    image: '//itb-img.s3.ap-southeast-1.amazonaws.com/public/images/security-consulting.jpg',
    details: {
        heading1: 'Strategic Security Guidance for the Modern Enterprise',
        paragraph1: `In today's intricate digital landscape, a robust security posture is not a luxury but a fundamental necessity for survival and growth. At ITB, our Security Consulting service provides the strategic, high-level guidance your organization needs to navigate the complexities of cybersecurity. We go beyond simple fixes, acting as your trusted advisors to build a resilient and proactive security framework that aligns with your specific business objectives. Our process begins with a comprehensive discovery phase, where we immerse ourselves in your operational environment, understanding your critical assets, data flows, regulatory obligations, and risk appetite. This holistic viewpoint allows us to identify not just technical vulnerabilities, but also potential gaps in policy, procedure, and personnel awareness. We believe that true security is an integrated function of the entire business, not just the IT department. Therefore, our consultants collaborate closely with your leadership and key stakeholders to ensure our recommendations are practical, scalable, and culturally aligned with your organization.`,
        heading2: 'Comprehensive Risk Assessment and Mitigation Planning',
        paragraph2: `Our core consulting methodology is built on a foundation of meticulous risk assessment. We employ a combination of industry-standard frameworks like NIST and ISO 27001, alongside our proprietary analysis techniques, to conduct thorough evaluations of your infrastructure, applications, and third-party integrations. This isn't just a technical scan; it's a deep-dive analysis that quantifies potential impacts and likelihoods of various threat scenarios. The result is a clear, prioritized list of risks that allows for intelligent allocation of resources. Following the assessment, we develop a strategic, multi-phased mitigation roadmap. This roadmap provides actionable steps, from immediate tactical remediations to long-term strategic enhancements. We detail necessary policy developments, suggest appropriate technological controls, and outline critical training initiatives. Our goal is to empower you with a clear path forward, transforming abstract risks into manageable action items that demonstrably improve your security posture and protect your bottom line against unforeseen cyber events.`,
        heading3: 'Governance, Compliance, and Continuous Improvement',
        paragraph3: `Achieving and maintaining compliance with regulatory standards such as GDPR, HIPAA, or PCI-DSS can be a daunting task. Our security consultants are experts in navigating these complex legal and regulatory waters. We assist in interpreting requirements, conducting gap analyses, and implementing the necessary controls and documentation to ensure you meet your obligations and avoid costly penalties. Beyond one-time compliance, we help instill a culture of continuous security improvement within your organization. We can assist in establishing a security governance framework, defining roles and responsibilities, and setting up key performance indicators (KPIs) to measure the effectiveness of your security program over time. This creates a sustainable cycle of monitoring, reviewing, and enhancing your defenses, ensuring that your security posture evolves in tandem with the ever-changing threat landscape. With ITB's expert guidance, security becomes a strategic enabler for your business, fostering trust with your customers and providing a solid foundation for future innovation.`
    }
};

const servicesData = [
    {
        id: 'system-integrator',
        name: 'System Integrator',
        shortDescription: 'Seamlessly connecting disparate IT systems into a cohesive infrastructure.',
        image: '//itb-img.s3.ap-southeast-1.amazonaws.com/public/images/system-integrator.jpg',
        details: {
            heading1: 'Architecting a Unified Digital Ecosystem',
            paragraph1: `In the modern enterprise, efficiency and agility are directly tied to how well disparate technological components communicate. Our System Integration service is dedicated to breaking down digital silos and architecting a cohesive, unified IT ecosystem. We specialize in connecting diverse applications, databases, cloud services, and legacy systems, ensuring seamless data flow and process automation across your entire organization. Our approach begins with a comprehensive architectural analysis, where we map your existing systems and identify key integration points and potential bottlenecks. We assess your business workflows to understand how information needs to move between departments and functions. This deep analysis allows us to design a robust and scalable integration strategy that eliminates data redundancy, reduces manual data entry, and provides a single source of truth for your critical business information. By creating this unified foundation, we empower your teams to collaborate more effectively and make faster, better-informed decisions based on real-time, consolidated data, transforming your collection of separate systems into a powerful, synergistic whole.`,
            heading2: 'Custom API and Middleware Development',
            paragraph2: `At the heart of successful system integration lies the sophisticated development of custom Application Programming Interfaces (APIs) and middleware solutions. Our expert developers are proficient in building secure, reliable, and high-performance bridges that allow your systems to talk to each other fluently. Whether it involves connecting your CRM with your ERP, linking your e-commerce platform to your inventory management system, or integrating cloud-based SaaS applications with on-premise databases, we have the expertise to handle the challenge. We adhere to modern development practices, including RESTful and SOAP principles, to create APIs that are not only effective but also well-documented and easy to maintain. Our middleware solutions act as a central hub, managing data transformation, routing, and protocol translation between different systems. This ensures that even legacy systems can be incorporated into a modern, agile infrastructure without requiring a complete overhaul, thus maximizing the return on your existing technology investments while preparing your business for future growth and technological change.`,
            heading3: 'End-to-End Integration Project Management',
            paragraph3: `A successful integration project requires more than just technical skill; it demands meticulous planning, project management, and a commitment to minimizing operational disruption. ITB manages the entire integration lifecycle from concept to completion and beyond. Our process begins with a detailed project plan that outlines clear timelines, milestones, and deliverables. We conduct rigorous testing in a sandboxed environment to ensure that all integrated components function flawlessly together before any changes are made to your live systems. Our deployment strategy is carefully phased to ensure a smooth transition with minimal downtime. Post-deployment, we don't just walk away. We provide comprehensive support and monitoring to ensure the stability and performance of the integrated ecosystem. We offer ongoing optimization services to adapt the integration as your business needs evolve, ensuring your systems remain aligned with your strategic goals. With ITB as your integration partner, you can be confident that your project will be delivered on time, within budget, and to the highest standard of quality.`
        }
    },
    {
        id: 'penetration-testing',
        name: 'Penetration Testing',
        shortDescription: 'Attack simulations to identify weaknesses.',
        image: '//itb-img.s3.ap-southeast-1.amazonaws.com/public/images/penetration-testing.jpg',
        details: {
            heading1: 'Proactive Defense Through Ethical Hacking',
            paragraph1: `In cybersecurity, the best defense is a proactive one. Our Penetration Testing service, also known as ethical hacking, provides the ultimate stress test for your digital defenses. We simulate the actions of a real-world attacker, using their tools, techniques, and creativity to identify and exploit vulnerabilities within your systems before malicious actors can. This is not a simple automated scan; it is a meticulous, hands-on engagement led by our team of certified ethical hackers. They immerse themselves in the mindset of an adversary to uncover weaknesses that automated tools often miss, such as complex business logic flaws, chained exploits, and configuration errors. The goal is to provide you with a true understanding of your security posture from an attacker's perspective. By identifying how an attacker could potentially breach your defenses, gain access to sensitive data, or disrupt your operations, we provide you with the critical intelligence needed to fortify your environment against actual threats, turning reactive measures into proactive, resilient security controls.`,
            heading2: 'Tailored Scopes and Comprehensive Methodologies',
            paragraph2: `We recognize that every organization is unique, which is why we don't believe in a one-size-fits-all approach to penetration testing. Each engagement begins with a detailed scoping session where we work with you to define the objectives, target assets, and rules of engagement. Whether you need to test your external network perimeter, your internal corporate network, a specific web application, or your cloud environment, we tailor the scope to meet your specific security concerns and compliance requirements. Our testing methodologies are aligned with industry-best-practice frameworks such as the OWASP Top 10 for web applications, the Penetration Testing Execution Standard (PTES), and the MITRE ATT&CK framework. This ensures our approach is structured, comprehensive, and repeatable. We conduct everything from reconnaissance, threat modeling, to vulnerability scanning, manual exploitation, and post-exploitation analysis, ensuring a thorough evaluation of your defenses at every layer of the technology stack.`,
            heading3: 'Actionable Reporting and Strategic Remediation',
            paragraph3: `The true value of a penetration test lies in its output. Upon completion of our engagement, we provide a comprehensive and easily digestible report that clearly outlines our findings. Each identified vulnerability is documented in detail, including a description of the weakness, the steps we took to exploit it, and evidence such as screenshots or command outputs. Crucially, we assign each vulnerability a risk rating based on its potential impact on your business and the ease of exploitation, allowing you to prioritize your remediation efforts effectively. But we don't stop at just identifying problems. Our report provides clear, actionable recommendations for remediation for each finding. We offer strategic guidance to your technical teams on how to not only fix the immediate issue but also improve the underlying processes to prevent similar vulnerabilities from re-emerging. We are available for post-test consultations to ensure your team fully understands the report and has a clear path forward to a stronger, more secure posture.`
        }
    },
    {
        id: 'cloud-security',
        name: 'Cloud Security',
        shortDescription: 'Protecting data and applications in the cloud.',
        image: '//itb-img.s3.ap-southeast-1.amazonaws.com/public/images/cloud-security.jpg',
        details: {
            heading1: 'Securing Your Journey to the Cloud and Beyond',
            paragraph1: `The migration to cloud platforms like AWS, Azure, and Google Cloud offers unprecedented opportunities for agility, scalability, and innovation. However, this transition also introduces a new paradigm of security challenges. At ITB, our Cloud Security service is designed to ensure your organization can harness the full power of the cloud with confidence. We provide end-to-end security solutions that protect your data, applications, and infrastructure across any cloud environment. Our approach is grounded in the principle of the shared responsibility model; we help you clearly understand which security aspects are managed by the cloud provider and which are your responsibility. We then work to secure your portion of the stack with robust, cloud-native controls. Our service begins with a thorough assessment of your existing or planned cloud architecture, identifying common misconfigurations, identity and access management (IAM) weaknesses, and data exposure risks that could leave your organization vulnerable to attack.`,
            heading2: 'Cloud Security Posture Management (CSPM)',
            paragraph2: `A primary focus of our service is Cloud Security Posture Management (CSPM), a continuous process of discovery, assessment, and remediation of cloud risks. The dynamic and ephemeral nature of cloud resources means that traditional security monitoring is no longer sufficient. We implement advanced tools and processes that continuously scan your cloud environments for misconfigurations and compliance violations against industry benchmarks like the CIS Foundations Benchmarks. This provides real-time visibility into your security posture and allows for the automated detection of risks such as overly permissive IAM roles, unencrypted data storage, or public-facing network security groups. When a risk is detected, we provide automated alerts and guided remediation steps to help your team resolve the issue quickly. This proactive approach helps prevent data breaches caused by simple configuration errors and ensures your cloud environment remains secure and compliant as it evolves over time, providing a solid foundation of security hygiene.`,
            heading3: 'Advanced Threat Detection and Workload Protection',
            paragraph3: `Beyond posture management, we focus on protecting your actual cloud workloads—the virtual machines, containers, and serverless functions that run your applications. Our Cloud Workload Protection Platform (CWPP) solutions provide advanced threat detection and response capabilities tailored specifically for the cloud. This includes implementing intrusion detection systems (IDS), web application firewalls (WAF), and runtime protection for your containerized environments using technologies like Kubernetes. We help you establish comprehensive logging and monitoring, aggregating data from various cloud services into a centralized Security Information and Event Management (SIEM) system for intelligent threat analysis and incident response. We also specialize in securing your CI/CD pipeline, embedding security checks directly into your development and deployment processes (DevSecOps) to ensure that vulnerabilities are caught early and that only secure code makes it to production. With ITB's expertise, you can ensure that every layer of your cloud stack, from the foundational configuration to the individual application workloads, is protected against advanced threats.`
        }
    },
    {
        id: 'security-training',
        name: 'Security Training',
        shortDescription: 'Customized courses for your team.',
        image: '//itb-img.s3.ap-southeast-1.amazonaws.com/public/images/security-training.jpg',
        details: {
            heading1: 'Building Your Human Firewall: The First Line of Defense',
            paragraph1: `In the world of cybersecurity, even the most advanced technological defenses can be rendered useless by a single moment of human error. Phishing, social engineering, and unintentional policy violations remain the leading causes of costly data breaches. At ITB, our Security Training service is designed to address this critical vulnerability by transforming your employees from a potential liability into your most powerful security asset: a vigilant and educated "human firewall." We believe that an effective security awareness program is a fundamental pillar of any robust defense-in-depth strategy. Our training goes beyond simply telling employees what not to do; we empower them with the knowledge and skills to understand the threats they face, recognize the signs of an attack, and know exactly how to respond when they encounter suspicious activity. By fostering a strong security culture, we help reduce your organization's overall risk profile and build a resilient workforce capable of defending against modern cyber threats.`,
            heading2: 'Engaging, Role-Based Training Programs',
            paragraph2: `We understand that generic, one-size-fits-all training is ineffective. To truly resonate, security education must be relevant to an employee's specific role and responsibilities. Our training programs are therefore highly customized to your organization and the different roles within it. For general staff, we focus on core topics like identifying phishing emails, practicing good password hygiene, securing mobile devices, and understanding data privacy principles. For more privileged users, such as system administrators or finance personnel, we provide advanced training on topics relevant to their elevated access levels. Our content is delivered through a variety of engaging formats, including interactive e-learning modules, live instructor-led workshops, and realistic attack simulations. We use real-world examples and storytelling to make complex topics understandable and memorable, ensuring that the lessons learned are not quickly forgotten. This tailored and engaging approach leads to higher retention rates and a more meaningful impact on employee behavior.`,
            heading3: 'Continuous Reinforcement and Phishing Simulations',
            paragraph3: `Security awareness is not a one-time event; it's an ongoing process. To ensure that security remains top-of-mind, our program includes continuous reinforcement and practical testing. We conduct regular, controlled phishing simulations that mimic the latest real-world attack techniques. These campaigns are a safe way to test your employees' vigilance and identify individuals or departments that may require additional, targeted training. The results provide you with valuable metrics to track your organization's progress and measure the effectiveness of the training program over time. In addition to simulations, we provide ongoing communication materials such as security newsletters, posters, and brief video updates on emerging threats. This multi-faceted approach ensures that security awareness becomes an integral part of your corporate culture, creating a lasting and effective defense against the human element of cyber risk. With ITB's training, you are investing in the long-term security and resilience of your entire organization.`
        }
    },
    {
        id: 'data-recovery',
        name: 'Data Recovery',
        shortDescription: 'Professional services for lost or corrupted data recovery.',
        image: '//itb-img.s3.ap-southeast-1.amazonaws.com/public/images/data-recovery.jpg',
        details: {
            heading1: 'Rapid Response for Critical Data Loss Incidents',
            paragraph1: `The loss of critical data can bring a business to a grinding halt, leading to devastating financial consequences, operational downtime, and a loss of customer trust. When disaster strikes, you need a partner with the expertise and technology to respond quickly and effectively. ITB's Data Recovery service is your lifeline in these critical situations. We specialize in recovering lost, corrupted, or inaccessible data from a wide variety of scenarios, including hardware failure, accidental deletion, ransomware attacks, software corruption, and physical damage from events like fires or floods. Our team of experienced recovery specialists understands the urgency of your situation. We employ a rapid-response methodology, beginning with a thorough and immediate diagnosis to assess the extent of the data loss and determine the most viable recovery strategy. We work with precision and care to retrieve your valuable information while maintaining the strictest confidentiality and data privacy protocols, getting you back to business as quickly as possible.`,
            heading2: 'Advanced Techniques Across All Storage Media',
            paragraph2: `Our data recovery capabilities span a comprehensive range of storage devices and systems. We have extensive experience with traditional Hard Disk Drives (HDDs), modern Solid-State Drives (SSDs), complex RAID arrays (RAID 0, 1, 5, 6, 10), and external storage devices like USB drives and memory cards. Our expertise also extends to more complex environments, including virtualized systems (VMware, Hyper-V), databases, and network-attached storage (NAS) devices. We utilize a combination of cutting-edge software tools and, when necessary, advanced physical recovery techniques in a certified cleanroom environment. This allows us to perform intricate procedures like platter swaps or read/write head replacements on physically damaged drives without causing further data loss. Our systematic and methodical approach ensures the highest possible success rate, even in the most challenging recovery situations. We treat every case with the meticulous attention it deserves, because we know that every bit of recovered data is critical to your organization.`,
            heading3: 'Beyond Recovery: Proactive Prevention and Forensics',
            paragraph3: `While our primary goal is to recover your lost data, our service provides value that extends beyond the immediate incident. After a successful recovery, we provide you with a detailed analysis of the root cause of the data loss. This insight is invaluable in helping you prevent similar incidents in the future. We offer expert recommendations on how to improve your data protection strategies, including guidance on implementing robust and automated backup solutions, creating effective disaster recovery plans, and enhancing your overall cybersecurity posture to defend against threats like ransomware. In cases involving malicious activity, our team can perform digital forensic analysis to preserve evidence in a legally sound manner, which can be crucial for insurance claims or legal proceedings. By partnering with ITB for data recovery, you not only get your critical data back but also gain a strategic advantage in building a more resilient and secure data environment for the future.`
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


// ===============================================
// --- MAIN GET ROUTES ---
// ===============================================

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
    // Pass the query params to the view so we can show success/error messages
    res.render('contact', {
        pageTitle: 'Contact Us - ITB',
        contactEmail: 'info@itbcons.com',
        banner: {
            title: 'Get In Touch With Our Experts',
            imageUrl: bannerImage
        },
        query: req.query
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


// ===============================================
// --- 404 AND SERVER START ---
// ===============================================

// Catch-all for 404 errors (must be the last route)
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

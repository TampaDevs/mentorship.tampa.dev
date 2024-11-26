import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedIndustries() {
  const industries = [
    { name: '3D printing', slug: '3d-printing' },
    { name: 'AdTech', slug: 'adtech' },
    { name: 'AI/Machine Learning', slug: 'ai-machine-learning' },
    { name: 'Augmented reality', slug: 'augmented-reality' },
    { name: 'Big Data Analytics', slug: 'big-data-analytics' },
    { name: 'Blockchain', slug: 'blockchain' },
    { name: 'Cloud computing', slug: 'cloud-computing' },
    { name: 'Cybersecurity', slug: 'cybersecurity' },
    { name: 'Data Science', slug: 'data-science' },
    { name: 'Digital Marketing', slug: 'digital-marketing' },
    { name: 'E-commerce', slug: 'e-commerce' },
    { name: 'EdTech', slug: 'edtech' },
    { name: 'Enterprise Software', slug: 'enterprise-software' },
    { name: 'FinTech', slug: 'fintech' },
    { name: 'Gaming', slug: 'gaming' },
    { name: 'Healthtech', slug: 'healthtech' },
    { name: 'HR Tech', slug: 'hr-tech' },
    { name: 'Insurtech', slug: 'insurtech' },
    { name: 'Internet of Things (IoT)', slug: 'internet-of-things-iot' },
    { name: 'Legal Tech', slug: 'legal-tech' },
    { name: 'Logistics Tech (LogTech)', slug: 'logistics-tech-logtech' },
    { name: 'Machine learning', slug: 'machine-learning' },
    { name: 'Media Tech', slug: 'media-tech' },
    { name: 'Mobile App Development', slug: 'mobile-app-development' },
    { name: 'Mobile applications', slug: 'mobile-applications' },
    { name: 'Nanotechnology', slug: 'nanotechnology' },
    { name: 'Natural language processing (NLP)', slug: 'natural-language-processing-nlp' },
    { name: 'Network infrastructure', slug: 'network-infrastructure' },
    { name: 'Proptech (Property Technology)', slug: 'proptech-property-technology' },
    { name: 'Quantum computing', slug: 'quantum-computing' },
    { name: 'RegTech (Regulatory Technology)', slug: 'regtech-regulatory-technology' },
    { name: 'Robotics', slug: 'robotics' },
    { name: 'Semiconductor manufacturing', slug: 'semiconductor-manufacturing' },
    { name: 'Social Media', slug: 'social-media' },
    { name: 'Software as a Service (SaaS)', slug: 'software-as-a-service-saas' },
    { name: 'Space technology', slug: 'space-technology' },
    { name: 'Telecommunications', slug: 'telecommunications' },
    { name: 'Virtual Reality', slug: 'virtual-reality' },
    { name: 'Wearable technology', slug: 'wearable-technology' },
    { name: 'Web Development', slug: 'web-development' },
    { name: 'Wireless technology', slug: 'wireless-technology' },
  ];

  await prisma.industry.createMany({ data: industries });
}

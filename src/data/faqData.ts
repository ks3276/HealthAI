export interface FAQItem {
  id: string;
  category: 'General' | 'Security' | 'Medical Accuracy' | 'Mobile & Access';
  question: string;
  answer: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Medical Accuracy',
    question: 'Is this chatbot a replacement for professional medical advice or doctors?',
    answer: 'No. HealthAI is an educational public health tool designed for awareness, health literacy, and preventive guidance. It does NOT provide clinical diagnoses or replace emergency medical evaluations. In case of acute or life-threatening symptoms, always call your local emergency services or consult a licensed healthcare professional immediately.'
  },
  {
    id: 'faq-2',
    category: 'Security',
    question: 'Is my health information private and secure when asking questions?',
    answer: 'Yes, 100%. We employ zero-retention data policies for personal identifiers. All interaction traffic is encrypted using AES-256 and SSL/TLS standards. We do not sell or track your personal medical history.'
  },
  {
    id: 'faq-3',
    category: 'General',
    question: 'Which public health diseases and conditions are covered in HealthAI?',
    answer: 'HealthAI covers over 50+ communicable and non-communicable diseases, including Dengue, Malaria, COVID-19, Type 2 Diabetes, Hypertension, Tuberculosis, Asthma, Seasonal Influenza, Cholera, and Typhoid, with real-time vector and outbreak advice.'
  },
  {
    id: 'faq-4',
    category: 'General',
    question: 'Is HealthAI available 24 hours a day, 7 days a week?',
    answer: 'Yes! HealthAI operates continuously 24/7 on high-availability cloud infrastructure so you can access reliable disease prevention information anytime, from anywhere.'
  },
  {
    id: 'faq-5',
    category: 'Mobile & Access',
    question: 'Can I use HealthAI on my mobile smartphone or tablet?',
    answer: 'Absolutely. The HealthAI platform is built as a progressive, mobile-first responsive web application. It functions seamlessly on iOS, Android, laptops, and desktop browsers without requiring heavy app downloads.'
  },
  {
    id: 'faq-6',
    category: 'Medical Accuracy',
    question: 'Where does HealthAI source its health and disease prevention information?',
    answer: 'Our knowledge bases are synthesized from peer-reviewed public health guidelines issued by global authorities, including the World Health Organization (WHO), Centers for Disease Control and Prevention (CDC), and verified public health literature.'
  }
];

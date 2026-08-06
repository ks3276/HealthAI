export interface Testimonial {
  id: string;
  name: string;
  occupation: string;
  location: string;
  avatar: string;
  rating: number;
  review: string;
  tag: string;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Dr. Elena Rostova',
    occupation: 'Epidemiologist & Public Health Officer',
    location: 'Geneva, Switzerland',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    review: 'HealthAI is a game-changer for community health literacy. It breaks down complex medical research into clear, actionable prevention steps that empower citizens before minor symptoms turn into severe outbreaks.',
    tag: 'Public Health Professional'
  },
  {
    id: 'test-2',
    name: 'Marcus Chen',
    occupation: 'Community Health Coordinator',
    location: 'Singapore',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    review: 'During our regional Dengue awareness drive, HealthAI provided instant, multilingual advice on mosquito control that reached thousands of households. The 24/7 chatbot responsiveness is unbelievable.',
    tag: 'Community Leader'
  },
  {
    id: 'test-3',
    name: 'Sarah Jenkins',
    occupation: 'School Nurse & Parent',
    location: 'Austin, Texas',
    avatar: 'https://images.unsplash.com/photo-1594824813566-88855ce78965?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    review: 'I recommend HealthAI to parents all the time. When flu season hits, having an instant, trustworthy symptom check and preventive guide at your fingertips brings immense peace of mind.',
    tag: 'Verified User'
  }
];

import React, { useState } from 'react';
import { TESTIMONIALS_DATA } from '../data/testimonialsData';
import { Star, ChevronLeft, ChevronRight, MessageSquarePlus, X, Send, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsSubmitModalOpen(false);
      setName('');
      setOccupation('');
      setReview('');
    }, 2000);
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-health-500/10 text-health-600 dark:text-health-400 text-xs font-bold uppercase tracking-wider">
            <span>Community Voice</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Trusted by <span className="gradient-text">Health Professionals & Citizens</span>
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            See how HealthAI is transforming public disease awareness across communities worldwide.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Main Card View */}
          <div className="glass-card rounded-3xl p-8 lg:p-12 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl relative">
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              
              {/* User Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl overflow-hidden shadow-xl border-2 border-health-500/30">
                  <img
                    src={TESTIMONIALS_DATA[currentIndex].avatar}
                    alt={TESTIMONIALS_DATA[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-health-500 text-white text-[10px] font-bold shadow-md">
                  {TESTIMONIALS_DATA[currentIndex].tag}
                </span>
              </div>

              {/* Review Text */}
              <div className="space-y-4 text-center md:text-left flex-1">
                {/* Rating Stars */}
                <div className="flex items-center justify-center md:justify-start gap-1">
                  {[...Array(TESTIMONIALS_DATA[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Quote */}
                <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 italic leading-relaxed">
                  "{TESTIMONIALS_DATA[currentIndex].review}"
                </p>

                {/* Author Info */}
                <div>
                  <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {TESTIMONIALS_DATA[currentIndex].name}
                  </h4>
                  <p className="text-xs text-health-600 dark:text-health-400 font-semibold">
                    {TESTIMONIALS_DATA[currentIndex].occupation} • {TESTIMONIALS_DATA[currentIndex].location}
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              {TESTIMONIALS_DATA.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    currentIndex === i ? 'w-8 bg-health-500' : 'w-2.5 bg-slate-300 dark:bg-slate-700'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-health-500 hover:text-white transition-all shadow-sm"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextTestimonial}
                className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-health-500 hover:text-white transition-all shadow-sm"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="ml-4 flex items-center gap-2 px-4 py-3 rounded-2xl bg-health-500/10 hover:bg-health-500/20 text-health-600 dark:text-health-400 text-xs font-bold transition-all border border-health-500/30"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Submit Feedback</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Review Submission Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl p-6">
            
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Share Your Feedback</h3>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">Thank You!</h4>
                <p className="text-xs text-slate-500">Your feedback has been submitted to the HealthAI review board.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Full Name:</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Sarah Connor"
                    className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-health-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Occupation / Role:</label>
                  <input
                    type="text"
                    required
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    placeholder="e.g. Healthcare Worker / Resident"
                    className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-health-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Rating:</label>
                  <div className="flex gap-2 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1"
                      >
                        <Star className={`w-6 h-6 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Review:</label>
                  <textarea
                    required
                    rows={3}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="How has HealthAI helped you or your community?"
                    className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-health-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-health-500 hover:bg-health-600 text-white font-bold text-xs shadow-md shadow-health-500/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Review</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};

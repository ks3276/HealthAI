import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Image as ImageIcon, 
  Lock, 
  ZoomIn,
  Trash2,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export const ImagesSection: React.FC = () => {
  const { user, userSavedImages, deleteUserSavedImage } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'vault' | 'infographics'>('all');
  const [selectedImageModal, setSelectedImageModal] = useState<{ url: string; title: string; desc: string } | null>(null);

  const medicalInfographics = [
    {
      id: 'info-1',
      title: 'Dengue Fever Symptoms & Mosquito Prevention',
      category: 'infographics',
      url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
      desc: 'Visual clinical guide outlining high fever, eye pain, joint soreness, and standing water eradication.',
      source: 'WHO Vector-Borne Disease Infographic'
    },
    {
      id: 'info-2',
      title: 'Malaria Cycle & ITN Bed Net Protection',
      category: 'infographics',
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      desc: 'Anopheles mosquito transmission vector visual breakdown and bed net installation protocols.',
      source: 'CDC Malaria Eradication Media'
    },
    {
      id: 'info-3',
      title: 'Vaccination Schedule & Adult Booster Chart',
      category: 'infographics',
      url: 'https://images.unsplash.com/photo-1618961734760-466979ce35b0?auto=format&fit=crop&w=800&q=80',
      desc: 'Lifespan immunization roadmap covering BCG, DTP, Hepatitis B, MMR, and seasonal flu vaccines.',
      source: 'Global Immunization Registry'
    },
    {
      id: 'info-4',
      title: 'Type-2 Diabetes Low-Glycemic Food Pyramid',
      category: 'infographics',
      url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
      desc: 'Nutrition guide highlighting high-fiber legumes, Mediterranean dietary staples, and blood sugar control.',
      source: 'International Diabetes Federation'
    }
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-extrabold uppercase tracking-wider">
          <ImageIcon className="w-4 h-4 text-purple-500" />
          <span>Medical Visual Library & Patient Vault</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Disease Infographics & Saved Health Photos
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Browse verified clinical infographics or access your personal patient photo vault stored with your registered account.
        </p>

        {/* Notice Banner regarding Registered Account Image Storage */}
        <div className={`mt-4 p-3.5 rounded-2xl text-xs font-semibold flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left ${
          user 
            ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
            : 'bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400'
        }`}>
          {user ? (
            <>
              <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <span>
                <strong className="font-bold text-emerald-700 dark:text-emerald-300">Registered Patient Account ({user.name}):</strong> Photos attached or pasted during your chat sessions are securely stored here in your account vault. Deleting a chat automatically purges associated photos.
              </span>
            </>
          ) : (
            <>
              <Lock className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <span>
                <strong className="font-bold text-amber-700 dark:text-amber-300">Guest Mode:</strong> Please sign in with a registered account to automatically save your uploaded health photos to your account vault.
              </span>
            </>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center gap-2 flex-wrap">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            selectedCategory === 'all'
              ? 'bg-health-500 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
          }`}
        >
          All Visual Media ({medicalInfographics.length + userSavedImages.length})
        </button>

        {user && (
          <button
            onClick={() => setSelectedCategory('vault')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedCategory === 'vault'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>My Account Vault ({userSavedImages.length})</span>
          </button>
        )}

        <button
          onClick={() => setSelectedCategory('infographics')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            selectedCategory === 'infographics'
              ? 'bg-health-500 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
          }`}
        >
          Verified Infographics ({medicalInfographics.length})
        </button>
      </div>

      {/* Registered User Saved Photos Section */}
      {(selectedCategory === 'all' || selectedCategory === 'vault') && user && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-purple-500" />
              <span>Photo Vault</span>
            </h3>
            <span className="text-xs text-slate-400">
              {userSavedImages.length} image{userSavedImages.length === 1 ? '' : 's'} saved
            </span>
          </div>

          {userSavedImages.length === 0 ? (
            <div className="p-8 rounded-3xl bg-slate-100/50 dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-800 text-center space-y-2">
              <ImageIcon className="w-10 h-10 text-slate-400 mx-auto opacity-50" />
              <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300">No Patient Photos Saved Yet</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                When you upload or paste health photos (skin rash, cuts, or medicine labels) in the AI Chatbot, they will automatically be stored here in your account vault.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {userSavedImages.map((img) => (
                <div
                  key={img.id}
                  className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
                >
                  <div 
                    className="relative h-48 overflow-hidden bg-slate-950 cursor-pointer"
                    onClick={() => setSelectedImageModal({ url: img.url, title: img.title, desc: img.desc })}
                  >
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-purple-600/90 backdrop-blur-md text-white text-[10px] font-bold">
                      Account Vault
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-2">
                        {img.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                        {img.desc}
                      </p>
                    </div>
                    
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                      <span>{img.date} • {img.timestamp}</span>
                      <button
                        onClick={() => deleteUserSavedImage(img.id)}
                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-colors"
                        title="Delete photo from vault"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Grid of Medical Infographics */}
      {(selectedCategory === 'all' || selectedCategory === 'infographics') && (
        <div className="space-y-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Public Health Infographics & Clinical Charts
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {medicalInfographics.map((img) => (
              <div
                key={img.id}
                onClick={() => setSelectedImageModal({ url: img.url, title: img.title, desc: img.desc })}
                className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold">
                    WHO Verified
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-2">
                      {img.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                      {img.desc}
                    </p>
                  </div>
                  <div className="text-[10px] text-health-600 dark:text-health-400 font-semibold pt-2 border-t border-slate-100 dark:border-slate-800">
                    {img.source}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Modal Lightbox */}
      {selectedImageModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImageModal(null)}
        >
          <div 
            className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden max-w-2xl w-full border border-slate-200 dark:border-slate-800 p-6 space-y-4 animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-72 rounded-2xl overflow-hidden bg-slate-950">
              <img src={selectedImageModal.url} alt={selectedImageModal.title} className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedImageModal.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{selectedImageModal.desc}</p>
            </div>
            <button
              onClick={() => setSelectedImageModal(null)}
              className="w-full py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200"
            >
              Close Lightbox
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

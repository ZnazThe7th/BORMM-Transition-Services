'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, Rocket, FileText, PenTool, Compass, TrendingUp, Check, Clock, Video, AlertCircle, X, Zap, Briefcase, RefreshCw, Mail, Map, CalendarHeart, CircleDollarSign } from 'lucide-react';
import { initAuth, googleSignIn, getAccessToken, logout } from '../lib/firebase';
import { addClientToSheet, createCalendarEvent, sendNotificationEmail, addTasks, addContact } from '../lib/workspace';
import { BormmLogo } from '../components/BormmLogo';

const services = [
  {
    title: 'Quick Clarity Call',
    price: '$15',
    description: 'Need a fresh perspective or help thinking through your next step? This focused session is designed for individuals who need quick guidance on career transitions, housing concerns, budgeting questions, job search strategies, or personal challenges. You\'ll leave with practical suggestions, resources, and a clearer path forward.',
    icon: Zap,
    duration: '30 min',
    popular: false,
    listTitle: 'Best For:',
    items: ['Quick questions', 'Career advice', 'Housing concerns', 'Budgeting questions', 'General life transitions']
  },
  {
    title: 'Layoff to Launch Strategy Session',
    price: '$25',
    description: 'Life changes can feel overwhelming, but they can also create new opportunities. This personalized session is designed for individuals navigating layoffs, career changes, underemployment, or major life transitions. Together, we\'ll assess your current situation, identify immediate priorities, and create an actionable plan to help you regain momentum and move forward with confidence.',
    icon: Briefcase,
    duration: '45 min',
    popular: false,
    listTitle: 'You\'ll Receive:',
    items: ['Situation assessment', 'Personalized action plan', 'Resource recommendations', 'Follow-up session summary']
  },
  {
    title: 'Resume Refresh Session',
    price: '$25',
    description: 'Your resume is often your first impression. This session provides personalized feedback and recommendations to strengthen your resume and improve your job search strategy. We\'ll discuss formatting, accomplishments, keywords, and ways to better position your experience for today\'s job market.',
    icon: RefreshCw,
    duration: '45 min',
    popular: true,
    listTitle: 'Includes:',
    items: ['Resume review', 'Improvement recommendations', 'LinkedIn profile suggestions', 'Job search guidance']
  },
  {
    title: 'Letter & Correspondence Support',
    price: '$25',
    description: 'Sometimes the right words make all the difference. Receive guidance on drafting professional correspondence related to employment matters, housing concerns, disputes, hardship requests, appeals, or other important communications. We\'ll help you organize your thoughts and create a clear, professional message. (Guidance & drafting support only, does not constitute legal advice).',
    icon: Mail,
    duration: '45 min',
    popular: false,
    listTitle: 'Common Requests:',
    items: ['Professional letters', 'Appeal letters', 'Hardship requests', 'Housing correspondence', 'Follow-up communications']
  },
  {
    title: 'BORMM Transition Blueprint',
    price: '$50',
    description: 'A comprehensive strategy session for individuals ready to take control of their next chapter. Together, we\'ll review your career goals, housing situation, financial organization, and personal priorities to create a customized 30-day action plan. This session is ideal for those experiencing major life changes and looking for a clear roadmap forward.',
    icon: Map,
    duration: '60 min',
    popular: false,
    listTitle: 'Includes:',
    items: ['Career review', 'Housing review', 'Financial organization discussion', 'Goal-setting session', 'Customized 30-day action plan']
  },
  {
    title: 'BORMM Momentum Monthly Package',
    price: '$99 / month',
    description: 'Change doesn\'t happen in a single conversation—it happens through consistent action. The BORMM Momentum Package provides ongoing support, accountability, and guidance as you work toward your goals. Whether you\'re rebuilding after a setback, pursuing a career transition, or creating a new plan for your future, this package helps keep you moving forward.',
    icon: CalendarHeart,
    duration: 'Monthly Coaching & Accountability',
    popular: false,
    listTitle: 'Includes:',
    items: ['Two 45-minute coaching sessions per month', 'Priority scheduling', 'Email support between sessions', 'Monthly accountability check-in', 'Resource recommendations']
  }
];

import Link from 'next/link';

export default function Home() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', requestGoogleMeet: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      () => {
        setIsAdminLoggedIn(true);
        setNeedsAuth(false);
      },
      () => {
        setIsAdminLoggedIn(false);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleAdminLogin = async () => {
    try {
      await googleSignIn();
    } catch (e) {
      console.error(e);
    }
  };

  const handleBookSession = (service: any) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const submitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await getAccessToken();
    if (!token) {
       alert("Admin needs to connect Workspace in the footer first!");
       return;
    }
    
    setIsSubmitting(true);
    try {
      const data = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: selectedService.title
      };
      
      await addClientToSheet(token, data);
      await createCalendarEvent(token, data, formData.requestGoogleMeet);
      await sendNotificationEmail(token, "nazeerglobal@gmail.com", data);
      await addTasks(token, data);
      await addContact(token, data);
      
      alert("Booking successful! Integrations executed.");
      setIsModalOpen(false);
      setFormData({ name: '', email: '', phone: '', requestGoogleMeet: false });
    } catch (err: any) {
      alert("Error processing booking: " + err.message);
    } finally {
       setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1D1D1D] selection:bg-[#FF1493]/10 selection:text-[#FF1493] overflow-hidden">
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        {/* Mobile Header */}
        <header className="md:hidden border-b border-[#E5E2DA] bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <BormmLogo className="scale-[0.5] origin-left -my-4" />
          <div className="flex items-center gap-4">
             <Link href="/admin" className="text-[9px] uppercase tracking-widest font-bold text-[#FF1493]">
               Admin
             </Link>
             <div className="w-10 h-10 rounded-full border-2 border-[#FF1493] overflow-hidden shadow-sm bg-white shrink-0">
               <img src="/Mascot.jpeg" alt="Mascot" className="w-full h-full object-cover" />
             </div>
          </div>
        </header>

        {/* Top Header Section (Desktop format) */}
        <header className="pt-8 md:pt-12 px-6 lg:px-12 pb-8 flex flex-col xl:flex-row justify-between items-center xl:items-center gap-8 xl:gap-20 relative overflow-hidden shrink-0">
          {/* Subtle background abstract shapes */}
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
             <div className="absolute -top-[20%] right-[-10%] w-[60%] h-[140%] bg-gradient-to-l from-[#FF1493]/5 to-transparent rounded-full blur-3xl rounded-tl-none"></div>
          </div>

          {/* Admin Login */}
          <div className="absolute top-6 right-6 lg:top-8 lg:right-12 z-20 hidden md:flex items-center gap-4">
             <Link href="/admin" className="text-[10px] uppercase tracking-widest font-bold text-[#FF1493] hover:text-[#d4117a] transition-colors bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md border border-[#FF1493]/20">
               Admin Login
             </Link>
          </div>
          
          <div className="w-full flex-1 flex flex-col xl:flex-row items-center xl:items-start gap-12 xl:gap-20 pb-8 border-b border-[#E5E2DA] relative z-10 w-full">
            <div className="max-w-2xl w-full text-center xl:text-left flex flex-col items-center xl:items-start">
               <div className="hidden md:block mb-8 self-center xl:self-start">
                  <BormmLogo className="scale-[0.85] origin-left" />
               </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-center xl:justify-start gap-3 mb-6">
                   <span className="block text-xs md:text-sm tracking-[0.2em] uppercase text-[#FF1493] font-bold">Find Housing. Find Help. Find Hope.</span>
                </div>
                
                <h2 className="text-3xl md:text-5xl lg:text-6xl tracking-tight mb-6 font-medium leading-[1.1]">
                  Helping People Move From<br className="hidden md:block" />
                  <strong className="text-[#8A2BE2] font-semibold">Disruption</strong> to <strong className="text-[#FF1493] font-semibold">Direction</strong>.
                </h2>
                
                <p className="text-lg md:text-xl text-[#555] font-light max-w-lg leading-relaxed mx-auto xl:mx-0">
                   Simple, compact, and stylish minimalist support tools for individuals ready to regain momentum and take control of their next chapter.
                </p>
              </motion.div>
            </div>

            {/* Big Mascot Image in open space */}
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="hidden md:flex flex-1 justify-center items-center h-full w-full xl:-ml-20"
            >
               <div className="w-64 h-64 md:w-80 md:h-80 xl:w-[420px] xl:h-[420px] rounded-full border-[8px] border-[#FF1493] shadow-2xl overflow-hidden bg-white shrink-0 relative lg:mt-8">
                 <img src="/Mascot.jpeg" alt="BORMM Mascot" className="w-full h-full object-cover" />
               </div>
            </motion.div>
          </div>
        </header>

        <main className="flex-1 px-6 lg:px-12 pb-24 relative z-10 w-full xl:max-w-7xl xl:mx-auto">
          {/* Services Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full mt-8"
          >
            <div className="flex items-center justify-between mb-8 border-b border-[#E5E2DA] pb-4">
              <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#A19D94]">Consultation Services</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 drop-shadow-sm">
              {services.map((service, idx) => {
                const Icon = service.icon;
                const isPopular = service.popular;
                
                return (
                  <motion.div 
                    key={service.title}
                    whileHover={{ y: -2 }}
                    className={`px-6 py-8 rounded-2xl transition-all duration-300 flex flex-col justify-between h-full border ${
                      isPopular 
                        ? 'bg-purple-50/30 border-[#8A2BE2]/30 shadow-[0_4px_20px_rgb(138,43,226,0.08)]' 
                        : 'bg-white border-[#E5E2DA] hover:border-[#D1CECD] shadow-sm hover:shadow-[0_4px_15px_rgb(0,0,0,0.03)]'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-5">
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isPopular ? 'bg-[#8A2BE2] text-white' : 'bg-gray-50 text-[#8A2BE2]'}`}>
                           <Icon className="w-5 h-5" />
                         </div>
                         {isPopular && (
                           <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FFF0F5] text-[#FF1493] text-[9px] uppercase tracking-widest font-bold">
                              <TrendingUp className="w-3 h-3" />
                              Most Popular
                           </div>
                         )}
                      </div>
                      <h4 className="text-lg font-semibold mb-2 tracking-tight text-[#1D1D1D]">{service.title}</h4>
                      <div className="flex items-center gap-3 mb-4">
                         <span className="text-lg font-bold text-[#FF1493]">{service.price}</span>
                         <span className="text-gray-300">|</span>
                         <div className="flex items-center text-xs text-[#A19D94] font-medium tracking-wide">
                            <Clock className="w-3 h-3 mr-1.5" />
                            {service.duration}
                         </div>
                      </div>
                      <p className="text-sm text-[#555] leading-relaxed font-light mb-6">{service.description}</p>
                      
                      {service.items && (
                        <div className="bg-[#FAF9F6] rounded-xl p-4 mb-6 border border-[#E5E2DA]/50">
                           <h5 className="text-[10px] uppercase tracking-[0.1em] font-bold text-[#8A2BE2] mb-3">{service.listTitle}</h5>
                           <ul className="space-y-2">
                             {service.items.map((item, i) => (
                               <li key={i} className="flex items-start text-xs text-[#444] font-medium">
                                 <Check className="w-3.5 h-3.5 text-[#FF1493] mr-2 shrink-0 mt-[2px]" />
                                 <span className="leading-snug">{item}</span>
                               </li>
                             ))}
                           </ul>
                        </div>
                      )}
                    </div>

                    <button 
                      onClick={() => handleBookSession(service)}
                      className={`mt-2 w-full py-3.5 text-[11px] uppercase tracking-widest font-bold transition-all rounded-xl ${
                      isPopular
                        ? 'bg-[#8A2BE2] text-white hover:bg-[#7220bd] shadow-md shadow-[#8A2BE2]/20'
                        : 'bg-[#1D1D1D] text-white hover:bg-[#333] shadow-sm'
                      }`}
                    >
                      Book Session
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </main>

        <footer className="mt-auto px-6 lg:px-12 py-8 bg-white border-t border-[#E5E2DA] flex flex-col md:flex-row justify-between items-center gap-6 shrink-0 relative z-20">
          <p className="text-[9px] uppercase tracking-[0.2em] text-[#A19D94] text-center md:text-left">
            © 2024 BORMM SERVICES. ALL RIGHTS RESERVED. SERVICES DO NOT CONSTITUTE LEGAL ADVICE.
          </p>
          <div className="flex space-x-6 text-[#1A1A1A] items-center">
            <a href="mailto:support@bormm.com" className="text-[10px] font-bold uppercase tracking-wider hover:text-[#6B5A9E]">Support@bormm.com</a>
            {needsAuth ? (
               <button onClick={handleAdminLogin} className="text-[10px] font-bold uppercase tracking-wider text-[#FF1493] hover:text-[#d4117a]">Admin: Connect Workspace</button>
            ) : (
               <button onClick={logout} className="text-[10px] font-bold uppercase tracking-wider text-green-700 hover:text-green-800">Admin: Connected (Click to Logout)</button>
            )}
          </div>
        </footer>

        {/* Booking Modal */}
        <AnimatePresence>
          {isModalOpen && selectedService && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-[#E5E2DA]"
              >
                <div className="bg-[#38003c] p-6 text-white relative">
                   <button 
                     onClick={() => setIsModalOpen(false)}
                     className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                   >
                     <X className="w-5 h-5" />
                   </button>
                   <h2 className="text-2xl font-bold mb-1">Book Session</h2>
                   <p className="text-[#E0E0E0] text-sm">You are booking: <span className="font-semibold text-[#d8b248]">{selectedService.title}</span> ({selectedService.duration})</p>
                </div>
                <form onSubmit={submitBooking} className="p-6">
                   <div className="space-y-4">
                      <div>
                         <label className="block text-xs font-bold uppercase tracking-wider text-[#1D1D1D] mb-1">Full Name</label>
                         <input 
                           type="text" 
                           required
                           value={formData.name}
                           onChange={(e) => setFormData({...formData, name: e.target.value})}
                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF1493] focus:border-[#FF1493] outline-none"
                           placeholder="Jane Doe"
                         />
                      </div>
                      <div>
                         <label className="block text-xs font-bold uppercase tracking-wider text-[#1D1D1D] mb-1">Email Address</label>
                         <input 
                           type="email" 
                           required
                           value={formData.email}
                           onChange={(e) => setFormData({...formData, email: e.target.value})}
                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF1493] focus:border-[#FF1493] outline-none"
                           placeholder="jane@example.com"
                         />
                      </div>
                      <div>
                         <label className="block text-xs font-bold uppercase tracking-wider text-[#1D1D1D] mb-1">Phone Number</label>
                         <input 
                           type="tel" 
                           required
                           value={formData.phone}
                           onChange={(e) => setFormData({...formData, phone: e.target.value})}
                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF1493] focus:border-[#FF1493] outline-none"
                           placeholder="(555) 000-0000"
                         />
                      </div>
                      <div className="mt-4 flex items-center p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
                         <input 
                           type="checkbox" 
                           id="googleMeet"
                           checked={formData.requestGoogleMeet}
                           onChange={(e) => setFormData({...formData, requestGoogleMeet: e.target.checked})}
                           className="w-4 h-4 text-[#FF1493] rounded border-gray-300 focus:ring-[#FF1493]"
                         />
                         <label htmlFor="googleMeet" className="ml-3 text-sm font-medium text-gray-800 flex items-center">
                           <Video className="w-4 h-4 mr-2" />
                           Request Google Meet link for this session
                         </label>
                      </div>
                   </div>
                   
                   <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end gap-3">
                      <button 
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 bg-[#FF1493] text-white text-sm font-bold tracking-wider uppercase rounded-lg hover:bg-[#d4117a] transition-colors disabled:opacity-70 flex items-center"
                      >
                        {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                      </button>
                   </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

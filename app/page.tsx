'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, Rocket, FileText, PenTool, Compass, TrendingUp, Check, Clock, Video, AlertCircle, X, Zap, Briefcase, RefreshCw, Mail, Map, CalendarHeart, CircleDollarSign, Heart } from 'lucide-react';
import { initAuth, googleSignIn, getAccessToken, logout } from '../lib/firebase';
import { addClientToSheet, createCalendarEvent, sendNotificationEmail, addTasks, addContact } from '../lib/workspace';
import { BormmLogo } from '../components/BormmLogo';

const services = [
  {
    title: 'Quick Clarity Call',
    price: '$15',
    description: 'Need a fresh perspective or help thinking through your next step? This focused session provides quick guidance on career transitions, housing concerns, budgeting questions, job search strategies, or personal challenges.',
    highlight: 'You\'ll leave with practical suggestions, resources, and a clearer path forward.',
    icon: Zap,
    duration: '30 min',
    popular: false,
    listTitle: 'Best For:',
    items: ['Quick questions', 'Career advice', 'Housing concerns', 'Budgeting questions', 'General life transitions']
  },
  {
    title: 'Layoff to Launch Strategy',
    price: '$25',
    description: 'Life changes can feel overwhelming, but they can also create new opportunities. This personalized session is designed for individuals navigating layoffs, career changes, underemployment, or major life transitions.',
    highlight: 'Together, we\'ll assess your current situation, identify immediate priorities, and create an actionable plan to help you regain momentum.',
    icon: Briefcase,
    duration: '45 min',
    popular: true,
    listTitle: 'You\'ll Receive:',
    items: ['Situation assessment', 'Personalized action plan', 'Resource recommendations', 'Follow-up session summary']
  },
  {
    title: 'Resume Refresh',
    price: '$25',
    description: 'Your resume is often your first impression. This session provides personalized feedback and recommendations to strengthen your resume and improve your job search strategy.',
    highlight: 'We\'ll discuss formatting, accomplishments, keywords, and ways to better position your experience for today\'s job market.',
    icon: RefreshCw,
    duration: '45 min',
    popular: false,
    listTitle: 'Includes:',
    items: ['Resume review', 'Improvement recommendations', 'LinkedIn profile suggestions', 'Job search guidance']
  },
  {
    title: 'Letter & Correspondence Support',
    price: '$25',
    description: 'Sometimes the right words make all the difference. Receive guidance on drafting professional correspondence related to employment matters, housing concerns, disputes, hardship requests, appeals, or other important communications.',
    highlight: 'We\'ll help you organize your thoughts and create a clear, professional message. (Guidance & drafting support only, does not constitute legal advice).',
    icon: Mail,
    duration: '45 min',
    popular: false,
    listTitle: 'Common Requests:',
    items: ['Professional letters', 'Appeal letters', 'Hardship requests', 'Housing correspondence', 'Follow-up communications']
  },
  {
    title: 'BORMM Transition Blueprint',
    price: '$50',
    description: 'A comprehensive strategy session for individuals ready to take control of their next chapter. Together, we\'ll review your career goals, housing situation, financial organization, and personal priorities to create a customized 30-day action plan.',
    highlight: 'This session is ideal for those experiencing major life changes and looking for a clear roadmap forward.',
    icon: Map,
    duration: '60 min',
    popular: false,
    listTitle: 'Includes:',
    items: ['Career review', 'Housing review', 'Financial organization discussion', 'Goal-setting session', 'Customized 30-day action plan']
  },
  {
    title: 'BORMM Momentum Monthly Package',
    price: '$99 / mo',
    description: 'Change doesn\'t happen in a single conversation—it happens through consistent action. The BORMM Momentum Package provides ongoing support, accountability, and guidance as you work toward your goals.',
    highlight: 'Whether you\'re rebuilding after a setback, pursuing a career transition, or creating a new plan for your future, this package helps keep you moving forward.',
    icon: CalendarHeart,
    duration: 'Monthly',
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
    <div className="min-h-screen flex flex-row bg-[#FDFBF9] text-[#1D1D1D] selection:bg-[#E6007E]/10 selection:text-[#E6007E] overflow-hidden">

      {/* Left vertical brand sidebar (desktop) */}
      <aside className="hidden md:flex w-14 lg:w-16 shrink-0 bg-white border-r border-[#EEE7EF] flex-col items-center justify-between py-6 relative z-40">
        <div className="flex-1 flex items-center justify-center">
          <span
            className="text-[#E6007E] font-bold uppercase tracking-[0.35em] text-[11px] lg:text-xs whitespace-nowrap"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            BORMM Transition
          </span>
        </div>
        <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-[#E6007E] text-white flex items-center justify-center font-bold text-sm shadow-md shadow-[#E6007E]/30 my-4">
          B
        </div>
        <div className="flex-1 flex items-end justify-center">
          <span
            className="text-[#C9C2CC] text-[8px] tracking-[0.3em] uppercase whitespace-nowrap"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            Est. 2024
          </span>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        {/* Mobile Header */}
        <header className="md:hidden border-b border-[#E5E2DA] bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <BormmLogo className="scale-[0.5] origin-left -my-4" />
          <Link href="/admin" className="text-[9px] uppercase tracking-widest font-bold text-[#E6007E]">
            Admin
          </Link>
        </header>

        {/* Top Header Section (Desktop format) */}
        <header className="pt-10 lg:pt-14 px-6 lg:px-16 pb-10 relative overflow-hidden shrink-0">
          {/* Subtle background abstract shapes */}
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
             <div className="absolute -top-[20%] right-[-10%] w-[55%] h-[140%] bg-gradient-to-l from-[#E6007E]/5 to-transparent rounded-full blur-3xl"></div>
          </div>

          {/* Admin Login */}
          <div className="absolute top-6 right-6 lg:top-8 lg:right-16 z-20 hidden md:flex items-center gap-4">
             <Link href="/admin" className="text-[10px] uppercase tracking-widest font-bold text-[#E6007E] hover:text-[#c80070] transition-colors bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md border border-[#E6007E]/20">
               Admin Login
             </Link>
          </div>

          <div className="w-full flex flex-col xl:flex-row items-center xl:items-center gap-12 xl:gap-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl w-full text-center xl:text-left flex flex-col items-center xl:items-start"
            >
              <span className="block text-[11px] md:text-xs tracking-[0.25em] uppercase text-[#E6007E] font-bold mb-5">
                Find Housing. Find Help. Find Hope.
              </span>

              <h1 className="font-extrabold uppercase tracking-tight leading-[0.95] text-4xl md:text-6xl lg:text-7xl mb-5">
                <span className="block text-[#3A0D3F]">From Disruption</span>
                <span className="block text-[#E6007E]">To Direction.</span>
              </h1>

              <p className="font-serif italic text-2xl md:text-3xl text-[#3A0D3F] mb-6">
                We help you move forward.
              </p>

              <p className="text-[#6B6470] text-base md:text-lg max-w-xl leading-relaxed mx-auto xl:mx-0">
                Personalized guidance for life&apos;s transitions, so you can{' '}
                <strong className="text-[#E6007E] font-semibold">find clarity</strong>,{' '}
                <strong className="text-[#E6007E] font-semibold">build stability</strong>, and{' '}
                <strong className="text-[#C29A38] font-semibold">create your next chapter</strong>.
              </p>
            </motion.div>

            {/* Portrait with gold seal */}
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="flex w-full flex-1 justify-center xl:justify-end items-center"
            >
               <div className="relative shrink-0">
                 <div className="w-60 h-60 sm:w-72 sm:h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden ring-[6px] ring-[#5BA89E]/70 shadow-2xl bg-white">
                   <img src="/Mascot.jpeg" alt="BORMM Mascot" className="w-full h-full object-cover" />
                 </div>
                 <div className="absolute -bottom-1 left-0 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#E0BC57] to-[#B8923A] flex flex-col items-center justify-center text-center shadow-xl border-4 border-[#FDFBF9]">
                   <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white fill-white mb-0.5" />
                   <span className="text-[8px] sm:text-[9px] font-bold uppercase leading-tight tracking-wide text-white px-2">
                     Building Stability, Stewardship, &amp; Hope
                   </span>
                 </div>
               </div>
            </motion.div>
          </div>
        </header>

        <main className="flex-1 px-6 lg:px-16 pb-24 relative z-10 w-full xl:max-w-7xl xl:mx-auto">
          {/* Services Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full mt-4"
          >
            <div className="flex items-center justify-center mb-10">
              <span className="w-full max-w-md md:w-auto text-center bg-gradient-to-r from-[#E0BC57] to-[#C29A38] text-white text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] px-6 py-3 rounded-full shadow-md">
                Transition Services Include:
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {services.map((service) => {
                const Icon = service.icon;
                const isPopular = service.popular;
                const accent = isPopular ? 'text-[#FF3DA0]' : 'text-[#E0BC57]';

                return (
                  <motion.div 
                    key={service.title}
                    whileHover={{ y: -4 }}
                    className={`relative flex flex-col rounded-3xl p-7 text-white bg-[#2C0A2E] transition-all duration-300 ${
                      isPopular 
                        ? 'ring-2 ring-[#E0BC57] shadow-[0_14px_45px_rgba(216,178,74,0.25)]' 
                        : 'shadow-[0_12px_35px_rgba(44,10,46,0.20)]'
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-gradient-to-r from-[#E0BC57] to-[#C29A38] text-white text-[9px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                        <TrendingUp className="w-3 h-3" />
                        Most Popular
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-5">
                       <div className="w-11 h-11 rounded-xl bg-[#E6007E] flex items-center justify-center shrink-0 shadow-md shadow-[#E6007E]/30">
                         <Icon className="w-5 h-5 text-white" />
                       </div>
                       <div className="flex flex-col items-end gap-1.5">
                          <span className="inline-flex items-center gap-1 bg-white/10 text-white/70 text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full">
                             <Clock className="w-3 h-3" />
                             {service.duration}
                          </span>
                          <span className="text-3xl font-extrabold leading-none">{service.price}</span>
                       </div>
                    </div>

                    <h4 className="text-lg font-bold mb-3 tracking-tight">{service.title}</h4>
                    <p className="text-[13px] leading-relaxed text-white/55 mb-3">{service.description}</p>
                    {service.highlight && (
                      <p className="text-[13px] leading-relaxed font-semibold text-white/90 mb-5">{service.highlight}</p>
                    )}

                    {service.items && (
                      <div className="mb-7">
                         <h5 className={`text-[10px] uppercase tracking-[0.15em] font-bold mb-3 ${accent}`}>{service.listTitle}</h5>
                         <ul className="space-y-2">
                           {service.items.map((item, i) => (
                             <li key={i} className="flex items-start text-[12px] text-white/75">
                               <span className={`mr-2 leading-none text-base ${accent}`}>&bull;</span>
                               <span className="leading-snug">{item}</span>
                             </li>
                           ))}
                         </ul>
                      </div>
                    )}

                    <button 
                      onClick={() => handleBookSession(service)}
                      className={`mt-auto w-full py-3.5 text-[11px] uppercase tracking-[0.2em] font-bold transition-all rounded-xl ${
                      isPopular
                        ? 'bg-[#E6007E] text-white hover:bg-[#c80070] shadow-lg shadow-[#E6007E]/30'
                        : 'bg-[#FAF6EF] text-[#2C0A2E] hover:bg-white'
                      }`}
                    >
                      {isPopular ? 'Select Session' : 'Book Now'}
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

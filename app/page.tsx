'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Lightbulb, Rocket, FileText, PenTool, Compass, TrendingUp, Check, Clock, Video, AlertCircle } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Quick Clarity Call',
    price: '$15',
    duration: '30 Minutes | Phone or Zoom',
    icon: Lightbulb,
    description: 'Need a fresh perspective or help thinking through your next step? This focused session provides quick guidance on career transitions, housing concerns, budgeting questions, job search strategies, or personal challenges.',
    outcome: 'You\'ll leave with practical suggestions, resources, and a clearer path forward.',
    listTitle: 'Best For:',
    list: ['Quick questions', 'Career advice', 'Housing concerns', 'Budgeting questions', 'General life transitions'],
  },
  {
    id: 2,
    title: 'Layoff to Launch Strategy',
    price: '$25',
    duration: '45 Minutes | Phone or Zoom',
    icon: Rocket,
    popular: true,
    description: 'Life changes can feel overwhelming, but they can also create new opportunities. This personalized session is designed for individuals navigating layoffs, career changes, underemployment, or major life transitions.',
    outcome: 'Together, we\'ll assess your current situation, identify immediate priorities, and create an actionable plan to help you regain momentum.',
    listTitle: 'You\'ll Receive:',
    list: ['Situation assessment', 'Personalized action plan', 'Resource recommendations', 'Follow-up session summary'],
  },
  {
    id: 3,
    title: 'Resume Refresh',
    price: '$25',
    duration: '45 Minutes | Phone or Zoom',
    icon: FileText,
    description: 'Your resume is often your first impression. This session provides personalized feedback and recommendations to strengthen your resume and improve your job search strategy.',
    outcome: 'We\'ll discuss formatting, accomplishments, keywords, and ways to better position your experience for today\'s job market.',
    listTitle: 'Includes:',
    list: ['Resume review', 'Improvement recommendations', 'LinkedIn profile suggestions', 'Job search guidance'],
  },
  {
    id: 4,
    title: 'Letter & Correspondence Support',
    price: '$25',
    duration: '45 Minutes | Phone or Zoom',
    icon: PenTool,
    description: 'Sometimes the right words make all the difference. Receive guidance on drafting professional correspondence related to employment matters, housing concerns, disputes, hardship requests, or appeals.',
    outcome: 'We\'ll help you organize your thoughts and create a clear, professional message.',
    listTitle: 'Common Requests:',
    list: ['Professional letters', 'Appeal letters', 'Hardship requests', 'Housing correspondence', 'Follow-up communications'],
    disclaimer: 'This service provides guidance and drafting support only and does not constitute legal advice.',
  },
  {
    id: 5,
    title: 'BORMM Transition Blueprint',
    price: '$50',
    duration: '60 Minutes | Phone or Zoom',
    icon: Compass,
    description: 'A comprehensive strategy session for individuals ready to take control of their next chapter. This session is ideal for those experiencing major life changes and looking for a clear roadmap forward.',
    outcome: 'Together, we\'ll review your career goals, housing situation, financial organization, and personal priorities to create a customized 30-day action plan.',
    listTitle: 'Includes:',
    list: ['Career review', 'Housing review', 'Financial organization discussion', 'Goal-setting session', 'Customized 30-day action plan'],
  },
  {
    id: 6,
    title: 'BORMM Momentum Monthly',
    price: '$99',
    duration: 'Monthly Coaching Support',
    icon: TrendingUp,
    description: 'Change doesn\'t happen in a single conversation—it happens through consistent action. The Momentum Package provides ongoing support, accountability, and guidance as you work toward your goals.',
    outcome: 'Whether you\'re rebuilding after a setback, pursuing a career transition, or creating a new plan, this package helps keep you moving forward.',
    listTitle: 'Includes:',
    list: ['Two 45-minute coaching sessions / month', 'Priority scheduling', 'Email support between sessions', 'Monthly accountability check-in', 'Resource recommendations'],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FAF9F6] text-[#1D1D1D] selection:bg-[#E3005B]/10 selection:text-[#E3005B] overflow-hidden">
      
      {/* Vertical Editorial Rail (Desktop) */}
      <div className="hidden md:flex w-24 h-screen border-r border-[#E5E2DA] flex-col items-center justify-between py-12 bg-white shrink-0 sticky top-0 z-30">
        <div className="[writing-mode:vertical-rl] rotate-180 text-sm tracking-[0.4em] font-bold text-[#E3005B] uppercase">BORMM Transition</div>
        <div className="w-10 h-10 rounded-full bg-[#E3005B] flex items-center justify-center shadow-lg">
          <span className="text-white text-lg font-black italic font-serif">B</span>
        </div>
        <div className="[writing-mode:vertical-rl] rotate-180 text-[10px] tracking-widest text-[#A19D94] uppercase">Est. 2024</div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        {/* Mobile Header */}
        <header className="md:hidden border-b border-[#E5E2DA] bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E3005B] flex items-center justify-center text-white font-black italic font-serif text-sm">
              B
            </div>
            <span className="font-bold text-sm tracking-widest text-[#E3005B] uppercase">BORMM</span>
          </div>
          <a
            href="mailto:contact@example.com"
            className="text-xs uppercase tracking-widest font-bold text-[#A19D94] hover:text-[#1D1D1D] transition-colors"
          >
            Contact
          </a>
        </header>

        {/* Top Header Section (Desktop format) */}
        <header className="pt-8 md:pt-12 px-6 lg:px-12 pb-8 flex flex-col xl:flex-row justify-between items-center xl:items-center gap-8 xl:gap-12 relative overflow-hidden shrink-0">
          {/* Subtle background abstract shapes */}
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
             <div className="absolute -top-[20%] right-[-10%] w-[60%] h-[140%] bg-gradient-to-l from-[#38003c]/5 to-transparent rounded-full blur-3xl rounded-tl-none"></div>
          </div>
          
          <div className="max-w-2xl relative z-10 w-full text-center xl:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center xl:justify-start gap-3 mb-6">
                 <span className="block text-xs md:text-sm tracking-[0.2em] uppercase text-[#E3005B] font-bold">Find Housing. Find Help. Find Hope.</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#38003c] leading-[1.1] mb-2">
                From Disruption <br className="hidden md:block" />
                <span className="text-[#E3005B]">To Direction.</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-serif italic text-[#38003c] mb-6">
                We help you move forward.
              </h2>
              
              <p className="text-lg md:text-xl text-[#555] font-light max-w-lg leading-relaxed mx-auto xl:mx-0">
                Personalized guidance for life&apos;s transitions, so you can <strong className="text-[#38003c] font-semibold">find clarity</strong>, <strong className="text-[#E3005B] font-semibold">build stability</strong>, and <strong className="text-[#d8b248] font-semibold">create your next chapter</strong>.
              </p>
            </motion.div>
          </div>
          
          <div className="relative w-full xl:w-auto flex justify-center xl:justify-end z-10 shrink-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl relative z-10">
                <Image 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800"
                  alt="Professional African American Woman smiling"
                  fill
                  className="object-cover object-top"
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                  priority
                />
              </div>
              
              {/* Decorative Gold Elements */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-[#d8b248] to-[#b38e2d] rounded-full z-20 flex items-center justify-center p-1 shadow-xl">
                 <div className="w-full h-full border-2 border-white/40 rounded-full flex flex-col items-center justify-center text-white text-center p-4">
                    <span className="text-[#fff] mb-1">💛</span>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider leading-tight">Building<br/>Stability,<br/>Stewardship,<br/>& Hope</span>
                 </div>
              </div>
            </motion.div>
          </div>
        </header>

        <main className="flex-1 px-6 lg:px-12 pb-12 w-full max-w-[1400px] mx-auto z-10 relative">
          
          <div className="w-full text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-[#d8b248] to-[#b38e2d] text-white px-8 py-2 rounded-full shadow-md text-sm md:text-base font-bold uppercase tracking-widest">
               Transition Services Include:
            </div>
          </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 h-full">
          {services.map((service, index) => {
            const isPopular = service.popular;
            
            return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group flex flex-col transition-all duration-300 relative shadow-md bg-[#38003c] text-white border-2 hover:border-[#E3005B] rounded-2xl overflow-hidden ${
                isPopular ? 'border-[#d8b248]' : 'border-[#5a0060]'
              }`}
            >
              {/* Popular Badge */}
              {isPopular && (
                <div className="absolute top-0 right-0 bg-[#d8b248] text-white text-[10px] px-3 py-1 tracking-widest uppercase font-bold z-10 rounded-bl-lg shadow-sm">
                  Most Popular
                </div>
              )}

              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 inline-flex text-white bg-[#E3005B] rounded-2xl shadow-[0_0_15px_rgba(227,0,91,0.5)] mb-2 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] px-2 py-1 uppercase tracking-widest font-bold bg-[#E3005B]/20 text-[#ffb3cf] rounded-md">
                      {service.duration.split('|')[0].trim().replace('Minutes', 'MIN')}
                    </span>
                    <span className="text-3xl font-bold mt-1 text-white group-hover:text-[#d8b248] transition-colors">
                      {service.price}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#d8b248] transition-colors mt-2">
                  {service.title}
                </h3>

                <div className="space-y-4 text-sm leading-relaxed flex-1 text-[#E0E0E0]">
                  <p>{service.description}</p>
                  <p className="font-semibold text-white">{service.outcome}</p>

                  <div className="pt-4 border-t mt-6 border-[#5a0060]">
                    <p className="font-semibold text-xs tracking-wider uppercase mb-3 text-[#d8b248]">{service.listTitle}</p>
                    <ul className="space-y-2 text-xs font-medium">
                      {service.list.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 text-[#E3005B] font-bold">•</span>
                          <span className="text-[#E0E0E0]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {service.disclaimer && (
                  <div className="mt-6 pt-4 border-t flex items-start text-[10px] font-bold uppercase tracking-wider border-[#5a0060] text-[#ffb3cf]">
                    <AlertCircle className="w-3 h-3 mr-2 shrink-0 mt-0.5" />
                    <span>{service.disclaimer}</span>
                  </div>
                )}

                <button className={`mt-8 w-full py-4 text-xs uppercase tracking-widest font-bold transition-all rounded-xl ${
                  isPopular
                    ? 'bg-[#E3005B] text-white hover:bg-[#c2004d] shadow-[0_4px_14px_0_rgba(227,0,91,0.39)] hover:shadow-[0_6px_20px_rgba(227,0,91,0.23)]'
                    : 'bg-white text-[#38003c] hover:bg-gray-100'
                }`}>
                  {service.id === 6 ? 'Join Monthly' : isPopular ? 'Select Session' : 'Book Now'}
                </button>
              </div>
            </motion.div>
          )})}
        </div>
      </main>

      {/* Footer Disclaimers */}
      <footer className="px-6 lg:px-12 py-6 border-t border-[#D1CEC7] bg-[#F0EEEB] flex flex-col md:flex-row justify-between items-center gap-4 mt-auto shrink-0 w-full">
        <p className="text-[9px] uppercase tracking-[0.2em] text-[#A19D94] text-center md:text-left">
          © 2024 BORMM SERVICES. ALL RIGHTS RESERVED. SERVICES DO NOT CONSTITUTE LEGAL ADVICE.
        </p>
        <div className="flex space-x-6 text-[#1A1A1A]">
          <a href="mailto:support@bormm.com" className="text-[10px] font-bold uppercase tracking-wider hover:text-[#6B5A9E]">Support@bormm.com</a>
          <button className="text-[10px] font-bold uppercase tracking-wider hover:text-[#6B5A9E]">Schedule Appointment</button>
        </div>
      </footer>

      </div>
    </div>
  );
}

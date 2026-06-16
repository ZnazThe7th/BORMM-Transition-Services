'use client';

import React from 'react';
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
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F7F5F2] text-[#2D2D2D] selection:bg-[#F0EEF7] selection:text-[#6B5A9E] overflow-hidden">
      
      {/* Vertical Editorial Rail (Desktop) */}
      <div className="hidden md:flex w-24 h-screen border-r border-[#D1CEC7] flex-col items-center justify-between py-12 bg-white shrink-0 sticky top-0">
        <div className="[writing-mode:vertical-rl] rotate-180 text-sm tracking-[0.4em] font-bold text-[#6B5A9E] uppercase">BORMM Transition</div>
        <div className="w-8 h-8 rounded-full bg-[#6B5A9E] flex items-center justify-center">
          <span className="text-white text-xs font-bold">B</span>
        </div>
        <div className="[writing-mode:vertical-rl] rotate-180 text-[10px] tracking-widest text-[#A19D94] uppercase">Est. 2024</div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Mobile Header */}
        <header className="md:hidden border-b border-[#D1CEC7] bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#6B5A9E] flex items-center justify-center text-white font-bold text-xs">
              B
            </div>
            <span className="font-bold text-sm tracking-widest text-[#6B5A9E] uppercase">BORMM</span>
          </div>
          <a
            href="mailto:contact@example.com"
            className="text-xs uppercase tracking-widest font-bold text-[#A19D94] hover:text-[#2D2D2D] transition-colors"
          >
            Contact
          </a>
        </header>

        {/* Top Header Section (Desktop format) */}
        <header className="pt-8 md:pt-12 px-6 lg:px-12 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl lg:text-6xl font-serif leading-tight italic text-[#1A1A1A]">
                Disruption to Direction
              </h1>
              <p className="mt-4 text-lg text-[#666] font-light max-w-md">
                Helping you navigate life&apos;s major shifts with clarity, strategy, and momentum. Focus on practical life strategies.
              </p>
            </motion.div>
          </div>
          <div className="hidden md:block text-right">
            <span className="block text-xs tracking-widest uppercase text-[#A19D94] mb-1">Professional Support</span>
            <span className="text-2xl font-serif">Full-Stack Services</span>
          </div>
        </header>

        <main className="flex-1 px-6 lg:px-12 pb-12 w-full max-w-7xl">

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 h-full">
          {services.map((service, index) => {
            const isDark = service.id === 6;
            const isAlt = service.id === 4;
            const isPopular = service.popular;
            
            return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group flex flex-col transition-colors duration-300 relative ${
                isDark 
                  ? 'bg-[#2D2D2D] text-white border border-[#2D2D2D]' 
                : isAlt 
                  ? 'bg-[#FDFCFB] border border-[#E5E2DA] hover:border-[#6B5A9E]'
                : isPopular 
                  ? 'bg-white border-2 border-[#6B5A9E]' 
                  : 'bg-white border border-[#E5E2DA] hover:border-[#6B5A9E]'
              }`}
            >
              {/* Popular Badge */}
              {isPopular && (
                <div className="absolute -top-3 left-6 bg-[#6B5A9E] text-white text-[10px] px-2 py-0.5 tracking-widest uppercase font-bold z-10">
                  Most Popular
                </div>
              )}

              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 inline-flex ${isDark ? 'text-[#CCC]' : 'text-[#6B5A9E]'}`}>
                    <service.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[10px] px-2 py-1 uppercase tracking-tighter font-bold ${isDark ? 'bg-[#444] text-white' : 'bg-[#F0EEF7] text-[#2D2D2D]'}`}>
                      {service.duration.split('|')[0].trim().replace('Minutes', 'MIN')}
                    </span>
                    <span className={`text-3xl font-serif mt-1 ${isDark ? 'text-white' : 'text-[#6B5A9E]'}`}>
                      {service.price}
                    </span>
                  </div>
                </div>

                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#1A1A1A] group-hover:text-[#6B5A9E]'} transition-colors`}>
                  {service.title}
                </h3>

                <div className={`space-y-4 text-sm leading-relaxed flex-1 ${isDark ? 'text-[#AAA]' : 'text-[#777]'}`}>
                  <p>{service.description}</p>
                  <p className={`font-semibold ${isDark ? 'text-[#CCC]' : 'text-[#2D2D2D]'}`}>{service.outcome}</p>

                  <div className={`pt-4 border-t mt-6 ${isDark ? 'border-[#444]' : 'border-[#E5E2DA]'}`}>
                    <p className={`font-semibold text-xs tracking-wider uppercase mb-3 ${isDark ? 'text-[#CCC]' : 'text-[#1A1A1A]'}`}>{service.listTitle}</p>
                    <ul className="space-y-1 text-xs font-medium">
                      {service.list.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className={`mr-2 ${isDark ? 'text-[#6B5A9E]' : 'text-[#6B5A9E]'}`}>•</span>
                          <span className={isDark ? 'text-[#CCC]' : 'text-[#555]'}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {service.disclaimer && (
                  <div className={`mt-6 pt-4 border-t flex items-start text-[10px] font-bold uppercase tracking-wider ${isDark ? 'border-[#444] text-[#CCC]' : 'border-[#E5E2DA] text-[#6B5A9E]'}`}>
                    <AlertCircle className="w-3 h-3 mr-2 shrink-0 mt-0.5" />
                    <span>{service.disclaimer}</span>
                  </div>
                )}

                <button className={`mt-8 w-full py-3 text-xs uppercase tracking-widest font-bold transition-colors ${
                  isDark
                    ? 'bg-[#6B5A9E] text-white hover:bg-[#5A4B85]'
                    : isPopular
                      ? 'bg-black text-white hover:bg-[#333]'
                      : 'border border-black text-black hover:bg-black hover:text-white'
                }`}>
                  {isDark ? 'Join Monthly' : isPopular ? 'Select Session' : 'Book Now'}
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

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, Mail, Search, Users, Calendar as CalendarIcon, Activity, ChevronRight, LogOut, LayoutDashboard, Settings } from 'lucide-react';
import Link from 'next/link';
import { BormmLogo } from '../../components/BormmLogo';
import { initAuth, googleSignIn, logout as googleLogout } from '../../lib/firebase';

// Dummy data for visual representation
const mockClients = [
  { id: 1, name: 'Jane Doe', email: 'jane@example.com', service: 'Quick Clarity Call', date: '2026-06-16', status: 'Pending Review' },
  { id: 2, name: 'Michael Smith', email: 'michael.s@example.com', service: 'Resume Refresh', date: '2026-06-15', status: 'In Progress' },
  { id: 3, name: 'Sarah Connor', email: 's.connor@example.com', service: 'BORMM Transition Blueprint', date: '2026-06-14', status: 'Completed' },
];

const mockActivities = [
  { id: 101, text: 'New booking received: Jane Doe (Quick Clarity Call)', time: '10 mins ago' },
  { id: 102, text: 'Michael Smith uploaded revised resume', time: '2 hours ago' },
  { id: 103, text: 'System update completed', time: 'Yesterday' },
];

export default function AdminPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [isWorkspaceConnected, setIsWorkspaceConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      () => setIsWorkspaceConnected(true),
      () => setIsWorkspaceConnected(false)
    );
    return () => unsubscribe();
  }, []);

  const handleConnectWorkspace = async () => {
    try {
      if (isWorkspaceConnected) {
        await googleLogout();
      } else {
        await googleSignIn();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'jackie.knox@bormm.consulting' && password === 'Wynn1474$&!') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col justify-center items-center p-6 text-[#1D1D1D]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E5E2DA] w-full max-w-md"
        >
          <div className="flex justify-center mb-8">
            <BormmLogo className="scale-[0.8]" />
          </div>
          <h1 className="text-2xl font-semibold mb-2 text-center tracking-tight">Admin Portal</h1>
          <p className="text-sm text-[#A19D94] text-center mb-8">Enter your secure credentials to access the dashboard.</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1D1D1D] mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF1493] focus:border-[#FF1493] outline-none transition-all"
                  placeholder="admin@bormm.consulting"
                  autoFocus
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1D1D1D] mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF1493] focus:border-[#FF1493] outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
              {error && <p className="text-[#FF1493] text-sm mt-2">{error}</p>}
            </div>
            
            <button 
              type="submit"
              className="w-full py-3.5 bg-[#1D1D1D] text-white text-sm font-bold tracking-widest uppercase rounded-xl hover:bg-[#333] transition-colors"
            >
              Sign In
            </button>
            <div className="text-center mt-4">
              <Link href="/" className="text-xs text-[#A19D94] hover:text-[#1D1D1D] font-medium transition-colors">
                ← Return to Home
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1D1D1D] flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-[#E5E2DA] flex flex-col z-20 shrink-0">
        <div className="p-6 border-b border-[#E5E2DA]">
          <BormmLogo className="scale-[0.6] origin-left -my-4" />
        </div>
        <div className="flex-1 py-6 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === 'dashboard' ? 'bg-[#FFF0F5] text-[#FF1493]' : 'text-[#666] hover:bg-gray-50'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('clients')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === 'clients' ? 'bg-[#FFF0F5] text-[#FF1493]' : 'text-[#666] hover:bg-gray-50'}`}
          >
            <Users className="w-5 h-5" />
            Clients
          </button>
          <button 
            onClick={() => setActiveTab('calendar')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === 'calendar' ? 'bg-[#FFF0F5] text-[#FF1493]' : 'text-[#666] hover:bg-gray-50'}`}
          >
            <CalendarIcon className="w-5 h-5" />
            Calendar
          </button>
        </div>
        <div className="p-4 border-t border-[#E5E2DA]">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-[#A19D94] hover:text-[#1D1D1D] transition-colors rounded-xl hover:bg-gray-50"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto p-6 md:p-10 relative">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Welcome to the Command Center</h1>
            <p className="text-[#A19D94] mt-1">Here is what&apos;s happening with your business today.</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search anything..." className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:border-[#FF1493] focus:ring-1 focus:ring-[#FF1493] transition-all bg-white" />
             </div>
             <div className="w-10 h-10 rounded-full border-2 border-[#FF1493] overflow-hidden bg-white shrink-0">
               <img src="/Mascot.jpeg" alt="Admin" className="w-full h-full object-cover" />
             </div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Live Feed */}
            <div className="xl:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="bg-white p-6 rounded-2xl border border-[#E5E2DA] shadow-sm">
                    <p className="text-sm text-[#A19D94] font-medium mb-1">Total Clients</p>
                    <h3 className="text-3xl font-bold tracking-tight">142</h3>
                 </div>
                 <div className="bg-white p-6 rounded-2xl border border-[#E5E2DA] shadow-sm">
                    <p className="text-sm text-[#A19D94] font-medium mb-1">Active Bookings</p>
                    <h3 className="text-3xl font-bold tracking-tight text-[#8A2BE2]">12</h3>
                 </div>
                 <div className="bg-white p-6 rounded-2xl border border-[#E5E2DA] shadow-sm">
                    <p className="text-sm text-[#A19D94] font-medium mb-1">Pending Responses</p>
                    <h3 className="text-3xl font-bold tracking-tight text-[#FF1493]">4</h3>
                 </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E5E2DA] shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-[#E5E2DA] flex justify-between items-center">
                   <h2 className="text-lg font-semibold flex items-center gap-2"><Activity className="w-5 h-5 text-[#8A2BE2]" /> Live Feed</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {mockActivities.map(activity => (
                    <div key={activity.id} className="p-4 px-6 hover:bg-gray-50 flex justify-between items-center transition-colors">
                      <p className="text-sm font-medium">{activity.text}</p>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </div>
                  ))}
                  <button className="w-full py-4 text-xs font-bold uppercase tracking-wider text-[#A19D94] hover:text-[#1D1D1D] transition-colors">
                    View All Activity
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Calendar */}
            <div className="bg-white rounded-2xl border border-[#E5E2DA] shadow-sm p-6 overflow-hidden flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold flex items-center gap-2"><CalendarIcon className="w-5 h-5 text-[#FF1493]" /> Schedule</h2>
                <Settings className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-900" />
              </div>
              {/* Mini Calendar visualization */}
              <div className="grid grid-cols-7 gap-1 text-center mb-6">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="text-[10px] font-bold text-gray-400 uppercase tracking-wider py-1">{day}</div>
                ))}
                {Array.from({ length: 30 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`aspect-square flex items-center justify-center text-sm rounded-lg ${
                      i === 15 ? 'bg-[#FF1493] text-white font-bold shadow-md shadow-[#FF1493]/20' : 
                      i === 13 || i === 18 ? 'bg-[#FFF0F5] text-[#FF1493] font-medium' :
                      'text-gray-700 hover:bg-gray-100 cursor-pointer'
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              
              <div className="mt-auto space-y-3">
                 <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Upcoming</h4>
                 <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-2 h-2 rounded-full bg-[#FF1493] mt-1.5 shrink-0"></div>
                    <div>
                      <p className="text-sm font-semibold">Discovery Session</p>
                      <p className="text-xs text-gray-500">1:00 PM • Jane Doe</p>
                    </div>
                 </div>
              </div>
            </div>

          </motion.div>
        )}

        {/* Clients Tab Visual */}
        {activeTab === 'clients' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl border border-[#E5E2DA] shadow-sm overflow-hidden">
             <div className="px-6 py-5 border-b border-[#E5E2DA] flex justify-between items-center">
                <h2 className="text-lg font-semibold">Client Directory</h2>
                <button className="px-4 py-2 bg-[#1D1D1D] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#333] transition-colors">
                  Add Client
                </button>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="bg-gray-50 border-b border-[#E5E2DA]">
                     <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Client Name</th>
                     <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Service</th>
                     <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                     <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                   {mockClients.map(client => (
                     <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                       <td className="px-6 py-4">
                         <div className="font-medium text-sm">{client.name}</div>
                         <div className="text-xs text-gray-500">{client.email}</div>
                       </td>
                       <td className="px-6 py-4">
                         <div className="text-sm">{client.service}</div>
                       </td>
                       <td className="px-6 py-4 text-sm text-gray-500">{client.date}</td>
                       <td className="px-6 py-4">
                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide
                           ${client.status === 'Completed' ? 'bg-green-100 text-green-800' :
                             client.status === 'In Progress' ? 'bg-[#FFF0F5] text-[#FF1493]' :
                             'bg-gray-100 text-gray-800'
                           }
                         `}>
                           {client.status}
                         </span>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </motion.div>
        )}
        
        {/* Calendar Tab Visual */}
        {activeTab === 'calendar' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl border border-[#E5E2DA] shadow-sm p-8 min-h-[600px] flex items-center justify-center flex-col text-center">
             <CalendarIcon className="w-16 h-16 text-gray-300 mb-4" />
             <h2 className="text-xl font-semibold mb-2">Detailed Calendar</h2>
             <p className="text-gray-500 max-w-sm mb-6">Full Google Calendar integration is visualized here. You can manage all transitions and upcoming tasks directly.</p>
             <button 
                onClick={handleConnectWorkspace}
                className={`px-6 py-3 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors ${isWorkspaceConnected ? 'bg-green-600 hover:bg-green-700' : 'bg-[#FF1493] hover:bg-[#d4117a]'}`}
             >
                {isWorkspaceConnected ? 'Workspace Connected (Click to Disconnect)' : 'Connect Integration Sync'}
             </button>
          </motion.div>
        )}

      </main>
    </div>
  );
}

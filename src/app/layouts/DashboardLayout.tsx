import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, MessageSquare, Mail, Settings, LogOut, Bell, Search } from 'lucide-react';

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Applications', path: '/dashboard/applications' },
  // { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
  { icon: MessageSquare, label: 'Messages', path: '/dashboard/messages' },
  { icon: Mail, label: 'Contacts', path: '/dashboard/subscribers' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

export const DashboardLayout = () => {
  const location = useLocation();

  return (
    <div className="flex bg-soft-gray min-h-screen font-poppins text-gray-900">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="w-64 bg-navy text-white flex flex-col fixed h-full"
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-royal-blue">Indigo Admin</h1>
        </div>
        
        <nav className="flex-1 mt-6">
          <ul className="space-y-2 px-4">
            {MENU_ITEMS.map((item) => {
              const isActive = location.pathname === item.path || (location.pathname === '/' && item.path === '/dashboard');
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive ? 'bg-royal-blue text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="p-4">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-8 shadow-sm">
          <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full w-96 focus-within:ring-2 ring-royal-blue transition-all">
            <Search size={18} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="bg-transparent border-none outline-none ml-2 w-full text-sm"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-500 hover:text-royal-blue transition-colors">
              <Bell size={22} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 border-l pl-6 border-gray-200">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-royal-blue to-blue-400 text-white flex items-center justify-center font-bold shadow-md">
                AD
              </div>
              <div>
                <p className="text-sm font-semibold">Admin User</p>
                <p className="text-xs text-gray-500">Superadmin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

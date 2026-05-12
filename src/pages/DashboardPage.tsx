import React from 'react'; 
import { motion } from 'framer-motion';
import { Users, FileText, Mail, Activity, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', applications: 4000 },
  { name: 'Tue', applications: 3000 },
  { name: 'Wed', applications: 2000 },
  { name: 'Thu', applications: 2780 },
  { name: 'Fri', applications: 1890 },
  { name: 'Sat', applications: 2390 },
  { name: 'Sun', applications: 3490 },
];

const STATS = [
  { label: 'Total Applications', value: '1,245', trend: '+12%', icon: Users },
  { label: 'Contact Requests', value: '842', trend: '+5%', icon: Mail },
  { label: 'Active Jobs', value: '12', trend: '0%', icon: FileText },
  { label: 'Profile Views', value: '14,245', trend: '+24%', icon: Activity },
];

export const DashboardPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-navy">Dashboard Overview</h2>
          <p className="text-gray-500 mt-1">Welcome back, here is what is happening today.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                </div>
                <div className="p-3 bg-blue-50 text-royal-blue rounded-xl">
                  <Icon size={24} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-emerald-500 font-medium flex items-center">
                  <ArrowUpRight size={16} className="mr-1" />
                  {stat.trend}
                </span>
                <span className="text-gray-400 ml-2">vs last month</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-navy mb-6">Application Trends</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2E63F5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2E63F5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="applications" stroke="#2E63F5" strokeWidth={3} fillOpacity={1} fill="url(#colorApplications)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-navy mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-royal-blue shrink-0">
                  <Users size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New application received</p>
                  <p className="text-xs text-gray-500 mt-1">Frontend Developer position</p>
                  <p className="text-xs text-gray-400 mt-2">{i} hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

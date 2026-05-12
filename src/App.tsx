import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './app/layouts/DashboardLayout';
import { DashboardPage } from './pages/DashboardPage';

const ApplicationsPage = () => <div className="bg-white p-6 rounded-2xl"><h1 className="text-2xl font-bold text-navy">Applications</h1><p className="text-gray-500 mt-2">Placeholder for the applications management interface.</p></div>;
const AnalyticsPage = () => <div className="bg-white p-6 rounded-2xl"><h1 className="text-2xl font-bold text-navy">Analytics</h1><p className="text-gray-500 mt-2">Placeholder for analytics data.</p></div>;
const MessagesPage = () => <div className="bg-white p-6 rounded-2xl"><h1 className="text-2xl font-bold text-navy">Messages</h1><p className="text-gray-500 mt-2">Placeholder for messages inbox.</p></div>;
const SubscribersPage = () => <div className="bg-white p-6 rounded-2xl"><h1 className="text-2xl font-bold text-navy">Subscribers</h1><p className="text-gray-500 mt-2">Placeholder for subscribers list.</p></div>;
const SettingsPage = () => <div className="bg-white p-6 rounded-2xl"><h1 className="text-2xl font-bold text-navy">Settings</h1><p className="text-gray-500 mt-2">Placeholder for settings UI.</p></div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="applications" element={<ApplicationsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="subscribers" element={<SubscribersPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

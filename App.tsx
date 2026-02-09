
import React, { useState, useEffect } from 'react';
import { UserRole, ImpactRequest, RequestStatus } from './types';
import { MOCK_REQUESTS, MOCK_USER, COLORS } from './constants';
import Layout from './components/Layout';
import ImpactMap from './components/ImpactMap';
import RequestCard from './components/RequestCard';
import DonationForm from './components/DonationForm';
import ImpactDashboard from './components/ImpactDashboard';
import { generateThankYouMessage } from './services/geminiService';

enum View {
  HOME = 'HOME',
  IMPACT = 'IMPACT',
  NOTIFICATIONS = 'NOTIFICATIONS'
}

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.VOLUNTEER);
  const [activeView, setActiveView] = useState<View>(View.HOME);
  const [requests, setRequests] = useState<ImpactRequest[]>(MOCK_REQUESTS);
  const [isDonating, setIsDonating] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const emergencyRequests = requests.filter(r => r.isEmergency && r.status === RequestStatus.PENDING);

  const handleAcceptRequest = async (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: RequestStatus.ACCEPTED } : r));
    setNotification("You've accepted this task! Check 'Impact' for tracking.");
    setTimeout(() => setNotification(null), 4000);
  };

  const handlePostDonation = async (data: any) => {
    const thankYou = await generateThankYouMessage(MOCK_USER.name, data.description);
    setIsDonating(false);
    setNotification(thankYou || "Donation posted successfully!");
    setTimeout(() => setNotification(null), 5000);
  };

  const renderView = () => {
    switch (activeView) {
      case View.IMPACT:
        return <ImpactDashboard user={MOCK_USER} />;
      case View.NOTIFICATIONS:
        return (
          <div className="space-y-4 pt-4">
             <h3 className="text-xl font-black text-slate-800">Alerts</h3>
             <div className="space-y-3">
                <NotificationItem title="New Help Request" body="A local kitchen needs delivery in 20 mins." time="Just now" icon="📢" />
                <NotificationItem title="Impact Milestone" body="You just helped your 10th community!" time="2h ago" icon="🌟" isSpecial />
                <NotificationItem title="Verification Update" body="Your Gold Status has been renewed." time="1d ago" icon="🔒" />
             </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            {/* Urgent Banner */}
            {emergencyRequests.length > 0 && (
              <div className="bg-red-50 border border-red-100 p-4 rounded-3xl flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-2xl flex items-center justify-center text-xl animate-pulse">🚨</div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-red-500 tracking-wider">Critical Alert</p>
                    <p className="text-xs font-bold text-slate-800">{emergencyRequests.length} urgent needs near you</p>
                  </div>
                </div>
                <button className="px-3 py-1.5 bg-red-500 text-white text-[10px] font-black rounded-xl uppercase">View</button>
              </div>
            )}

            {/* Role Header */}
            <section className="space-y-1">
              <h2 className="text-3xl font-black text-slate-800 tracking-tighter">
                {role === UserRole.VOLUNTEER ? 'Mission: Help' : 'Mission: Give'}
              </h2>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                {role === UserRole.VOLUNTEER 
                  ? 'There are people waiting for your help. Every second counts.'
                  : 'Your surplus is someone else\'s essential. Share the light.'}
              </p>
            </section>

            {/* Live Map with pulse */}
            <ImpactMap />

            {/* Action Bar */}
            {role === UserRole.DONOR && (
              <button 
                onClick={() => setIsDonating(true)}
                className="w-full py-5 bg-orange-500 text-white rounded-[2rem] font-black shadow-xl shadow-orange-200 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95"
              >
                <span className="text-2xl">+</span> POST A NEW NEED
              </button>
            )}

            {/* Requests Feed */}
            <section className="space-y-5">
              <div className="flex justify-between items-center px-1">
                 <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em]">Nearby Active Needs</h3>
                 <button className="text-[10px] font-bold text-orange-600 uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full">Filter ⚡</button>
              </div>
              <div className="grid gap-5">
                {requests.filter(r => r.status === RequestStatus.PENDING).map(request => (
                  <RequestCard key={request.id} request={request} onAccept={handleAcceptRequest} />
                ))}
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <Layout activeRole={role} setActiveRole={setRole}>
      <div className="p-4 animate-in fade-in duration-700">
        
        {/* Sub-Nav for Views */}
        <div className="flex gap-4 mb-6 overflow-x-auto pb-1 scrollbar-hide">
           <TabButton active={activeView === View.HOME} label="Requests" onClick={() => setActiveView(View.HOME)} />
           <TabButton active={activeView === View.IMPACT} label="My Impact" onClick={() => setActiveView(View.IMPACT)} />
           <TabButton active={activeView === View.NOTIFICATIONS} label="Alerts" onClick={() => setActiveView(View.NOTIFICATIONS)} />
        </div>

        {/* Dynamic View Rendering */}
        {renderView()}

        {/* Global Toast */}
        {notification && (
          <div className="fixed bottom-28 left-4 right-4 z-[200] animate-in slide-in-from-bottom-10">
            <div className="bg-slate-900/95 backdrop-blur-md text-white p-5 rounded-3xl shadow-2xl border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-orange-500/30">✨</div>
              <p className="text-xs font-bold leading-relaxed pr-2">{notification}</p>
            </div>
          </div>
        )}

        {isDonating && <DonationForm onCancel={() => setIsDonating(false)} onSubmit={handlePostDonation} />}
      </div>
    </Layout>
  );
};

const TabButton: React.FC<{ active: boolean; label: string; onClick: () => void }> = ({ active, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all whitespace-nowrap ${
      active ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-100'
    }`}
  >
    {label}
  </button>
);

const NotificationItem: React.FC<{ title: string; body: string; time: string; icon: string; isSpecial?: boolean }> = ({ title, body, time, icon, isSpecial }) => (
  <div className={`p-4 rounded-3xl border flex items-start gap-4 ${isSpecial ? 'bg-orange-50 border-orange-100 shadow-sm' : 'bg-white border-slate-100'}`}>
     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 ${isSpecial ? 'bg-white' : 'bg-slate-50'}`}>
       {icon}
     </div>
     <div className="flex-1">
        <div className="flex justify-between items-center mb-0.5">
           <h4 className="font-black text-slate-800 text-sm leading-tight">{title}</h4>
           <span className="text-[9px] font-bold text-slate-400">{time}</span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed font-medium">{body}</p>
     </div>
  </div>
);

export default App;

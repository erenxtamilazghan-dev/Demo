
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area, Cell, PieChart, Pie } from 'recharts';
import { UserProfile } from '../types';

interface ImpactDashboardProps {
  user: UserProfile;
}

const ImpactDashboard: React.FC<ImpactDashboardProps> = ({ user }) => {
  const pieData = [
    { name: 'Food', value: 45, color: '#f97316' },
    { name: 'Meds', value: 25, color: '#0d9488' },
    { name: 'Clothes', value: 30, color: '#8b5cf6' },
  ];

  const timelineData = [
    { day: 'Mon', impact: 20 },
    { day: 'Tue', impact: 45 },
    { day: 'Wed', impact: 30 },
    { day: 'Thu', impact: 70 },
    { day: 'Fri', impact: 50 },
    { day: 'Sat', impact: 90 },
    { day: 'Sun', impact: 120 },
  ];

  return (
    <div className="space-y-6 pb-6">
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
           <h3 className="font-bold text-slate-800 text-lg">Your Impact Journey</h3>
           <div className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-[10px] font-black uppercase tracking-wider">
             Verified {user.verificationLevel}
           </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatBox label="Score" value={user.impactScore} icon="✨" />
          <StatBox label="Tasks" value={user.deliveriesCompleted} icon="📦" />
          <StatBox label="Villages" value={user.communitiesHelped} icon="🏘️" />
        </div>

        <div className="h-48 w-full mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timelineData}>
              <defs>
                <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="impact" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorImpact)" />
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">Activity Volume (Weekly)</p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl p-6 text-white">
        <h4 className="font-bold mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          Resource Distribution
        </h4>
        <div className="flex items-center gap-4">
          <div className="w-1/2 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={30} outerRadius={50} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-1/2 space-y-2">
            {pieData.map(d => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></div>
                  <span className="text-slate-400">{d.name}</span>
                </span>
                <span className="font-bold">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest">Achievements</h4>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {user.badges.map(badge => (
            <div key={badge.id} className="min-w-[100px] bg-white p-3 rounded-2xl border border-slate-100 flex flex-col items-center shadow-sm">
              <span className="text-2xl mb-1">{badge.icon}</span>
              <span className="text-[10px] font-bold text-slate-800 text-center">{badge.name}</span>
            </div>
          ))}
          <div className="min-w-[100px] border-2 border-dashed border-slate-200 p-3 rounded-2xl flex flex-col items-center justify-center">
              <span className="text-slate-300 text-xl">+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatBox: React.FC<{ label: string; value: number | string; icon: string }> = ({ label, value, icon }) => (
  <div className="text-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
    <span className="text-lg block mb-1">{icon}</span>
    <span className="text-lg font-black text-slate-800 block">{value}</span>
    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{label}</span>
  </div>
);

export default ImpactDashboard;

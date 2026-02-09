
import React, { useState } from 'react';
import { Category } from '../types';
import { analyzeRequestPriority } from '../services/geminiService';

interface DonationFormProps {
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

const DonationForm: React.FC<DonationFormProps> = ({ onCancel, onSubmit }) => {
  const [description, setDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleAnalyze = async () => {
    if (description.length < 10) return;
    setAnalyzing(true);
    const result = await analyzeRequestPriority(description);
    setAnalysis(result);
    setAnalyzing(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">What are you giving?</h2>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 text-2xl">×</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="E.g., 50 fresh sandwiches prepared today, excess from community event."
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all h-32 resize-none"
            />
          </div>

          <div className="flex justify-between items-center bg-orange-50 p-3 rounded-xl">
             <div className="text-[11px] text-orange-700">
                <span className="font-bold block uppercase">AI Priority Check</span>
                {analysis ? `${analysis.priority} Priority - ${analysis.reason}` : 'Let AI suggest priority level'}
             </div>
             <button 
                onClick={handleAnalyze}
                disabled={analyzing || description.length < 10}
                className={`text-xs font-bold px-3 py-1 rounded-lg ${analyzing ? 'bg-slate-200 text-slate-400' : 'bg-white text-orange-600 shadow-sm border border-orange-100 hover:bg-orange-100'}`}
             >
                {analyzing ? 'Analyzing...' : 'Scan Description'}
             </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
             <div className="p-3 border border-slate-200 rounded-xl flex items-center space-x-3 cursor-pointer hover:bg-slate-50">
                <span className="text-xl">🍱</span>
                <span className="text-sm font-medium">Food</span>
             </div>
             <div className="p-3 border border-slate-200 rounded-xl flex items-center space-x-3 cursor-pointer hover:bg-slate-50">
                <span className="text-xl">👕</span>
                <span className="text-sm font-medium">Clothes</span>
             </div>
          </div>

          <button 
            onClick={() => onSubmit({ description, analysis })}
            className="w-full py-4 bg-orange-500 text-white font-bold rounded-2xl shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all active:scale-[0.98]"
          >
            Post Donation
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationForm;

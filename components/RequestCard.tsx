
import React from 'react';
import { ImpactRequest, Category, RequestStatus } from '../types';

interface RequestCardProps {
  request: ImpactRequest;
  onAccept: (id: string) => void;
}

const RequestCard: React.FC<RequestCardProps> = ({ request, onAccept }) => {
  const getCategoryIcon = (cat: Category) => {
    switch (cat) {
      case Category.FOOD: return '🍱';
      case Category.CLOTHES: return '👕';
      case Category.MEDICINE: return '💊';
      case Category.GROCERIES: return '🛒';
      default: return '📦';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'HIGH': return 'bg-red-100 text-red-700';
      case 'MEDIUM': return 'bg-orange-100 text-orange-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className={`relative bg-white p-5 rounded-3xl border transition-all hover:shadow-lg ${request.isEmergency ? 'border-red-200 shadow-red-50' : 'border-slate-100 shadow-sm'}`}>
      {request.isEmergency && (
        <div className="absolute -top-3 left-6 px-3 py-1 bg-red-500 text-white text-[9px] font-black uppercase rounded-full shadow-lg flex items-center gap-1 animate-pulse">
           <span className="w-1.5 h-1.5 bg-white rounded-full"></span> Urgent Priority
        </div>
      )}

      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3">
          <div className="text-2xl w-12 h-12 flex items-center justify-center bg-slate-50 rounded-2xl border border-slate-100 shadow-inner">
            {getCategoryIcon(request.category)}
          </div>
          <div>
            <h3 className="font-black text-slate-800 leading-tight text-base">{request.title}</h3>
            <div className="flex items-center gap-1 mt-0.5">
               <span className="text-[10px] text-slate-500 font-medium">{request.requesterName}</span>
               <span className="text-teal-500 text-[10px] font-bold">✓ Verified</span>
            </div>
          </div>
        </div>
        <span className={`text-[9px] font-black px-2.5 py-1.5 rounded-xl uppercase tracking-widest ${getUrgencyColor(request.urgency)}`}>
          {request.urgency}
        </span>
      </div>
      
      <p className="text-sm text-slate-600 leading-relaxed mb-4">
        {request.description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <div className="flex items-center text-[11px] text-slate-400 font-medium">
          <span className="flex items-center gap-1">📍 {request.location.address}</span>
        </div>
        <button 
          onClick={() => onAccept(request.id)}
          className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all active:scale-95 shadow-md ${
            request.isEmergency 
            ? 'bg-red-500 text-white shadow-red-100 hover:bg-red-600' 
            : 'bg-orange-500 text-white shadow-orange-100 hover:bg-orange-600'
          }`}
        >
          {request.isEmergency ? 'Rush Deliver' : 'I Can Help'}
        </button>
      </div>
    </div>
  );
};

export default RequestCard;

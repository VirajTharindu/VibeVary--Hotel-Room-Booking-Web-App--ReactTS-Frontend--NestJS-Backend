import * as React from 'react';
import { Activity, ClipboardList, BarChart3, TrendingUp } from 'lucide-react';
import type { Room, ServiceRequest } from '../../types';

interface MetricsStripProps {
  rooms: Room[];
  serviceRequests: ServiceRequest[];
}

export const MetricsStrip: React.FC<MetricsStripProps> = ({ rooms, serviceRequests }) => {
  return (
    <div className="border-y border-white/[0.04] bg-[#080406]/50 backdrop-blur-3xl relative z-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Occupancy', value: `${Math.round((rooms.filter(r => !r.isAvailable).length / (rooms.length || 1)) * 100)}%`, icon: Activity, color: 'text-brand-primary' },
          { label: 'Pending Tasks', value: serviceRequests.filter(r => r.status !== 'completed').length, icon: ClipboardList, color: 'text-rose-400' },
          { label: 'Avg. Rate', value: `$${Math.round(rooms.reduce((acc, r) => acc + r.price, 0) / (rooms.length || 1))}`, icon: BarChart3, color: 'text-brand-secondary' },
          { label: 'Performance', value: '+12.5%', icon: TrendingUp, color: 'text-emerald-400' }
        ].map((metric, i) => (
          <div key={metric.label} className={`p-8 lg:p-12 border-white/[0.04] flex flex-col gap-4 ${i !== 3 ? 'border-r' : ''} ${i < 2 ? 'border-b lg:border-b-0' : ''}`}>
            <div className={`w-12 h-12 rounded-2xl bg-white/[0.02] flex items-center justify-center ${metric.color}`}>
              <metric.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/30 mb-2">{metric.label}</p>
              <p className="font-serif text-4xl lg:text-5xl">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

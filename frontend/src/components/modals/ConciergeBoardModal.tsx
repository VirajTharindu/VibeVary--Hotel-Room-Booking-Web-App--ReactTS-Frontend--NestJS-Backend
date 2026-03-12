import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { ServiceRequest } from '../../types';
import { cn } from '../../utils/cn';

interface ConciergeBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceRequests: ServiceRequest[];
  isAdmin: boolean;
  handleUpdateServiceStatus: (id: string, newStatus: string) => void;
  requestService: (e: React.FormEvent<HTMLFormElement>) => void;
  newServiceReq: { roomNumber: string; serviceType: string; details: string };
  setNewServiceReq: React.Dispatch<React.SetStateAction<{ roomNumber: string; serviceType: string; details: string }>>;
}

export const ConciergeBoardModal: React.FC<ConciergeBoardModalProps> = ({
  isOpen, onClose, serviceRequests, isAdmin, handleUpdateServiceStatus, requestService, newServiceReq, setNewServiceReq
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <div className="absolute inset-0" onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden bg-[#0a0306] border border-white/[0.06] rounded-3xl shadow-2xl flex flex-col"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-rose-500 to-brand-primary opacity-50" />
          
          <div className="flex justify-between items-center p-8 border-b border-white/[0.04]">
            <div>
              <h2 className="font-serif text-3xl mb-1 text-white">Concierge Board</h2>
              <p className="text-white/40 font-light text-sm tracking-wide">
                {isAdmin ? 'Manage Guest Service Requests' : 'Request Premium Services'}
              </p>
            </div>
            <button onClick={onClose} className="p-3 bg-white/[0.02] hover:bg-white/[0.06] rounded-xl transition-colors border border-white/[0.04]">
              <X className="w-5 h-5 text-white/60" />
            </button>
          </div>

          <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
            {isAdmin ? (
              <div className="grid gap-4">
                {serviceRequests.length === 0 ? (
                  <div className="text-center py-20 text-white/30 font-light">No pending service requests.</div>
                ) : (
                  serviceRequests.map((req) => (
                    <motion.div
                      key={req._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/[0.02] border border-white/[0.04] p-6 rounded-2xl flex items-center justify-between hover:bg-white/[0.04] transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-4 mb-2">
                          <span className="px-3 py-1 bg-white/[0.05] rounded-md text-[10px] uppercase tracking-widest text-brand-secondary font-medium border border-white/[0.05]">
                            Suite {req.roomNumber}
                          </span>
                          <span className="text-sm font-medium text-white/90">{req.serviceType}</span>
                        </div>
                        <p className="text-white/50 text-sm font-light">{req.details}</p>
                        <p className="text-white/20 text-[10px] mt-3 uppercase tracking-widest">
                          {req.timestamp ? new Date(req.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <select
                          value={req.status}
                          onChange={(e) => handleUpdateServiceStatus(req._id, e.target.value)}
                          className={cn(
                            "bg-white/[0.03] border border-white/[0.04] rounded-lg px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider outline-none",
                            req.status === 'completed' ? "text-emerald-400" : "text-brand-secondary"
                          )}
                        >
                          <option value="pending" className="bg-[#111]">Pending</option>
                          <option value="in-progress" className="bg-[#111]">In Progress</option>
                          <option value="completed" className="bg-[#111]">Completed</option>
                        </select>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            ) : (
              <form onSubmit={requestService} className="max-w-xl mx-auto space-y-8 py-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-medium tracking-[0.2em] uppercase text-white/40 mb-3">Your Suite</label>
                    <input
                      type="text"
                      required
                      value={newServiceReq.roomNumber}
                      onChange={e => setNewServiceReq({ ...newServiceReq, roomNumber: e.target.value })}
                      className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-brand-primary/50 transition-colors"
                      placeholder="e.g. 401"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium tracking-[0.2em] uppercase text-white/40 mb-3">Service Type</label>
                    <select
                      value={newServiceReq.serviceType}
                      onChange={e => setNewServiceReq({ ...newServiceReq, serviceType: e.target.value })}
                      className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-brand-primary/50 transition-colors appearance-none"
                    >
                      <option value="Room Service" className="bg-[#111]">Room Dining</option>
                      <option value="Housekeeping" className="bg-[#111]">Housekeeping</option>
                      <option value="Spa Booking" className="bg-[#111]">Spa & Wellness</option>
                      <option value="Transportation" className="bg-[#111]">Chauffeur</option>
                      <option value="Other" className="bg-[#111]">Other Request</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-medium tracking-[0.2em] uppercase text-white/40 mb-3">Details (Optional)</label>
                  <textarea
                    value={newServiceReq.details}
                    onChange={e => setNewServiceReq({ ...newServiceReq, details: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-brand-primary/50 transition-colors h-32 resize-none"
                    placeholder="E.g., Extra pillows, champagne, specific dietary requirements..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-brand-primary hover:bg-brand-secondary text-white rounded-xl text-[11px] font-medium tracking-[0.2em] uppercase transition-colors shadow-lg shadow-brand-primary/20"
                >
                  Submit Request
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

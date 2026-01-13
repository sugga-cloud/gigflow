import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyBids } from '../store/slices/bidSlice';
import { motion } from 'framer-motion';
import { DollarSign, Clock, CheckCircle, XCircle, AlertCircle, Send, Briefcase } from 'lucide-react';

const MyBids = () => {
  const dispatch = useDispatch();
  const { myBids } = useSelector((state) => state.bids);

  useEffect(() => {
    dispatch(getMyBids());
  }, [dispatch]);

  const getStatusDetails = (status) => {
    switch (status) {
      case 'hired':
        return {
          icon: <CheckCircle className="h-5 w-5" />,
          color: 'text-emerald-400',
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/50',
          shadow: 'shadow-[0_0_20px_rgba(52,211,153,0.15)]'
        };
      case 'rejected':
        return {
          icon: <XCircle className="h-5 w-5" />,
          color: 'text-rose-400',
          bg: 'bg-rose-500/10',
          border: 'border-rose-500/20',
          shadow: ''
        };
      default:
        return {
          icon: <AlertCircle className="h-5 w-5" />,
          color: 'text-cyan-400',
          bg: 'bg-cyan-500/10',
          border: 'border-cyan-500/30',
          shadow: 'shadow-[0_0_20px_rgba(34,211,238,0.1)]'
        };
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <Send className="text-cyan-400 h-8 w-8" />
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Proposals</span>
          </h1>
          <p className="text-slate-400 mt-2 ml-11 font-medium">Track your active bids and project invitations</p>
        </motion.div>

        {myBids.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white/[0.02] backdrop-blur-xl rounded-[2.5rem] border border-white/5"
          >
            <div className="inline-flex p-6 rounded-full bg-slate-900 border border-white/5 mb-6 text-slate-700">
              <Send className="h-12 w-12" />
            </div>
            <p className="text-slate-400 text-xl font-medium">No bids submitted yet.</p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {myBids.map((bid, index) => {
              const status = getStatusDetails(bid.status);
              return (
                <motion.div
                  key={bid._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative overflow-hidden bg-white/[0.03] backdrop-blur-md rounded-3xl border ${status.border} ${status.shadow} transition-all p-6 md:p-8`}
                >
                  {/* Status Ribbon (Mobile/Tablet) */}
                  <div className={`absolute top-0 right-0 px-6 py-1 rounded-bl-2xl text-[10px] font-black uppercase tracking-[0.2em] ${status.bg} ${status.color} border-l border-b ${status.border}`}>
                    {bid.status}
                  </div>

                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Gig Info */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2 pr-20">
                        {bid.gigId?.title || 'Gig Project'}
                      </h3>
                      <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                        <Briefcase className="h-4 w-4" />
                        <span>Client Project</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-4 w-4" />
                        <span>{new Date(bid.createdAt).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="bg-slate-900/50 rounded-2xl p-4 border border-white/5">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Your Pitch</p>
                        <p className="text-slate-300 italic text-sm leading-relaxed">
                          "{bid.message}"
                        </p>
                      </div>
                    </div>

                    {/* Financials & Action */}
                    <div className="lg:w-64 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-8">
                      <div className="space-y-4">
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Your Bid</p>
                          <div className="flex items-center text-emerald-400">
                            <DollarSign className="h-5 w-5" />
                            <span className="text-3xl font-black tracking-tighter">{bid.price}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Gig Budget</p>
                          <div className="flex items-center text-slate-400">
                            <DollarSign className="h-4 w-4" />
                            <span className="text-xl font-bold">${bid.gigId?.budget || '---'}</span>
                          </div>
                        </div>
                      </div>

                      {bid.status === 'hired' && (
                        <motion.div 
                          animate={{ scale: [1, 1.02, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="mt-6 flex items-center justify-center gap-2 py-3 bg-emerald-500 text-slate-950 rounded-xl font-black text-xs uppercase"
                        >
                          <CheckCircle className="h-4 w-4" /> Project Active
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBids;
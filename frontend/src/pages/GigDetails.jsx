import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGigById } from '../store/slices/gigSlice';
import { createBid, getBidsForGig, hireBid } from '../store/slices/bidSlice';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { DollarSign, User, Clock, MessageSquare, CheckCircle, ArrowLeft, Send, ShieldCheck, Loader2 } from 'lucide-react';

const GigDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentGig } = useSelector((state) => state.gigs);
  const { bids, isLoading: bidsLoading } = useSelector((state) => state.bids);
  const { user } = useSelector((state) => state.auth);

  const [showBidForm, setShowBidForm] = useState(false);
  const [bidFormData, setBidFormData] = useState({ message: '', price: '' });

  const isOwner = currentGig?.ownerId?._id === user?._id;

  useEffect(() => {
    dispatch(getGigById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (isOwner && currentGig) {
      dispatch(getBidsForGig(id));
    }
  }, [dispatch, id, isOwner, currentGig]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    if (!bidFormData.message || !bidFormData.price) {
      toast.error('Please fill in all fields');
      return;
    }

    const result = await dispatch(
      createBid({
        gigId: id,
        message: bidFormData.message,
        price: Number(bidFormData.price),
      })
    );

    if (result.type === 'bids/create/fulfilled') {
      toast.success('Bid submitted successfully!');
      navigate('/my-bids');
    }
  };

  if (!currentGig) return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
      <Loader2 className="h-12 w-12 text-emerald-400 animate-spin" />
      <p className="mt-4 text-slate-400 font-medium">Syncing Gig Data...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation & Header */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Marketplace
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: GIG INFO */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/[0.03] backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-8 md:p-10 shadow-2xl"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  currentGig.status === 'open' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'
                }`}>
                  {currentGig.status}
                </span>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Clock className="h-4 w-4" />
                  {new Date(currentGig.createdAt).toLocaleDateString()}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                {currentGig.title}
              </h1>

              <div className="flex flex-wrap gap-8 py-6 border-y border-white/5 mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Budget</p>
                    <p className="text-xl font-black text-white">${currentGig.budget}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-400">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Posted By</p>
                    <p className="text-xl font-black text-white">{currentGig.ownerId?.name}</p>
                  </div>
                </div>
              </div>

              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400 mb-4">Description</h2>
              <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
                {currentGig.description}
              </p>
            </motion.div>

            {/* BIDS LIST (If Owner) */}
            {isOwner && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/[0.02] rounded-[2.5rem] border border-white/5 p-8"
              >
                <h2 className="text-2xl font-black text-white mb-8">Received Proposals ({bids.length})</h2>
                <div className="space-y-4">
                  {bids.map((bid) => (
                    <div key={bid._id} className="bg-slate-900/50 border border-white/5 p-6 rounded-3xl hover:border-emerald-500/30 transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-gradient-to-tr from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center font-bold text-slate-950">
                            {bid.freelancerId?.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-white font-bold">{bid.freelancerId?.name}</h4>
                            <p className="text-xs text-slate-500">{bid.freelancerId?.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-black text-emerald-400">${bid.price}</p>
                          <span className="text-[10px] font-bold text-slate-500 uppercase">{bid.status}</span>
                        </div>
                      </div>
                      <p className="text-slate-400 text-sm mb-6 bg-white/5 p-4 rounded-xl italic">"{bid.message}"</p>
                      {bid.status === 'pending' && currentGig.status === 'open' && (
                        <button 
                          onClick={() => hireBid(bid._id, bid.freelancerId?.name)}
                          className="w-full py-3 bg-emerald-500 text-slate-950 font-black rounded-xl hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2"
                        >
                          <ShieldCheck className="h-4 w-4" /> HIRE FREELANCER
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT COLUMN: ACTION PANEL */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {!isOwner && currentGig.status === 'open' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-b from-emerald-500/20 to-cyan-500/20 backdrop-blur-xl rounded-[2.5rem] border border-emerald-500/20 p-8 shadow-[0_20px_50px_rgba(52,211,153,0.1)]"
                >
                  <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                    <Send className="h-5 w-5 text-emerald-400" />
                    Place Proposal
                  </h3>
                  
                  <form onSubmit={handleBidSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest ml-1">Your Price (USD)</label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 h-5 w-5" />
                        <input 
                          type="number"
                          value={bidFormData.price}
                          onChange={(e) => setBidFormData({ ...bidFormData, price: e.target.value })}
                          className="w-full pl-12 pr-4 py-4 bg-slate-900/80 border border-white/10 rounded-2xl text-white font-bold outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest ml-1">Message</label>
                      <textarea 
                        value={bidFormData.message}
                        onChange={(e) => setBidFormData({ ...bidFormData, message: e.target.value })}
                        rows="5"
                        className="w-full px-4 py-4 bg-slate-900/80 border border-white/10 rounded-2xl text-white text-sm outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all resize-none"
                        placeholder="Why are you the best fit?"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-4 bg-white text-slate-950 font-black rounded-2xl hover:bg-emerald-400 transition-all shadow-xl active:scale-95"
                    >
                      SUBMIT PROPOSAL
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Security Badge */}
              <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] flex items-start gap-4">
                <ShieldCheck className="h-6 w-6 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="text-white font-bold text-sm">GigFlow Secured</h4>
                  <p className="text-slate-500 text-xs mt-1">Payments are held in escrow and released only after project completion.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GigDetails;
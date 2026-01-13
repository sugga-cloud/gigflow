import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyGigs, deleteGig } from '../store/slices/gigSlice';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, 
  Clock, 
  Trash2, 
  Eye, 
  Plus, 
  LayoutGrid, 
  Activity, 
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const MyGigs = () => {
  const dispatch = useDispatch();
  const { myGigs } = useSelector((state) => state.gigs);

  useEffect(() => {
    dispatch(getMyGigs());
  }, [dispatch]);

  const handleDelete = async (gigId, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      const result = await dispatch(deleteGig(gigId));
      if (result.type === 'gigs/delete/fulfilled') {
        toast.success('Gig removed from inventory');
      } else {
        toast.error('Deletion failed');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Top Header / Stats Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-[0.2em] mb-2">
              <Activity className="h-3 w-3" />
              Creator Studio
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Inventory</span>
            </h1>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
          >
            <Link
              to="/create-gig"
              className="flex items-center gap-2 bg-white text-slate-950 px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/10"
            >
              <Plus className="h-4 w-4" />
              Post New Gig
            </Link>
          </motion.div>
        </div>

        {/* List Section */}
        <AnimatePresence mode="popLayout">
          {myGigs.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-32 bg-white/[0.02] border border-dashed border-white/10 rounded-[3rem] text-center px-6"
            >
              <div className="p-6 bg-slate-900 rounded-3xl border border-white/5 mb-6">
                <LayoutGrid className="h-10 w-10 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Inventory Empty</h3>
              <p className="text-slate-500 text-sm max-w-xs mb-8">
                You haven't listed any active gigs yet. Start by creating your first project mission.
              </p>
              <Link
                to="/create-gig"
                className="text-emerald-400 text-xs font-black uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2"
              >
                Launch First Gig <ChevronRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {myGigs.map((gig, index) => (
                <motion.div
                  key={gig._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-5 md:p-6 hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-xl font-bold text-white truncate max-w-md group-hover:text-emerald-400 transition-colors">
                          {gig.title}
                        </h3>
                        <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border ${
                          gig.status === 'open' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-slate-800 text-slate-400 border-white/5'
                        }`}>
                          {gig.status}
                        </span>
                      </div>
                      
                      <p className="text-slate-500 text-sm line-clamp-1 mb-5">
                        {gig.description}
                      </p>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="h-4 w-4 text-emerald-500" />
                          <span className="text-white font-bold tracking-tight">${gig.budget}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                          <Clock className="h-3.5 w-3.5" />
                          {new Date(gig.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 md:border-l md:border-white/5 md:pl-6">
                      <Link
                        to={`/gigs/${gig._id}`}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 text-white hover:bg-white hover:text-slate-950 transition-all text-xs font-black uppercase tracking-widest"
                      >
                        <Eye className="h-4 w-4" />
                        Details
                      </Link>
                      <button
                        onClick={() => handleDelete(gig._id, gig.title)}
                        className="p-3 rounded-xl bg-rose-500/5 text-rose-500 border border-rose-500/10 hover:bg-rose-500 hover:text-white transition-all"
                        title="Delete Permanently"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Footer Info */}
        {!myGigs.length === 0 && (
          <div className="mt-12 flex items-center justify-center gap-2 text-slate-600">
            <AlertCircle className="h-3.5 w-3.5" />
            <p className="text-[10px] font-bold uppercase tracking-widest">
              Gigs are automatically archived after 30 days of inactivity
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGigs;
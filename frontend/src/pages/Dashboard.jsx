import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGigs } from '../store/slices/gigSlice';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, DollarSign, Clock, User, Filter, Sparkles, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const { gigs, isLoading } = useSelector((state) => state.gigs);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllGigs(''));
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getAllGigs(searchTerm));
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight flex items-center gap-3">
              <Sparkles className="text-emerald-400 h-8 w-8" />
              GIG <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">MARKET</span>
            </h1>
            <p className="text-slate-400 mt-2 font-medium">Explore the latest opportunities in the ecosystem</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-slate-500 text-sm font-bold uppercase tracking-widest"
          >
            <Filter className="h-4 w-4" /> Filter Gigs
          </motion.div>
        </div>

        {/* Search Bar Container */}
        <motion.form 
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-12 group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative flex flex-col md:flex-row gap-3 bg-slate-900 border border-white/10 p-2 rounded-[2rem]">
            <div className="flex-1 relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search by title, skill, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent pl-14 pr-4 py-4 text-white font-medium outline-none placeholder:text-slate-600"
              />
            </div>
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-10 py-4 rounded-[1.5rem] font-black transition-all active:scale-95"
            >
              SEARCH
            </button>
          </div>
        </motion.form>

        {/* Gigs List */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="h-10 w-10 text-emerald-400 animate-spin mb-4" />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Scanning Network...</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {gigs.map((gig, index) => (
                <motion.div
                  key={gig._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group bg-white/[0.03] backdrop-blur-md rounded-[2.5rem] border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.05] transition-all p-7 flex flex-col"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-emerald-500/10 transition-colors">
                      <DollarSign className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Budget</p>
                      <p className="text-xl font-black text-white">${gig.budget}</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-1 group-hover:text-emerald-400 transition-colors">
                    {gig.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm mb-8 line-clamp-2 leading-relaxed">
                    {gig.description}
                  </p>

                  <div className="mt-auto pt-6 border-t border-white/5 space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-tighter">
                      <div className="flex items-center text-slate-500">
                        <User className="h-3.5 w-3.5 mr-2 text-cyan-400/70" />
                        <span>{gig.ownerId?.name || 'Anon'}</span>
                      </div>
                      <div className="flex items-center text-slate-500">
                        <Clock className="h-3.5 w-3.5 mr-2 text-emerald-400/70" />
                        <span>{new Date(gig.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <Link
                      to={`/gigs/${gig._id}`}
                      className={`block w-full text-center py-4 rounded-2xl font-black text-xs uppercase tracking-[0.1em] transition-all ${
                        gig.ownerId?._id === user?._id 
                        ? 'bg-slate-800 text-white hover:bg-slate-700' 
                        : 'bg-white/5 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-slate-950 hover:border-transparent shadow-lg'
                      }`}
                    >
                      {gig.ownerId?._id === user?._id ? 'Manage Gig' : 'View Mission'}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!isLoading && gigs.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 bg-white/[0.02] rounded-[3rem] border border-dashed border-white/10"
          >
            <Search className="h-12 w-12 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-400 text-xl font-medium">No results matched your query</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
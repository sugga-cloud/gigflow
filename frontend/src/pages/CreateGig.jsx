import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createGig } from '../store/slices/gigSlice';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Briefcase, DollarSign, FileText, Sparkles, Rocket, ArrowRight, Loader2 } from 'lucide-react';

const CreateGig = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
  });

  const { title, description, budget } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.gigs);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !budget) {
      toast.error('Please fill in all fields');
      return;
    }
    if (budget <= 0) {
      toast.error('Budget must be greater than 0');
      return;
    }

    const result = await dispatch(
      createGig({ title, description, budget: Number(budget) })
    );

    if (result.type === 'gigs/create/fulfilled') {
      toast.success('Project launched successfully!');
      navigate('/my-gigs');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-12 px-4 relative overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]" />

      <div className="max-w-3xl mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.03] backdrop-blur-2xl rounded-[3rem] border border-white/10 p-8 md:p-12 shadow-2xl"
        >
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-12">
            <div className="p-4 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-3xl shadow-lg shadow-emerald-500/20 mb-6">
              <Rocket className="h-8 w-8 text-slate-950" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight mb-2">
              Launch a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">New Project</span>
            </h1>
            <p className="text-slate-400 font-medium">Define your requirements and find the perfect talent.</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-8">
            {/* Title Input */}
            <div className="group space-y-2">
              <label className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] ml-1">
                Project Headline
              </label>
              <div className="relative">
                <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={onChange}
                  placeholder="e.g., Architecting a Next.js Dashboard"
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white font-bold outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all placeholder:text-slate-600"
                  required
                />
              </div>
            </div>

            {/* Budget Input */}
            <div className="group space-y-2">
              <label className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] ml-1">
                Allocated Budget (USD)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                <input
                  type="number"
                  name="budget"
                  value={budget}
                  onChange={onChange}
                  placeholder="500"
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white font-bold outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all placeholder:text-slate-600"
                  required
                />
              </div>
            </div>

            {/* Description Input */}
            <div className="group space-y-2">
              <label className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] ml-1">
                Detailed Scope
              </label>
              <div className="relative">
                <FileText className="absolute left-5 top-6 h-5 w-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                <textarea
                  name="description"
                  value={description}
                  onChange={onChange}
                  rows="6"
                  placeholder="Break down the milestones, tech stack, and goals..."
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white text-sm leading-relaxed outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all placeholder:text-slate-600 resize-none"
                  required
                />
              </div>
              <div className="flex justify-end">
                <span className={`text-[10px] font-bold ${description.length > 900 ? 'text-rose-400' : 'text-slate-500'}`}>
                  {description.length}/1000
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-[2] relative group overflow-hidden bg-emerald-500 text-slate-950 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:bg-emerald-400 active:scale-95 disabled:opacity-50"
              >
                <div className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <span>Deploy Mission</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-white/5 border border-white/10 text-slate-400 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all"
              >
                Discard
              </button>
            </div>
          </form>
        </motion.div>

        {/* Safety Tip */}
        <div className="mt-8 flex items-center justify-center gap-3 text-slate-500">
          <Sparkles className="h-4 w-4 text-emerald-400" />
          <p className="text-[11px] font-bold uppercase tracking-widest">
            Detailed descriptions attract 40% higher quality bids
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateGig;
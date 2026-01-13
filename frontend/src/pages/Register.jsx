import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../store/slices/authSlice';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Mail, Lock, User, UserPlus, ArrowRight, Loader2 } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess || user) {
      toast.success('Account created successfully!');
      navigate('/dashboard');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    dispatch(register({ name, email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-900 to-cyan-900">
      {/* Animated Background Orbs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full z-10 my-12"
      >
        <div className="bg-white/10 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white/10">
          
          {/* Beating Icon Header */}
          <div className="text-center mb-8 relative">
            <div className="relative inline-block">
              <motion.div 
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute inset-0 bg-emerald-400 rounded-full blur-xl"
              />
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 inline-flex items-center justify-center p-5 bg-gradient-to-tr from-emerald-400 to-cyan-400 rounded-2xl shadow-[0_0_30px_rgba(52,211,153,0.3)]"
              >
                <UserPlus className="h-10 w-10 text-slate-900" />
              </motion.div>
            </div>
            
            <h2 className="mt-6 text-3xl font-black text-white tracking-tight">
              Join <span className="text-emerald-400">GigFlow</span>
            </h2>
            <p className="mt-2 text-emerald-100/60 font-medium">
              Start your journey with us today.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Full Name Input */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-400/50 group-focus-within:text-emerald-400 transition-colors" />
                <input
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={onChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-900/50 border border-white/5 rounded-2xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400 transition-all outline-none"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-400/50 group-focus-within:text-emerald-400 transition-colors" />
                <input
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={onChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-900/50 border border-white/5 rounded-2xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400 transition-all outline-none"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Password Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em] ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-400/50 group-focus-within:text-emerald-400 transition-colors" />
                  <input
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={onChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-white/5 rounded-xl text-white text-sm placeholder-slate-500 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400 transition-all outline-none"
                    placeholder="••••••"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em] ml-1">Confirm</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-400/50 group-focus-within:text-emerald-400 transition-colors" />
                  <input
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={onChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-white/5 rounded-xl text-white text-sm placeholder-slate-500 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400 transition-all outline-none"
                    placeholder="••••••"
                  />
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ y: -2, boxShadow: "0 20px 25px -5px rgba(52, 211, 153, 0.2)" }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full mt-4 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 font-black rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <>
                  CREATE ACCOUNT <ArrowRight className="h-5 w-5" />
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-slate-400 text-sm">
              Already a member?{' '}
              <Link to="/login" className="text-cyan-400 font-bold hover:text-emerald-400 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
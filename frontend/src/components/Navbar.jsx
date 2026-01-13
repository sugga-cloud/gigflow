import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { motion } from 'framer-motion';
import { Briefcase, LogOut, User, PlusCircle, LayoutDashboard, Send, FolderKanban } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Market', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Gigs', path: '/my-gigs', icon: FolderKanban },
    { name: 'My Bids', path: '/my-bids', icon: Send },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-950/60 backdrop-blur-xl border border-white/10 rounded-[2rem] px-6 py-3 shadow-2xl">
          <div className="flex justify-between items-center h-12">
            
            {/* Brand Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-tr from-emerald-500 to-cyan-500 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                <Briefcase className="h-5 w-5 text-slate-950" />
              </div>
              <span className="text-xl font-black text-white tracking-tighter">
                GIG<span className="text-emerald-400">FLOW</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {user && navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    isActive(link.path) 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link
                    to="/create-gig"
                    className="hidden lg:flex items-center space-x-2 bg-white text-slate-950 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10"
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span>Post Gig</span>
                  </Link>

                  <div className="h-8 w-[1px] bg-white/10 mx-2 hidden md:block" />

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3 bg-white/5 py-1.5 pl-2 pr-4 rounded-2xl border border-white/5">
                      <div className="h-8 w-8 bg-gradient-to-tr from-slate-700 to-slate-800 rounded-xl flex items-center justify-center border border-white/10">
                        <User className="h-4 w-4 text-emerald-400" />
                      </div>
                      <span className="text-xs font-bold text-slate-300 hidden sm:block">
                        {user.name}
                      </span>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="p-2.5 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-xl transition-all"
                      title="Logout"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="text-slate-400 hover:text-white px-4 py-2 text-xs font-black uppercase tracking-widest"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-emerald-500 text-slate-950 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    Join
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Briefcase, TrendingUp, Shield, Zap, ArrowRight, MousePointer2 } from 'lucide-react';

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
          <div className="absolute top-24 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-sm font-medium mb-6"
            >
              <Zap className="h-4 w-4 fill-emerald-400" />
              <span>The Future of Freelancing is Here</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-white">
              GIG<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">FLOW</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl mb-10 text-slate-400 leading-relaxed">
              Connect with top-tier talent or find your next dream gig on the 
              fastest-growing marketplace built for the modern creator.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 font-black rounded-2xl hover:shadow-[0_0_30px_rgba(52,211,153,0.3)] transition-all flex items-center justify-center gap-2"
                  >
                    Browse Gigs <MousePointer2 className="h-5 w-5" />
                  </Link>
                  <Link
                    to="/create-gig"
                    className="w-full sm:w-auto px-10 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
                  >
                    Post a Gig
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 font-black rounded-2xl hover:shadow-[0_0_30px_rgba(52,211,153,0.3)] transition-all"
                  >
                    Start for Free
                  </Link>
                  <Link
                    to="/login"
                    className="w-full sm:w-auto px-10 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                  >
                    Sign In <ArrowRight className="h-5 w-5" />
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-emerald-400 mb-4">Features</h2>
          <p className="text-4xl font-bold text-white text-center">Built for Speed & Security</p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <FeatureCard
            icon={<Briefcase className="h-8 w-8 text-emerald-400" />}
            title="Rapid Posting"
            description="Launch your project in seconds with our optimized interface."
          />
          <FeatureCard
            icon={<TrendingUp className="h-8 w-8 text-cyan-400" />}
            title="Smart Flow"
            description="Custom proposals and competitive bidding powered by data."
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8 text-emerald-400" />}
            title="Safe Hire"
            description="Atomic hiring systems to ensure zero payment friction."
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8 text-cyan-400" />}
            title="Live Sync"
            description="Real-time push notifications for every milestone."
          />
        </motion.div>
      </div>

      {/* How It Works */}
      <div className="bg-white/[0.02] border-y border-white/5 py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">The Workflow</h2>
            <div className="h-1 w-20 bg-emerald-500 mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <StepCard number="01" title="Discovery" description="Browse elite opportunities or post your mission." />
            <StepCard number="02" title="Engagement" description="Submit and review high-impact proposals." />
            <StepCard number="03" title="Execution" description="Hire instantly and start the collaboration." />
          </div>
        </div>
      </div>

      {/* Final CTA */}
      {!user && (
        <div className="py-24 relative">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-12 rounded-[3rem] border border-white/10"
            >
              <h2 className="text-4xl font-black text-white mb-6">Ready to scale?</h2>
              <p className="text-slate-400 text-lg mb-10">
                Join the ecosystem where quality meets velocity.
              </p>
              <Link
                to="/register"
                className="bg-white text-slate-900 px-12 py-4 rounded-2xl font-black hover:bg-emerald-400 transition-colors inline-block"
              >
                Create Account
              </Link>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
    whileHover={{ y: -10 }}
    className="bg-white/[0.03] p-8 rounded-[2rem] border border-white/10 hover:bg-white/[0.06] transition-all"
  >
    <div className="mb-6 p-3 bg-white/5 inline-block rounded-xl">{icon}</div>
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </motion.div>
);

const StepCard = ({ number, title, description }) => (
  <div className="relative group text-center md:text-left">
    <div className="text-7xl font-black text-white/[0.03] absolute -top-8 left-0 group-hover:text-emerald-500/10 transition-colors">
      {number}
    </div>
    <div className="relative z-10">
      <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  </div>
);

export default Home;
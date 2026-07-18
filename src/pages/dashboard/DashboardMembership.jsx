import { motion } from 'framer-motion';
import { FiCheck, FiX, FiArrowUpRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { memberships } from '../../data/memberships.js';
import { formatRupees } from '../../utils/currency.js';

const DashboardMembership = () => {
  const { currentUser } = useAuth();
  const currentPlan = memberships.find(m => m.name === (currentUser?.membership || 'Basic')) || memberships[0];
  const nextPlan = memberships[memberships.indexOf(currentPlan) + 1];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold font-poppins text-dark-text mb-1">My <span className="gradient-text">Membership</span></h1>
        <p className="text-dark-muted">Manage your current plan and explore upgrade options.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Current plan */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
          <div className={`-mx-6 -mt-6 px-6 py-5 mb-5 bg-gradient-to-r ${currentPlan.color} rounded-t-2xl`}>
            <p className="text-white/70 text-xs uppercase tracking-wider">Current Plan</p>
            <h2 className="text-white font-bold font-poppins text-2xl mt-1">{currentPlan.name}</h2>
            <p className="text-white font-bold text-3xl mt-2">{formatRupees(currentPlan.monthlyPrice)}<span className="text-white/70 text-base font-normal">/mo</span></p>
          </div>
          <div className="space-y-2 mb-5">
            {currentPlan.features.map(f => (
              <div key={f.text} className="flex items-center gap-2 text-sm">
                {f.included ? <FiCheck className="text-green-400 shrink-0" /> : <FiX className="text-dark-border shrink-0" />}
                <span className={f.included ? 'text-dark-text' : 'text-dark-border'}>{f.text}</span>
              </div>
            ))}
          </div>
          <div className="p-4 bg-dark-bg rounded-xl border border-dark-border">
            <p className="text-xs text-dark-muted">Member since</p>
            <p className="text-dark-text font-semibold">{currentUser?.joinDate || 'N/A'}</p>
          </div>
        </motion.div>

        {/* Upgrade card */}
        {nextPlan ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card border-primary/30">
            <div className="flex items-center gap-2 mb-4">
              <span className="badge bg-primary/15 text-primary border border-primary/30">Recommended Upgrade</span>
            </div>
            <div className={`p-4 bg-gradient-to-r ${nextPlan.color} rounded-xl mb-4`}>
              <h3 className="text-white font-bold font-poppins text-xl">{nextPlan.name} Plan</h3>
              <p className="text-white text-2xl font-bold mt-1">{formatRupees(nextPlan.monthlyPrice)}<span className="text-white/70 text-sm">/mo</span></p>
            </div>
            <p className="text-dark-muted text-sm mb-4">{nextPlan.description}</p>
            <div className="space-y-2 mb-5">
              {nextPlan.features.filter(f => f.included).slice(0, 6).map(f => (
                <div key={f.text} className="flex items-center gap-2 text-sm">
                  <FiCheck className="text-green-400 shrink-0" />
                  <span className="text-dark-text">{f.text}</span>
                </div>
              ))}
            </div>
            <Link to="/membership" className="btn-primary w-full text-center">
              Upgrade Now <FiArrowUpRight />
            </Link>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card flex items-center justify-center text-center">
            <div>
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-xl font-bold font-poppins gradient-text mb-2">You're on the Elite plan!</h3>
              <p className="text-dark-muted text-sm">You're already enjoying all of FitForge's premium benefits.</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* All plans */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card">
        <h2 className="text-lg font-bold font-poppins text-dark-text mb-4">All Membership Plans</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {memberships.map(plan => (
            <div
              key={plan.name}
              className={`p-4 rounded-xl border text-center ${plan.name === currentPlan.name ? 'border-primary bg-primary/10' : 'border-dark-border bg-dark-bg'}`}
            >
              <p className="font-bold text-dark-text">{plan.name}</p>
              <p className="text-2xl font-bold gradient-text font-poppins mt-1">{formatRupees(plan.monthlyPrice)}</p>
              <p className="text-dark-muted text-xs">/month</p>
              {plan.name === currentPlan.name && <span className="badge bg-primary/20 text-primary text-xs mt-2">Current</span>}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardMembership;

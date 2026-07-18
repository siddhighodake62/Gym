import { motion } from 'framer-motion';
import { FiUsers, FiActivity, FiTrendingUp, FiBell, FiCalendar, FiAward, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const StatCard = ({ icon: Icon, label, value, sub, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="card"
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
        <Icon className="text-white text-xl" />
      </div>
    </div>
    <p className="text-3xl font-bold font-poppins gradient-text mb-1">{value}</p>
    <p className="text-dark-text text-sm font-medium">{label}</p>
    {sub && <p className="text-dark-muted text-xs mt-0.5">{sub}</p>}
  </motion.div>
);

const DashboardOverview = () => {
  const { currentUser } = useAuth();

  const stats = [
    { icon: FiCalendar, label: 'Workout Sessions', value: '32', sub: 'This month', color: 'bg-blue-600', delay: 0.1 },
    { icon: FiActivity, label: 'Calories Burned', value: '14,280', sub: 'Total this month', color: 'bg-red-600', delay: 0.15 },
    { icon: FiTrendingUp, label: 'Current BMI', value: currentUser?.bmiHistory?.slice(-1)[0]?.bmi || '—', sub: 'Last measured', color: 'bg-green-600', delay: 0.2 },
    { icon: FiAward, label: 'Streak', value: '7', sub: 'Consecutive days', color: 'bg-purple-600', delay: 0.25 },
  ];

  const recentActivity = [
    { action: 'Completed Chest Blaster workout', time: '2 hours ago', icon: '💪' },
    { action: 'Logged BMI: 24.6', time: 'Yesterday', icon: '📊' },
    { action: 'Booked session with Marcus Johnson', time: '2 days ago', icon: '📅' },
    { action: 'Completed 7-day streak!', time: '3 days ago', icon: '🔥' },
    { action: 'Updated diet plan to High Protein', time: '1 week ago', icon: '🥗' },
  ];

  return (
    <div>
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold font-poppins text-dark-text mb-1">
          Welcome back, <span className="gradient-text">{currentUser?.name?.split(' ')[0] || 'Champion'}</span>! 💪
        </h1>
        <p className="text-dark-muted">Here's your fitness overview for today.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Quick links + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="card">
          <h2 className="text-lg font-bold font-poppins text-dark-text mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Log Workout', path: '/dashboard/workout', color: 'from-blue-600 to-blue-800' },
              { label: 'Check BMI', path: '/dashboard/bmi', color: 'from-green-600 to-green-800' },
              { label: 'View Diet Plan', path: '/dashboard/diet', color: 'from-orange-500 to-orange-700' },
              { label: 'Notifications', path: '/dashboard/notifications', color: 'from-purple-600 to-purple-800' },
            ].map(a => (
              <Link
                key={a.label}
                to={a.path}
                className={`p-4 rounded-xl bg-gradient-to-br ${a.color} text-white font-semibold text-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-between`}
              >
                {a.label} <FiArrowRight />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }} className="card">
          <h2 className="text-lg font-bold font-poppins text-dark-text mb-4">Recent Activity</h2>
          <ul className="space-y-3">
            {recentActivity.map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-xl shrink-0">{a.icon}</span>
                <div>
                  <p className="text-sm text-dark-text">{a.action}</p>
                  <p className="text-xs text-dark-muted">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Membership status */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card mt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-dark-muted uppercase tracking-wider mb-1">Current Membership</p>
            <h3 className="text-xl font-bold font-poppins gradient-text">{currentUser?.membership || 'Basic'} Plan</h3>
            <p className="text-dark-muted text-sm">Member since {currentUser?.joinDate || 'N/A'}</p>
          </div>
          <div className="flex gap-3">
            <Link to="/dashboard/membership" className="btn-outline text-sm">Manage Plan</Link>
            <Link to="/membership" className="btn-primary text-sm">Upgrade</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardOverview;

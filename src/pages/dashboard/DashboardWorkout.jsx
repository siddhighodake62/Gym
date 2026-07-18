import { motion } from 'framer-motion';
import { FiActivity, FiZap, FiClock, FiTrendingUp } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext.jsx';
import { workoutPlans } from '../../data/workoutPlans.js';

const DashboardWorkout = () => {
  const { currentUser } = useAuth();
  const progress = currentUser?.workoutProgress || [
    { week: 'Week 1', sessions: 3, duration: 165, calories: 1240 },
    { week: 'Week 2', sessions: 4, duration: 220, calories: 1560 },
    { week: 'Week 3', sessions: 3, duration: 185, calories: 1380 },
    { week: 'Week 4', sessions: 5, duration: 290, calories: 2150 },
  ];

  const maxCalories = Math.max(...progress.map(p => p.calories));

  const totalSessions = progress.reduce((a, b) => a + b.sessions, 0);
  const totalCalories = progress.reduce((a, b) => a + b.calories, 0);
  const totalMinutes = progress.reduce((a, b) => a + b.duration, 0);

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold font-poppins text-dark-text mb-1">Workout <span className="gradient-text">Progress</span></h1>
        <p className="text-dark-muted">Track your training consistency and performance over time.</p>
      </motion.div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {[
          { icon: FiActivity, label: 'Total Sessions', value: totalSessions, color: 'bg-blue-600' },
          { icon: FiZap, label: 'Calories Burned', value: `${totalCalories.toLocaleString()} kcal`, color: 'bg-red-600' },
          { icon: FiClock, label: 'Total Duration', value: `${Math.round(totalMinutes / 60)}h ${totalMinutes % 60}m`, color: 'bg-purple-600' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="card">
            <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center mb-3`}>
              <s.icon className="text-white" />
            </div>
            <p className="text-2xl font-bold gradient-text font-poppins">{s.value}</p>
            <p className="text-dark-muted text-sm">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Weekly calories chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card mb-6">
        <h2 className="text-lg font-bold font-poppins text-dark-text mb-6">Weekly Calories Burned</h2>
        <div className="flex items-end gap-4 h-48">
          {progress.map((p, i) => (
            <div key={p.week} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs text-dark-muted">{p.calories.toLocaleString()}</span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(p.calories / maxCalories) * 100}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="w-full bg-gradient-to-t from-primary to-secondary rounded-lg min-h-[8px]"
              />
              <span className="text-xs text-dark-muted">{p.week}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Weekly detail */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card mb-6">
        <h2 className="text-lg font-bold font-poppins text-dark-text mb-4">Weekly Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[400px]">
            <thead>
              <tr className="border-b border-dark-border">
                <th className="text-left py-2 text-dark-muted font-medium">Week</th>
                <th className="text-center py-2 text-dark-muted font-medium">Sessions</th>
                <th className="text-center py-2 text-dark-muted font-medium">Duration</th>
                <th className="text-center py-2 text-dark-muted font-medium">Calories</th>
              </tr>
            </thead>
            <tbody>
              {progress.map(p => (
                <tr key={p.week} className="border-b border-dark-border/50">
                  <td className="py-3 text-dark-text font-medium">{p.week}</td>
                  <td className="py-3 text-center text-dark-text">{p.sessions}</td>
                  <td className="py-3 text-center text-dark-muted">{p.duration} min</td>
                  <td className="py-3 text-center text-primary font-semibold">{p.calories.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Recommended workouts */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="card">
        <h2 className="text-lg font-bold font-poppins text-dark-text mb-4">Recommended for You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {workoutPlans.slice(0, 3).map(plan => (
            <div key={plan.id} className={`p-4 rounded-xl bg-gradient-to-br ${plan.color}`}>
              <p className="text-white/70 text-xs uppercase tracking-wider">{plan.muscleGroup}</p>
              <p className="text-white font-bold font-poppins mt-1">{plan.name}</p>
              <p className="text-white/70 text-xs mt-1">{plan.duration} · {plan.calories} kcal</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardWorkout;

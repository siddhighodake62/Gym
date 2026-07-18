import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext.jsx';
import { dietPlans } from '../../data/dietPlans.js';
import DietCard from '../../components/cards/DietCard.jsx';

const DashboardDiet = () => {
  const { currentUser } = useAuth();
  const recommended = dietPlans.find(d => {
    const goal = currentUser?.goal || '';
    if (goal.includes('Loss')) return d.name === 'Weight Loss';
    if (goal.includes('Muscle') || goal.includes('Gain')) return d.name === 'Muscle Gain';
    if (goal.includes('Vegetarian')) return d.name === 'Vegetarian';
    return d.name === 'Maintenance';
  }) || dietPlans[2];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold font-poppins text-dark-text mb-1">My <span className="gradient-text">Diet Plan</span></h1>
        <p className="text-dark-muted">Your personalized nutrition plan based on your fitness goals.</p>
      </motion.div>

      {/* Recommended */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="badge bg-primary/15 text-primary border border-primary/30">Recommended for you</span>
          <span className="text-dark-muted text-xs">Based on your goal: {currentUser?.goal || 'General Fitness'}</span>
        </div>
        <div className="max-w-sm">
          <DietCard plan={recommended} index={0} />
        </div>
      </motion.div>

      {/* All plans */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-lg font-bold font-poppins text-dark-text mb-4">All Nutrition Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dietPlans.map((plan, i) => (
            <DietCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardDiet;

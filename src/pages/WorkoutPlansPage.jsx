import { useState } from 'react';
import { motion } from 'framer-motion';
import FilterBar from '../components/common/FilterBar.jsx';
import WorkoutCard from '../components/cards/WorkoutCard.jsx';
import { workoutPlans, muscleGroups } from '../data/workoutPlans.js';

const WorkoutPlansPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All' ? workoutPlans : workoutPlans.filter(w => w.muscleGroup === activeFilter);

  return (
    <div>
      <section className="page-hero py-20">
        <div className="container-custom text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Training Library</span>
            <h1 className="section-title mt-2 text-white">
              Expert <span className="gradient-text">Workout Plans</span>
            </h1>
            <p className="text-dark-muted text-lg max-w-2xl mx-auto">
              Science-backed training plans for every muscle group, crafted by our elite coaches.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-custom">
          <div className="flex justify-center mb-8">
            <FilterBar filters={muscleGroups} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((plan, i) => (
              <WorkoutCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkoutPlansPage;

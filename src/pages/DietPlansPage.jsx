import { useState } from 'react';
import { motion } from 'framer-motion';
import FilterBar from '../components/common/FilterBar.jsx';
import DietCard from '../components/cards/DietCard.jsx';
import { dietPlans, dietGoals } from '../data/dietPlans.js';

const DietPlansPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All' ? dietPlans : dietPlans.filter(d => d.goal === activeFilter);

  return (
    <div>
      <section className="page-hero py-20">
        <div className="container-custom text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Nutrition Hub</span>
            <h1 className="section-title mt-2 text-white">
              Precision <span className="gradient-text">Diet Plans</span>
            </h1>
            <p className="text-dark-muted text-lg max-w-2xl mx-auto">
              Nutritionist-crafted meal plans designed to complement your training goals.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-custom">
          <div className="flex justify-center mb-8">
            <FilterBar filters={dietGoals} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((plan, i) => (
              <DietCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DietPlansPage;

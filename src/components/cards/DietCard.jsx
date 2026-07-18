import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiCheckCircle } from 'react-icons/fi';

const DietCard = ({ plan, index = 0 }) => {
  const [expanded, setExpanded] = useState(false);
  const totalMacros = plan.macros.protein * 4 + plan.macros.carbs * 4 + plan.macros.fat * 9;
  const proteinPct = Math.round((plan.macros.protein * 4 / totalMacros) * 100);
  const carbsPct = Math.round((plan.macros.carbs * 4 / totalMacros) * 100);
  const fatPct = Math.round((plan.macros.fat * 9 / totalMacros) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card overflow-hidden"
    >
      {/* Header */}
      <div className={`-mx-6 -mt-6 px-6 py-5 mb-5 bg-gradient-to-r ${plan.color} relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <img src={plan.image} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative">
          <span className="text-white/70 text-xs uppercase tracking-wider">{plan.goal}</span>
          <h3 className="text-white font-bold font-poppins text-xl mt-1">{plan.name}</h3>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-white text-2xl font-bold">{plan.calories}</span>
            <span className="text-white/70 text-sm">kcal/day</span>
          </div>
        </div>
      </div>

      <p className="text-dark-muted text-sm leading-relaxed mb-4">{plan.description}</p>

      {/* Macros */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-dark-muted">Macros</span>
          <span className="text-xs text-dark-muted">{plan.macros.protein}P · {plan.macros.carbs}C · {plan.macros.fat}F (g)</span>
        </div>
        <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
          <div className="bg-blue-500 rounded-l-full" style={{ width: `${proteinPct}%` }} title={`Protein ${proteinPct}%`} />
          <div className="bg-yellow-500" style={{ width: `${carbsPct}%` }} title={`Carbs ${carbsPct}%`} />
          <div className="bg-red-400 rounded-r-full" style={{ width: `${fatPct}%` }} title={`Fat ${fatPct}%`} />
        </div>
        <div className="flex items-center gap-4 mt-1.5 text-xs text-dark-muted">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />Protein {proteinPct}%</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" />Carbs {carbsPct}%</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" />Fat {fatPct}%</span>
        </div>
      </div>

      {/* Features */}
      <div className="flex flex-wrap gap-1 mb-4">
        {plan.features.map(f => (
          <span key={f} className="badge bg-dark-bg border border-dark-border text-dark-muted text-xs">{f}</span>
        ))}
      </div>

      {/* Sample Meals toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full text-sm font-medium text-primary hover:text-primary-400 transition-colors"
      >
        <span>{expanded ? 'Hide Meal Plan' : 'View Sample Meals'}</span>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <FiChevronDown />
        </motion.div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-2">
              {plan.meals.map((meal, i) => (
                <div key={i} className="p-3 bg-dark-bg rounded-xl border border-dark-border">
                  <p className="text-xs font-semibold text-primary mb-1">{meal.time}</p>
                  <p className="text-xs text-dark-muted leading-relaxed">{meal.meal}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DietCard;

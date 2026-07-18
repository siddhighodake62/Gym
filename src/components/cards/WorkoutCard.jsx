import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiClock, FiZap, FiTarget } from 'react-icons/fi';

const WorkoutCard = ({ plan, index = 0 }) => {
  const [expanded, setExpanded] = useState(false);

  const difficultyColor = {
    Beginner: 'text-green-400 bg-green-500/20',
    Intermediate: 'text-yellow-400 bg-yellow-500/20',
    Advanced: 'text-red-400 bg-red-500/20',
  }[plan.difficulty] || 'text-blue-400 bg-blue-500/20';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card overflow-hidden"
    >
      {/* Header */}
      <div className={`-mx-6 -mt-6 px-6 py-4 mb-4 bg-gradient-to-r ${plan.color}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/70 text-xs font-medium uppercase tracking-wider mb-1">{plan.muscleGroup}</p>
            <h3 className="text-white font-bold font-poppins text-lg">{plan.name}</h3>
          </div>
          <span className={`badge ${difficultyColor}`}>{plan.difficulty}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 bg-dark-bg rounded-xl border border-dark-border">
          <FiClock className="text-primary mx-auto mb-1" />
          <p className="text-xs text-dark-muted">Duration</p>
          <p className="text-sm font-semibold text-dark-text">{plan.duration}</p>
        </div>
        <div className="text-center p-2 bg-dark-bg rounded-xl border border-dark-border">
          <FiZap className="text-orange-400 mx-auto mb-1" />
          <p className="text-xs text-dark-muted">Calories</p>
          <p className="text-sm font-semibold text-dark-text">{plan.calories}</p>
        </div>
        <div className="text-center p-2 bg-dark-bg rounded-xl border border-dark-border">
          <FiTarget className="text-secondary mx-auto mb-1" />
          <p className="text-xs text-dark-muted">Exercises</p>
          <p className="text-sm font-semibold text-dark-text">{plan.exercises.length}</p>
        </div>
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full text-sm font-medium text-primary hover:text-primary-400 transition-colors"
      >
        <span>{expanded ? 'Hide Exercises' : 'View Exercises'}</span>
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
              {plan.exercises.map((ex, i) => (
                <div key={i} className="p-3 bg-dark-bg rounded-xl border border-dark-border">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm font-semibold text-dark-text">{ex.name}</p>
                    <span className="text-xs text-dark-muted shrink-0">{ex.sets} × {ex.reps}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-dark-muted">
                    <span>Rest: {ex.rest}</span>
                    <span className="text-dark-border">|</span>
                    <span className="italic">{ex.notes}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WorkoutCard;

import { motion } from 'framer-motion';
import { FiClock, FiZap, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { formatRupees } from '../../utils/currency.js';

const ProgramCard = ({ program, index = 0 }) => {
  const difficultyColor = {
    Beginner: 'text-green-400 bg-green-500/20',
    Intermediate: 'text-yellow-400 bg-yellow-500/20',
    Advanced: 'text-red-400 bg-red-500/20',
  }[program.difficulty] || 'text-blue-400 bg-blue-500/20';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="card overflow-hidden group cursor-pointer flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 -mx-6 -mt-6 mb-5 overflow-hidden rounded-t-2xl">
        <img
          src={program.image}
          alt={program.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${program.color} opacity-60`} />
        <div className="absolute top-3 left-3">
          <span className="badge bg-black/40 text-white backdrop-blur-sm">{program.category}</span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`badge ${difficultyColor}`}>{program.difficulty}</span>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="text-white font-bold text-xl font-poppins">{formatRupees(program.price)}<span className="text-sm font-normal">/mo</span></span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-bold font-poppins text-dark-text mb-2 group-hover:text-primary transition-colors">
          {program.name}
        </h3>
        <p className="text-dark-muted text-sm leading-relaxed mb-4 flex-1">{program.description}</p>

        <div className="flex items-center gap-4 mb-4 text-xs text-dark-muted">
          <span className="flex items-center gap-1"><FiClock className="text-primary" />{program.duration}</span>
          <span className="flex items-center gap-1"><FiZap className="text-secondary" />{program.sessions}</span>
        </div>

        <ul className="space-y-1 mb-5">
          {program.features.slice(0, 3).map(f => (
            <li key={f} className="flex items-center gap-2 text-xs text-dark-muted">
              <FiCheck className="text-green-400 shrink-0" />{f}
            </li>
          ))}
        </ul>

        <Link
          to="/register"
          className="btn-primary text-sm text-center mt-auto"
        >
          Enroll Now
        </Link>
      </div>
    </motion.div>
  );
};

export default ProgramCard;

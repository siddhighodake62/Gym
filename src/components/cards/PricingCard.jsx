import { motion } from 'framer-motion';
import { FiCheck, FiX, FiZap } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { formatRupees } from '../../utils/currency.js';

const PricingCard = ({ plan, isYearly, index = 0, isPopular = false }) => {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const savings = plan.monthlyPrice * 12 - plan.yearlyPrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative card flex flex-col border-2 ${
        plan.badge === 'Best Value'
          ? 'border-primary shadow-glow-primary'
          : plan.badge === 'Elite'
          ? 'border-purple-500'
          : plan.badge === 'Popular'
          ? 'border-blue-500'
          : 'border-dark-border'
      }`}
    >
      {/* Badge */}
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className={`px-4 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${plan.color}`}>
            {plan.badge}
          </span>
        </div>
      )}

      {/* Header */}
      <div className={`-mx-6 -mt-6 px-6 pt-8 pb-6 rounded-t-2xl bg-gradient-to-br ${plan.color} mb-6`}>
        <h3 className="font-poppins font-bold text-white text-xl mb-1">{plan.name}</h3>
        <p className="text-white/70 text-sm mb-4">{plan.description}</p>
        <div className="flex items-end gap-1">
          <span className="text-4xl font-bold text-white font-poppins">{formatRupees(price)}</span>
          <span className="text-white/70 text-sm mb-1">/{isYearly ? 'yr' : 'mo'}</span>
        </div>
        {isYearly && savings > 0 && (
          <p className="text-green-300 text-xs mt-1 flex items-center gap-1">
            <FiZap className="fill-green-300" /> Save {formatRupees(savings)}/year
          </p>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 flex-1 mb-6">
        {plan.features.map(feature => (
          <li key={feature.text} className="flex items-start gap-3 text-sm">
            {feature.included ? (
              <FiCheck className="text-green-400 shrink-0 mt-0.5" />
            ) : (
              <FiX className="text-dark-border shrink-0 mt-0.5" />
            )}
            <span className={feature.included ? 'text-dark-text' : 'text-dark-border'}>{feature.text}</span>
          </li>
        ))}
      </ul>

      <Link
        to="/register"
        className={`block text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${
          plan.badge === 'Best Value'
            ? 'bg-primary text-white hover:bg-primary-700 shadow-glow-primary'
            : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
        }`}
      >
        Get Started
      </Link>
    </motion.div>
  );
};

export default PricingCard;

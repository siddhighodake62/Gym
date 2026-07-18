import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiZap } from 'react-icons/fi';
import FilterBar from '../components/common/FilterBar.jsx';
import PricingCard from '../components/cards/PricingCard.jsx';
import { memberships } from '../data/memberships.js';
import { formatRupees } from '../utils/currency.js';

const FEATURES_ALL = [
  'Gym Access',
  'Locker Room & Showers',
  'Basic Equipment Access',
  'Fitness Assessment',
  'Group Classes (2/week)',
  'Personal Training Sessions',
  'Nutrition Consultation',
  'Unlimited Group Classes',
  'Pool & Spa Access',
  'Guest Passes',
];

const MembershipPage = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div>
      <section className="page-hero py-20">
        <div className="container-custom text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Membership Plans</span>
            <h1 className="section-title mt-2 text-white">
              Simple, <span className="gradient-text">Transparent</span> Pricing
            </h1>
            <p className="text-dark-muted text-lg max-w-2xl mx-auto">
              No contracts, no hidden fees. Choose the plan that fits your lifestyle.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-custom">
          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm font-medium ${!isYearly ? 'text-dark-text' : 'text-dark-muted'}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${isYearly ? 'bg-primary' : 'bg-dark-border'}`}
              aria-label="Toggle billing period"
            >
              <motion.div
                animate={{ x: isYearly ? 28 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
              />
            </button>
            <span className={`text-sm font-medium flex items-center gap-2 ${isYearly ? 'text-dark-text' : 'text-dark-muted'}`}>
              Yearly
              {isYearly && <span className="badge bg-green-500/20 text-green-400 border border-green-500/30"><FiZap className="inline" /> Save up to 20%</span>}
            </span>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {memberships.map((plan, i) => (
              <PricingCard key={plan.id} plan={plan} isYearly={isYearly} index={i} />
            ))}
          </div>

          {/* Comparison table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold font-poppins text-center mb-6">
              Full <span className="gradient-text">Feature Comparison</span>
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-dark-border">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="bg-dark-card">
                    <th className="text-left p-4 text-dark-muted text-sm font-medium w-1/3">Feature</th>
                    {memberships.map(plan => (
                      <th key={plan.id} className="p-4 text-center">
                        <span className={`text-sm font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                          {plan.name}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FEATURES_ALL.map((feature, i) => (
                    <tr key={feature} className={`border-t border-dark-border ${i % 2 === 0 ? 'bg-dark-bg/50' : ''}`}>
                      <td className="p-4 text-sm text-dark-text">{feature}</td>
                      {memberships.map(plan => {
                        const feat = plan.features.find(f => f.text.includes(feature.split(' ')[0]));
                        const included = feat?.included;
                        return (
                          <td key={plan.id} className="p-4 text-center">
                            {included ? (
                              <span className="text-green-400 text-lg">✓</span>
                            ) : (
                              <span className="text-dark-border text-lg">✕</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr className="border-t border-dark-border bg-dark-card">
                    <td className="p-4 text-sm font-semibold text-dark-text">Price/month</td>
                    {memberships.map(plan => (
                      <td key={plan.id} className="p-4 text-center font-bold gradient-text">
                        {formatRupees(isYearly ? Math.round(plan.yearlyPrice / 12) : plan.monthlyPrice)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MembershipPage;

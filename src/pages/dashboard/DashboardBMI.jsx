import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiTarget } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext.jsx';
import { calculateBMI, getBMICategory } from '../../utils/bmi.js';
import { toast } from 'react-toastify';

const DashboardBMI = () => {
  const { currentUser, addBMIRecord } = useAuth();
  const [weight, setWeight] = useState('');
  const history = currentUser?.bmiHistory || [
    { date: '2024-01-15', bmi: 25.9, weight: 82 },
    { date: '2024-02-15', bmi: 25.2, weight: 80 },
    { date: '2024-03-15', bmi: 24.6, weight: 78 },
  ];

  const latest = history.slice(-1)[0];
  const maxBMI = Math.max(...history.map(h => h.bmi), 30);
  const minBMI = Math.min(...history.map(h => h.bmi), 15);

  const handleLog = () => {
    if (!weight || isNaN(weight) || weight < 20 || weight > 500) {
      toast.error('Please enter a valid weight (20–500 kg)');
      return;
    }
    const height = currentUser?.height || 175;
    const bmi = calculateBMI(parseFloat(weight), height);
    addBMIRecord({ date: new Date().toISOString().split('T')[0], bmi, weight: parseFloat(weight) });
    setWeight('');
    toast.success(`BMI logged: ${bmi}`);
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold font-poppins text-dark-text mb-1">BMI <span className="gradient-text">History</span></h1>
        <p className="text-dark-muted">Track your body composition changes over time.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Log new */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
          <h2 className="text-lg font-bold font-poppins text-dark-text mb-4">Log Today's Weight</h2>
          <label className="block text-sm font-medium text-dark-text mb-2">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            placeholder="e.g. 78"
            className="input-field mb-4"
          />
          <button onClick={handleLog} className="btn-primary w-full">
            <FiTarget /> Log BMI
          </button>
          {latest && (
            <div className="mt-4 p-4 bg-dark-bg rounded-xl border border-dark-border text-center">
              <p className="text-xs text-dark-muted">Latest BMI</p>
              <p className={`text-3xl font-bold font-poppins ${getBMICategory(latest.bmi).color}`}>{latest.bmi}</p>
              <p className={`text-sm ${getBMICategory(latest.bmi).color}`}>{getBMICategory(latest.bmi).category}</p>
              <p className="text-dark-muted text-xs mt-1">{latest.date}</p>
            </div>
          )}
        </motion.div>

        {/* Trend chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card lg:col-span-2">
          <h2 className="text-lg font-bold font-poppins text-dark-text mb-6 flex items-center gap-2">
            <FiTrendingUp className="text-primary" /> BMI Trend
          </h2>
          {history.length > 1 ? (
            <div className="relative h-40">
              <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="bmiGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Area */}
                <path
                  d={`M ${history.map((h, i) => `${(i / (history.length - 1)) * 400},${100 - ((h.bmi - minBMI) / (maxBMI - minBMI)) * 90}`).join(' L ')} L 400,100 L 0,100 Z`}
                  fill="url(#bmiGrad)"
                />
                {/* Line */}
                <path
                  d={`M ${history.map((h, i) => `${(i / (history.length - 1)) * 400},${100 - ((h.bmi - minBMI) / (maxBMI - minBMI)) * 90}`).join(' L ')}`}
                  fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                />
                {/* Dots */}
                {history.map((h, i) => (
                  <circle
                    key={i}
                    cx={(i / (history.length - 1)) * 400}
                    cy={100 - ((h.bmi - minBMI) / (maxBMI - minBMI)) * 90}
                    r="4" fill="#2563EB"
                  />
                ))}
              </svg>
            </div>
          ) : (
            <p className="text-dark-muted text-sm text-center py-10">Log at least 2 BMI records to see your trend.</p>
          )}
        </motion.div>
      </div>

      {/* History table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card">
        <h2 className="text-lg font-bold font-poppins text-dark-text mb-4">BMI Log</h2>
        {history.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-border">
                  <th className="text-left py-2 text-dark-muted font-medium">Date</th>
                  <th className="text-center py-2 text-dark-muted font-medium">Weight (kg)</th>
                  <th className="text-center py-2 text-dark-muted font-medium">BMI</th>
                  <th className="text-center py-2 text-dark-muted font-medium">Category</th>
                </tr>
              </thead>
              <tbody>
                {[...history].reverse().map((h, i) => {
                  const cat = getBMICategory(h.bmi);
                  return (
                    <tr key={i} className="border-b border-dark-border/50">
                      <td className="py-3 text-dark-muted">{h.date}</td>
                      <td className="py-3 text-center text-dark-text">{h.weight}</td>
                      <td className="py-3 text-center font-bold text-dark-text">{h.bmi}</td>
                      <td className="py-3 text-center"><span className={`badge ${cat.bgColor} ${cat.color} border border-current/20`}>{cat.category}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-dark-muted text-sm text-center py-8">No BMI records yet. Log your first entry above!</p>
        )}
      </motion.div>
    </div>
  );
};

export default DashboardBMI;

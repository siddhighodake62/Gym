import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { calculateBMI, getBMICategory, getIdealWeight } from '../utils/bmi.js';
import { useAuth } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import { FiTarget, FiAlertCircle } from 'react-icons/fi';

const BMIPage = () => {
  const [result, setResult] = useState(null);
  const { isAuthenticated, addBMIRecord } = useAuth();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const onSubmit = (data) => {
    const bmi = calculateBMI(parseFloat(data.weight), parseFloat(data.height));
    const category = getBMICategory(bmi);
    const idealWeight = getIdealWeight(data.height, data.gender);
    const res = { bmi, category, idealWeight, weight: data.weight, height: data.height, gender: data.gender };
    setResult(res);
    if (isAuthenticated) {
      addBMIRecord({ date: new Date().toISOString().split('T')[0], bmi, weight: parseFloat(data.weight) });
      toast.success('BMI saved to your history!');
    }
  };

  // BMI gauge position (0-100%)
  const getBMIPosition = (bmi) => Math.min(Math.max(((bmi - 10) / 30) * 100, 0), 100);

  return (
    <div>
      <section className="page-hero py-20">
        <div className="container-custom text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Health Tool</span>
            <h1 className="section-title mt-2 text-white">
              BMI <span className="gradient-text">Calculator</span>
            </h1>
            <p className="text-dark-muted text-lg max-w-2xl mx-auto">
              Calculate your Body Mass Index and get personalized health recommendations.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-custom max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <h2 className="text-xl font-bold font-poppins text-dark-text mb-6">Enter Your Details</h2>
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-dark-text mb-2">Gender</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['male', 'female'].map(g => (
                      <label key={g} className="flex items-center gap-3 p-3 rounded-xl border border-dark-border cursor-pointer hover:border-primary transition-colors">
                        <input type="radio" value={g} {...register('gender', { required: true })} className="accent-primary" />
                        <span className="capitalize text-dark-text text-sm">{g}</span>
                      </label>
                    ))}
                  </div>
                  {errors.gender && <p className="text-red-400 text-xs mt-1">Please select gender</p>}
                </div>

                {/* Height */}
                <div>
                  <label htmlFor="bmi-height" className="block text-sm font-medium text-dark-text mb-2">Height (cm)</label>
                  <input
                    id="bmi-height"
                    type="number"
                    placeholder="e.g. 175"
                    className="input-field"
                    {...register('height', {
                      required: 'Height is required',
                      min: { value: 100, message: 'Minimum 100 cm' },
                      max: { value: 250, message: 'Maximum 250 cm' },
                    })}
                  />
                  {errors.height && <p className="text-red-400 text-xs mt-1">{errors.height.message}</p>}
                </div>

                {/* Weight */}
                <div>
                  <label htmlFor="bmi-weight" className="block text-sm font-medium text-dark-text mb-2">Weight (kg)</label>
                  <input
                    id="bmi-weight"
                    type="number"
                    placeholder="e.g. 75"
                    className="input-field"
                    {...register('weight', {
                      required: 'Weight is required',
                      min: { value: 20, message: 'Minimum 20 kg' },
                      max: { value: 500, message: 'Maximum 500 kg' },
                    })}
                  />
                  {errors.weight && <p className="text-red-400 text-xs mt-1">{errors.weight.message}</p>}
                </div>

                {/* Age (optional, for context) */}
                <div>
                  <label htmlFor="bmi-age" className="block text-sm font-medium text-dark-text mb-2">Age (optional)</label>
                  <input id="bmi-age" type="number" placeholder="e.g. 28" className="input-field" {...register('age')} />
                </div>

                <button type="submit" className="btn-primary w-full">
                  <FiTarget /> Calculate BMI
                </button>
              </form>

              {/* BMI Reference table */}
              <div className="mt-6 p-4 bg-dark-bg rounded-xl border border-dark-border">
                <p className="text-xs font-semibold text-dark-muted mb-3">BMI Reference</p>
                <div className="space-y-1.5 text-xs">
                  {[
                    { label: 'Underweight', range: '< 18.5', color: 'bg-blue-500' },
                    { label: 'Normal Weight', range: '18.5 – 24.9', color: 'bg-green-500' },
                    { label: 'Overweight', range: '25 – 29.9', color: 'bg-yellow-500' },
                    { label: 'Obese Class I', range: '30 – 34.9', color: 'bg-orange-500' },
                    { label: 'Obese Class II+', range: '≥ 35', color: 'bg-red-500' },
                  ].map(r => (
                    <div key={r.label} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${r.color}`} />
                      <span className="text-dark-muted">{r.label}</span>
                      <span className="ml-auto text-dark-text font-medium">{r.range}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Result */}
            <div>
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, x: 20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="card"
                  >
                    <h2 className="text-xl font-bold font-poppins text-dark-text mb-6">Your Results</h2>

                    {/* BMI Score */}
                    <div className={`p-6 rounded-2xl border ${result.category.borderColor} ${result.category.bgColor} mb-6 text-center`}>
                      <p className="text-dark-muted text-sm mb-1">Your BMI</p>
                      <p className={`text-6xl font-bold font-poppins ${result.category.color} mb-2`}>{result.bmi}</p>
                      <p className={`text-lg font-semibold ${result.category.color}`}>{result.category.category}</p>
                      <p className="text-dark-muted text-sm mt-2">{result.category.description}</p>
                    </div>

                    {/* BMI Gauge */}
                    <div className="mb-6">
                      <div className="h-3 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 via-orange-500 to-red-500 relative mb-2">
                        <motion.div
                          initial={{ left: 0 }}
                          animate={{ left: `${getBMIPosition(result.bmi)}%` }}
                          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-dark-bg shadow-lg"
                        />
                      </div>
                      <div className="flex justify-between text-xs text-dark-muted">
                        <span>10</span><span>18.5</span><span>25</span><span>30</span><span>35</span><span>40</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="p-3 bg-dark-bg rounded-xl border border-dark-border text-center">
                        <p className="text-xs text-dark-muted mb-1">Health Risk</p>
                        <p className="text-sm font-semibold text-dark-text">{result.category.risk}</p>
                      </div>
                      <div className="p-3 bg-dark-bg rounded-xl border border-dark-border text-center">
                        <p className="text-xs text-dark-muted mb-1">Ideal Weight</p>
                        <p className="text-sm font-semibold text-dark-text">{result.idealWeight} kg</p>
                      </div>
                    </div>

                    {/* Suggestions */}
                    <div>
                      <p className="text-sm font-semibold text-dark-text mb-3 flex items-center gap-2">
                        <FiAlertCircle className="text-primary" /> Health Recommendations
                      </p>
                      <ul className="space-y-2">
                        {result.category.suggestions.map((s, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-dark-muted">
                            <span className="text-primary mt-0.5 shrink-0">•</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {!isAuthenticated && (
                      <p className="text-xs text-dark-muted mt-4 text-center">
                        <a href="/register" className="text-primary hover:underline">Create an account</a> to save your BMI history.
                      </p>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="card flex flex-col items-center justify-center h-full min-h-[400px] text-center"
                  >
                    <div className="w-24 h-24 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mb-4">
                      <FiTarget className="text-primary text-4xl" />
                    </div>
                    <h3 className="text-xl font-bold font-poppins text-dark-text mb-2">Your results will appear here</h3>
                    <p className="text-dark-muted text-sm">Fill in the form and click Calculate BMI to see your personalized health analysis.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BMIPage;

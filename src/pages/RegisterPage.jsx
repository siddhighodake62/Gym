import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiPhone, FiCheck } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub, BsApple } from 'react-icons/bs';
import { GiMuscleUp } from 'react-icons/gi';
import { useAuth } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [showPw, setShowPw] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const password = watch('password');

  const onSubmit = async (data) => {
    await new Promise(r => setTimeout(r, 500));
    const success = registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone || '',
      goal: data.goal || 'General Fitness',
    });
    if (success) navigate('/dashboard');
  };

  const handleSocialLogin = () => {
    toast.info('Social signup is for UI demonstration only.');
  };

  const GOALS = ['Weight Loss', 'Muscle Gain', 'Maintenance', 'Cardio Fitness', 'Flexibility', 'Sport Performance'];

  return (
    <div className="container-custom py-12 flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-primary-gradient rounded-2xl flex items-center justify-center shadow-glow-primary">
              <GiMuscleUp className="text-white text-2xl" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold font-poppins text-dark-text">Create your account</h1>
          <p className="text-dark-muted text-sm mt-1">Start your free week at FitForge today</p>
        </div>

        <div className="card">
          {/* Social Signup */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { icon: FcGoogle, label: 'Google' },
              { icon: BsGithub, label: 'GitHub' },
              { icon: BsApple, label: 'Apple' },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                onClick={handleSocialLogin}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dark-border bg-dark-bg hover:border-primary/40 transition-all text-dark-muted hover:text-dark-text"
                aria-label={`Sign up with ${label}`}
              >
                <Icon className="text-xl" />
              </button>
            ))}
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-border" />
            </div>
            <div className="relative flex justify-center text-xs text-dark-muted">
              <span className="bg-dark-card px-3">or register with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="reg-name" className="block text-sm font-medium text-dark-text mb-2">Full Name *</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted" />
                <input
                  id="reg-name"
                  type="text"
                  placeholder="John Doe"
                  className={`input-field pl-11 ${errors.name ? 'border-red-500' : ''}`}
                  {...register('name', { required: 'Full name required', minLength: { value: 2, message: 'Min 2 characters' } })}
                />
              </div>
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="reg-email" className="block text-sm font-medium text-dark-text mb-2">Email Address *</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted" />
                <input
                  id="reg-email"
                  type="email"
                  placeholder="john@example.com"
                  className={`input-field pl-11 ${errors.email ? 'border-red-500' : ''}`}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
                  })}
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="reg-phone" className="block text-sm font-medium text-dark-text mb-2">Phone Number</label>
              <div className="relative">
                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted" />
                <input id="reg-phone" type="tel" placeholder="+1 (555) 000-0000" className="input-field pl-11" {...register('phone')} />
              </div>
            </div>

            {/* Fitness Goal */}
            <div>
              <label htmlFor="reg-goal" className="block text-sm font-medium text-dark-text mb-2">Fitness Goal</label>
              <select id="reg-goal" className="input-field" {...register('goal')}>
                <option value="">Select your goal...</option>
                {GOALS.map(g => <option key={g}>{g}</option>)}
              </select>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="reg-password" className="block text-sm font-medium text-dark-text mb-2">Password *</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted" />
                <input
                  id="reg-password"
                  type={showPw ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  className={`input-field pl-11 pr-11 ${errors.password ? 'border-red-500' : ''}`}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Minimum 6 characters' },
                  })}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-muted" aria-label="Toggle password">
                  {showPw ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="reg-confirm" className="block text-sm font-medium text-dark-text mb-2">Confirm Password *</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted" />
                <input
                  id="reg-confirm"
                  type={showPw ? 'text' : 'password'}
                  placeholder="Repeat your password"
                  className={`input-field pl-11 ${errors.confirm ? 'border-red-500' : ''}`}
                  {...register('confirm', {
                    required: 'Please confirm your password',
                    validate: val => val === password || 'Passwords do not match',
                  })}
                />
              </div>
              {errors.confirm && <p className="text-red-400 text-xs mt-1">{errors.confirm.message}</p>}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                id="terms"
                type="checkbox"
                className="mt-0.5 accent-primary"
                {...register('terms', { required: 'You must agree to the terms' })}
              />
              <label htmlFor="terms" className="text-xs text-dark-muted">
                I agree to the{' '}
                <Link to="/about" className="text-primary hover:underline">Terms of Service</Link> and{' '}
                <Link to="/about" className="text-primary hover:underline">Privacy Policy</Link>
              </label>
            </div>
            {errors.terms && <p className="text-red-400 text-xs">{errors.terms.message}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2 justify-center">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2 justify-center"><FiCheck />Create Account</span>
              )}
            </button>
          </form>

          <p className="text-center text-dark-muted text-sm mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;

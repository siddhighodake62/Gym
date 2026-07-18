import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub, BsApple } from 'react-icons/bs';
import { GiMuscleUp } from 'react-icons/gi';
import { useAuth } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [showPw, setShowPw] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    await new Promise(r => setTimeout(r, 400));
    const success = login(data.email, data.password);
    if (success) navigate('/dashboard');
  };

  const handleSocialLogin = () => {
    toast.info('Social login is for UI demonstration only.');
  };

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
          <h1 className="text-2xl font-bold font-poppins text-dark-text">Welcome back</h1>
          <p className="text-dark-muted text-sm mt-1">Sign in to your FitForge account</p>
        </div>

        <div className="card">
          {/* Social Login */}
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
                aria-label={`Sign in with ${label}`}
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
              <span className="bg-dark-card px-3">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-dark-text mb-2">Email address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted" />
                <input
                  id="login-email"
                  type="email"
                  placeholder="john@example.com"
                  className={`input-field pl-11 ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
                  })}
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="login-password" className="text-sm font-medium text-dark-text">Password</label>
                <button type="button" className="text-xs text-primary hover:underline">Forgot password?</button>
              </div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted" />
                <input
                  id="login-password"
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`input-field pl-11 pr-11 ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                  {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-muted hover:text-dark-text" aria-label="Toggle password visibility">
                  {showPw ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2 justify-center">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-dark-muted text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline font-medium">Create one free</Link>
          </p>
        </div>

        {/* Demo hint */}
        <div className="mt-4 p-3 rounded-xl bg-primary/10 border border-primary/20 text-center">
          <p className="text-xs text-dark-muted">
            💡 Register a new account to test login, or use any registered email/password.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiUsers, FiAward, FiGrid, FiStar, FiCheck, FiPlay } from 'react-icons/fi';
import { GiMuscleUp, GiWeightLiftingUp } from 'react-icons/gi';
import useCounter from '../hooks/useCounter.js';
import { programs } from '../data/programs.js';
import { trainers } from '../data/trainers.js';
import { testimonials } from '../data/testimonials.js';
import { galleryItems } from '../data/gallery.js';
import { memberships } from '../data/memberships.js';
import ProgramCard from '../components/cards/ProgramCard.jsx';
import TrainerCard from '../components/cards/TrainerCard.jsx';
import TestimonialCard from '../components/cards/TestimonialCard.jsx';
import { formatRupees } from '../utils/currency.js';

// Animated counter component using the hook
const StatCounter = ({ end, suffix, label, icon: Icon }) => {
  const { count, ref } = useCounter(end);
  return (
    <div ref={ref} className="text-center">
      <div className="flex items-center justify-center gap-1 mb-2">
        <Icon className="text-primary text-2xl" />
      </div>
      <div className="text-4xl md:text-5xl font-bold font-poppins gradient-text mb-1">
        {count.toLocaleString()}{suffix}
      </div>
      <p className="text-dark-muted text-sm">{label}</p>
    </div>
  );
};

const WHY_US = [
  { icon: '🏋️', title: 'State-of-the-Art Equipment', desc: 'Over ₹15 Crores in premium equipment from the world\'s leading fitness brands, maintained to the highest standards.' },
  { icon: '👨‍🏫', title: 'Expert Certified Trainers', desc: 'Every trainer holds multiple elite certifications and has 5+ years of proven experience transforming lives.' },
  { icon: '📊', title: 'Personalized Programs', desc: 'No cookie-cutter plans. Every member gets a fully customized workout and nutrition program tailored to their goals.' },
  { icon: '🌐', title: 'Digital Fitness Platform', desc: 'Track your progress, book sessions, and access 500+ workout videos from our premium digital platform.' },
  { icon: '🥗', title: 'Nutrition Guidance', desc: 'In-house nutritionists create personalized meal plans that complement your training for maximum results.' },
  { icon: '🏆', title: 'Proven Results', desc: 'Over 1,200 documented success stories and an average member satisfaction score of 4.9/5.' },
];

const HomePage = () => {
  return (
    <div>
      {/* ─── HERO SECTION ─── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
        }}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80"
            alt="FitForge Gym"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/80 via-dark-bg/60 to-dark-bg" />
        </div>

        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 30, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/30 text-primary text-sm font-medium mb-6">
              <GiMuscleUp /> Premium Fitness Experience
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-poppins text-white mb-6 leading-tight"
          >
            Forge Your{' '}
            <span className="gradient-text">Perfect</span>
            <br />
            Physique
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-dark-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Join 2,500+ members transforming their lives at FitForge — where elite coaching, premium equipment, and cutting-edge nutrition science converge.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link to="/register" className="btn-primary text-base px-8 py-4 rounded-2xl">
              Start Your Journey <FiArrowRight />
            </Link>
            <Link to="/programs" className="btn-outline text-base px-8 py-4 rounded-2xl">
              <FiPlay /> Explore Programs
            </Link>
          </motion.div>

          {/* Mini stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-8 text-sm text-dark-muted"
          >
            {['No contracts', 'Free trial week', '25+ expert trainers', '24/7 access'].map(item => (
              <span key={item} className="flex items-center gap-2">
                <FiCheck className="text-green-400" /> {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-dark-muted text-xs"
        >
          <span>Scroll</span>
          <div className="w-5 h-8 rounded-full border border-dark-border flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </section>

      {/* ─── STATS SECTION ─── */}
      <section className="py-20 border-y border-dark-border/40">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCounter end={2500} suffix="+" label="Active Members" icon={FiUsers} />
            <StatCounter end={25} suffix="+" label="Expert Trainers" icon={FiAward} />
            <StatCounter end={50} suffix="+" label="Programs" icon={FiGrid} />
            <StatCounter end={1200} suffix="+" label="Success Stories" icon={FiStar} />
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROGRAMS ─── */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Our Programs</span>
            <h2 className="section-title mt-2">
              Designed for <span className="gradient-text">Every Goal</span>
            </h2>
            <p className="section-subtitle mx-auto text-center">
              From beginner-friendly cardio to elite powerlifting, we have a program perfectly matched to your fitness level and ambitions.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {programs.slice(0, 4).map((program, i) => (
              <ProgramCard key={program.id} program={program} index={i} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/programs" className="btn-outline">View All Programs <FiArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-secondary text-sm font-semibold uppercase tracking-wider">Why FitForge</span>
            <h2 className="section-title mt-2">
              The <span className="gradient-text">Difference</span> Is Clear
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_US.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="p-6 bg-dark-bg rounded-2xl border border-dark-border hover:border-primary/40 transition-all"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-poppins font-bold text-dark-text text-lg mb-2">{item.title}</h3>
                <p className="text-dark-muted text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRAINERS PREVIEW ─── */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Expert Team</span>
            <h2 className="section-title mt-2">
              Train With The <span className="gradient-text">Best</span>
            </h2>
            <p className="section-subtitle mx-auto text-center">
              Our world-class trainers bring competition-level expertise to every session.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {trainers.slice(0, 4).map((trainer, i) => (
              <TrainerCard key={trainer.id} trainer={trainer} index={i} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/trainers" className="btn-outline">Meet All Trainers <FiArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* ─── MEMBERSHIP PREVIEW ─── */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-secondary text-sm font-semibold uppercase tracking-wider">Membership</span>
            <h2 className="section-title mt-2">
              Simple <span className="gradient-text">Pricing</span>
            </h2>
            <p className="section-subtitle mx-auto text-center">
              Transparent pricing, no hidden fees. Cancel anytime.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {memberships.slice(0, 3).map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className={`card border-2 ${plan.badge === 'Best Value' ? 'border-primary shadow-glow-primary' : 'border-dark-border'}`}
              >
                <div className={`-mx-6 -mt-6 px-6 py-4 mb-4 bg-gradient-to-r ${plan.color} rounded-t-2xl`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-poppins font-bold text-white text-lg">{plan.name}</h3>
                    {plan.badge && <span className="badge bg-white/20 text-white">{plan.badge}</span>}
                  </div>
                </div>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-3xl font-bold gradient-text font-poppins">{formatRupees(plan.monthlyPrice)}</span>
                  <span className="text-dark-muted text-sm mb-1">/month</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.slice(0, 5).map(f => (
                    <li key={f.text} className={`flex items-center gap-2 text-sm ${f.included ? 'text-dark-text' : 'text-dark-border line-through'}`}>
                      <FiCheck className={f.included ? 'text-green-400' : 'text-dark-border'} />
                      {f.text}
                    </li>
                  ))}
                </ul>
                <Link to="/membership" className={`block text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${plan.badge === 'Best Value' ? 'btn-primary' : 'btn-outline'}`}>
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/membership" className="btn-ghost text-primary">Compare all plans <FiArrowRight className="inline" /></Link>
          </div>
        </div>
      </section>

      {/* ─── GALLERY PREVIEW ─── */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Our Facility</span>
            <h2 className="section-title mt-2">
              Premium <span className="gradient-text">Environment</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {galleryItems.slice(0, 8).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.03 }}
                className={`relative overflow-hidden rounded-2xl ${i === 0 || i === 5 ? 'row-span-2' : ''}`}
                style={{ aspectRatio: i === 0 || i === 5 ? '1/1.5' : '1/1' }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <p className="text-white text-xs font-medium">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/gallery" className="btn-outline">View Full Gallery <FiArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-secondary text-sm font-semibold uppercase tracking-wider">Success Stories</span>
            <h2 className="section-title mt-2">
              Real Results, <span className="gradient-text">Real People</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-primary-gradient p-12 text-center"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-black/10 rounded-full blur-3xl" />
            </div>
            <div className="relative z-10">
              <GiWeightLiftingUp className="text-white/30 text-8xl mx-auto mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold font-poppins text-white mb-4">
                Ready to Transform?
              </h2>
              <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
                Join thousands who've already changed their lives. Your first week is completely free — no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/register"
                  className="px-8 py-4 bg-white text-primary font-bold rounded-2xl hover:bg-white/90 active:scale-95 transition-all shadow-lg"
                >
                  Start Free Trial
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

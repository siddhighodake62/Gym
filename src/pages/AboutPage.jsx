import { motion } from 'framer-motion';
import { FiAward, FiUsers, FiTarget, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const TEAM = [
  { name: 'James Mitchell', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80', bio: '20+ year fitness industry veteran who built FitForge from a single gym to a premium network.' },
  { name: 'Rachel Kim', role: 'Head of Training', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80', bio: 'Former Olympic athlete turned coach with a passion for evidence-based training methodology.' },
  { name: 'Dr. Carlos Mendez', role: 'Chief Nutritionist', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80', bio: 'PhD in Sports Nutrition, author of 3 books on performance dietetics and metabolic optimization.' },
];

const VALUES = [
  { icon: FiAward, title: 'Excellence', desc: 'We settle for nothing less than the best in equipment, coaching, and member experience.' },
  { icon: FiUsers, title: 'Community', desc: 'Every member is part of our family. We celebrate each other\'s victories and support during setbacks.' },
  { icon: FiTarget, title: 'Results', desc: 'Our data-driven approach ensures every member achieves measurable, sustainable progress.' },
  { icon: FiHeart, title: 'Wellbeing', desc: 'We believe fitness is holistic — mind, body, and spirit all matter in equal measure.' },
];

const AboutPage = () => {
  return (
    <div>
      <section className="page-hero py-24">
        <div className="container-custom text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Our Story</span>
            <h1 className="section-title mt-2 text-white">
              About <span className="gradient-text">FitForge</span>
            </h1>
            <p className="text-dark-muted text-lg max-w-2xl mx-auto">
              Founded in 2012, FitForge has grown from a single gym to the region's most trusted premium fitness destination.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold font-poppins text-dark-text mb-5">
                Where <span className="gradient-text">Champions</span> Are Made
              </h2>
              <div className="space-y-4 text-dark-muted leading-relaxed">
                <p>FitForge was born from a simple but powerful belief: everyone deserves access to world-class fitness coaching and facilities, not just professional athletes.</p>
                <p>When founder James Mitchell couldn't find a gym that combined premium equipment, elite coaching, and a welcoming community, he decided to build one himself. What started as a 2,000 sq ft warehouse gym in 2012 has grown into a 25,000 sq ft state-of-the-art facility serving over 2,500 members.</p>
                <p>Today, FitForge is the region's go-to destination for anyone serious about their fitness journey — from first-timers to competitive athletes.</p>
              </div>
              <div className="mt-8">
                <Link to="/membership" className="btn-primary">Join Our Community</Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
                alt="FitForge gym facility"
                className="w-full rounded-3xl object-cover aspect-video"
              />
              <div className="absolute -bottom-6 -left-6 card p-5 shadow-card">
                <p className="text-3xl font-bold gradient-text font-poppins">12+</p>
                <p className="text-dark-muted text-sm">Years of excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="section-title">Our <span className="gradient-text">Values</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card text-center"
              >
                <div className="w-14 h-14 bg-primary/15 border border-primary/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <v.icon className="text-primary text-2xl" />
                </div>
                <h3 className="font-poppins font-bold text-dark-text text-lg mb-2">{v.title}</h3>
                <p className="text-dark-muted text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="section-title">Leadership <span className="gradient-text">Team</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card text-center"
              >
                <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-primary/30" />
                <h3 className="font-poppins font-bold text-dark-text text-lg">{member.name}</h3>
                <p className="text-primary text-sm mb-3">{member.role}</p>
                <p className="text-dark-muted text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

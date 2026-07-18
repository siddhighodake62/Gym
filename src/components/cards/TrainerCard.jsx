import { motion } from 'framer-motion';
import { FiStar, FiInstagram, FiTwitter, FiLinkedin, FiUsers, FiAward } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { formatRupees } from '../../utils/currency.js';

const TrainerCard = ({ trainer, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="card overflow-hidden group"
    >
      {/* Header with image */}
      <div className="relative h-52 -mx-6 -mt-6 mb-5 overflow-hidden rounded-t-2xl">
        <img
          src={trainer.image}
          alt={trainer.name}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${trainer.color} opacity-60`} />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold font-poppins text-lg leading-tight">{trainer.name}</h3>
          <p className="text-white/80 text-sm">{trainer.role}</p>
        </div>
        {/* Social icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {trainer.socials.instagram && (
            <a href={trainer.socials.instagram} aria-label="Instagram" className="w-8 h-8 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:text-pink-400 transition-colors">
              <FiInstagram className="text-sm" />
            </a>
          )}
          {trainer.socials.twitter && (
            <a href={trainer.socials.twitter} aria-label="Twitter" className="w-8 h-8 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:text-blue-400 transition-colors">
              <FiTwitter className="text-sm" />
            </a>
          )}
          {trainer.socials.linkedin && (
            <a href={trainer.socials.linkedin} aria-label="LinkedIn" className="w-8 h-8 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:text-blue-600 transition-colors">
              <FiLinkedin className="text-sm" />
            </a>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between mb-3 py-3 border-y border-dark-border">
        <div className="flex items-center gap-1 text-yellow-400">
          <FiStar className="fill-yellow-400" />
          <span className="text-sm font-semibold">{trainer.rating}</span>
        </div>
        <div className="flex items-center gap-1 text-dark-muted text-sm">
          <FiUsers className="text-primary" />
          <span>{trainer.clients} clients</span>
        </div>
        <div className="flex items-center gap-1 text-dark-muted text-sm">
          <FiAward className="text-secondary" />
          <span>{trainer.experience}</span>
        </div>
      </div>

      {/* Specialization */}
      <p className="text-xs text-dark-muted mb-3 leading-relaxed line-clamp-2">{trainer.bio}</p>

      <div className="flex flex-wrap gap-1 mb-4">
        {trainer.certifications.slice(0, 2).map(cert => (
          <span key={cert} className="badge bg-primary/15 text-primary border border-primary/20 text-xs">{cert}</span>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Link to="/register" className="btn-primary text-sm flex-1 text-center">
          Book Session
        </Link>
        <span className="text-dark-muted text-xs">{formatRupees(trainer.price)}/hr</span>
      </div>
    </motion.div>
  );
};

export default TrainerCard;

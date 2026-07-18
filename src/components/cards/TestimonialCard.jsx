import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

const TestimonialCard = ({ testimonial, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card relative"
    >
      {/* Quote mark */}
      <div className="absolute top-4 right-6 text-6xl text-primary/20 font-serif leading-none select-none">"</div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <FiStar key={i} className="text-yellow-400 fill-yellow-400 text-sm" />
        ))}
      </div>

      {/* Text */}
      <p className="text-dark-muted text-sm leading-relaxed mb-5 relative z-10">"{testimonial.text}"</p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
          loading="lazy"
        />
        <div>
          <p className="font-semibold text-dark-text text-sm">{testimonial.name}</p>
          <p className="text-dark-muted text-xs">{testimonial.role}</p>
        </div>
        <div className="ml-auto">
          <span className="badge bg-primary/15 text-primary text-xs">{testimonial.program}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;

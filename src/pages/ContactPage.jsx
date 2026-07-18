import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from 'react-icons/fi';

const ContactPage = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    await new Promise(r => setTimeout(r, 800)); // simulate submission
    toast.success("Message sent! We'll get back to you within 24 hours. 🎉");
    reset();
  };

  return (
    <div>
      <section className="page-hero py-20">
        <div className="container-custom text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Get In Touch</span>
            <h1 className="section-title mt-2 text-white">
              Contact <span className="gradient-text">Us</span>
            </h1>
            <p className="text-dark-muted text-lg max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              {[
                { icon: FiMapPin, title: 'Visit Us', lines: ['123 Fitness Avenue', 'Elite District, City 10001'] },
                { icon: FiPhone, title: 'Call Us', lines: ['+1 (555) 123-4567', '+1 (555) 987-6543'] },
                { icon: FiMail, title: 'Email Us', lines: ['hello@fitforge.com', 'support@fitforge.com'] },
                { icon: FiClock, title: 'Opening Hours', lines: ['Mon–Fri: 5:00 AM – 11:00 PM', 'Sat–Sun: 6:00 AM – 10:00 PM'] },
              ].map(info => (
                <div key={info.title} className="card flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/15 border border-primary/30 rounded-xl flex items-center justify-center shrink-0">
                    <info.icon className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-text mb-1">{info.title}</h3>
                    {info.lines.map(l => <p key={l} className="text-dark-muted text-sm">{l}</p>)}
                  </div>
                </div>
              ))}

              {/* Map Placeholder */}
              <div className="rounded-2xl overflow-hidden border border-dark-border h-48 relative bg-dark-card flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
                <div className="relative text-center">
                  <FiMapPin className="text-primary text-3xl mx-auto mb-2" />
                  <p className="text-dark-muted text-sm">123 Fitness Avenue</p>
                  <p className="text-dark-muted text-xs">Interactive map coming soon</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 card"
            >
              <h2 className="text-xl font-bold font-poppins text-dark-text mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-dark-text mb-2">Full Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="John Doe"
                      className={`input-field ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                      {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Min 2 characters' } })}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-dark-text mb-2">Email Address *</label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="john@example.com"
                      className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' },
                      })}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-sm font-medium text-dark-text mb-2">Phone Number</label>
                  <input id="contact-phone" type="tel" placeholder="+1 (555) 000-0000" className="input-field" {...register('phone')} />
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-dark-text mb-2">Subject *</label>
                  <select
                    id="contact-subject"
                    className={`input-field ${errors.subject ? 'border-red-500' : ''}`}
                    {...register('subject', { required: 'Please select a subject' })}
                  >
                    <option value="">Select a subject...</option>
                    <option>Membership Inquiry</option>
                    <option>Personal Training</option>
                    <option>Class Schedule</option>
                    <option>Nutrition Consultation</option>
                    <option>General Question</option>
                    <option>Other</option>
                  </select>
                  {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-dark-text mb-2">Message *</label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    className={`input-field resize-none ${errors.message ? 'border-red-500 focus:ring-red-500' : ''}`}
                    {...register('message', {
                      required: 'Message is required',
                      minLength: { value: 20, message: 'Please write at least 20 characters' },
                    })}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</span>
                  ) : (
                    <span className="flex items-center gap-2"><FiSend />Send Message</span>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

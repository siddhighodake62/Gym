import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { GiMuscleUp } from 'react-icons/gi';
import { NAV_LINKS, NAV_TOOLS } from '../../constants/index.js';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-card border-t border-dark-border mt-auto">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary-gradient rounded-xl flex items-center justify-center shadow-glow-primary">
                <GiMuscleUp className="text-white text-xl" />
              </div>
              <span className="font-poppins font-bold text-2xl gradient-text">FitForge</span>
            </Link>
            <p className="text-dark-muted text-sm leading-relaxed mb-6">
              The premium gym management platform designed for serious athletes and fitness enthusiasts who demand the best.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: FiInstagram, href: '#', label: 'Instagram' },
                { icon: FiTwitter, href: '#', label: 'Twitter' },
                { icon: FiFacebook, href: '#', label: 'Facebook' },
                { icon: FiYoutube, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-dark-bg border border-dark-border flex items-center justify-center text-dark-muted hover:text-primary hover:border-primary transition-all duration-200"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-poppins font-semibold text-dark-text mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-dark-muted text-sm hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-poppins font-semibold text-dark-text mb-4">Fitness Tools</h3>
            <ul className="space-y-2">
              {NAV_TOOLS.map(tool => (
                <li key={tool.path}>
                  <Link
                    to={tool.path}
                    className="text-dark-muted text-sm hover:text-primary transition-colors duration-200"
                  >
                    {tool.label}
                  </Link>
                </li>
              ))}
              <li><Link to="/login" className="text-dark-muted text-sm hover:text-primary transition-colors">Member Login</Link></li>
              <li><Link to="/register" className="text-dark-muted text-sm hover:text-primary transition-colors">Join Now</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-poppins font-semibold text-dark-text mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-primary mt-0.5 shrink-0" />
                <span className="text-dark-muted text-sm">123 Fitness Avenue, Elite District, City 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-primary shrink-0" />
                <a href="tel:+15551234567" className="text-dark-muted text-sm hover:text-primary transition-colors">+1 (555) 123-4567</a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-primary shrink-0" />
                <a href="mailto:hello@fitforge.com" className="text-dark-muted text-sm hover:text-primary transition-colors">hello@fitforge.com</a>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-dark-bg rounded-xl border border-dark-border">
              <p className="text-xs text-dark-muted font-medium mb-1">Opening Hours</p>
              <p className="text-xs text-dark-text">Mon – Fri: 5:00 AM – 11:00 PM</p>
              <p className="text-xs text-dark-text">Sat – Sun: 6:00 AM – 10:00 PM</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-dark-muted text-sm">
            © {currentYear} FitForge Gym. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="text-dark-muted text-sm hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/about" className="text-dark-muted text-sm hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

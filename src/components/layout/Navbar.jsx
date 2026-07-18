import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMenu, FiX, FiSun, FiMoon, FiUser, FiLogOut, FiChevronDown,
  FiActivity, FiGrid, FiCalendar,
} from 'react-icons/fi';
import { GiMuscleUp } from 'react-icons/gi';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { NAV_LINKS, NAV_TOOLS } from '../../constants/index.js';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-bg/95 backdrop-blur-md border-b border-dark-border shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-primary-gradient rounded-xl flex items-center justify-center shadow-glow-primary">
            <GiMuscleUp className="text-white text-xl" />
          </div>
          <span className="font-poppins font-bold text-xl gradient-text">FitForge</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-dark-muted hover:text-dark-text hover:bg-white/5'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Tools Dropdown */}
          <div className="relative">
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-dark-muted hover:text-dark-text hover:bg-white/5 transition-all"
            >
              Tools <FiChevronDown className={`transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {toolsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 w-52 bg-dark-card border border-dark-border rounded-xl shadow-card overflow-hidden"
                  onMouseLeave={() => setToolsOpen(false)}
                >
                  {NAV_TOOLS.map(tool => (
                    <NavLink
                      key={tool.path}
                      to={tool.path}
                      onClick={() => setToolsOpen(false)}
                      className="block px-4 py-3 text-sm text-dark-muted hover:text-dark-text hover:bg-white/5 transition-colors"
                    >
                      {tool.label}
                    </NavLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl bg-dark-card border border-dark-border flex items-center justify-center text-dark-muted hover:text-primary transition-all"
            aria-label="Toggle theme"
          >
            {isDark ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-2 bg-dark-card border border-dark-border rounded-xl text-sm font-medium hover:border-primary transition-all"
              >
                <FiUser className="text-primary" />
                <span className="text-dark-text">{currentUser?.name?.split(' ')[0]}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-10 h-10 rounded-xl bg-dark-card border border-dark-border flex items-center justify-center text-dark-muted hover:text-red-400 transition-all"
                aria-label="Logout"
              >
                <FiLogOut />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="btn-ghost text-sm">Login</Link>
              <Link to="/register" className="btn-primary text-sm py-2">Join Now</Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button onClick={toggleTheme} className="w-9 h-9 rounded-lg bg-dark-card flex items-center justify-center text-dark-muted" aria-label="Toggle theme">
            {isDark ? <FiSun /> : <FiMoon />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-9 h-9 rounded-lg bg-dark-card flex items-center justify-center text-dark-text"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-dark-bg/98 backdrop-blur-md border-t border-dark-border overflow-hidden"
          >
            <div className="container-custom py-4 flex flex-col gap-1">
              {NAV_LINKS.map(link => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive ? 'text-primary bg-primary/10' : 'text-dark-muted hover:text-dark-text hover:bg-white/5'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="my-1 border-t border-dark-border" />
              {NAV_TOOLS.map(tool => (
                <NavLink
                  key={tool.path}
                  to={tool.path}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-dark-muted hover:text-dark-text hover:bg-white/5 transition-all"
                >
                  {tool.label}
                </NavLink>
              ))}
              <div className="my-1 border-t border-dark-border" />
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="btn-outline text-center text-sm">Dashboard</Link>
                  <button onClick={handleLogout} className="btn-ghost text-red-400 hover:text-red-300 text-sm">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-ghost text-center text-sm">Login</Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary text-center text-sm">Join Now</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

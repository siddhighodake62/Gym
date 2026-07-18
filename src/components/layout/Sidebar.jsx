import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome, FiUser, FiCreditCard, FiActivity, FiTrendingUp,
  FiShoppingBag, FiCalendar, FiBell, FiSettings, FiMenu, FiX, FiLogOut,
} from 'react-icons/fi';
import { GiMuscleUp } from 'react-icons/gi';
import { useAuth } from '../../context/AuthContext.jsx';
import { DASHBOARD_LINKS } from '../../constants/index.js';

const iconMap = { FiHome, FiUser, FiCreditCard, FiActivity, FiTrendingUp, FiShoppingBag, FiCalendar, FiBell, FiSettings };

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 p-4 border-b border-dark-border ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-9 h-9 bg-primary-gradient rounded-xl flex items-center justify-center shrink-0 shadow-glow-primary">
          <GiMuscleUp className="text-white text-lg" />
        </div>
        {!collapsed && <span className="font-poppins font-bold text-lg gradient-text">FitForge</span>}
      </div>

      {/* User info */}
      {!collapsed && (
        <div className="p-4 border-b border-dark-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-gradient flex items-center justify-center text-white font-bold shrink-0">
              {currentUser?.name?.charAt(0) || 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-dark-text truncate">{currentUser?.name}</p>
              <p className="text-xs text-dark-muted truncate">{currentUser?.membership || 'Basic'} Member</p>
            </div>
          </div>
        </div>
      )}

      {/* Nav Links */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {DASHBOARD_LINKS.map(link => {
          const Icon = iconMap[link.icon];
          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/dashboard'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/15 text-primary border border-primary/20'
                    : 'text-dark-muted hover:text-dark-text hover:bg-white/5'
                } ${collapsed ? 'justify-center' : ''}`
              }
            >
              {Icon && <Icon className="text-lg shrink-0" />}
              {!collapsed && <span>{link.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-dark-border">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-dark-muted hover:text-red-400 hover:bg-red-500/10 transition-all ${collapsed ? 'justify-center' : ''}`}
        >
          <FiLogOut className="text-lg shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-dark-card border-r border-dark-border transition-all duration-300 ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-20 -right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs hover:bg-primary-700 transition-colors z-10 shadow-glow-primary"
          aria-label="Toggle sidebar"
        >
          {collapsed ? '›' : '‹'}
        </button>
      </aside>

      {/* Mobile: Toggle Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-20 left-4 z-50 w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-glow-primary"
        aria-label="Open sidebar"
      >
        <FiMenu />
      </button>

      {/* Mobile: Overlay + Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-dark-card border-r border-dark-border z-50"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-dark-bg flex items-center justify-center text-dark-muted"
              >
                <FiX />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;

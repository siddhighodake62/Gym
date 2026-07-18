import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMoon, FiSun, FiBell, FiShield, FiLogOut } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SettingRow = ({ label, description, children }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 border-b border-dark-border last:border-0">
    <div>
      <p className="text-dark-text text-sm font-medium">{label}</p>
      {description && <p className="text-dark-muted text-xs mt-0.5">{description}</p>}
    </div>
    <div className="shrink-0">{children}</div>
  </div>
);

const Toggle = ({ enabled, onChange, label }) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${enabled ? 'bg-primary' : 'bg-dark-border'}`}
    aria-label={label}
    role="switch"
    aria-checked={enabled}
  >
    <motion.div
      animate={{ x: enabled ? 24 : 2 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
    />
  </button>
);

const DashboardSettings = () => {
  const { isDark, toggleTheme } = useTheme();
  const { currentUser, updateUser, logout } = useAuth();
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    sessionReminders: true,
    weeklyReport: false,
    twoFactor: false,
    publicProfile: false,
  });

  const updateSetting = (key, val) => {
    setSettings(prev => ({ ...prev, [key]: val }));
    toast.success('Setting updated.');
  };

  const handleDeleteAccount = () => {
    toast.warning('Account deletion is disabled in demo mode.');
  };

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold font-poppins text-dark-text mb-1">Account <span className="gradient-text">Settings</span></h1>
        <p className="text-dark-muted">Manage your preferences and account settings.</p>
      </motion.div>

      <div className="space-y-6">
        {/* Appearance */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
          <h2 className="text-lg font-bold font-poppins text-dark-text mb-2 flex items-center gap-2">
            {isDark ? <FiMoon className="text-primary" /> : <FiSun className="text-yellow-400" />} Appearance
          </h2>
          <p className="text-dark-muted text-xs mb-4">Customize how FitForge looks on your device.</p>
          <SettingRow label="Dark Mode" description="Switch between dark and light interface themes.">
            <Toggle enabled={isDark} onChange={toggleTheme} label="Toggle dark mode" />
          </SettingRow>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card">
          <h2 className="text-lg font-bold font-poppins text-dark-text mb-2 flex items-center gap-2">
            <FiBell className="text-primary" /> Notifications
          </h2>
          <p className="text-dark-muted text-xs mb-4">Control which notifications you receive.</p>
          {[
            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates and announcements via email.' },
            { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive browser push notifications.' },
            { key: 'sessionReminders', label: 'Session Reminders', desc: 'Get reminded 1 hour before your booked sessions.' },
            { key: 'weeklyReport', label: 'Weekly Progress Report', desc: 'Receive a summary of your weekly activity.' },
          ].map(s => (
            <SettingRow key={s.key} label={s.label} description={s.desc}>
              <Toggle enabled={settings[s.key]} onChange={val => updateSetting(s.key, val)} label={s.label} />
            </SettingRow>
          ))}
        </motion.div>

        {/* Security */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card">
          <h2 className="text-lg font-bold font-poppins text-dark-text mb-2 flex items-center gap-2">
            <FiShield className="text-primary" /> Security & Privacy
          </h2>
          <p className="text-dark-muted text-xs mb-4">Manage your account security settings.</p>
          <SettingRow label="Two-Factor Authentication" description="Add an extra layer of security to your account.">
            <Toggle enabled={settings.twoFactor} onChange={val => updateSetting('twoFactor', val)} label="2FA" />
          </SettingRow>
          <SettingRow label="Public Profile" description="Allow other members to see your profile.">
            <Toggle enabled={settings.publicProfile} onChange={val => updateSetting('publicProfile', val)} label="Public profile" />
          </SettingRow>
        </motion.div>

        {/* Danger zone */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card border-red-500/30">
          <h2 className="text-lg font-bold font-poppins text-red-400 mb-4 flex items-center gap-2">
            <FiLogOut /> Danger Zone
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={handleLogout} className="btn-outline border-red-500 text-red-400 hover:bg-red-500 hover:text-white text-sm">
              Sign Out
            </button>
            <button onClick={handleDeleteAccount} className="btn-ghost text-red-400 text-sm hover:bg-red-500/10">
              Delete Account
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardSettings;

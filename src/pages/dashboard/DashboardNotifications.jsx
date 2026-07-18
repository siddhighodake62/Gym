import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBell, FiInfo, FiCheckCircle, FiAlertTriangle, FiTrash2 } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext.jsx';
import { toast } from 'react-toastify';

const typeConfig = {
  info: { icon: FiInfo, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  success: { icon: FiCheckCircle, color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
  warning: { icon: FiAlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
  error: { icon: FiAlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
};

const DashboardNotifications = () => {
  const { currentUser, updateUser } = useAuth();
  const [notifications, setNotifications] = useState(
    currentUser?.notifications || [
      { id: 1, type: 'info', message: 'Your membership renews in 7 days.', date: '2024-07-15', read: false },
      { id: 2, type: 'success', message: 'Session with Marcus Johnson confirmed for tomorrow at 6 PM.', date: '2024-07-14', read: false },
      { id: 3, type: 'warning', message: "You've missed 2 scheduled sessions this week.", date: '2024-07-13', read: true },
      { id: 4, type: 'info', message: 'New Yoga class added on Sundays at 8 AM.', date: '2024-07-12', read: true },
    ]
  );

  const unread = notifications.filter(n => !n.read).length;

  const markRead = (id) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    updateUser({ notifications: updated });
  };

  const markAllRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    updateUser({ notifications: updated });
    toast.success('All notifications marked as read.');
  };

  const deleteNotification = (id) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    updateUser({ notifications: updated });
    toast.info('Notification deleted.');
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold font-poppins text-dark-text mb-1">
          <span className="gradient-text">Notifications</span>
        </h1>
        <p className="text-dark-muted">Stay up to date with your gym activity and announcements.</p>
      </motion.div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FiBell className="text-primary" />
          <span className="text-dark-text font-semibold">{unread} unread</span>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} className="text-primary text-sm hover:underline">Mark all as read</button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card text-center py-12">
            <FiBell className="text-dark-muted text-4xl mx-auto mb-3" />
            <p className="text-dark-text font-semibold">All caught up!</p>
            <p className="text-dark-muted text-sm">No notifications to show.</p>
          </motion.div>
        ) : (
          notifications.map((n, i) => {
            const cfg = typeConfig[n.type] || typeConfig.info;
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${cfg.bg} ${!n.read ? 'ring-1 ring-primary/20' : ''}`}
                onClick={() => markRead(n.id)}
              >
                <cfg.icon className={`${cfg.color} text-xl shrink-0 mt-0.5`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${n.read ? 'text-dark-muted' : 'text-dark-text font-medium'}`}>{n.message}</p>
                  <p className="text-dark-muted text-xs mt-1">{n.date}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {!n.read && <span className="w-2 h-2 rounded-full bg-primary" />}
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteNotification(n.id); }}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-dark-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    aria-label="Delete notification"
                  >
                    <FiTrash2 className="text-sm" />
                  </button>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default DashboardNotifications;

import { motion } from 'framer-motion';
import { FiCheckCircle, FiXCircle, FiCalendar } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext.jsx';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DashboardAttendance = () => {
  const { currentUser } = useAuth();
  const attendance = currentUser?.attendance || [
    { date: '2024-07-01', status: 'present' },
    { date: '2024-07-02', status: 'absent' },
    { date: '2024-07-03', status: 'present' },
    { date: '2024-07-04', status: 'present' },
    { date: '2024-07-05', status: 'present' },
    { date: '2024-07-08', status: 'present' },
    { date: '2024-07-09', status: 'present' },
    { date: '2024-07-10', status: 'absent' },
  ];

  const present = attendance.filter(a => a.status === 'present').length;
  const absent = attendance.filter(a => a.status === 'absent').length;
  const rate = Math.round((present / attendance.length) * 100) || 0;

  // Build calendar data for current month
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const day = i - firstDay + 1;
    if (day < 1 || day > daysInMonth) return null;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const record = attendance.find(a => a.date === dateStr);
    return { day, dateStr, status: record?.status };
  });

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold font-poppins text-dark-text mb-1">Attendance <span className="gradient-text">Tracker</span></h1>
        <p className="text-dark-muted">Monitor your gym attendance and stay consistent.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Days Present', value: present, icon: FiCheckCircle, color: 'text-green-400' },
          { label: 'Days Absent', value: absent, icon: FiXCircle, color: 'text-red-400' },
          { label: 'Attendance Rate', value: `${rate}%`, icon: FiCalendar, color: 'text-primary' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="card text-center">
            <s.icon className={`text-2xl mx-auto mb-2 ${s.color}`} />
            <p className={`text-3xl font-bold font-poppins ${s.color}`}>{s.value}</p>
            <p className="text-dark-muted text-sm">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Attendance rate bar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-dark-text">Monthly Attendance Rate</h2>
          <span className="text-primary font-bold">{rate}%</span>
        </div>
        <div className="h-3 bg-dark-bg rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${rate}%` }}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-full bg-primary-gradient rounded-full"
          />
        </div>
        <p className="text-dark-muted text-xs mt-2">
          {rate >= 80 ? '🔥 Excellent consistency! Keep it up!' : rate >= 60 ? '👍 Good progress. Try to be more consistent.' : '⚠️ Your attendance needs improvement.'}
        </p>
      </motion.div>

      {/* Calendar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card">
        <h2 className="font-bold text-dark-text mb-4 flex items-center gap-2">
          <FiCalendar className="text-primary" />
          {now.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS.map(d => (
            <div key={d} className="text-center text-xs text-dark-muted font-semibold py-1">{d}</div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((cell, i) => {
            if (!cell) return <div key={i} />;
            const isToday = cell.day === now.getDate();
            return (
              <div
                key={i}
                className={`aspect-square flex items-center justify-center rounded-lg text-xs font-medium transition-all ${
                  cell.status === 'present'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : cell.status === 'absent'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : isToday
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-dark-muted bg-dark-bg'
                }`}
              >
                {cell.day}
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-4 mt-4 text-xs text-dark-muted">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-green-500/30 inline-block" />Present</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-red-500/30 inline-block" />Absent</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-dark-bg border border-dark-border inline-block" />No record</span>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardAttendance;

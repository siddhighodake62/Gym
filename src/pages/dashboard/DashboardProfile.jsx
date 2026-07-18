import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiUser, FiMail, FiPhone, FiCalendar, FiTarget } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext.jsx';
import { toast } from 'react-toastify';

const DashboardProfile = () => {
  const { currentUser, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: currentUser });

  const onSubmit = (data) => {
    updateUser(data);
    setEditing(false);
    toast.success('Profile updated successfully!');
  };

  const fields = [
    { label: 'Full Name', key: 'name', icon: FiUser },
    { label: 'Email Address', key: 'email', icon: FiMail },
    { label: 'Phone Number', key: 'phone', icon: FiPhone },
    { label: 'Member Since', key: 'joinDate', icon: FiCalendar, readonly: true },
    { label: 'Fitness Goal', key: 'goal', icon: FiTarget },
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold font-poppins text-dark-text mb-1">My <span className="gradient-text">Profile</span></h1>
        <p className="text-dark-muted">Manage your personal information and preferences.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Avatar card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card text-center h-fit">
          <div className="w-24 h-24 rounded-full bg-primary-gradient flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4 shadow-glow-primary">
            {currentUser?.name?.charAt(0) || 'U'}
          </div>
          <h2 className="font-poppins font-bold text-dark-text text-xl">{currentUser?.name}</h2>
          <p className="text-primary text-sm mb-1">{currentUser?.membership || 'Basic'} Member</p>
          <p className="text-dark-muted text-xs">{currentUser?.email}</p>
          <div className="mt-4 pt-4 border-t border-dark-border grid grid-cols-2 gap-3">
            <div className="text-center">
              <p className="font-bold text-dark-text text-lg">{currentUser?.bmiHistory?.length || 0}</p>
              <p className="text-dark-muted text-xs">BMI Records</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-dark-text text-lg">32</p>
              <p className="text-dark-muted text-xs">Workouts</p>
            </div>
          </div>
        </motion.div>

        {/* Edit form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold font-poppins text-dark-text">Personal Information</h2>
            <button
              onClick={() => setEditing(!editing)}
              className={editing ? 'btn-ghost text-red-400' : 'btn-outline text-sm py-2'}
            >
              {editing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {fields.map(f => (
              <div key={f.key}>
                <label className="block text-sm font-medium text-dark-text mb-2 flex items-center gap-2">
                  <f.icon className="text-primary" /> {f.label}
                </label>
                <input
                  type="text"
                  className="input-field"
                  {...register(f.key)}
                  disabled={!editing || f.readonly}
                />
              </div>
            ))}

            {editing && (
              <button type="submit" className="btn-primary w-full">Save Changes</button>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardProfile;

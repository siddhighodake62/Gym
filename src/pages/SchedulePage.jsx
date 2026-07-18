import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiClock } from 'react-icons/fi';
import FilterBar from '../components/common/FilterBar.jsx';
import { scheduleData, scheduleCategories } from '../data/schedules.js';

const SchedulePage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeDay, setActiveDay] = useState('Monday');

  const filteredClasses = scheduleData.classes.filter(c => {
    const matchDay = c.day === activeDay;
    const matchCategory = activeFilter === 'All' || c.category === activeFilter;
    return matchDay && matchCategory;
  });

  return (
    <div>
      <section className="page-hero py-20">
        <div className="container-custom text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Class Timetable</span>
            <h1 className="section-title mt-2 text-white">
              Weekly <span className="gradient-text">Schedule</span>
            </h1>
            <p className="text-dark-muted text-lg max-w-2xl mx-auto">
              Browse our weekly class schedule and book your spot today.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-custom">
          {/* Day picker */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {scheduleData.days.map(day => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                  activeDay === day
                    ? 'bg-primary text-white border-primary shadow-glow-primary'
                    : 'bg-dark-card text-dark-muted border-dark-border hover:text-primary hover:border-primary'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Category filter */}
          <div className="flex justify-center mb-8">
            <FilterBar filters={scheduleCategories} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          </div>

          {/* Schedule grid */}
          {filteredClasses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredClasses.map((cls, i) => {
                const availability = Math.round((cls.booked / cls.spots) * 100);
                return (
                  <motion.div
                    key={cls.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="card hover:border-primary/40 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-poppins font-bold text-dark-text text-lg">{cls.name}</h3>
                        <p className="text-dark-muted text-sm">{cls.trainer}</p>
                      </div>
                      <span className={`w-3 h-3 rounded-full ${cls.color} shrink-0 mt-1`} />
                    </div>

                    <div className="flex items-center gap-4 mb-4 text-sm text-dark-muted">
                      <span className="flex items-center gap-1"><FiClock className="text-primary" />{cls.time}</span>
                      <span>{cls.duration} min</span>
                    </div>

                    {/* Availability */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-dark-muted flex items-center gap-1">
                          <FiUsers className="text-secondary" /> {cls.booked}/{cls.spots} spots
                        </span>
                        <span className={`font-medium ${availability > 90 ? 'text-red-400' : availability > 70 ? 'text-yellow-400' : 'text-green-400'}`}>
                          {availability > 90 ? 'Almost Full' : availability > 70 ? 'Filling Up' : 'Available'}
                        </span>
                      </div>
                      <div className="h-1.5 bg-dark-bg rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${availability > 90 ? 'bg-red-500' : availability > 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                          style={{ width: `${availability}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`badge bg-dark-bg border border-dark-border text-xs`}>{cls.category}</span>
                      <button className={`ml-auto btn-primary text-xs py-1.5 px-4 ${availability >= 100 ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={availability >= 100}>
                        {availability >= 100 ? 'Full' : 'Book Now'}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-dark-muted">No classes scheduled for this selection.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SchedulePage;

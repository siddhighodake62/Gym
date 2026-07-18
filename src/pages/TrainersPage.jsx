import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import SearchBar from '../components/common/SearchBar.jsx';
import FilterBar from '../components/common/FilterBar.jsx';
import Pagination from '../components/common/Pagination.jsx';
import TrainerCard from '../components/cards/TrainerCard.jsx';
import { trainers, trainerSpecializations } from '../data/trainers.js';
import usePagination from '../hooks/usePagination.js';

const TrainersPage = () => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = trainers.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.specialization.toLowerCase().includes(search.toLowerCase()) ||
      t.bio.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'All' || t.specialization === activeFilter;
    return matchSearch && matchFilter;
  });

  const { currentItems, currentPage, totalPages, goToPage, hasNext, hasPrev, resetPage } = usePagination(filtered, 6);

  const handleFilter = (f) => { setActiveFilter(f); resetPage(); };
  const handleSearch = (v) => { setSearch(v); resetPage(); };

  return (
    <div>
      <section className="page-hero py-20">
        <div className="container-custom text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Expert Team</span>
            <h1 className="section-title mt-2 text-white">
              Meet Our <span className="gradient-text">Elite Trainers</span>
            </h1>
            <p className="text-dark-muted text-lg max-w-2xl mx-auto">
              World-class certified coaches ready to guide your transformation journey.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <SearchBar value={search} onChange={handleSearch} placeholder="Search trainers..." className="flex-1" />
            <FilterBar filters={trainerSpecializations} activeFilter={activeFilter} onFilterChange={handleFilter} />
          </div>
          <p className="text-dark-muted text-sm mb-6">{filtered.length} trainers found</p>

          {currentItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentItems.map((trainer, i) => (
                <TrainerCard key={trainer.id} trainer={trainer} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <FiSearch className="text-dark-muted text-5xl mx-auto mb-4" />
              <p className="text-dark-muted">No trainers found matching your search.</p>
            </div>
          )}

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} hasNext={hasNext} hasPrev={hasPrev} />
        </div>
      </section>
    </div>
  );
};

export default TrainersPage;

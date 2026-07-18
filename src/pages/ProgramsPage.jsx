import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import SearchBar from '../components/common/SearchBar.jsx';
import FilterBar from '../components/common/FilterBar.jsx';
import Pagination from '../components/common/Pagination.jsx';
import ProgramCard from '../components/cards/ProgramCard.jsx';
import { programs, programCategories } from '../data/programs.js';
import usePagination from '../hooks/usePagination.js';

const ProgramsPage = () => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = programs.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'All' || p.category === activeFilter;
    return matchSearch && matchFilter;
  });

  const { currentItems, currentPage, totalPages, goToPage, hasNext, hasPrev, resetPage } = usePagination(filtered, 6);

  const handleFilter = (f) => { setActiveFilter(f); resetPage(); };
  const handleSearch = (v) => { setSearch(v); resetPage(); };

  return (
    <div>
      {/* Hero */}
      <section className="page-hero py-20">
        <div className="container-custom text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Our Programs</span>
            <h1 className="section-title mt-2 text-white">
              Find Your <span className="gradient-text">Perfect Program</span>
            </h1>
            <p className="text-dark-muted text-lg max-w-2xl mx-auto">
              8 world-class programs designed for every goal, fitness level, and schedule.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container-custom">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <SearchBar value={search} onChange={handleSearch} placeholder="Search programs..." className="flex-1" />
            <FilterBar filters={programCategories} activeFilter={activeFilter} onFilterChange={handleFilter} />
          </div>

          {/* Results count */}
          <p className="text-dark-muted text-sm mb-6">{filtered.length} programs found</p>

          {/* Grid */}
          {currentItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map((program, i) => (
                <ProgramCard key={program.id} program={program} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <FiSearch className="text-dark-muted text-5xl mx-auto mb-4" />
              <p className="text-dark-muted">No programs found for "{search}"</p>
            </div>
          )}

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} hasNext={hasNext} hasPrev={hasPrev} />
        </div>
      </section>
    </div>
  );
};

export default ProgramsPage;

import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ value, onChange, placeholder = 'Search...', className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted text-lg" />
      <input
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field pl-12"
        aria-label={placeholder}
      />
    </div>
  );
};

export default SearchBar;

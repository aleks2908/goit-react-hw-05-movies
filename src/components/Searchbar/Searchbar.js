import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = event => {
    setSearchValue(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchValue.trim() === '') {
      toast.warn('Please enter a film name', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });

      return;
    }
    onSubmit(searchValue.toLowerCase().trim());
    setSearchValue('');
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        onChange={handleChange}
        type="text"
        value={searchValue}
        autoComplete="off"
        autoFocus
      />
      <button type="submit" className={css.button}>
        Search
      </button>
    </form>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

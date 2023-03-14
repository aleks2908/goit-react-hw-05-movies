import { Link, Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Loader } from 'components/Loader/Loader';
import { useNavigate, useLocation } from 'react-router-dom';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import css from './Movies.module.css';

export const Movies = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

    const [moviesByKayWord, setMoviesByKayWord] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


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
    setSearchValue('');
    // onSubmit(searchValue.toLowerCase().trim());
    // console.log(searchValue.toLowerCase().trim());

    // useEffect(() => {
      // if (!searchValue) {
      //   return;
      // }

      setIsLoading(true);
      // setIsLoadMoreBtnHidden(false);

      async function fetchData() {
        const API_KEY = '6b1b36ecf2f3f3c0d27307e18cbffcb3';
        const BASE_URL = 'https://api.themoviedb.org/3';

        try {
          const resp = await axios.get(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchValue}&page=${1}`
          );

          //   const trandFilms = resp.data.results;

             console.log(resp.data.results);

          if (!resp.data.results.length) {
            toast.error('Sorry, no results were found for your search.', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
            });
            setIsLoading(false);
            return;
          }
          setMoviesByKayWord(resp.data.results);
          navigate(`?query=${searchValue}`);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }

      fetchData();
    // }, []);
  };

    const handleChange = event => {
      setSearchValue(event.currentTarget.value);
    };


  return (
    <main>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          onChange={handleChange}
          // className={css.input}
          type="text"
          value={searchValue}
          autoComplete="off"
          autoFocus
          // placeholder="Search images and photos"
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>

      {isLoading && (
        <div>
          <Loader />
        </div>
      )}

      <ul>
        {moviesByKayWord.map(({ id, original_title }) => (
          <li className={css.listItem} key={id}>
            <Link to={`/movies/${id}`}>{original_title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

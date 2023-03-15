import { Link } from 'react-router-dom';
import { Loader } from 'components/Loader/Loader';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import css from './Movies.module.css';
import { Searchbar } from 'components/Searchbar/Searchbar';

const Movies = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [moviesByKayWord, setMoviesByKayWord] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const query = searchParams.get('query');

  if (!searchValue && query) {
    setSearchValue(query);
  }

  useEffect(() => {
    if (!searchValue) {
      return;
    }

    const abortController = new AbortController();

    setIsLoading(true);

    async function fetchData() {
      const API_KEY = '6b1b36ecf2f3f3c0d27307e18cbffcb3';
      const BASE_URL = 'https://api.themoviedb.org/3';

      try {
        const resp = await axios.get(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchValue}&page=${1}`,
          { signal: abortController.signal }
        );

        if (!resp.data.results.length) {
          setIsLoading(false);
          navigate('');
          setMoviesByKayWord([]);
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
    return () => {
      abortController.abort();
    };
  }, [navigate, searchValue]);

  const handleFormSubmit = searchValue => {
    setSearchValue(searchValue);
  };

  return (
    <main>
      <Searchbar onSubmit={handleFormSubmit} />

      {isLoading && <Loader />}

      <ul>
        {moviesByKayWord.map(({ id, original_title }) => (
          <li className={css.listItem} key={id}>
            <Link to={`/movies/${id}`} state={{ from: location }}>
              {original_title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Movies;

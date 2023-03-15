
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useLocation } from 'react-router-dom';

import { Loader } from 'components/Loader/Loader';
import css from './Home.module.css';

const Home = () => {
  const [trandFilms, setTrandFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const abortController = new AbortController();

    async function fetchData() {
      const API_KEY = '6b1b36ecf2f3f3c0d27307e18cbffcb3';
      const BASE_URL = 'https://api.themoviedb.org/3';

      try {
        const resp = await axios.get(
          `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
          { signal: abortController.signal }
        );

        if (!resp.data.results) {
          toast.error(
            'Sorry, a request error occurred. Please try again later.',
            {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
            }
          );
          setIsLoading(false);
          return;
        }
        setTrandFilms(resp.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <main>
      <h1>Trending today</h1>

      {isLoading && <Loader />}

      <ul>
        {trandFilms.map(({ id, original_title }) => (
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


export default Home;
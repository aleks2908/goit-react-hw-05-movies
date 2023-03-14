import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link, Outlet } from 'react-router-dom';
import { Loader } from 'components/Loader/Loader';
import css from './Home.module.css';


export const Home = () => {
  //   const [searchValue, setSearchValue] = useState('');
  //   const [page, setPage] = useState(1);
  const [trandFilms, setTrandFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //   const [isLoadMoreBtnHidden, setIsLoadMoreBtnHidden] = useState(false);

  useEffect(() => {
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
          `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${1}`
        );

        //   const trandFilms = resp.data.results;
       
        // console.log(resp.data.results);

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
  }, []);

  return (
    <main>
      <h1>Trending today</h1>

      {isLoading && (
        <div>
          <Loader />
        </div>
      )}

      <ul>
        {trandFilms.map(({ id, original_title }) => (
          <li className={css.listItem} key={id}>
            <Link to={`/movies/${id}`}>{original_title}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </main>
  );
};

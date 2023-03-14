import { Link, Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Loader } from 'components/Loader/Loader';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import css from './MovieDetails.module.css';
import noPoster from '../../images/no-poster.jpg';

export const MovieDetails = () => {
  const { movieId } = useParams();

  // const location = useLocation();
    // const backLink = location.state?.from ?? '/';
  // console.log(movieId);

  const [currentMovie, setCurrentMovie] = useState([]);
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
          `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
        );

        //   const trandFilms = resp.data.results;

        //    console.log(resp.data);

        if (!resp.data) {
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
        setCurrentMovie(resp.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [movieId]);

  // const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

  const {
    poster_path,
    original_title,
    release_date,
    title,
    vote_average,
    overview,
    genres,
  } = currentMovie;

  const genGenres = genres => {
    try {
      return genres.map(genre => genre.name).join(', ');
    } catch (error) {}
  };

  const imgUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : noPoster;

  return (
    <main>
      <Link className={css.btnBack} type="button" to={'/'}>
        &#x21e6; Go Back
      </Link>

      {isLoading && (
        <div className={css.vortexWrapper}>
          <Loader />
        </div>
      )}

      <div className={css.movieDetails}>
        <img
          className={css.movieDetailsImage}
          src={imgUrl}
          alt={title}
          width={250}
        />

        <div>
          <h2>
            {original_title} ({new Date(release_date).getFullYear()})
          </h2>
          <p>User Score: {Math.floor(vote_average * 10)}</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <b>Genres</b>

          {/* {genres.map(({ id, name }) => (
        <Link to={`genre/${id}`} state={{ from: location }} key={id}>
          <li className={css.ganreListItem}>
            <p>{name}</p>
          </li>
        </Link> */}

          {/* {console.log(genres)} */}
          {/* <p>{genres.map(genre => genre.name)}</p> */}

          <p>{genGenres(genres)}</p>
          {/* <p>{console.log(genres.lenght)}</p> */}

          {/* <img src=`"${poster_path}"` alt="" /> */}
        </div>
      </div>

      <h2>Additional information</h2>
      <ul className={css.addInformation}>
        <li>
          <Link to="cast">
            {/* {' '}
            state={location.state} */}
            <p>
              <b>Cast</b>
            </p>
          </Link>
        </li>
        <li>
          <Link to="reviews">
            {/* {' '}
            state={location.state} */}
            <p>
              <b>Reviews</b>
            </p>
          </Link>
        </li>
      </ul>

      <Outlet />
    </main>
  );
};

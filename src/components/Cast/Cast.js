import { useParams } from 'react-router-dom';
import { Loader } from 'components/Loader/Loader';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import css from '../../index.css';
import noPoster from '../../images/no-poster.jpg';

export const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const abortController = new AbortController();

    async function fetchData() {
      const API_KEY = '6b1b36ecf2f3f3c0d27307e18cbffcb3';
      const BASE_URL = 'https://api.themoviedb.org/3';

      try {
        const resp = await axios.get(
          `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`,
          { signal: abortController.signal }
        );

        if (!resp.data.cast) {
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
        setCast(resp.data.cast);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
    return () => {
      abortController.abort();
    };
  }, [movieId]);

  return (
    <>
      {isLoading && (
        <div className={css.vortexWrapper}>
          <Loader />
        </div>
      )}

      <ul>
        {cast.map(({ profile_path, character, original_name, id }) => (
          <li key={id + character}>
            <img
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                  : noPoster
              }
              alt={original_name}
              width={150}
            />
            <b>{original_name}</b>
            <p>character: {character}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

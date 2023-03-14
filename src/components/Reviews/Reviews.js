// import { Link, Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Loader } from 'components/Loader/Loader';

import axios from 'axios';
import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';

import css from '../../index.css';
// import noPoster from '../../images/no-poster.jpg';

// export const ReViews = () => {

export const ReViews = () => {
  const { movieId } = useParams();

  // console.log(movieId);

  const [reviews, setReviews] = useState([]);
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
          `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`
        );

        //   const trandFilms = resp.data.results;

        console.log(resp.data.results.length);

        // if (!resp.data.results.length) {
        //   toast.error(
        //     'Sorry, there are no images matching your search query. Please try again.',
        //     {
        //       position: 'top-right',
        //       autoClose: 5000,
        //       hideProgressBar: false,
        //       closeOnClick: true,
        //       pauseOnHover: true,
        //       draggable: true,
        //       progress: undefined,
        //       theme: 'dark',
        //     }
        //   );
        //   setIsLoading(false);
        //   return;
        // }
        setReviews(resp.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [movieId]);

  // const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

  //   const { profile_path, character, original_name } = cast;

  //   const genGenres = genres => {
  //     //   console.log(genres);
  //     //   const ttt = genres;
  //     //   console.log(ttt);
  //     try {
  //       return genres.map(genre => genre.name).join(' ');
  //     } catch (error) {
  //       //   console.log('error: ', error);
  //     }
  //   };

  // console.log(genres);

  return (
    <div>
      {/* <h1>MovieDetails</h1> */}

      {isLoading && (
        <div className={css.vortexWrapper}>
          <Loader />
        </div>
      )}

      {!reviews.length ? (
        <p>We don't have any reviews for this movie.</p>
      ) : (
        <ul>
          {reviews.map(({ author, content, id }) => (
            <li key={id}>
              <b>Author: {author}</b>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
//   const { movieId } = useParams();
//   return <h1>ReViews: {movieId}</h1>;
// };

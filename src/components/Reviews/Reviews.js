import { useParams } from 'react-router-dom';
import { Loader } from 'components/Loader/Loader';
import axios from 'axios';
import { useState, useEffect } from 'react';

export const ReViews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const abortController = new AbortController();

    async function fetchData() {
      const API_KEY = '6b1b36ecf2f3f3c0d27307e18cbffcb3';
      const BASE_URL = 'https://api.themoviedb.org/3';

      try {
        const resp = await axios.get(
          `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`,
          { signal: abortController.signal }
        );

        setReviews(resp.data.results);
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
      {isLoading && <Loader />}

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
    </>
  );
};

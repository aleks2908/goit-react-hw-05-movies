import 'modern-normalize';
import { Route, Routes, NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import { Home } from 'pages/Home/Home';
// import { Movies } from 'pages/Movies/Movies';
// import { MovieDetails } from 'pages/MovieDetails/MovieDetails';
// import { Cast } from '../Cast/Cast';
// import { ReViews } from '../Reviews/Reviews';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
import { lazy, Suspense } from 'react';
import { Loader } from 'components/Loader/Loader';


const Home = lazy(() => import('../../pages/Home/Home'));
const Movies = lazy(() => import('../../pages/Movies/Movies'));
const MovieDetails = lazy(() =>
  import('../../pages/MovieDetails/MovieDetails')
);
const Cast = lazy(() => import('../Cast/Cast'));
const ReViews = lazy(() => import('../Reviews/Reviews'));


const App = () => {
  return (
    <>
      <header>
        <nav>
          <NavLink className={css.navItem} to="/">
            Home
          </NavLink>
          <NavLink className={css.navItem} to="/movies">
            Movies
          </NavLink>
        </nav>
      </header>
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<ReViews />} />
          </Route>
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};


export default App;
import 'modern-normalize';
import { Route, Routes, NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Home } from 'pages/Home/Home';
import { Movies } from 'pages/Movies/Movies';
import { MovieDetails } from 'pages/MovieDetails/MovieDetails';
import { Cast } from '../Cast/Cast';
import { ReViews } from '../Reviews/Reviews';
import 'react-toastify/dist/ReactToastify.css';
import css from './App..module.css';




export const App = () => {
  return (
    <div
    // style={{
    //   height: '100vh',
    //   display: 'flex',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   fontSize: 40,
    //   color: '#010101',
    // }}
    >
      {/* <Container> */}
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
      <Routes>
        Movies
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<ReViews />} />
        </Route>
      </Routes>
      {/* </Container> */}

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
    </div>
  );
};

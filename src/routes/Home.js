import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import './Home.css';

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [movieList, setMovieList] = useState('[]');

  const getMovies = async () => {
    const MOVIE_LS = localStorage.getItem('movies');
    let movieData;

    if (MOVIE_LS) {
      movieData = JSON.parse(MOVIE_LS);
      console.log('cache');
    } else {
      const {
        data: {
          data: { movies },
        },
      } = await axios.get(
        'https://yts-proxy.now.sh/list_movies.json?sort_by=rating'
      );

      movieData = movies;
      localStorage.setItem('movies', JSON.stringify(movies));
    }

    setMovieList(movieData);
    setIsLoading(false);

    return { isLoading, movieList };
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <section className="container">
      {isLoading ? (
        <div className="loader">
          <span className="loader__text">Loading...</span>
        </div>
      ) : (
        <div className="movies">
          {movieList.map((movie) => {
            return (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Home;

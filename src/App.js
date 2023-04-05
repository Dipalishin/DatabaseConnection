import './App.css';
import MovieList from './components/MovieList';
import React from 'react';
import { useState } from 'react';

function App() {
  const [movies, setMovies] = useState([]);
async function fetchMoviesHandler()
{ 
   const response =await fetch('https://swapi.dev/api/films/');
  const data=await response.json();
  
    const transformedMovies=data.results.map(movieData=>{
      return {
        id:movieData.episode_id,
        title:movieData.title,
        openingText:movieData.opening_crawl,
        releaseDate:movieData.release_date
      }
    });
  setMovies(transformedMovies);
  }


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MovieList movies={movies}></MovieList>
      </section>
    </React.Fragment>
  );
}


export default App;

import './App.css';
import MovieList from './components/MovieList';
import React from 'react';
import { useState,useCallback,useEffect } from 'react';
import AddMovie from './components/AddMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [error, setError] = useState(null);

  const cancelRetryHandler = () => {
    setError(error.message);
  };
const fetchMoviesHandler=useCallback(async()=>
{ 
  setIsLoading(true);
  setError(null);
try{
   const response =await fetch('https://swapi.dev/api/films/');
   if (!response.ok) {
    throw new Error("Something went wrong... Retrying");
  }
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
  catch(error){
    setError(error.message);

  }
setIsLoading(false);
},[]);
useEffect(()=>{fetchMoviesHandler();
},[fetchMoviesHandler])
let content = <p> Found no movies </p>;

  if (movies.length > 0) {
    content = <MovieList movies={movies} />;
  }

  if (isLoading) {
    content = <p> Loading.....</p>;
  }

  if (error) {
    content = (
      <div>
        <p> {error} </p>
        <button onClick={cancelRetryHandler}> Cancel Retry </button>
      </div>
    );
  }
  const addMovieHandler=(newMovieObj)=>{
    console.log(newMovieObj);
  }
  

  return (
    <React.Fragment>
        <section>
        <AddMovie onAddMovie= {addMovieHandler}/>
      </section>

      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
{content}</section>
    </React.Fragment>
  );
}


export default App;

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
   const response =await fetch('https://http-react-c063e-default-rtdb.firebaseio.com/movies.json');
   if (!response.ok) {
    throw new Error("Something went wrong... Retrying");
  }
   const data=await response.json();
  
   const loadedMovies=[]
   for(const key in data){
    loadedMovies.push({
      id:key,
      title:data[key].title,
      openingText:data[key].openingText,
      releaseDate:data[key].releaseDate
    })
   }
  
    setMovies(loadedMovies);
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
  const addMovieHandler=async(newMovieObj)=>{
    const response =await fetch('https://http-react-c063e-default-rtdb.firebaseio.com/movies.json',{
      method:'POST',
      body:JSON.stringify(newMovieObj),
      headers:{
        'Content-Type':'application/json'
      }
    })
  const data=await response.json();
  console.log(data);
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

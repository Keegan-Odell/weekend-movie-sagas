import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import axios from 'axios';

function MovieDetails(props) {
	//dispatch is used for redux and sagas
	const dispatch = useDispatch();
	//history is used for routing back to our home
	const history = useHistory();
	//genres will be used to store our genre array using redux and sagas
	const genres = useSelector((store) => store.genres);
	//movieGenres will have our many to many table
	const movieGenres = useSelector((store) => store.movieGenres);
	//this state will hold the specific movie that we click on and populate the 
	//DOM with
	const [movie, setMovie] = useState([]);
	//empty array for checking our genre Nums (probably could of done with SQL 
	//query now that I think about it)
	const genreListNum = [];
	//use this array to hold our genre names (SQL query?)
	const genreListDescription = [];

	//useEffect to populate our genres and many to many table with items
	//also run our grab movie specific get request
	useEffect(() => {
		grabMovieFromServer();
		dispatch({
			type: 'FETCH_GENRES',
		});
		dispatch({
			type: 'FETCH_MOVIE_GENRES',
		});
	}, []);

	//this call will go grab a specific movie using our given ID as a prop
	//from app.js
	//we then set the movie state as the object obtained from the server
	const grabMovieFromServer = () => {
		axios
			.get(`/api/movie/${props.id}`)
			.then((response) => {
				setMovie(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	//this just handles the routing for our Home button
	const handleClick = () => {
		history.push('/');
	};

	//this loops through the movieGenres many to many table and populates the
	//given array with whatever genres the movie is using the movie.id as a check
	function buildGenreNumArray(array) {
		for (let i = 0; i < movieGenres.length; i++) {
			if (movieGenres[i].movie_id == [props.id]) {
				array.push(movieGenres[i].genre_id);
			}
		}
		return array;
	}

	//this uses our genreNum list and loops through the genre database and gives the corresponding genre to the num in our array using a double loop
	function buildGenreDescriptionArray(array) {
		for (let i = 0; i < genreListNum.length; i++) {
			for (let k = 0; k < genres.length; k++) {
				if (genreListNum[i] == genres[k].id) {
					array.push(genres[k].name);
				}
			}
		}
	}

	//this is a conditionalRender component so we can wait for the information to load, when the state is ready with our given information we will render out the objects to the DOM
	//would be fun to have a spinning wheel but didnt have time
	function conditionalRender(array) {
		if (array.length < 1) {
			return <div>waiting for movie</div>;
		} else {
			return (
				<div>
					<button onClick={handleClick}>Home</button>
					<h1>{movie[0].title}</h1>
					<img src={movie[0].poster} alt='movie poster' />
					<h2>Genres</h2>
					{genreListDescription.map((genre, index) => {
						return <h4 key={index}>{genre}</h4>;
					})}
					<h2>Description</h2>
					<div>{movie[0].description}</div>
				</div>
			);
		}
	}

	//we then run our functions and it builds out our DOM
	buildGenreNumArray(genreListNum);
	buildGenreDescriptionArray(genreListDescription);

	return conditionalRender(movie);
}

export default MovieDetails;

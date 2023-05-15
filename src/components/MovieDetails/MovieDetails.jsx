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
	const genres = useSelector((store) => store.genres);
	const movieGenres = useSelector((store) => store.movieGenres);
	const [movie, setMovie] = useState([]);
	const genreListNum = [];
	const genreListDescription = [];
	console.log(props.id);

	useEffect(() => {
		grabMovieFromServer();
		dispatch({
			type: 'FETCH_GENRES',
		});
		dispatch({
			type: 'FETCH_MOVIE_GENRES',
		});
	}, []);

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

	const handleClick = () => {
		history.push('/');
	};

	function buildGenreNumArray(array) {
		for (let i = 0; i < movieGenres.length; i++) {
			if (movieGenres[i].movie_id == [props.id]) {
				array.push(movieGenres[i].genre_id);
			}
		}
		return array;
	}

	function buildGenreDescriptionArray(array) {
		for (let i = 0; i < genreListNum.length; i++) {
			for (let k = 0; k < genres.length; k++) {
				if (genreListNum[i] == genres[k].id) {
					array.push(genres[k].name);
				}
			}
		}
	}

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

	buildGenreNumArray(genreListNum);
	buildGenreDescriptionArray(genreListDescription);

	return conditionalRender(movie);
}

export default MovieDetails;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function MovieDetails(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const movies = useSelector((store) => store.movies);
	const genres = useSelector((store) => store.genres);
	const movieGenres = useSelector((store) => store.movieGenres);

	useEffect(() => {
		dispatch({
			type: 'FETCH_GENRES',
		});
	}, []);

	useEffect(() => {
		dispatch({
			type: 'FETCH_MOVIE_GENRES',
		});
	}, []);

	const id = props.id - 1;
	const title = movies[id].title;
	const poster = movies[id].poster;
	const description = movies[id].description;
	let genreListNum = [];
	let genreListDescription = [];
	console.log(props.id);

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

	buildGenreNumArray(genreListNum);
	buildGenreDescriptionArray(genreListDescription);

	// console.log(genreListNum);
	// console.log(genreListDescription);

	return (
		<div>
			<button onClick={handleClick}>Home</button>
			<h1>{title}</h1>
			<img src={poster} alt={movies.title} />
			<h2>Genres</h2>
			{genreListDescription.map((genre, index) => {
				return <h4 key={index}>{genre}</h4>;
			})}
			<h2>Description</h2>
			<div>{description}</div>
		</div>
	);
}

export default MovieDetails;

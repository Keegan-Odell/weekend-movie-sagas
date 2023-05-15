import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function MovieList() {
	//dispatch so we can use it in useEffect
	const dispatch = useDispatch();
	//this is used for routing
	const history = useHistory();
	//grabs our movies from the store
	const movies = useSelector((store) => store.movies);


	//useEffect to populate our movies array using redux and saga
	useEffect(() => {
		dispatch({ type: 'FETCH_MOVIES' });
	}, []);

	//this is what displays on our DOM
	//we loop over our movies array and for every movie we create a button that
	//redirects us to our correct movie route
	//we also create an image and movie title for each movie
	//by looping through the same array using redux and sagas we can
	//make sure that we are going to the route created in app.js
	return (
		<main>
			<h1>Movie List</h1>
			<section className='movies'>
				{movies.map((movie) => {
					return (
						<button
							key={movie.id}
							onClick={() => {
								history.push(`/${movie.title}`);
							}}>
							<div>
								<h3>{movie.title}</h3>
								<img src={movie.poster} alt={movie.title} />
							</div>
						</button>
					);
				})}
			</section>
		</main>
	);
}

export default MovieList;

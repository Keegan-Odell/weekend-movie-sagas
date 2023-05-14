import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function MovieList() {
	const dispatch = useDispatch();
	const movies = useSelector((store) => store.movies);
	const history = useHistory();

	useEffect(() => {
		dispatch({ type: 'FETCH_MOVIES' });
	}, []);

	return (
		<main>
			<h1>MovieList</h1>
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

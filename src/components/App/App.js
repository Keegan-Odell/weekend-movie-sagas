import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieDetails from '../MovieDetails/MovieDetails.jsx';

function App() {
	const dispatch = useDispatch();
	const movies = useSelector((store) => store.movies);

	useEffect(() => {
		dispatch({
			type: 'FETCH_MOVIES',
		});
	}, []);

	// console.log(movies);

	return (
		<div className='App'>
			<h1>The Movies Saga!</h1>
			<Router>
				<Route path='/' exact>
					<MovieList />
				</Route>

				{/* Details page */}
				{movies.map((movie) => {
					return (
						<Route key={movie.id} exact path={`/${movie.title}`}>
							<MovieDetails id={movie.id} />
						</Route>
					);
				})}
				{/* Add Movie page */}
			</Router>
		</div>
	);
}

export default App;

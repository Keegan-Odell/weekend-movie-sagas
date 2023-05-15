import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieDetails from '../MovieDetails/MovieDetails.jsx';

function App() {

	//dispatch allows us to use it in our useEffect
	const dispatch = useDispatch();

	//this grabs movies from the store
	const movies = useSelector((store) => store.movies);

	//this populates our movies array using redux and saga
	useEffect(() => {
		dispatch({
			type: 'FETCH_MOVIES',
		});
	}, []);

	//this is what shows up on our DOM
	//we look through our movies and create a route path for each movie.title
	//we pass our MovieDetails component a prop of ID so we can properly populate 
	//the item with the correct data
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

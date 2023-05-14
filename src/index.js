import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
	yield takeEvery('FETCH_MOVIES', fetchAllMovies);
	yield takeEvery('FETCH_GENRES', fetchAllGenres);
	yield takeEvery('FETCH_MOVIE_GENRES', fetchMovieGenres);
}

function* fetchAllMovies() {
	// get all movies from the DB
	try {
		const movies = yield axios.get('/api/movie');
		console.log('get all:', movies.data);
		yield put({ type: 'SET_MOVIES', payload: movies.data });
	} catch {
		console.log('get all error');
	}
}

function* fetchAllGenres() {
	try {
		const genres = yield axios.get('/api/genre');
		console.log(genres.data);
		yield put({ type: 'SET_GENRES', payload: genres.data });
	} catch {
		console.log('get error on genres');
	}
}

function* fetchMovieGenres() {
	try {
		const movieGenres = yield axios.get('/api/movieGenres');
		yield put({
			type: 'SET_MOVIE_GENRES',
			payload: movieGenres.data,
		});
	} catch {
		console.log('error loading movie genres');
	}
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
	switch (action.type) {
		case 'SET_MOVIES':
			return action.payload;
		default:
			return state;
	}
};

// Used to store the movie genres
const genres = (state = [], action) => {
	switch (action.type) {
		case 'SET_GENRES':
			return action.payload;
		default:
			return state;
	}
};

//Used to show the relations of genres for movies
const movieGenres = (state = [], action) => {
	switch (action.type) {
		case 'SET_MOVIE_GENRES':
			return action.payload;
		default:
			return state;
	}
};

// Create one store that all components can use
const storeInstance = createStore(
	combineReducers({
		movies,
		genres,
		movieGenres,
	}),
	// Add sagaMiddleware to our store
	applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={storeInstance}>
			<App />
		</Provider>
	</React.StrictMode>
);

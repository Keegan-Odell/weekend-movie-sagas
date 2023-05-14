import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function MovieDetails() {
	const history = useHistory();

	const handleClick = () => {
		history.push('/');
	};

	return (
		<div>
			<button onClick={handleClick}>Home</button>
		</div>
	);
}

export default MovieDetails;

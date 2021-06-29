import React from 'react';
import SignInSide from './SignInSide';
import Trending from './Trending';
import NewMovie from './NewMovie';
import Home from './Home';
import Privacy from './Privacy';

const routes = {
	'/': () => <Home />,
	'/signin': () => <SignInSide />,
	'/trending': () => <Trending />,
	'/newmovie': () => <NewMovie />,
	'/privacy': () => <Privacy />
};

export default routes;

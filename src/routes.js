import React from 'react';
import SignInSide from './SignInSide';
import Trending from './Trending';
import NewMovie from './NewMovie';
import Home from './Home';
// import Policy from './components/Policy';

const routes = {
	'/': () => <Home />,
	'/signin': () => <SignInSide />,
	'/trending': () => <Trending />,
	'/newmovie': () => <NewMovie />
	// '/policy': () => <Policy />
};

export default routes;

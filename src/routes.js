import React from 'react';
import SignInSide from './SignInSide';
import Details from './Details';
import Home from './Home';
// import Policy from './components/Policy';

const routes = {
	'/': () => <Home />,
	'/signin': () => <SignInSide />,
	'/details': () => <Details />
	// '/policy': () => <Policy />
};

export default routes;

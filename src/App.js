import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useRoutes, A } from 'hookrouter';
import routes from './routes';


const App = (props) => {
	const routeResult = useRoutes(routes);
	return routeResult;
};

export default App;
// export default App;

// https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in-side

// yarn start
// npx create-react-app <app name>

// http://flicksickserver.com/image/backdrop/hVS39oCyDSyzY7kl_kMNh.jpg

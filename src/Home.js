import React from 'react';
import { createMuiTheme } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Image from 'material-ui-image';
import logo from './flicksick.png';
import appstore from './appstore.png';
import playstore from './playstore.png';

const theme = createMuiTheme({
	// spacing: 60,
	palette: {
		type: 'dark'
	}
});

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://flicksickapp.com/">
				FlickSick
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		// margin: theme.spacing(1),
		height: 200,
		width: 200
		// backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

const Home = (props) => {
	const classes = useStyles();

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xl">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar} src={logo} />
					{/* <Avatar className={classes.avatar} src={appstore} /> */}
					{/* <Avatar className={classes.avatar} src={playstore} /> */}
					<Typography component="h1" variant="h4">
						Flick / Sick
					</Typography>
					<div style={{ flexDirection: 'row', marginTop: 100 }}>
						<img src={appstore} resizeMode={'cover'} height={40} style={{ marginRight: 15 }} />
						{/* <div style={{ marginLeft: 5 }} /> */}
						<img
							src={playstore}
							resizeMode={'cover'}
							height={40}
							style={{ marginLeft: 10, border: '0.4px solid rgba(255,255,255, .7)', borderRadius: 3 }}
						/>
					</div>
				</div>
				<Box mt={8}>
					<Copyright />
				</Box>
			</Container>
		</ThemeProvider>
	);
};

export default Home;

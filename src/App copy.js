import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/styles';

import {
	Container,
	AppBar,
	CssBaseline,
	Typography,
	createMuiTheme,
	TextField,
	withStyles,
	Button,
	Radio,
	RadioGroup,
	FormLabel,
	FormControlLabel,
	FormControl
} from '@material-ui/core';

import { DropzoneDialog } from 'material-ui-dropzone';
import Autocomplete from '@material-ui/lab/Autocomplete';
//https://github.com/Yuvaleros/material-ui-dropzone

const theme = createMuiTheme({
	spacing: 60,
	palette: {
		type: 'dark'
	}
});

const styles = (theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	textField: {
		// flexBasis: 980,
		width: '96%',
		margin: theme.spacing.unit * 2
	}
	// root: {
	//   width: 500,
	//   '& > * + *': {
	//     marginTop: theme.spacing(3),
	//   },
	// },
});

const App = (props) => {
	const { classes } = props;
	const [ title, setTitle ] = useState(null);
	const [ overView, setOverView ] = useState(null);
	const [ mediaType, setMediaType ] = useState(null);
	const [ age, setAge ] = useState(null);
	const [ isAdult, setIsAdult ] = useState(null);
	const [ runTime, setRunTime ] = useState(null);
	const [ releaseYear, setReleaseYear ] = useState(null);
	const [ genres, setGenres ] = useState([]);
	// RATING
	const [ imdbId, setIMDBId ] = useState(null);
	const [ imdbRating, setIMDBRating ] = useState(null);
	const [ imdbVoteCount, setIMDBVoteCount ] = useState(null);
	const [ rottenTomatoesRating, setRottenTomatoesRating ] = useState(null);
	const [ rottenTomatoesVoteCount, setRottenTomatoesVoteCount ] = useState(null);
	const [ tmdbId, setTMDBId ] = useState(null);
	const [ tmdbRating, setTMDBRating ] = useState(null);
	const [ tmdbVoteCount, setTMDBVoteCount ] = useState(null);
	//STREAMING INFO
	const [ trailerChannel, setTrailerChannel ] = useState('youtube');
	const [ trailerURL, setTrailerURL ] = useState(null);
	const [ ottChannel, setOTTChannel ] = useState(null);
	const [ ottURL, setOTTURL ] = useState(null);
	// IMAGE INFO

	const [ open, setOpen ] = useState(false);
	const [ files, setFiles ] = useState([]);
	const [ value, setValue ] = React.useState(null);

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSave = (files) => {
		//Saving files to state for further use and closing Modal.
		setOpen(false);
		setFiles(files);
		// this.setState({
		//     files: files,
		//     open: false
		// });
	};

	const handleOpen = () => {
		setOpen(true);
		// this.setState({
		//     open: true,
		// });
	};

	const handleTitleChange = (e) => {
		const value = e.target.value;
		setTitle(value);
	};

	const handleOverviewChange = (e) => {
		const value = e.target.value;
		setOverView(value);
	};

	// this.setState({
	// 	myValue: e.target.value
	// })

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{/* <Typography style={{ marginTop: 50 }}>Text should be white, background should be dark</Typography> */}
			<Container fixed>
				<AppBar color="inherit">
					<Typography variant="h6" style={{ textAlign: 'center', fontSize: 32, fontWeight: '600' }}>
						Flick / Sick
					</Typography>
				</AppBar>
				<div style={{ marginTop: 100 }} />

				<div style={{ border: '0.5px solid rgba(105,105,105, .3)' }}>
					<div style={{ position: 'relative', top: -15, left: 15 }}>
						<Typography style={{ fontWeight: '600', fontSize: 20 }}>Details</Typography>
					</div>
					<TextField
						id="title"
						autoComplete="off"
						className={classes.textField}
						variant="outlined"
						// type={this.state.showPassword ? 'text' : 'password'}
						label="Title"
						value={title}
						onChange={(e) => handleTitleChange(e)}
					/>
					<TextField
						multiline
						id="overview"
						autoComplete="off"
						className={classes.textField}
						variant="outlined"
						// type={this.state.showPassword ? 'text' : 'password'}
						label="Overview"
						value={overView}
						onChange={(e) => handleOverviewChange(e)}
					/>
					<div style={{ display: 'flex', flexDirection: 'row', margin: 15 }}>
						<Typography style={{ textAlign: 'center', marginTop: 30 }}>Media Type</Typography>
						<div style={{ marginLeft: 50 }}>
							<RadioGroup aria-label="mediaType" name="mediaType" value={value} onChange={handleChange}>
								<FormControlLabel value="movie" control={<Radio />} label="Movie" />
								<FormControlLabel value="series" control={<Radio />} label="Series" />
							</RadioGroup>
						</div>
					</div>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<TextField
							id="age"
							autoComplete="off"
							className={classes.textField}
							variant="outlined"
							// type={this.state.showPassword ? 'text' : 'password'}
							label="Age"
							value={age}
							style={{ width: 300 }}
							onChange={(e) => handleOverviewChange(e)}
						/>
						<div style={{ marginTop: 15 }}>
							<Autocomplete
								id="adult"
								options={[ 'True', 'False' ]}
								getOptionLabel={(option) => option}
								style={{ width: 300 }}
								renderInput={(params) => <TextField {...params} label="Adult" variant="outlined" />}
							/>
						</div>
					</div>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<TextField
							id="runtime"
							autoComplete="off"
							className={classes.textField}
							variant="outlined"
							// type={this.state.showPassword ? 'text' : 'password'}
							label="Run Time"
							value={runTime}
							style={{ width: 300 }}
							onChange={(e) => handleOverviewChange(e)}
						/>
						<TextField
							id="release_year"
							autoComplete="off"
							className={classes.textField}
							variant="outlined"
							// type={this.state.showPassword ? 'text' : 'password'}
							label="Release Year"
							value={releaseYear}
							style={{ width: 300 }}
							onChange={(e) => handleOverviewChange(e)}
						/>
					</div>
					<div style={{ margin: 15 }}>
						<Autocomplete
							// fullWidth/
							// size={'small'}
							multiple
							id="genres"
							options={genres}
							getOptionLabel={(option) => option}
							defaultValue={[]}
							filterSelectedOptions
							renderInput={(params) => <TextField {...params} variant="outlined" label="Genres" />}
						/>
					</div>
				</div>

				<div style={{ border: '0.5px solid rgba(105,105,105, .3)', marginTop: 30 }}>
					<div style={{ position: 'relative', top: -15, left: 15 }}>
						<Typography style={{ fontWeight: '600', fontSize: 20 }}>Rating</Typography>
					</div>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<TextField
							id="imdb_id"
							autoComplete="off"
							className={classes.textField}
							variant="outlined"
							// type={this.state.showPassword ? 'text' : 'password'}
							label="IMDB ID"
							value={imdbId}
							onChange={(e) => handleOverviewChange(e)}
						/>
						<TextField
							id="imdb_rating"
							autoComplete="off"
							className={classes.textField}
							variant="outlined"
							// type={this.state.showPassword ? 'text' : 'password'}
							label="IMDB Rating"
							value={imdbRating}
							onChange={(e) => handleOverviewChange(e)}
						/>
						<TextField
							id="imdb_vote_count"
							autoComplete="off"
							className={classes.textField}
							variant="outlined"
							// type={this.state.showPassword ? 'text' : 'password'}
							label="IMDB Votes Count"
							value={imdbVoteCount}
							onChange={(e) => handleOverviewChange(e)}
						/>
					</div>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<TextField
							id="rotten_tomatoes_rating"
							autoComplete="off"
							className={classes.textField}
							variant="outlined"
							// type={this.state.showPassword ? 'text' : 'password'}
							label="Rotten Tomatoes Rating"
							value={rottenTomatoesRating}
							onChange={(e) => handleOverviewChange(e)}
						/>
						<TextField
							id="rotten_tomatoes_vote_count"
							autoComplete="off"
							className={classes.textField}
							variant="outlined"
							// type={this.state.showPassword ? 'text' : 'password'}
							label="Rotten Tomatoes Votes Count"
							value={rottenTomatoesVoteCount}
							onChange={(e) => handleOverviewChange(e)}
						/>
					</div>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<TextField
							id="tmdb_id"
							className={classes.textField}
							variant="outlined"
							// type={this.state.showPassword ? 'text' : 'password'}
							label="TMDB ID"
							value={tmdbId}
							onChange={(e) => handleOverviewChange(e)}
						/>
						<TextField
							id="tmdb_rating"
							autoComplete="off"
							className={classes.textField}
							variant="outlined"
							// type={this.state.showPassword ? 'text' : 'password'}
							label="TMDB Rating"
							value={tmdbRating}
							onChange={(e) => handleOverviewChange(e)}
						/>
						<TextField
							id="tmdb_vote_count"
							autoComplete="off"
							className={classes.textField}
							variant="outlined"
							// type={this.state.showPassword ? 'text' : 'password'}
							label="TMDB Votes Count"
							value={tmdbVoteCount}
							onChange={(e) => handleOverviewChange(e)}
						/>
					</div>
				</div>
				<div style={{ border: '0.3px solid rgba(105,105,105, .3)', marginTop: 30 }}>
					<div style={{ position: 'relative', top: -15, left: 15 }}>
						<Typography style={{ fontWeight: '600', fontSize: 20 }}>Streaming Info</Typography>
					</div>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<TextField
							id="trailer_channel"
							autoComplete="off"
							className={classes.textField}
							variant="outlined"
							// type={this.state.showPassword ? 'text' : 'password'}
							label="Trailer Channel"
							value={trailerChannel}
							onChange={(e) => handleOverviewChange(e)}
						/>
						<TextField
							id="trailerURL"
							autoComplete="off"
							className={classes.textField}
							variant="outlined"
							// type={this.state.showPassword ? 'text' : 'password'}
							label="Trailer URL"
							value={trailerURL}
							onChange={(e) => handleOverviewChange(e)}
						/>
					</div>

					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<TextField
							id="ott_channel"
							autoComplete="off"
							className={classes.textField}
							variant="outlined"
							// type={this.state.showPassword ? 'text' : 'password'}
							label="OTT Channel"
							value={ottChannel}
							onChange={(e) => handleOverviewChange(e)}
						/>
						<TextField
							id="ott_URL"
							autoComplete="off"
							className={classes.textField}
							variant="outlined"
							// type={this.state.showPassword ? 'text' : 'password'}
							label="OTT URL"
							value={ottURL}
							onChange={(e) => handleOverviewChange(e)}
						/>
					</div>
				</div>

				<div style={{ border: '0.3px solid rgba(105,105,105, .3)', marginTop: 30, marginBottom: 20 }}>
					<div style={{ position: 'relative', top: -15, left: 15 }}>
						<Typography style={{ fontWeight: '600', fontSize: 20 }}>Upload Image</Typography>
					</div>
					<div style={{ marginTop: 10, marginLeft: 15 }}>
						<Button style={{ border: '0.3px solid rgba(105,105,105, .9)' }} onClick={() => handleOpen()}>
							Add Poster Image
						</Button>
						<DropzoneDialog
							open={open}
							onSave={() => handleSave()}
							acceptedFiles={[ 'image/jpeg', 'image/png', 'image/bmp' ]}
							showPreviews={true}
							maxFileSize={5000000}
							onClose={() => handleClose()}
						/>
					</div>
					<div style={{ marginTop: 10, marginLeft: 15, marginBottom: 15 }}>
						<Button style={{ border: '0.3px solid rgba(105,105,105, .9)' }} onClick={() => handleOpen()}>
							Add Backdrop Image
						</Button>
						<DropzoneDialog
							open={open}
							onSave={() => handleSave()}
							acceptedFiles={[ 'image/jpeg', 'image/png', 'image/bmp' ]}
							showPreviews={true}
							maxFileSize={5000000}
							onClose={() => handleClose()}
						/>
					</div>
				</div>
			</Container>
		</ThemeProvider>
	);
};

export default withStyles(styles)(App);
// export default App;

// https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in-side

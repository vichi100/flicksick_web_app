import React, { useEffect, useState } from 'react';
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

import { DropzoneDialog, DropzoneArea } from 'material-ui-dropzone';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
//https://github.com/Yuvaleros/material-ui-dropzone

const theme = createMuiTheme({
	// spacing: 60,
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

const initialValues = {
	title: null,
	overview: null,
	// media: null,
	age: null,
	runtime: null,
	release_year: null,
	imdb_id: null,
	imdb_rating: null,
	imdb_vote_count: null,
	rotten_tomatoes_rating: null,
	rotten_tomatoes_vote_count: null,
	tmdb_id: null,
	tmdb_rating: null,
	tmdb_vote_count: null,
	trailer_channel: null,
	trailer_url: null,
	ott_channel: null,
	ott_url: null
};

const App = (props) => {
	const { classes } = props;
	const [ title, setTitle ] = useState(null);
	const [ releaseYear, setReleaseYear ] = useState(null);
	const [ isAdult, setIsAdult ] = useState(null);
	const [ genres, setGenres ] = useState([]);
	const [ media, setMedia ] = useState(null);
	const [ selectedGenresArray, setSelectedGenresArray ] = useState([]);
	const [ values, setValues ] = useState(initialValues);
	const [ openPosterUpload, setOpenPosterUpload ] = useState(false);
	const [ openBackdropUpload, setOpenBackdropUpload ] = useState(false);
	const [ posterImage, setPosterImage ] = useState(null);
	const [ backdropImage, setBackdropImage ] = useState(null);
	const [ saveAs, setSaveAs ] = useState(null);
	const [ error, setError ] = useState(null);

	const [ value, setValue ] = React.useState(null);

	const handleInputChange = (e) => {
		setError(null);
		const { id, value } = e.target;
		console.log(id, value);
		setValues({
			...values,
			[id]: value
		});
	};

	const handleSaveAs = (event, valueX) => {
		setError(null);
		setSaveAs(valueX);
	};

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	const handlePosterClose = () => {
		setOpenPosterUpload(false);
	};

	const handleBackdropClose = () => {
		setOpenBackdropUpload(false);
	};

	const handlePosterImageSave = (file) => {
		setError(null);
		// console.log(file[0].name);
		setOpenPosterUpload(false);
		setPosterImage(file);
	};

	const handleBackdropImageSave = (file) => {
		setError(null);
		// console.log(file[0].name);
		setOpenBackdropUpload(false);
		setBackdropImage(file);
	};

	const handlePosterOpen = () => {
		setOpenPosterUpload(true);
	};

	const handleBackdropOpen = () => {
		setOpenBackdropUpload(true);
	};

	const onSave = () => {
		if (
			values.title === null ||
			values.overview === null ||
			values.age === null ||
			values.runtime === null ||
			values.release_year === null ||
			values.trailer_channel === null ||
			values.trailer_url === null ||
			values.ott_channel === null ||
			values.ott_url === null ||
			posterImage === null ||
			backdropImage === null
		) {
			setError('some field is missing1');
			return;
		}
		if (!media || !saveAs) {
			console.log('media: ', media);
			console.log('saveAs: ', saveAs);
			setError('some field is missing2');
			return;
		}

		if (!isAdult === null) {
			setError('some field is missing3');
			return;
		}

		if (selectedGenresArray.length === 0) {
			setError('some field is missing4');
			return;
		}

		const imageData = new FormData();
		imageData.append('posterImage', posterImage[0]);
		// const backdropImageData = new FormData();
		imageData.append('backdropImage', backdropImage[0]);

		console.log('posterImageData: ', posterImage);
		values['adult'] = isAdult;
		values['media'] = media;
		values['save_as'] = saveAs;

		values['genres'] = selectedGenresArray;

		imageData.append('movie', JSON.stringify(values));
		console.log('values: ', values);

		axios('http://192.168.0.100:3050/onSave', {
			method: 'post',
			// headers: {
			// 	'Content-type': 'Application/json',
			// 	// 'Content-type': 'Application/json, application/x-www-form-urlencoded',
			// 	Accept: 'Application/json'
			// },
			data: imageData
		})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const isAdultFunc = (event, valuesX) => {
		// console.log('isAdult ', event.target.value);
		setError(null);
		console.log('isAdult ', valuesX);
		setIsAdult(valuesX);
	};

	const selectGenres = (event, valuesX) => {
		setError(null);
		console.log('selectGenres ', valuesX);
		setSelectedGenresArray(valuesX);
	};

	const selectMediaType = (event, valuesX) => {
		setError(null);
		console.log('selectMediaType ', valuesX);
		setMedia(valuesX);
	};

	useEffect(() => {
		getUtilData();
	}, []);

	const getUtilData = () => {
		const obj = {
			id: '123'
		};
		axios('http://192.168.0.100:3050/getUtilData', {
			method: 'post',
			// headers: {
			// 	'Content-type': 'Application/json',
			// 	// 'Content-type': 'application/x-www-form-urlencoded',
			// 	Accept: 'Application/json'
			// },
			data: obj
		})
			.then((res) => {
				const genresDict = res.data[0].genres;
				console.log(genresDict);
				const genresArray = Object.values(genresDict);
				console.log(genresArray);
				setGenres(genresArray);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(
		() => {
			searchMovie();
		},
		[ title, releaseYear ]
	);

	const searchMovie = () => {
		console.log('searchMovie1: ', title);
		console.log('searchMovie1: ', releaseYear);
		if (title === null || (releaseYear === null || releaseYear.length < 4)) {
			return;
		}
		console.log('searchMovie2');
		const obj = {
			title: title,
			release_date: releaseYear
		};

		axios('http://192.168.0.100:3050/searchMovie', {
			method: 'post',
			// headers: {
			// 	'Content-type': 'Application/json',
			// 	// 'Content-type': 'application/x-www-form-urlencoded',
			// 	Accept: 'Application/json'
			// },
			data: obj
		})
			.then((res) => {
				console.log(res.data);
				const movieData = res.data[0];
				setMedia(movieData.media_type);
				const genresArray = [];
				movieData.genres.map((item) => {
					genresArray.push(item.name);
				});

				setSelectedGenresArray(genresArray);
				const OTTArrayObj = [];
				const ott = movieData.streaming_info;
				console.log(JSON.stringify(ott));
				var ottURL = null;
				var ottProvider = null;
				ott.map((item) => {
					console.log('item: ', item);
					Object.keys(item).map((key) => {
						console.log('key: ', key);
						const ottCountry = item[key];
						console.log(JSON.stringify(ottCountry));
						ottProvider = key;
						ottURL = ottCountry['in'].link;
						const OTTObj = {
							provider: key,
							url: ottURL
						};
						OTTArrayObj.push(OTTObj);
						console.log(JSON.stringify(ottURL));
					});
				});
				setPosterImage([ { name: movieData.poster_path } ]);
				setBackdropImage([ { name: movieData.backdrop_path } ]);
				var rottenTomatoes = 'NA';
				movieData.ratings.map((item) => {
					if (item.source === 'Rotten Tomatoes') {
						rottenTomatoes = item.value;
					}
				});
				setValues({
					...values,
					...movieData,
					['media']: movieData.media_type,
					['ott_channel']: ottProvider,
					['ott_url']: ottURL,
					['adult']: movieData.adult.toString(),
					['rotten_tomatoes_rating']: rottenTomatoes.slice(0, 2)
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const onChangeTitle = (e) => {
		const titleX = e.target.value;
		setTitle(titleX);
		// searchMovie();
	};

	const onChangeReleaseYear = (e) => {
		const year = e.target.value;
		setReleaseYear(year);
		// searchMovie();
	};

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
						onChange={(e) => onChangeTitle(e)}
					/>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<TextField
							id="runtime"
							autoComplete="off"
							className={classes.textField}
							variant="outlined"
							// type={this.state.showPassword ? 'text' : 'password'}
							label="Run Time"
							InputLabelProps={{
								shrink: values.runtime ? true : false
							}}
							type={'number'}
							value={values.runtime}
							style={{ width: 300 }}
							onChange={(e) => handleInputChange(e)}
						/>
						<TextField
							id="release_year"
							autoComplete="off"
							className={classes.textField}
							variant="outlined"
							type={'number'}
							// type={this.state.showPassword ? 'text' : 'password'}
							label="Release Year"
							value={releaseYear}
							style={{ width: 300 }}
							onChange={(e) => onChangeReleaseYear(e)}
						/>
					</div>
					<TextField
						multiline
						id="overview"
						autoComplete="off"
						className={classes.textField}
						variant="outlined"
						// type={this.state.showPassword ? 'text' : 'password'}
						InputLabelProps={{
							shrink: values.overview ? true : false
						}}
						label="Overview"
						value={values.overview}
						onChange={(e) => handleInputChange(e)}
					/>
					<div style={{ display: 'flex', flexDirection: 'row', margin: 15 }}>
						<Typography style={{ textAlign: 'center', marginTop: 30 }}>Media Type</Typography>
						<div style={{ marginLeft: 50 }}>
							<RadioGroup
								aria-label="mediaType"
								name="mediaType"
								value={media}
								onChange={selectMediaType}
							>
								<FormControlLabel
									value="movie"
									control={<Radio checked={media && media === 'movie' ? true : false} />}
									label="Movie"
								/>
								<FormControlLabel
									value="series"
									control={<Radio checked={media && media === 'series' ? true : false} />}
									label="Series"
								/>
							</RadioGroup>
						</div>
					</div>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<TextField
							id="age"
							autoComplete="off"
							className={classes.textField}
							variant="outlined"
							type={'number'}
							// type={this.state.showPassword ? 'text' : 'password'}
							label="Age"
							InputLabelProps={{
								shrink: true
							}}
							value={values.age}
							style={{ width: 300 }}
							onChange={(e) => handleInputChange(e)}
						/>
						<div style={{ marginTop: 15 }}>
							<Autocomplete
								id="adult"
								value={values.adult}
								// defaultValue={[]}
								options={[ 'True', 'False' ]}
								getOptionLabel={(option) => option}
								style={{ width: 300 }}
								onChange={isAdultFunc}
								renderInput={(params) => <TextField {...params} label="Adult" variant="outlined" />}
							/>
						</div>
					</div>

					<div style={{ margin: 15 }}>
						<Autocomplete
							// fullWidth/
							// size={'small'}
							multiple
							id="genres"
							options={genres}
							value={selectedGenresArray}
							onChange={selectGenres}
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
							InputLabelProps={{
								shrink: values.imdb_id ? true : false
							}}
							value={values.imdb_id}
							onChange={(e) => handleInputChange(e)}
						/>
						<TextField
							id="imdb_rating"
							autoComplete="off"
							className={classes.textField}
							variant="outlined"
							type={'number'}
							// type={this.state.showPassword ? 'text' : 'password'}
							label="IMDB Rating"
							InputLabelProps={{
								shrink: values.imdb_rating ? true : false
							}}
							value={values.imdb_rating}
							onChange={(e) => handleInputChange(e)}
						/>
						<TextField
							id="imdb_vote_count"
							autoComplete="off"
							className={classes.textField}
							variant="outlined"
							type={'number'}
							// type={this.state.showPassword ? 'text' : 'password'}
							label="IMDB Votes Count"
							InputLabelProps={{
								shrink: values.imdb_vote_count ? true : false
							}}
							value={values.imdb_vote_count}
							onChange={(e) => handleInputChange(e)}
						/>
					</div>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<TextField
							id="rotten_tomatoes_rating"
							autoComplete="off"
							type={'number'}
							className={classes.textField}
							variant="outlined"
							// type={this.state.showPassword ? 'text' : 'password'}
							label="Rotten Tomatoes Rating"
							InputLabelProps={{
								shrink: values.rotten_tomatoes_rating ? true : false
							}}
							value={values.rotten_tomatoes_rating}
							onChange={(e) => handleInputChange(e)}
						/>
						<TextField
							id="rotten_tomatoes_vote_count"
							autoComplete="off"
							type={'number'}
							className={classes.textField}
							variant="outlined"
							// type={this.state.showPassword ? 'text' : 'password'}
							label="Rotten Tomatoes Votes Count"
							value={values.rotten_tomatoes_vote_count}
							onChange={(e) => handleInputChange(e)}
						/>
					</div>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<TextField
							id="tmdb_id"
							className={classes.textField}
							variant="outlined"
							autoComplete="off"
							// type={this.state.showPassword ? 'text' : 'password'}
							label="TMDB ID"
							InputLabelProps={{
								shrink: values.tmdb_id ? true : false
							}}
							value={values.tmdb_id}
							onChange={(e) => handleInputChange(e)}
						/>
						<TextField
							id="tmdb_rating"
							autoComplete="off"
							className={classes.textField}
							variant="outlined"
							type={'number'}
							// type={this.state.showPassword ? 'text' : 'password'}
							label="TMDB Rating"
							InputLabelProps={{
								shrink: values.tmdb_rating ? true : false
							}}
							value={values.tmdb_rating}
							onChange={(e) => handleInputChange(e)}
						/>
						<TextField
							id="tmdb_vote_count"
							autoComplete="off"
							className={classes.textField}
							variant="outlined"
							type={'number'}
							// type={this.state.showPassword ? 'text' : 'password'}
							label="TMDB Votes Count"
							InputLabelProps={{
								shrink: values.tmdb_vote_count ? true : false
							}}
							value={values.tmdb_vote_count}
							onChange={(e) => handleInputChange(e)}
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
							value={'Youtube'}
							onChange={(e) => handleInputChange(e)}
						/>
						<TextField
							id="trailer"
							autoComplete="off"
							className={classes.textField}
							variant="outlined"
							// type={this.state.showPassword ? 'text' : 'password'}
							label="Trailer URL"
							InputLabelProps={{
								shrink: values.trailer ? true : false
							}}
							value={values.trailer}
							onChange={(e) => handleInputChange(e)}
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
							InputLabelProps={{
								shrink: values.ott_channel ? true : false
							}}
							value={values.ott_channel}
							onChange={(e) => handleInputChange(e)}
						/>
						<TextField
							id="ott_url"
							autoComplete="off"
							className={classes.textField}
							variant="outlined"
							// type={this.state.showPassword ? 'text' : 'password'}
							label="OTT URL"
							InputLabelProps={{
								shrink: values.ott_url ? true : false
							}}
							value={values.ott_url}
							onChange={(e) => handleInputChange(e)}
						/>
					</div>
				</div>

				<div style={{ border: '0.3px solid rgba(105,105,105, .3)', marginTop: 30, marginBottom: 20 }}>
					<div style={{ position: 'relative', top: -15, left: 15 }}>
						<Typography style={{ fontWeight: '600', fontSize: 20 }}>Upload Image</Typography>
					</div>
					<div style={{ marginTop: 10, marginLeft: 15 }}>
						<div style={{ display: 'flex', flexDirection: 'row' }}>
							<Button
								style={{ border: '0.3px solid rgba(105,105,105, .9)' }}
								onClick={() => handlePosterOpen()}
							>
								Add Poster Image
							</Button>
							<Typography
								style={{
									fontWeight: '500',
									fontSize: 16,
									marginLeft: 50,
									color: 'rgba(222,184,135, .9)'
								}}
							>
								{posterImage ? posterImage[0].name : null}
							</Typography>
						</div>
						<DropzoneDialog
							open={openPosterUpload}
							onSave={handlePosterImageSave}
							acceptedFiles={[ 'image/jpeg', 'image/png', 'image/bmp' ]}
							showPreviews={true}
							maxFileSize={5000000}
							onClose={handlePosterClose}
							cancelButtonText={'Cancel'}
							submitButtonText={'submit'}
							showFileNamesInPreview={true}
							dialogTitle={'dialogTitle'}
							dropzoneText={'dropzoneText'}
						/>
					</div>
					<div style={{ marginTop: 30, marginLeft: 15, marginBottom: 15 }}>
						<div style={{ display: 'flex', flexDirection: 'row' }}>
							<Button
								style={{ border: '0.3px solid rgba(105,105,105, .9)' }}
								onClick={() => handleBackdropOpen()}
							>
								Add Backdrop Image
							</Button>
							<Typography
								style={{
									fontWeight: '500',
									fontSize: 16,
									marginLeft: 50,
									color: 'rgba(222,184,135, .9)'
								}}
							>
								{backdropImage ? backdropImage[0].name : null}
							</Typography>
						</div>

						<DropzoneDialog
							open={openBackdropUpload}
							onSave={handleBackdropImageSave}
							acceptedFiles={[ 'image/jpeg', 'image/png', 'image/bmp' ]}
							showPreviews={true}
							maxFileSize={5000000}
							onClose={handleBackdropClose}
							cancelButtonText={'Cancel'}
							submitButtonText={'submit'}
							showFileNamesInPreview={true}
							dialogTitle={'dialogTitle'}
							dropzoneText={'dropzoneText'}
						/>
					</div>
				</div>

				<div style={{ flexDirection: 'row', margin: 15 }}>
					<div
						style={{
							flexDirection: 'row',
							margin: 15,
							display: 'flex'
							// alignContent: 'flex-end',
							// alignItems: 'flex-end'
						}}
					>
						<Typography style={{ textAlign: 'center', marginTop: 30 }}>Save In</Typography>
						<div style={{ marginLeft: 50 }}>
							<RadioGroup aria-label="saveAs" name="saveAs" value={saveAs} onChange={handleSaveAs}>
								<FormControlLabel value="trendingToday" control={<Radio />} label="Trending Today" />
								<FormControlLabel
									value="popularThisWeek"
									control={<Radio />}
									label="Popular This Week"
								/>
							</RadioGroup>
						</div>
						<Button
							style={{
								border: '0.3px solid rgba(102,205,170, .9)',
								height: 45,
								width: 90,
								marginLeft: 90,
								marginTop: 20
							}}
							onClick={() => onSave()}
						>
							SAVE
						</Button>
					</div>
					<Typography
						style={{
							fontWeight: '500',
							fontSize: 16,
							marginLeft: 50,
							color: 'red'
						}}
					>
						{error ? error : null}
					</Typography>
				</div>
			</Container>
		</ThemeProvider>
	);
};

export default withStyles(styles)(App);
// export default App;

// https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in-side

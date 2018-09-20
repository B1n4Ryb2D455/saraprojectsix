import React from 'react';
import { Route } from 'react-router-dom';

import SearchPage from './SearchPage';
import MainPage from './MainPage';

import * as BooksAPI from './BooksAPI';
import './App.css';

// help from Study Jam 21/07 - FEND P7 - My Reads https://www.youtube.com/watch?v=i6L2jLHV9j8

class BooksApp extends React.Component {
	state = {
		books: []
	};
	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState({ books });
		});
	}

	changeBookShelf = (book, shelf) => {
		BooksAPI.update(book, shelf);

		BooksAPI.getAll().then((books) => {
			this.setState({ books });
		});
	};

	render() {
		return (
			<div className="app">
				<Route
					exact
					path="/"
					render={() => <MainPage books={this.state.books} changeBookShelf={this.changeBookShelf} />}
				/>

				<Route
					path="/search"
					render={() => <SearchPage changeBookShelf={this.changeBookShelf} books={this.state.books} />}
				/>
			</div>
		);
	}
}

export default BooksApp;

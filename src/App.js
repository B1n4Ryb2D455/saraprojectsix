import React from 'react'
import { Route } from 'react-router-dom';

import SearchPage from './SearchPage';
import MainPage from './MainPage';

import * as BooksAPI from './BooksAPI';
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);

    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <MainPage
           books={this.state.books}
           changeBookShelf={this.changeBookShelf}
          />
        )} />

        <Route path="/search" render={() => (
         <SearchPage
            changeBookShelf={this.changeBookShelf}
            books={this.props.books}
          />
        )} />

        </div>
    )
  }
}

export default BooksApp

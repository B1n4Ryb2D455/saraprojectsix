import React from 'react'
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
        <MainPage
           books={this.state.books}
           changeBookShelf={this.changeBookShelf}
          />
        { /*
        <SearchPage />
        changeBookShelf={this.changeBookShelf}
        */
        }
        </div>
    )
  }
}

export default BooksApp

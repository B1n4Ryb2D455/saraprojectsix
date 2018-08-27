import React, {
    Component
} from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class SearchPage extends Component {
    state = {
        query: '',
        searchedBooks: []
    }

    updateQuery = (query) => {
        this.setState({
            query: query
        })
        this.updateSearchedBooks(query);
    }

    updateSearchedBooks = (query) => {
        if (query) {
            BooksAPI.search(query).then((searchedBooks) => {
                if (searchedBooks.error) {
                this.setState({ searchedBooks: [] });
                } else {
                this.setState({ searchedBooks: searchedBooks })
               }
            })
        } else {
            this.setState({ searchedBooks: [] });
        }
     }

    render() {

        return (
            <div className="search-books">
            <div className="search-books-bar">

                    <Link
                        to="/"
                        className="close-search"
                    >close</Link>

                    <div className="search-books-input-wrapper">


                        <input type="text" placeholder="Search by title or author"
                        value={this.state.query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                        />


                </div>

            </div>
            <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            this.state.searchedBooks.map(searchedBooks => {
                                let shelf = "none"

                                this.props.books.map(book => (
                                    book.id === searchedBooks.id ?
                                        shelf = book.shelf :
                                        ''
                                ));

                                return (
                                  <li key={searchedBooks.id}>
                                    <Book
                                        book={searchedBooks}
                                            changeBookShelf={this.props.changeBookShelf}
                                            currentShelf={shelf}
                                    />
                                </li>
                                )
                            })
                        }
                    </ol>
            </div>
            </div>
        );
    }
}

export default SearchPage;
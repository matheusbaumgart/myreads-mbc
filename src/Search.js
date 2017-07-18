import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'

import * as BooksAPI from './BooksAPI'
import Book from './Book'


class SearchApp extends React.Component {
    state = {
        query: '',
        books: '',
        isLoading: false
    }

    updateQuery = (query) => {
        this.setState({ query: query })

        if (query !== '') {
            this.setState({ isLoading: true })

            BooksAPI.search(query, 20).then((res) => {
                !res.error ? this.setState({ books: res }) : null
                this.setState({ isLoading: false })
            })
        } else {
            this.setState({ books: '' })
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={(event) => this.updateQuery(event.target.value)} value={this.state.query} />
                    </div>
                    {this.state.isLoading &&
                        <div className="loading-spinner" />
                    }
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books !== '' && this.state.books.map((book) => (
                            <li key={book.id}>
                                <Book book={book} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchApp
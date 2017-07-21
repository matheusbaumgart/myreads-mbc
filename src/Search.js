import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'

import * as BooksAPI from './BooksAPI'
import Book from './Book'


class SearchApp extends React.Component {
    state = {
        query: '',
        allbooks: '',
        mybooks: this.props.location.state.books,
        isLoading: false
    }

    handleChange = (query) => {
        this.setState({ query: query })

        if (query) {
            this.setState({ isLoading: true })
            this.doSearch(query);
        } else {
            this.setState({ allbooks: '', isLoading: false })
        }
    }

    doSearch = (query) => {
        BooksAPI.search(query, 20).then((res) => {
            if (!res.error) {
                let mybooks = this.state.mybooks;
                let mybooksFlat = [].concat.apply([], mybooks);

                for (let resBook of res) {
                    for (let book of mybooksFlat) {
                        if (resBook.id === book.id) {
                            resBook.shelf = book.shelf;
                        }
                    }
                }
                this.setState({ allbooks: res })
            } else {
                this.setState({ allbooks: '' })
            }
            this.setState({ isLoading: false })
        })
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={(event) => this.handleChange(event.target.value)} value={this.state.query} />
                    </div>
                    {this.state.isLoading &&
                        <div className="loading-spinner" />
                    }
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.allbooks !== '' && this.state.allbooks.map((book) => (
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
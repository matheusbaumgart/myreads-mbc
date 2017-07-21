import React from 'react'
import { Link } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import './App.css'

import Bookshelf from './Bookshelf'

class HomePage extends React.Component {
    state = {
        books: '',
        shelves: ''
    }

    componentDidMount() {
        this.getBooks()
    }

    getBooks = () => {
        // Get all books.
        BooksAPI.getAll().then((books) => {
            // Update state with the list of books grouped by shelf.
            this.setState({
                shelves: {
                    "read": books.filter((book) => book.shelf === "read"),
                    "wantToRead": books.filter((book) => book.shelf === "wantToRead"),
                    "currentlyReading": books.filter((book) => book.shelf === "currentlyReading")
                },
                books: books
            })
        })
    }

    render() {
        return (
            <div className="app">
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    {this.state.shelves !== '' &&
                        <div className="list-books-content">
                            <Bookshelf title="Currently Reading" books={this.state.shelves.currentlyReading} updateBooks={this.getBooks} />
                            <Bookshelf title="Want to Read" books={this.state.shelves.wantToRead} updateBooks={this.getBooks} />
                            <Bookshelf title="Read" books={this.state.shelves.read} updateBooks={this.getBooks} />
                        </div>
                    }
                    <div className="open-search">
                        <Link to={{
                            pathname: '/search',
                            state: { books: this.state.books }
                        }}>Add a book</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage
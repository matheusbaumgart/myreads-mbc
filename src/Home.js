import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import _ from 'lodash'

import * as BooksAPI from './BooksAPI'
import './App.css'

import Bookshelf from './Bookshelf'

class HomePage extends React.Component {
    state = {
        books: ''
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.sortBooks()
        this.sortBooks = this.sortBooks.bind(this);
    }

    sortBooks() {
        // Get all books and sort by shelves. (requires loadsh for the _.groupBy)
        BooksAPI.getAll().then((books) => {
            const sortedBooks = _.groupBy(books, (books) => {
                return books.shelf
            })

            // Update state with the list of books grouped by shelf.
            this.setState({
                books: sortedBooks
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
                    {this.state.books !== '' &&
                        <div className="list-books-content">
                            <Bookshelf title="Currently Reading" books={this.state.books.currentlyReading} sortBooks={this.sortBooks} />
                            <Bookshelf title="Want to Read" books={this.state.books.wantToRead} sortBooks={this.sortBooks} />
                            <Bookshelf title="Read" books={this.state.books.read} sortBooks={this.sortBooks} />
                        </div>
                    }
                    <div className="open-search">
                        <Link to="/search">Add a book</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage
import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class Bookshelf extends Component {

    state = {
        isLoading: false
    }

    handleMoveTo(book, event) {
        this.setState({
            isLoading: true
        })

        event.persist();

        BooksAPI.update(book, event.target.value).then((res) => {
            this.props.sortBooks();

            this.setState({
                isLoading: false
            })
        })
    }

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">
                    {this.props.title} {this.state.isLoading &&
                        <span className="bookshelf-loading">updating..</span>
                    }
                </h2>
                <div className="bookshelf-books">
                    {/*TODO: Add initial loading spinner for each shelf.  */}

                    <ol className="books-grid">
                        {this.props.books.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + book.imageLinks.smallThumbnail + '")' }}></div>
                                        <div className="book-shelf-changer">
                                            <select defaultValue={book.shelf} onChange={(event) => this.handleMoveTo(book, event)}>
                                                <option value="none" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors[0]}</div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Bookshelf;
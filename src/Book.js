import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class Book extends Component {
    state = {
        isLoading: false
    }

    handleMoveTo = (book, event) => {
        this.setState({
            isLoading: true
        })

        event.persist();

        BooksAPI.update(book, event.target.value).then((res) => {
            this.props.updateBooks();

            this.setState({
                isLoading: false
            })
        })
    }

    render() {
        const { book } = this.props

        return (
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
                <div className="book-authors">
                    {book.authors && book.authors.map((name) => (
                        <span key={name}>
                            {name}
                            <br />
                        </span>
                    ))}
                </div>
            </div>
        )
    }
}

export default Book;
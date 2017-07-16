import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

import HomePage from './Home'
import SearchPage from './Search'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomePage} />
          <Route path="/search" component={SearchPage} />
        </div>
      </Router>
    )
  }
}

export default BooksApp

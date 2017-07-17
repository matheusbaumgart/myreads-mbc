import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

import HomePage from './Home'
import SearchPage from './Search'

class BooksApp extends React.Component {
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

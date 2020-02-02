import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import theme from './theme'

import Home from './routes/Home'
import Login from './routes/Login'
import Profile from './routes/Profile'
import List from './routes/List'
import Item from './routes/Item'
import NewItem from './routes/NewItem'
import NewReview from './routes/NewReview'
import User from './routes/User'
import NotFound from './routes/NotFound'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: arial, sans-serif;
  }

  h2 {
    margin: 8px 0;
  }

  body {
    background-color: ${({ theme }) => theme.color.sand};
  }
`

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle whiteColor />
      <Router>
        <Switch>
          <Route path='/' exact component={Home}></Route>
          <Route path='/chips' exact component={Home}></Route>
          <Route path='/login' exact component={Login}></Route>
          <Route path='/profiles/:userId' exact component={Profile}></Route>
          <Route path='/users/' exact component={User}></Route>
          <Route path='/chips/:geo' exact component={List}></Route>
          <Route path='/chips/:geo/new' exact component={NewItem}></Route>
          <Route
            path='/chips/:geo/:chip/review'
            exact
            component={NewReview}></Route>
          <Route path='/chips/:geo/:chip' exact component={Item}></Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App

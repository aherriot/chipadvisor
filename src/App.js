import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import theme from './theme'
import Home from './routes/Home'
import List from './routes/List'
import Item from './routes/Item'
import NewItem from './routes/NewItem'
import NewReview from './routes/NewReview'
import User from './routes/User'

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
    background-color: ${({ theme }) => theme.color.grey};
  }
`

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle whiteColor />
      <Router>
        <Switch>
          <Route path='/' exact component={Home}></Route>
          <Route path='/users/:userId' exact component={User}></Route>
          <Route path='/chips' exact component={Home}></Route>
          <Route path='/chips/:geoId' exact component={List}></Route>
          <Route path='/chips/:geoId/new' exact component={NewItem}></Route>
          <Route
            path='/chips/:geoId/:chipId/review'
            exact
            component={NewReview}></Route>
          <Route path='/chips/:geoId/:chipId' exact component={Item}></Route>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

fetch('/api/users')
  .then(res => res.json())
  .then(data => {
    console.log(data)
  })

export default App

import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  const handleRating = {
    good: () => {
      store.dispatch({
        type: 'GOOD'
      })
    },
    bad: () => {
      store.dispatch({
        type: 'BAD'
      })
    },
    ok: () => {
      store.dispatch({
        type: 'OK'
      })
    },
    reset: () => {
      store.dispatch({
        type: 'ZERO'
      })
    }
  }

  return (
    <div>
      <button onClick={handleRating.good}>good</button> 
      <button onClick={handleRating.ok}>ok</button> 
      <button onClick={handleRating.bad}>bad</button>
      <button onClick={handleRating.reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)

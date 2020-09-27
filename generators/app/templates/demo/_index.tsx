import React from 'react'
import ReactDOM from 'react-dom'
import 'tachyons'
import 'tachyons-extra'
import { hello } from '../dist/lib/hello'

const App = () => {
  return <div className="ba w-100 h4 bg-red">{hello('mitico')}</div>
}

function renderApp() {
  ReactDOM.render(<App />, document.getElementById('app'))
}
renderApp()

import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer.js'
import logger from 'redux-logger'

export default createStore(reducer, applyMiddleware(logger))

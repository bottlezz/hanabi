import todoApp from './reducers'
import { createStore } from 'redux'

const store = createStore(todoApp);

export default store;

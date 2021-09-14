import { combineReducers } from 'redux'
import userReducers from '../Screens/ReduxTest/reducer'
import crudReducers from '../Screens/CRUDRedux/reducer'
import firestoreReducers from '../Screens/CRUDFirestore/reducer'
import dashboardReducers from '../Screens/HomeScreen/reducer'

const reducer = combineReducers({
    userReducers,
    crudReducers,
    firestoreReducers,
    dashboardReducers
})

export default reducer
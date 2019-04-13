import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios'
import thunk from 'redux-thunk'

const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_STUDENTS = 'GET_STUDENTS';

const getCampusesActionCreator = (campuses) => {
    return {
        type: GET_CAMPUSES,
        campuses
    }
}

const getStudentsActionCreator = (students) => {
    return {
        type: GET_STUDENTS,
        students
    }
}

const campusReducer = (state = [], action) => {
    switch (action.type) {
        case GET_CAMPUSES:
            return action.campuses;
        default:
            return state;
    }
}

const studentReducer = (state = [], action) => {
    switch (action.type) {
        case GET_STUDENTS:
            return action.students;
        default:
            return state;
    }
}

export const getCampuses = () => {
    return dispatch => {
        return axios.get('/api/campuses')
            .then(res => dispatch(getCampusesActionCreator(res.data)))
    }
}

export const getStudents = () => {
    return dispatch => {
        return axios.get('/api/students')
            .then(res => dispatch(getStudentsActionCreator(res.data)))
    }
}

const reducer = combineReducers({ campuses: campusReducer, students: studentReducer })


const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk, createLogger({ collapsed: true })))
)

export default store;


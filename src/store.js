import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios'
import thunk from 'redux-thunk'

const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_STUDENTS = 'GET_STUDENTS';
const GET_SINGLE_STUDENT = 'GET_SINGLE_STUDENT';
const GET_SINGLE_CAMPUS = 'GET_SINGLE_CAMPUS';

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

const getStudentAC = (student) => {
    return {
        type: GET_SINGLE_STUDENT,
        student
    }
}

const getCampusAC = (campus) => {
    return {
        type: GET_SINGLE_CAMPUS,
        campus
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

const singleStudentReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_SINGLE_STUDENT:
            return action.student;
        default: return state;
    }
}

const singleCampusReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_SINGLE_CAMPUS:
            return action.campus;
        default: return state;
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

export const getSingleStudent = (id) => {
    return dispatch => {
        return axios.get(`/api/student/${id}`)
            .then(res => dispatch(getStudentAC(res.data)))
    }
}

export const getSingleCampus = (id) => {
    console.log(id)
    return dispatch => {
        return axios.get(`api/campus/${id}`)
            .then(res => dispatch(getCampusAC(res.data)))
    }
}

const reducer = combineReducers({ campuses: campusReducer, students: studentReducer, campus: singleCampusReducer, student: singleStudentReducer })


const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk, createLogger({ collapsed: true })))
)

export default store;


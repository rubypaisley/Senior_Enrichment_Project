import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios'
import thunk from 'redux-thunk'

const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_STUDENTS = 'GET_STUDENTS';
const GET_SINGLE_STUDENT = 'GET_SINGLE_STUDENT';
const GET_SINGLE_CAMPUS = 'GET_SINGLE_CAMPUS';
const ADD_CAMPUS = 'ADD_CAMPUS';
const ADD_STUDENT = 'ADD_STUDENT';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const DELETE_STUDENT = 'DELETE_STUDENT';

const deleteStudentAC = (studentId) => {
    return {
        type: DELETE_STUDENT,
        studentId
    }
}

const deleteCampusAC = (campusId) => {
    return {
        type: DELETE_CAMPUS,
        campusId
    }
}

const addStudentAC = (student) => {
    return {
        type: ADD_STUDENT,
        student
    }
}

const addCampusAC = (campus) => {
    return {
        type: ADD_CAMPUS,
        campus
    }
}

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
        case ADD_CAMPUS:
            return [...state, action.campus]
        case DELETE_CAMPUS:
            return state.filter(campus => campus.id !== action.campusId)
        default:
            return state;
    }
}

const studentReducer = (state = [], action) => {
    switch (action.type) {
        case GET_STUDENTS:
            return action.students;
        case ADD_STUDENT:
            return [...state, action.student];
        case DELETE_STUDENT:
            return state.filter(student => student.id !== action.studentId)
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

export const addCampus = (campusInfo) => {
    return dispatch => {
        return axios.post('/api/campuses', campusInfo)
            .then(res => dispatch(addCampusAC(res.data)))
    }
}

export const addStudent = (studentInfo) => {
    return dispatch => {
        return axios.post('/api/students', studentInfo)
            .then(res => dispatch(addStudentAC(res.data)))
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

export const deleteStudent = (id) => {
    return dispatch => {
        return axios.delete(`api/student/${id}`)
            .then(() => dispatch(deleteStudentAC(id)))
    }
}

export const deleteCampus = (id) => {
    return dispatch => {
        return axios.delete(`/api/campus/${id}`)
            .then(() => dispatch(deleteCampusAC(id)))
    }
}

const reducer = combineReducers({ campuses: campusReducer, students: studentReducer, campus: singleCampusReducer, student: singleStudentReducer })


const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk, createLogger({ collapsed: true })))
)

export default store;


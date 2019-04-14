import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios'
import thunk from 'redux-thunk'

const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_STUDENTS = 'GET_STUDENTS';
const ADD_CAMPUS = 'ADD_CAMPUS';
const ADD_STUDENT = 'ADD_STUDENT';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';
const UPDATE_STUDENT = 'UPDATE_STUDENT';

const updateCampusAC = (campus) => {
    return {
        type: UPDATE_CAMPUS,
        campus
    }
}

const updateStudentAC = (student) => {
    return {
        type: UPDATE_STUDENT,
        student
    }
}

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

const deleteCampusStudentsAC = (campusId) => {
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


const campusReducer = (state = [], action) => {
    switch (action.type) {
        case GET_CAMPUSES:
            return action.campuses;
        case ADD_CAMPUS:
            return [...state, action.campus]
        case DELETE_CAMPUS:
            return state.filter(campus => campus.id !== action.campusId)
        case UPDATE_CAMPUS:
            return state.reduce((accum, campus) => {
                if (campus.id === action.campus.id) {
                    accum.push(action.campus)
                } else {
                    accum.push(campus)
                }
                return accum;
            }, [])
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
        case DELETE_CAMPUS:
            return state.reduce((accum, student) => {
                if (student.campusId === action.campusId) student.campusId = null;
                accum.push(student);
                return accum;
            }, [])
        case UPDATE_STUDENT:
            return state.reduce((accum, student) => {
                if (student.id === action.student.id) {
                    accum.push(action.student)
                } else {
                    accum.push(student)
                }
                return accum;
            }, [])
        default:
            return state;
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
            .then(() => dispatch(deleteCampusStudentsAC(id)))
    }
}

export const updateCampus = (id, campusInfo) => {
    return dispatch => {
        return axios.put(`api/campus/${id}`, campusInfo)
            .then((res) => dispatch(updateCampusAC(res.data)))
    }
}

export const updateStudent = (id, studentInfo) => {
    return dispatch => {
        return axios.put(`api/student/${id}`, studentInfo)
            .then(res => dispatch(updateStudentAC(res.data)))
    }
}

const reducer = combineReducers({ campuses: campusReducer, students: studentReducer })


const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk, createLogger({ collapsed: true })))
)

export default store;


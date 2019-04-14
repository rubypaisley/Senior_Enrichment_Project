import React, { Component } from 'react'
import StudentForm from './StudentForm'
import { updateStudent } from './store'
import { connect } from 'react-redux'

class DisUpdateStudent extends Component {
    constructor(props) {
        super(props);
        const { firstName, lastName, gpa, imageUrl, campusId, email } = this.props.student;
        this.state = {
            firstName,
            lastName,
            gpa,
            imageUrl,
            campusId,
            email
        }
    }
    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        }, () => console.log(this.state))
    }
    handleSubmit = (evt) => {
        evt.preventDefault();
        const studentInfo = this.state;
        if (studentInfo.campusId === '') {
            studentInfo.campusId = null;
        } else {
            studentInfo.campusId = studentInfo.campusId * 1
        }
        this.props.updateStudent(this.props.student.id, studentInfo)
    }
    render() {
        return (
            <StudentForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} state={this.state} campuses={this.props.campuses} />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateStudent: (id, studentInfo) => dispatch(updateStudent(id, studentInfo))
    }
}

const mapStateToProps = (state) => {
    return {
        campuses: state.campuses
    }
}

const UpdateStudent = connect(mapStateToProps, mapDispatchToProps)(DisUpdateStudent)

export default UpdateStudent

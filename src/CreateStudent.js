import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addStudent } from './store';
import StudentForm from './StudentForm'

class DisCreateStudent extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            gpa: '',
            imageUrl: ''

        }
    }
    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        }, () => console.log(this.state))
    }
    handleSubmit = (evt) => {
        evt.preventDefault()
        const studentInfo = this.state
        if (!studentInfo.imageUrl.length) delete studentInfo.imageUrl;
        console.log('gpa is: ' + studentInfo.gpa * 1)
        if (studentInfo.gpa.length === 0) delete studentInfo.gpa;
        console.log(studentInfo)
        this.props.addStudent(studentInfo)
        this.setState({

            firstName: '',
            lastName: '',
            email: '',
            imageUrl: '',
            gpa: ''


        })
    }

    render() {
        return (
            <StudentForm state={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} campuses={this.props.campuses} />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addStudent: (studentInfo) => dispatch(addStudent(studentInfo)),
    }
}

const mapStateToProps = (state) => {
    return {
        campuses: state.campuses
    }
}
const CreateStudent = connect(mapStateToProps, mapDispatchToProps)(DisCreateStudent)

export default CreateStudent


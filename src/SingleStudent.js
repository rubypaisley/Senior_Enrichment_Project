import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import UpdateStudent from './UpdateStudent'

class DisSingleStudent extends Component {
    constructor() {
        super()
        this.state = {
            showUpdateView: false
        }
    }
    onClick = () => {
        this.setState({ showUpdateView: !this.state.showUpdateView })
    }
    render() {
        if (!this.props.student) {
            return <div>student not found</div>
        }
        const { student, campus } = this.props;
        return (
            <div className="container d-flex flex-column align-items-center">
                <h4>{student.firstName} {student.lastName}</h4>
                <img src={student.imageUrl} />
                <p>Email: {student.email}</p>
                <p>GPA: {student.gpa}</p>
                <p> {campus ? <Link to={`/campus/${campus.id}`}>Campus: {campus.name}</Link> : 'Campus Unknown'}</p>
                <button className="btn-primary" type="button" onClick={this.onClick}>Update</button>
                {
                    this.state.showUpdateView ? <UpdateStudent student={student} /> : ''
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const student = state.students.find(stud => stud.id === ownProps.match.params.id * 1)
    if (student && student.campusId) {
        const campus = state.campuses.find(camp => camp.id === student.campusId)
        return {
            student,
            campus
        }
    }
    return {
        student
    }
}

const SingleStudent = connect(mapStateToProps)(DisSingleStudent)

export default SingleStudent

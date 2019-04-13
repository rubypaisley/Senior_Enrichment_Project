import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSingleStudent } from './store'
import { Link } from 'react-router-dom'

class DisSingleStudent extends Component {
    componentDidMount() {
        this.props.getStudent(this.props.match.params.id);
    }
    render() {
        if (!this.props.student.id) {
            return <div>loading</div>
        }
        const { student } = this.props;
        return (
            <div>
                <h4>{student.firstName} {student.lastName}</h4>
                <img src={student.imageUrl} />
                <p>Email: {student.email}</p>
                <p>GPA: {student.gpa}</p>
                <p> {student.campusId ? <Link to={`/campus/${student.campus.id}`}>Campus: {student.campus.name}</Link> : 'Campus Unknown'}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        student: state.student
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStudent: (id) => dispatch(getSingleStudent(id))
    }
}

const SingleStudent = connect(mapStateToProps, mapDispatchToProps)(DisSingleStudent)

export default SingleStudent

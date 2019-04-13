import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStudents } from './store';

class DisAllStudents extends Component {
    componentDidMount() {
        this.props.getStudents()
    }
    render() {
        return (
            <ul className="list-group">
                {
                    this.props.students.map(student => {
                        return (
                            <li className="list-group-item" key={student.id}>
                                {student.firstName} {student.lastName}
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        students: state.students
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStudents: () => dispatch(getStudents())
    }
}

const AllStudents = connect(mapStateToProps, mapDispatchToProps)(DisAllStudents)

export default AllStudents


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStudents } from './store';
import { Link } from 'react-router-dom';
import CreateStudent from './CreateStudent'

class DisAllStudents extends Component {
    componentDidMount() {
        this.props.getStudents()
    }
    render() {
        return (
            <div>
                <ul className="list-group">
                    {
                        this.props.students.map(student => {
                            return (
                                <li className="list-group-item" key={student.id}>
                                    <Link to={`/student/${student.id}`}>
                                        {student.firstName} {student.lastName}
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
                <CreateStudent />
            </div>
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


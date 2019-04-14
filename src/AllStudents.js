import React from 'react';
import { connect } from 'react-redux';
import { deleteStudent } from './store';
import { Link } from 'react-router-dom';
import CreateStudent from './CreateStudent'

const DisAllStudents = (props) => {


    return (
        <div>
            <ul className="list-group">
                {
                    props.students.map(student => {
                        return (
                            <li className="list-group-item" key={student.id}>
                                <button className="btn-warning" type="button" onClick={() => props.deleteStudent(student.id)}>X</button>
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

const mapStateToProps = (state) => {
    return {
        students: state.students
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteStudent: (id) => dispatch(deleteStudent(id))
    }
}

const AllStudents = connect(mapStateToProps, mapDispatchToProps)(DisAllStudents)

export default AllStudents


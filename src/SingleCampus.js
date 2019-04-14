import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import UpdateCampus from './UpdateCampus'

class DisSingleCampus extends Component {
    constructor() {
        super()
        this.state = {
            showUpdateView: false
        }
    }

    handleClick = () => {
        this.setState({ showUpdateView: !this.state.showUpdateView })
    }
    render() {
        const { campus, students } = this.props;
        if (!campus) {
            return <div>campus not found</div>
        }

        console.log(campus)

        return (
            <div className="container d-flex flex-column align-items-center">
                <h3>{campus.name}</h3>
                <img src={campus.imageUrl} />
                <span>{campus.address}</span>
                <p>{campus.description}</p>
                <h5>Students:</h5>
                <ul className="list-group">
                    {
                        students.map(student => <li className="list-group-item" key={student.id}><Link to={`/student/${student.id}`}>{student.firstName} {student.lastName}</Link></li>)
                    }
                </ul>
                <button type="button" onClick={this.handleClick} className="btn-primary">Update Campus</button>
                {this.state.showUpdateView ? <UpdateCampus campus={campus} /> : ''}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        campus: state.campuses.find(campus => campus.id === ownProps.match.params.id * 1),
        students: state.students.filter(student => student.campusId === ownProps.match.params.id * 1)
    }
}


const SingleCampus = connect(mapStateToProps)(DisSingleCampus)

export default SingleCampus

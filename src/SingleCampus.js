import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSingleCampus } from './store'
import { Link } from 'react-router-dom'

class DisSingleCampus extends Component {
    componentDidMount() {
        console.log(this.props.match.params.id)
        this.props.getCampus(this.props.match.params.id)
    }
    render() {
        const { campus } = this.props;
        if (!campus.id) {
            return <div>loading</div>
        }

        console.log(campus)

        return (
            <div className="container">
                <h3>{campus.name}</h3>
                <img src={campus.imageUrl} />
                <span>{campus.address}</span>
                <p>{campus.description}</p>
                <h5>Students:</h5>
                <ul className="list-group">
                    {
                        campus.students.map(student => <li className="list-group-item" key={student.id}><Link to={`/student/${student.id}`}>{student.firstName} {student.lastName}</Link></li>)
                    }
                </ul>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        campus: state.campus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCampus: (id) => dispatch(getSingleCampus(id))
    }
}

const SingleCampus = connect(mapStateToProps, mapDispatchToProps)(DisSingleCampus)

export default SingleCampus

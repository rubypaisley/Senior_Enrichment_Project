import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCampuses } from './store';
import { Link } from 'react-router-dom';
import CreateCampus from './CreateCampus';

class DisAllCampuses extends Component {
    componentDidMount() {
        this.props.getCampuses();
    }
    render() {
        return (
            <div>
                <ul className="list-group">
                    {this.props.campuses.map(campus => {
                        return (
                            <li className="list-group-item" key={campus.id}>
                                <Link to={`/campus/${campus.id}`} >
                                    {campus.name}
                                    <img src={campus.imageUrl} />
                                </Link>
                            </li>
                        )
                    })}
                </ul>

                <CreateCampus />
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        getCampuses: () => dispatch(getCampuses())
    }
}

const mapStateToProps = (state) => {
    return {
        campuses: state.campuses
    }
}

const AllCampuses = connect(mapStateToProps, mapDispatchToProps)(DisAllCampuses)

export default AllCampuses

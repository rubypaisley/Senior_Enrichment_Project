import React from 'react';
import { connect } from 'react-redux';
import { deleteCampus } from './store';
import { Link } from 'react-router-dom';
import CreateCampus from './CreateCampus';

const DisAllCampuses = (props) => {

    return (
        <div>
            <ul className="list-group">
                {props.campuses.map(campus => {
                    return (
                        <li className="list-group-item" key={campus.id} >
                            <div className="d-flex justify-content-between align-items-center">
                                <img src={campus.imageUrl} width="100" />
                                <Link to={`/campus/${campus.id}`} >
                                    {campus.name}
                                </Link>
                                <button className="btn-warning" type="button" onClick={() => props.deleteCampus(campus.id)}>X</button>
                            </div>
                        </li>
                    )
                })}
            </ul>

            <CreateCampus />
        </div>
    )


}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteCampus: (id) => dispatch(deleteCampus(id))
    }
}

const mapStateToProps = (state) => {
    return {
        campuses: state.campuses,
    }
}

const AllCampuses = connect(mapStateToProps, mapDispatchToProps)(DisAllCampuses)

export default AllCampuses

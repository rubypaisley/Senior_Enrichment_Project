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
                        <li className="list-group-item container" key={campus.id} >
                            <div className="d-flex align-items-center row">
                                <img src={campus.imageUrl} width="100" className="col" />
                                <div className="d-flex flex-column col">
                                    <Link to={`/campus/${campus.id}`} >
                                        {campus.name}
                                    </Link>
                                    {campus.address}
                                </div>
                                <button className="btn-warning col m-6" type="button" onClick={() => props.deleteCampus(campus.id)}>delete campus</button>
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

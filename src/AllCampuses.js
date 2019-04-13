import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCampuses } from './store';

class DisAllCampuses extends Component {
    componentDidMount() {
        this.props.getCampuses();
    }
    render() {
        return (
            <ul className="list-group">
                {this.props.campuses.map(campus => {
                    return (
                        <li className="list-group-item" key={campus.id}>
                            {campus.name}
                            <img src={campus.imageUrl} />
                        </li>
                    )
                })}
            </ul>
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

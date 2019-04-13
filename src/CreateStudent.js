import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addStudent, getCampuses } from './store';
import { isNullOrUndefined, isNull } from 'util';

class DisCreateStudent extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',

        }
    }
    componentDidMount() {
        this.props.getCampuses();
    }
    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        }, () => console.log(this.state))
    }
    handleSubmit = (evt) => {
        evt.preventDefault()
        this.props.addStudent(this.state)
        this.setState({

            firstName: '',
            lastName: '',
            email: '',


        })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="firstName">
                        First Name:
                    </label>
                    <input className="form-control" name="firstName" type="text" onChange={this.handleChange} value={this.state.firstName} />
                </div>
                <div>
                    <label htmlFor="lastName">
                        Last Name:
                    </label>
                    <input className="form-control" name="lastName" type="text" onChange={this.handleChange} value={this.state.lastName} />
                </div>
                <div>
                    <label htmlFor="imageUrl">
                        Image (url):
                    </label>
                    <input className="form-control" name="imageUrl" type="text" onChange={this.handleChange} />
                </div>

                <div>
                    <label htmlFor="email">
                        Email:
                    </label>
                    <input className="form-control" name="email" type="text" onChange={this.handleChange} value={this.state.email} />
                </div>
                <div>
                    <label htmlFor="campusId"><em>Campus:</em></label>
                    <select className="form-control" name="campusId" value={this.state.campusId} onChange={this.handleChange}>
                        <option> --none-- </option>
                        {this.props.campuses ? this.props.campuses.map(campus => {
                            return (
                                <option value={campus.id} key={campus.id}>
                                    {campus.name}
                                </option>
                            )
                        })
                            : <option></option>}
                    </select>
                </div>
                <button disabled={this.state.firstName.length === 0 || this.state.lastName.length === 0 || this.state.email.length === 0 ? true : false} className="btn btn-primary" type="submit">Add Student</button>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addStudent: (studentInfo) => dispatch(addStudent(studentInfo)),
        getCampuses: () => dispatch(getCampuses())
    }
}

const mapStateToProps = (state) => {
    return {
        campuses: state.campuses
    }
}
const CreateStudent = connect(mapStateToProps, mapDispatchToProps)(DisCreateStudent)

export default CreateStudent


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addStudent, getCampuses } from './store';

class DisCreateStudent extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            gpa: '',
            imageUrl: ''

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
        const studentInfo = this.state
        if (!studentInfo.imageUrl.length) delete studentInfo.imageUrl;
        console.log('gpa is: ' + studentInfo.gpa * 1)
        if (studentInfo.gpa.length === 0) delete studentInfo.gpa;
        console.log(studentInfo)
        this.props.addStudent(studentInfo)
        this.setState({

            firstName: '',
            lastName: '',
            email: '',
            imageUrl: '',
            gpa: ''


        })
    }
    validate = (firstName, lastName, email, gpa) => {
        console.log(gpa * 1)
        const gpaValid = gpa * 1 > 4 || isNaN(gpa * 1) ? true : false;
        return {
            firstName: firstName.length === 0,
            lastName: lastName.length === 0,
            email: email.length === 0,
            gpa: gpaValid
        }
    }
    render() {
        const errors = this.validate(this.state.firstName, this.state.lastName, this.state.email, this.state.gpa);
        const disabled = Object.keys(errors).reduce((accum, er) => {
            if (errors[er]) {
                return true;
            } else {
                return accum;
            }
        }, false)
        return (
            <form onSubmit={this.handleSubmit} className="border container">
                <h5>Add New Student:</h5>
                <div>
                    <label htmlFor="firstName">
                        First Name: {errors.firstName ? <em className="text-danger">required field</em> : ''}
                    </label>
                    <input className="form-control" name="firstName" type="text" onChange={this.handleChange} value={this.state.firstName} />
                </div>
                <div>
                    <label htmlFor="lastName">
                        Last Name: {errors.lastName ? <em className="text-danger">required field</em> : ''}
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
                        Email: {errors.email ? <em className="text-danger">required field</em> : ''}
                    </label>
                    <input className="form-control" name="email" type="text" onChange={this.handleChange} value={this.state.email} />
                </div>
                <div>
                    <label htmlFor="gpa">
                        GPA: {errors.gpa ? <em className="text-danger">gpa must be between a number from 0.0 and 4.0</em> : ''}
                    </label>
                    <input className="form-control" name="gpa" type="text" onChange={this.handleChange} value={this.state.gpa} />
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
                <button disabled={disabled} className="btn btn-primary" type="submit">Add Student</button>
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


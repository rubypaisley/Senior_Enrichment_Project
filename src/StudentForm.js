import React from 'react'

const StudentForm = ({ state, campuses, handleSubmit, handleChange, heading }) => {
    const validate = (firstName, lastName, email, gpa) => {
        console.log(gpa * 1)
        const gpaValid = gpa * 1 > 4 || isNaN(gpa * 1) ? true : false;
        return {
            firstName: firstName.length === 0,
            lastName: lastName.length === 0,
            email: !/\S+@\S+\.\S+/.test(email),
            gpa: gpaValid
        }
    }
    const errors = validate(state.firstName, state.lastName, state.email, state.gpa);
    const disabled = Object.keys(errors).reduce((accum, er) => {
        if (errors[er]) {
            return true;
        } else {
            return accum;
        }
    }, false)
    return (
        <form onSubmit={handleSubmit} className="border container">
            <h5>{heading}</h5>
            <div>
                <label htmlFor="firstName">
                    First Name: {errors.firstName ? <em className="text-danger">required field</em> : ''}
                </label>
                <input className="form-control" name="firstName" type="text" onChange={handleChange} value={state.firstName} />
            </div>
            <div>
                <label htmlFor="lastName">
                    Last Name: {errors.lastName ? <em className="text-danger">required field</em> : ''}
                </label>
                <input className="form-control" name="lastName" type="text" onChange={handleChange} value={state.lastName} />
            </div>
            <div>
                <label htmlFor="imageUrl">
                    Image (url):
                </label>
                <input className="form-control" name="imageUrl" type="text" onChange={handleChange} />
            </div>

            <div>
                <label htmlFor="email">
                    Email: {errors.email ? <em className="text-danger">must be a valid email address</em> : ''}
                </label>
                <input className="form-control" name="email" type="text" onChange={handleChange} value={state.email} />
            </div>
            <div>
                <label htmlFor="gpa">
                    GPA: {errors.gpa ? <em className="text-danger">gpa must be between a number from 0.0 and 4.0</em> : ''}
                </label>
                <input className="form-control" name="gpa" type="text" onChange={handleChange} value={state.gpa} />
            </div>
            <div>
                <label htmlFor="campusId"><em>Campus:</em></label>
                <select className="form-control" name="campusId" value={state.campusId} onChange={handleChange}>
                    <option value=""> --none-- </option>
                    {campuses ? campuses.map(campus => {
                        return (
                            <option value={campus.id} key={campus.id}>
                                {campus.name}
                            </option>
                        )
                    })
                        : <option></option>}
                </select>
            </div>
            <button disabled={disabled} className="btn btn-primary" type="submit">Submit</button>
        </form>
    )
}

export default StudentForm


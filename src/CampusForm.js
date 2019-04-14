import React from 'react'

const CampusForm = ({ handleSubmit, handleChange, errors, state, heading }) => {
    return (
        <form onSubmit={handleSubmit} className="border container">
            <h5>{heading}</h5>
            <div>
                <label htmlFor="name">
                    Name: {errors.name ? <em className="text-danger">required field</em> : ''}
                </label>
                <input className="form-control" name="name" type="text" onChange={handleChange} value={state.name} />
            </div>
            <div>
                <label htmlFor="imageUrl">
                    Image (url):
                </label>
                <input className="form-control" name="imageUrl" type="text" onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="address">
                    Address: {errors.address ? <em className="text-danger">required field</em> : ''}
                </label>
                <input className="form-control" name="address" type="text" onChange={handleChange} value={state.address} />
            </div>
            <div>
                <label htmlFor="description">
                    Description:
                </label>
                <textarea className="form-control" name="description" type="text" onChange={handleChange} value={state.description} />
            </div>
            <button disabled={state.name.length === 0 || state.address.length === 0 ? true : false} className="btn btn-primary" type="submit">Submit</button>
        </form>
    )
}

export default CampusForm



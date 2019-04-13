import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCampus } from './store';

class DisCreateCampus extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            address: '',
            description: ''
        }
    }
    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        }, () => console.log(this.state))
    }
    handleSubmit = (evt) => {
        evt.preventDefault()
        this.props.addCampus(this.state)
        this.setState({
            name: '',
            address: '',
            description: ''
        })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="name">
                        Name:
                    </label>
                    <input className="form-control" name="name" type="text" onChange={this.handleChange} value={this.state.name} />
                </div>
                <div>
                    <label htmlFor="imageUrl">
                        Image (url):
                    </label>
                    <input className="form-control" name="imageUrl" type="text" onChange={this.handleChange} />
                </div>
                <div>
                    <label htmlFor="address">
                        Address:
                    </label>
                    <input className="form-control" name="address" type="text" onChange={this.handleChange} value={this.state.address} />
                </div>
                <div>
                    <label htmlFor="description">
                        Description:
                    </label>
                    <input className="form-control" name="description" type="text" onChange={this.handleChange} value={this.state.description} />
                </div>
                <button disabled={this.state.name.length === 0 || this.state.address.length === 0 ? true : false} className="btn btn-primary" type="submit">Add Campus</button>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCampus: (campusInfo) => dispatch(addCampus(campusInfo))
    }
}

const CreateCampus = connect(null, mapDispatchToProps)(DisCreateCampus)

export default CreateCampus


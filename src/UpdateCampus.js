import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateCampus } from './store'
import CampusForm from './CampusForm'

class DisUpdateCampus extends Component {
    constructor(props) {
        super(props)
        const { name, address, imageUrl, description } = this.props.campus
        this.state = {
            name,
            address,
            imageUrl,
            description
        }
    }
    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        }, () => console.log(this.state))
    }
    handleSubmit = (evt) => {
        evt.preventDefault();
        this.props.updateCampus(this.props.campus.id, this.state)
    }
    validate = (name, address) => {
        return {
            name: name.length === 0,
            address: address.length === 0
        }
    }
    render() {
        const errors = this.validate(this.state.name, this.state.address);
        return (
            <CampusForm heading="Update Campus:" state={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} errors={errors} />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCampus: (id, campusInfo) => dispatch(updateCampus(id, campusInfo))
    }
}

const UpdateCampus = connect(null, mapDispatchToProps)(DisUpdateCampus)

export default UpdateCampus

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCampus } from './store';
import CampusForm from './CampusForm';

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
        const campusInfo = this.state;
        if (campusInfo.imageUrl === '') delete campusInfo.imageUrl
        this.props.addCampus(campusInfo)
        this.setState({
            name: '',
            address: '',
            description: '',
            imageUrl: ''
        })
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
            <CampusForm state={this.state} errors={errors} handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
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


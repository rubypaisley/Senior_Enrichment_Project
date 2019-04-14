import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import Navbar from './Navbar'
import AllCampuses from './AllCampuses'
import AllStudents from './AllStudents'
import SingleStudent from './SingleStudent'
import SingleCampus from './SingleCampus'
import { getCampuses, getStudents } from './store'
import { connect } from 'react-redux'

class DisApp extends React.Component {
    componentDidMount() {
        this.props.getCampuses();
        this.props.getStudents();
    }
    render() {
        return (
            <div>
                <HashRouter>
                    <h2>College Student Directory</h2>
                    <hr />
                    <Navbar />
                    <hr />
                    <Switch>
                        <Route exact path="/" component={AllCampuses} />
                        <Route exact path="/campuses" component={AllCampuses} />
                        <Route exact path="/students" component={AllStudents} />
                        <Route path="/campus/:id" component={SingleCampus} />
                        <Route path="/student/:id" component={SingleStudent} />
                        <Route path="*" render={() => <h3>Page Not Found</h3>} />
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCampuses: () => dispatch(getCampuses()),
        getStudents: () => dispatch(getStudents())
    }
}
const App = connect(null, mapDispatchToProps)(DisApp)
export default App

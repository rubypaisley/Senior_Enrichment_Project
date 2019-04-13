import React from 'react';
import { HashRouter, Route } from 'react-router-dom'
import Navbar from './Navbar'
import AllCampuses from './AllCampuses'
import AllStudents from './AllStudents'
import SingleStudent from './SingleStudent'
import SingleCampus from './SingleCampus'

const App = () => {
    return (
        <div>
            <HashRouter>
                <Navbar />
                <Route exact path="/campuses" component={AllCampuses} />
                <Route exact path="/students" component={AllStudents} />
                <Route path="/campus/:id" component={SingleCampus} />
                <Route path="/student/:id" component={SingleStudent} />
            </HashRouter>
        </div>
    )
}

export default App

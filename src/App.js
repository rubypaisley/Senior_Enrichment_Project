import React from 'react';
import { HashRouter, Route } from 'react-router-dom'
import Navbar from './Navbar'
import AllCampuses from './AllCampuses'
import AllStudents from './AllStudents'

const App = () => {
    return (
        <div>
            <HashRouter>
                <Navbar />
                <Route exact path="/campuses" component={AllCampuses} />
                <Route exact path="/students" component={AllStudents} />
            </HashRouter>
        </div>
    )
}

export default App

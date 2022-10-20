import React from 'react'
import './App.scss'
import {Github} from "./Components/Github"
import {HashRouter} from "react-router-dom"

function App() {
    return (
        <HashRouter>
            <div className="App">
                <Github/>
            </div>
        </HashRouter>
    )
}

export default App

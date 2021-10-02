import React, {useEffect, useState} from 'react';
import API from "./clients/BackendClient";
import Router from "./Router";
import HomePage from "./Components/HomePage";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";

function App() {
    const [test, setTest] = useState("Loading...");

    useEffect(() => {
        API.get('/')
            .then(res =>{
                setTest(res.data);
            });
    }, []);

    return (
        <>
            <Router HomePage={HomePage} NavBar={NavBar} Footer={Footer} routes={null}/>
        </>
    );
}

export default App;

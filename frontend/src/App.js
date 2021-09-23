import React, {useEffect, useState} from 'react';
import API from "./clients/BackendClient";
function App() {
    const [test, setTest] = useState("Loading...");
    useEffect(() => {
        API.get('/')
            .then(res =>{
                setTest(res.data);
            });

    }, []);

    return (
        <div className="App">
            <h1>{test}</h1>
        </div>
    );
}

export default App;

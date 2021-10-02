import React, {useEffect, useState} from 'react';
import API from "./clients/BackendClient";
import Router from "./Router";
import HomePage from "./Components/HomePage/HomePage";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import styled from "styled-components";

function App() {

    const Container = styled.div`
      height: 100vh;
      width: 100vw;
      background-color: #6291af;
      display: flex;
      flex-direction: column;
      align-items: center;
    `;

    useEffect(() => {
        API.get('/')
            .then(res =>{
                console.log('Fetched', res.data);
            });
    }, []);

    return (
        <Container>
            <Router HomePage={HomePage} NavBar={NavBar} Footer={Footer} routes={null}/>
        </Container>
    );
}

export default App;

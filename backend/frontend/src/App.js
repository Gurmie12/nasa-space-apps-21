import React from 'react';
import Router from "./Router";
import HomePage from "./Components/HomePage/HomePage";
import NavBar from "./Components/NavBar";
import styled from "styled-components";
import Store from './Store/Store';
import { Provider } from "react-redux";

function App() {

    const Container = styled.div`
      height: 100vh;
      width: 100vw;
      background-color: #6291af;
      display: flex;
      flex-direction: column;
      align-items: center;
    `;

    return (
        <Container>
            <Provider store={Store}>
                <Router HomePage={HomePage} NavBar={NavBar} />
            </Provider>
        </Container>
    );
}

export default App;

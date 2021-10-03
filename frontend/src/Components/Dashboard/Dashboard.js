import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {
    Card,
    CircularProgress
} from "@mui/material";
import API from "../../clients/BackendClient";
import MissionCard from "./MissionCard";

const Dashboard = (props) =>{
    const [isLoading, setIsLoading] = useState(false);
    const [consoleLogs, setConsoleLogs] = useState(null);

    useEffect(() =>{
        setIsLoading(true);
        API.get(`/logs/getAllLogs`).then((res) =>{
            if(res.status === 201){
                setConsoleLogs(res.data);
                setIsLoading(false);
            }else{
                throw Error("Internal Server Error");
            }
        })
    }, []);

    const Container = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      padding: 1rem;
      height: 100%;
      width: 100%;
    `;

    const Row = styled.div`
        display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      width: 100vw;
      height: 40vh;
    `;

    const Column = styled.div`
        display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 40%;
      height: 100%;
    `;

    const LoadingContainer = styled(Container)`
      justify-content: center;
    `;

    if(isLoading){
        return(
            <LoadingContainer>
            <CircularProgress />
        </LoadingContainer>
        );
    }

    if(consoleLogs && consoleLogs.length > 0){
        return (
            <Container>
                <Row>
                    <Column>
                        <MissionCard data={consoleLogs[0]} />
                    </Column>
                    <br />
                    <Column>
                        <MissionCard data={consoleLogs[1]} />
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <MissionCard data={consoleLogs[2]} />
                    </Column>
                    <br />
                    <Column>
                        <MissionCard data={consoleLogs[3]} />
                    </Column>
                </Row>
            </Container>
        )
    }

    return (
        <h1>ERROR</h1>
    )

};

export default Dashboard;